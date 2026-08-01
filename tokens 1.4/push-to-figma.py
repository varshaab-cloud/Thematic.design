"""
push-to-figma.py
────────────────
Reads tokens 1.4/tokens.json and pushes all design tokens to a Figma file
as native Variables via the Figma REST API.

Collections created:
  • Base        — all base-* raw values (single Default mode)
  • Brand       — brand-cobalt + brand-terra merged (Cobalt / Terra modes)
  • Alias       — all alias-* semantic mappings (single Default mode)
  • Components  — all component-* tokens (single Default mode)

boxShadow tokens are skipped (Figma doesn't support them as Variables).
They are reported at the end so you can add them as Effect Styles manually.

Usage:
  python3 push-to-figma.py --dry-run          # validate + save payload, no API call
  python3 push-to-figma.py                    # push to Figma
"""

import json
import re
import sys
import os
import requests

# ─── CONFIGURATION ────────────────────────────────────────────────────────────
# Fill these in before running (or set as environment variables)
FIGMA_TOKEN = os.environ.get("FIGMA_TOKEN", "YOUR_FIGMA_PERSONAL_ACCESS_TOKEN")
FILE_KEY    = os.environ.get("FIGMA_FILE_KEY", "U8w7yD8kxxazJdLpA7BWpu")

TOKENS_FILE = os.path.join(os.path.dirname(__file__), "tokens.json")

DRY_RUN = "--dry-run" in sys.argv

# ─── LOAD TOKENS ──────────────────────────────────────────────────────────────
print("📂 Loading tokens...")
with open(TOKENS_FILE) as f:
    tokens_raw = json.load(f)

# Strip metadata
tokens = {k: v for k, v in tokens_raw.items() if not k.startswith("$")}

# ─── TOKEN TYPE → FIGMA TYPE MAP ──────────────────────────────────────────────
FIGMA_TYPE = {
    "color":        "COLOR",
    "dimension":    "FLOAT",
    "fontSizes":    "FLOAT",
    "fontFamilies": "STRING",
    "fontWeights":  "STRING",
    "lineHeights":  "STRING",
    "other":        "STRING",
    "boxShadow":    None,   # not supported as Variables
}

# ─── HELPERS ──────────────────────────────────────────────────────────────────
def flatten(group, prefix=""):
    """Recursively flatten nested token object → {path: token_dict}."""
    result = {}
    for key, val in group.items():
        path = f"{prefix}.{key}" if prefix else key
        if isinstance(val, dict) and "$value" in val:
            result[path] = val
        elif isinstance(val, dict):
            result.update(flatten(val, path))
    return result


def extract_ref(value):
    """Return inner path if value is a {reference}, else None."""
    m = re.match(r"^\{(.+)\}$", str(value).strip())
    return m.group(1) if m else None


def parse_color(value):
    """Convert color string → Figma RGBA dict with 0–1 range."""
    v = str(value).strip()
    if v == "transparent":
        return {"r": 0.0, "g": 0.0, "b": 0.0, "a": 0.0}
    if v.startswith("#"):
        h = v.lstrip("#")
        if len(h) == 3:
            h = "".join(c * 2 for c in h)
        r = int(h[0:2], 16) / 255
        g = int(h[2:4], 16) / 255
        b = int(h[4:6], 16) / 255
        a = int(h[6:8], 16) / 255 if len(h) >= 8 else 1.0
        return {"r": round(r, 6), "g": round(g, 6), "b": round(b, 6), "a": round(a, 6)}
    m = re.match(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)", v)
    if m:
        return {
            "r": round(int(m.group(1)) / 255, 6),
            "g": round(int(m.group(2)) / 255, 6),
            "b": round(int(m.group(3)) / 255, 6),
            "a": float(m.group(4)) if m.group(4) else 1.0,
        }
    print(f"  ⚠️  Could not parse color: {v!r}")
    return {"r": 0.0, "g": 0.0, "b": 0.0, "a": 1.0}


def to_figma_value(raw, token_type):
    """Convert raw token value → Figma variable value."""
    if token_type == "color":
        return parse_color(raw)
    elif token_type in ("dimension", "fontSizes"):
        try:
            return float(str(raw).replace("px", "").strip())
        except ValueError:
            return 0.0
    else:
        return str(raw)


def dot_to_slash(path):
    return path.replace(".", "/")


# ─── FLATTEN ALL TOKENS ───────────────────────────────────────────────────────
print("🔍 Flattening token tree...")
all_flat = {}
for group_key, group_val in tokens.items():
    all_flat.update(flatten(group_val, group_key))

# Resolve a token to its final raw value (follow ref chain)
def resolve_raw(path, _seen=None):
    if _seen is None:
        _seen = set()
    if path in _seen:
        return None
    _seen.add(path)
    tok = all_flat.get(path)
    if not tok:
        return None
    ref = extract_ref(tok["$value"])
    if ref:
        return resolve_raw(ref, _seen)
    return tok["$value"]


# ─── SEGMENT TOKENS ───────────────────────────────────────────────────────────
def is_skip(tok):
    return tok.get("$type") == "boxShadow"

base_tokens       = {k: v for k, v in all_flat.items() if k.startswith("base-")       and not is_skip(v)}
brand_cobalt_toks = {k: v for k, v in all_flat.items() if k.startswith("brand-cobalt.")}
brand_terra_toks  = {k: v for k, v in all_flat.items() if k.startswith("brand-terra.")}
alias_tokens      = {k: v for k, v in all_flat.items() if k.startswith("alias-")       and not is_skip(v)}
comp_tokens       = {k: v for k, v in all_flat.items() if k.startswith("component-")   and not is_skip(v)}
skipped           = {k: v for k, v in all_flat.items() if is_skip(v)}

print(f"  Base      : {len(base_tokens)} tokens")
print(f"  Brand     : {len(brand_cobalt_toks)} cobalt + {len(brand_terra_toks)} terra")
print(f"  Alias     : {len(alias_tokens)} tokens")
print(f"  Components: {len(comp_tokens)} tokens")
print(f"  Skipped   : {len(skipped)} boxShadow tokens")

# ─── TEMP ID GENERATOR ────────────────────────────────────────────────────────
_counter = [0]
def tid(prefix="x"):
    _counter[0] += 1
    return f"temp_{prefix}_{_counter[0]}"


# ─── COLLECTION AND MODE IDS ──────────────────────────────────────────────────
col = {
    "base":       tid("col"),
    "brand":      tid("col"),
    "alias":      tid("col"),
    "components": tid("col"),
}
mode = {
    "base_default":   tid("mode"),
    "brand_cobalt":   tid("mode"),
    "brand_terra":    tid("mode"),
    "alias_default":  tid("mode"),
    "comp_default":   tid("mode"),
}

variable_collections = [
    {"action": "CREATE", "id": col["base"],       "name": "Base",       "initialModeId": mode["base_default"]},
    {"action": "CREATE", "id": col["brand"],      "name": "Brand",      "initialModeId": mode["brand_cobalt"]},
    {"action": "CREATE", "id": col["alias"],      "name": "Alias",      "initialModeId": mode["alias_default"]},
    {"action": "CREATE", "id": col["components"], "name": "Components", "initialModeId": mode["comp_default"]},
]

variable_modes = [
    {"action": "CREATE", "id": mode["base_default"],  "variableCollectionId": col["base"],       "name": "Default"},
    {"action": "CREATE", "id": mode["brand_cobalt"],  "variableCollectionId": col["brand"],      "name": "Cobalt"},
    {"action": "CREATE", "id": mode["brand_terra"],   "variableCollectionId": col["brand"],      "name": "Terra"},
    {"action": "CREATE", "id": mode["alias_default"], "variableCollectionId": col["alias"],      "name": "Default"},
    {"action": "CREATE", "id": mode["comp_default"],  "variableCollectionId": col["components"], "name": "Default"},
]

# ─── BUILD VARIABLES ──────────────────────────────────────────────────────────
variables        = []
mode_values      = []
path_to_var_id   = {}   # token dot-path → figma temp var id
unresolved_refs  = []   # paths where reference couldn't be resolved


def register_variable(collection_id, display_name, token_path, token_type, resolved_type):
    var_id = tid("var")
    variables.append({
        "action":               "CREATE",
        "id":                   var_id,
        "variableCollectionId": collection_id,
        "resolvedType":         resolved_type,
        "name":                 dot_to_slash(display_name),
        "description":          f"Token: {token_path}",
    })
    path_to_var_id[token_path] = var_id
    return var_id


def add_raw_value(var_id, mode_id, raw, token_type):
    mode_values.append({
        "variableId": var_id,
        "modeId":     mode_id,
        "value":      to_figma_value(raw, token_type),
    })


def add_ref_value(var_id, mode_id, ref_path, fallback_token_path=None):
    """Add a variable alias, or fall back to resolved raw value."""
    ref_var_id = path_to_var_id.get(ref_path)
    if ref_var_id:
        mode_values.append({
            "variableId": var_id,
            "modeId":     mode_id,
            "value":      {"type": "VARIABLE_ALIAS", "id": ref_var_id},
        })
    else:
        # Try resolving to raw value
        raw = resolve_raw(ref_path)
        ref_tok = all_flat.get(ref_path)
        typ = ref_tok["$type"] if ref_tok else None
        if raw and typ:
            add_raw_value(var_id, mode_id, raw, typ)
        else:
            unresolved_refs.append((fallback_token_path or var_id, ref_path))


# ── 1. BASE ───────────────────────────────────────────────────────────────────
print("\n🔵 Processing Base tokens...")
for path, tok in base_tokens.items():
    typ = tok["$type"]
    ftype = FIGMA_TYPE.get(typ)
    if not ftype:
        continue
    var_id = register_variable(col["base"], path, path, typ, ftype)
    raw = tok["$value"]
    ref = extract_ref(raw)
    # Base tokens should be raw, but handle any stray refs
    if ref:
        raw = resolve_raw(ref) or raw
    add_raw_value(var_id, mode["base_default"], raw, typ)

# ── 2. BRAND (Cobalt + Terra modes) ──────────────────────────────────────────
print("🎨 Processing Brand tokens (Cobalt + Terra modes)...")
# Build a map of generic brand path → {cobalt: tok, terra: tok}
brand_map = {}
for cobalt_path, tok in brand_cobalt_toks.items():
    generic = cobalt_path.replace("brand-cobalt.", "brand.")
    brand_map[generic] = {"cobalt": tok, "cobalt_path": cobalt_path}

for terra_path, tok in brand_terra_toks.items():
    generic = terra_path.replace("brand-terra.", "brand.")
    if generic not in brand_map:
        brand_map[generic] = {}
    brand_map[generic]["terra"] = tok
    brand_map[generic]["terra_path"] = terra_path

for generic_path, data in brand_map.items():
    cobalt_tok  = data.get("cobalt")
    terra_tok   = data.get("terra")
    cobalt_path = data.get("cobalt_path")
    terra_path  = data.get("terra_path")

    tok = cobalt_tok or terra_tok
    typ = tok["$type"]
    ftype = FIGMA_TYPE.get(typ)
    if not ftype:
        continue

    # Display name: strip "brand." prefix so it reads as "primary/800" etc.
    display = generic_path.replace("brand.", "")
    var_id = register_variable(col["brand"], display, generic_path, typ, ftype)

    # Register both brand-cobalt and brand-terra paths → same variable
    if cobalt_path:
        path_to_var_id[cobalt_path] = var_id
    if terra_path:
        path_to_var_id[terra_path] = var_id

    # Cobalt mode — resolve brand-cobalt value (references base-color)
    if cobalt_path:
        raw = resolve_raw(cobalt_path)
        if raw:
            add_raw_value(var_id, mode["brand_cobalt"], raw, typ)

    # Terra mode — resolve brand-terra value (references base-color)
    if terra_path:
        raw = resolve_raw(terra_path)
        if raw:
            add_raw_value(var_id, mode["brand_terra"], raw, typ)

# ── 3. ALIAS ─────────────────────────────────────────────────────────────────
print("🔗 Processing Alias tokens...")
for path, tok in alias_tokens.items():
    typ = tok["$type"]
    ftype = FIGMA_TYPE.get(typ)
    if not ftype:
        continue
    var_id = register_variable(col["alias"], path, path, typ, ftype)
    raw = tok["$value"]
    ref = extract_ref(raw)
    if ref:
        add_ref_value(var_id, mode["alias_default"], ref, path)
    else:
        add_raw_value(var_id, mode["alias_default"], raw, typ)

# ── 4. COMPONENTS ─────────────────────────────────────────────────────────────
print("🧩 Processing Component tokens...")
for path, tok in comp_tokens.items():
    typ = tok["$type"]
    ftype = FIGMA_TYPE.get(typ)
    if not ftype:
        continue
    var_id = register_variable(col["components"], path, path, typ, ftype)
    raw = tok["$value"]
    ref = extract_ref(raw)
    if ref:
        add_ref_value(var_id, mode["comp_default"], ref, path)
    else:
        add_raw_value(var_id, mode["comp_default"], raw, typ)

# ─── SUMMARY ──────────────────────────────────────────────────────────────────
print("\n" + "=" * 60)
print(f"  Collections  : {len(variable_collections)}")
print(f"  Modes        : {len(variable_modes)}")
print(f"  Variables    : {len(variables)}")
print(f"  Mode values  : {len(mode_values)}")
print(f"  Unresolved   : {len(unresolved_refs)}")
print(f"  Skipped      : {len(skipped)} boxShadow tokens")
print("=" * 60)

if unresolved_refs:
    print(f"\n⚠️  Unresolved references ({len(unresolved_refs)}):")
    for path, ref in unresolved_refs[:20]:
        print(f"   {path}  →  {{{ref}}}")

if skipped:
    print(f"\n📋 boxShadow tokens (add as Effect Styles in Figma manually):")
    for path in list(skipped.keys())[:10]:
        print(f"   {path}")
    if len(skipped) > 10:
        print(f"   ... and {len(skipped) - 10} more")

# ─── PAYLOAD ──────────────────────────────────────────────────────────────────
payload = {
    "variableCollections": variable_collections,
    "variableModes":       variable_modes,
    "variables":           variables,
    "variableModeValues":  mode_values,
}

# ─── DRY RUN ──────────────────────────────────────────────────────────────────
if DRY_RUN:
    out = os.path.join(os.path.dirname(__file__), "figma-payload.json")
    with open(out, "w") as f:
        json.dump(payload, f, indent=2)
    print(f"\n✅ DRY RUN — payload saved to {out}")
    print("   Review it, then re-run without --dry-run to push to Figma.")
    sys.exit(0)

# ─── PUSH TO FIGMA ────────────────────────────────────────────────────────────
if FIGMA_TOKEN == "YOUR_FIGMA_PERSONAL_ACCESS_TOKEN":
    print("\n❌ Set FIGMA_TOKEN and FILE_KEY before pushing.")
    print("   Either edit the top of this script, or run:")
    print("   FIGMA_TOKEN=xxx FIGMA_FILE_KEY=yyy python3 push-to-figma.py")
    sys.exit(1)

print(f"\n🚀 Pushing to Figma file: {FILE_KEY}")
url     = f"https://api.figma.com/v1/files/{FILE_KEY}/variables"
headers = {"X-Figma-Token": FIGMA_TOKEN, "Content-Type": "application/json"}

resp = requests.post(url, headers=headers, json=payload)
print(f"   Status: {resp.status_code}")

if resp.ok:
    data = resp.json()
    created = data.get("meta", {})
    print("✅ Variables pushed successfully!")
    print(f"   Collections : {len(created.get('variableCollections', {}))}")
    print(f"   Variables   : {len(created.get('variables', {}))}")
    print("\nOpen your Figma file → Local variables panel to see all 4 collections.")
else:
    print(f"❌ Figma API error: {resp.status_code}")
    print(resp.text[:500])
    # Save payload for debugging
    out = os.path.join(os.path.dirname(__file__), "figma-payload-debug.json")
    with open(out, "w") as f:
        json.dump(payload, f, indent=2)
    print(f"   Debug payload saved to {out}")
    sys.exit(1)
