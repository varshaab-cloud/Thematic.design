# Setting up a design token architecture

A portable, start-to-finish guide, generalised from building Thematic.design's token
system (1,533 tokens, 3 tiers — brand evaluated and removed, 3 generated outputs). Written so you can follow it in a
new codebase without any Thematic-specific context.

---

## 0. Decide the source of truth first

Everything else follows from this one decision. You have two viable models:

**CSS as source** — hand-maintain a `tokens.css` of custom properties; generate JSON
exports from it. Choose this when code is the primary consumer and the team edits CSS
comfortably. It is what the browser actually reads, so it cannot lie.

**JSON as source** — author in DTCG/Tokens Studio JSON; generate CSS from it (Style
Dictionary or similar). Choose this when design tools drive the system and Figma sync is
central.

Either works. What does not work is both at once. Thematic's original pipeline was
JSON → CSS; the build broke silently, people started editing the CSS directly, and months
later the two sources disagreed on 800+ tokens with no record of which was right. Pick
one direction, and add a CI check that fails when a generated file is edited by hand.

This guide assumes CSS as source. Flip the arrows if you choose the other.

---

## 1. The tier model

Four tiers. Each answers a different question, and each is a place you can intervene
later without touching the tiers around it.

| Tier | Holds | Answers | Example |
|---|---|---|---|
| **base** | raw values only | what values exist? | `--base-color-blue-800: #1518a6` |
| **brand** | references to base | which of them are ours? | `--brand-cobalt-primary-800: var(--base-color-blue-800)` |
| **alias** | references to base/brand | what is each one *for*? | `--alias-color-background-brand: var(--brand-cobalt-primary-800)` |
| **component** | references to alias | where exactly is it used? | `--component-button-primary-color-bg-default: var(--alias-color-background-brand)` |

One value traced end to end:

```
#1518a6
  └─ --base-color-blue-800                      the blue exists
      └─ --brand-cobalt-primary-800             it's our primary
          └─ --alias-color-background-brand     use it for brand backgrounds
              └─ --component-button-primary-color-bg-default    the button's background
```

What each tier buys you: adjust the hue → edit base. Rebrand → swap the brand tier
(a second brand is just a second set of ~74 references). Change what "brand background"
means → edit one alias. Make one component differ → edit its component token.

**Terminology.** "Primitive" is not a tier name — it describes any token holding a raw
value rather than a reference. In a healthy system, base tokens are the *only*
primitives. That sentence is also your validation rule (see §4).

The brand tier is optional. If you will never white-label or rebrand, alias can point
straight at base. Add brand from day one anyway if there is any chance of a second brand
— retrofitting it means re-answering "was this blue chosen because it's blue, or because
it's *ours*?" for every alias, and the answer is unrecoverable from values alone.

## 2. Naming convention

```
--base-<category>-<variant>-<stop>            --base-color-blue-800
                                              --base-spacing-4
--brand-<name>-<role>-<stop>                  --brand-cobalt-primary-800
--alias-<category>-<role>-<modifier>          --alias-color-background-brand
                                              --alias-spacing-padding-md
--component-<family>-<component>-<group>-<role>-<state>
                                              --component-feedback-alert-error-color-bg
```

Rules that earn their keep:

- **Names encode role, not value.** `--alias-color-text-disabled`, never
  `--alias-color-gray-500-ish`. If a name mentions its value, it belongs in base.
- **Family-group the component tier** (`feedback-alert`, not `alert`) when components
  cluster naturally. But know the cost: contributors will guess `--component-alert-*`
  and undefined `var()` references fail *silently* — the browser drops the declaration
  and renders unstyled, with no error anywhere. Document the families prominently and
  lint for unknown token names (§4).
- **States are suffixes** (`-default`, `-hover`, `-disabled`), so a variant's tokens
  sort together.
- **Mark grouping in section comments** (`/* component-date-range-picker */`). Tooling
  cannot infer where a multi-word name ends — `component-date-range-picker` splits as
  `component-date` if you guess from dashes — so declare it once and let generators read
  it.

## 3. Coverage checklist

Atoms a complete system needs, with the counts Thematic landed on for scale:

| Atom | Base | Alias | Notes |
|---|---|---|---|
| Colour | ramps ×9 stops | text / background / border / icon roles + feedback (success·info·warning·error as fg/bg/border triples) | keep feedback ramps separate from brand ramps |
| Typography | sizes, weights, families, line-heights | complete text styles (`heading1-*`) **and** standalone weight/family | the standalone ones are forgotten most — without them every bold label hardcodes a weight |
| Spacing | ~10-step scale | roles: inline / stack / padding / section / page | |
| Radius | ~6 steps + full | same, plus `full` for pills | `full` = 9999px, not 50% (50% ellipses rectangles) |
| Elevation | shadow levels 1–5 | plus explicit `none` | multi-layer shadows read more naturally |
| Motion | durations ×5, easings ×5 | composed transitions (`all <duration> <easing>`) | compose at alias so consumers can't pair a duration with the wrong easing |
| Border | width, style | | |
| Overlay | scrim colour | | |

Commonly forgotten (Thematic shipped without all of these): **motion entirely** — every
transition referenced tokens that didn't exist and failed silently; **standalone font
weights** — caused 64 tier violations; **opacity, z-index, breakpoints** — still open.

## 4. Enforcement — the part that keeps it true

A token system without a linter degrades monotonically. Every rule below exists because
its absence produced a real failure. Build one script, run it in CI, zero errors to merge.

**Errors (block the commit):**

1. **Undefined token reference.** `var(--x)` where `--x` is declared nowhere. The
   browser drops the declaration silently — no console error, no build failure, element
   just renders unstyled. Nothing else in the toolchain catches this. Thematic had 79,
   including an entire motion tier. Suggest the nearest defined name by shared segments.
2. **Hardcoded values in components.** Hex, rgb(), and any dimension for which a
   *usable* token exists — same value **and** same property family (a radius token that
   equals 14px is no fix for `top: 14px`).
3. **Broken chain.** A `var()` inside the token file itself that doesn't resolve — one
   broken link silently breaks everything downstream of it.

**Warnings (report, don't block):**

4. **Literal above base.** Any brand/alias/component token holding a raw value has
   stopped delegating. Exempt keywords (`transparent`, `none`), zero, and composites
   (`color-mix`, `calc`, multi-part shadows).
5. **Primitive-tier reference in a component.** Components reaching past alias into
   base skip the layer where meaning lives — a rebrand moves the alias and misses them.
6. **One-off dimensions** with no suitable token. Acceptable; most component dimensions
   are genuinely component-specific.

**Suggestion quality rules, learned the hard way:**

- **Normalise units** before matching — `10px` and `0.625rem` are the same value.
- **Match by property family**, both sides reduced to the same labels. Value-only
  matching offers font-size tokens for widths (both 16px) and radius tokens for font
  sizes (both 10px) — confident, specific, and wrong.
- **Never suggest another component's token.** chat-input and date-range-picker both
  being 40px is coincidence, not a dependency.
- **Prefer brand over base for brand-named things** — only the brand target survives a
  rebrand, even though both render identically today.
- **Silence beats a wrong answer.** If no same-family token fits, say so.
- **A linter must not fail open.** If it can't load its token map, that's a crash, not a
  clean run. Thematic's audit once reported 0 errors while running with an empty map —
  a swallowed exception downgraded every error to a warning.

## 5. Wiring the alias tier (if starting from an existing codebase)

Greenfield: write aliases as references from day one and skip this. Existing code:

1. List every alias holding a literal (Thematic: 98 of 186).
2. If an older authored source exists, recover intended references from it first — it
   knows `#111487` meant `brand-cobalt-primary-900`, not the visually identical
   `base-color-blue-900`. Values can't tell you intent.
3. Infer the rest by normalised value + property family + brand preference.
4. Whatever has no primitive: mint the missing base token, or leave it with a comment
   saying why (keywords, ring widths — things that aren't on any scale).
5. **Prove zero drift**: resolve every token to its final value before and after; any
   difference is a bug. This is what makes a 98-token rewire safe to ship.

Measure the outcome: pick one base colour, change it, count how many tokens move
downstream. Thematic went from 11 to 44 — that delta is the tier model working.

## 6. The three generated outputs

One exporter script, reading the source CSS, writing three shapes:

```
tokens.css ──exporter──┬── tokens.json          flat name→value map (tooling, linters)
                       ├── tokens.dtcg.json     W3C DTCG, nested, $value/$type/$description
                       └── tokens.studio.json   Tokens Studio (Figma sync), + $metadata.tokenSetOrder
```

Generation order matters: **export after wiring the alias tier**, or every reference
arrives as a flat hex and the chain — the entire point — is lost in translation.

Problems the exporter must solve (each one bit us):

- **References**: `var(--a-b-c)` → `{a-b.c}` for whole-value references only. Composites
  (`all var(x) var(y)`) have no reference syntax in DTCG — emit them verbatim rather
  than half-converting into something no tool reads.
- **Nesting collisions**: DTCG forbids a node being both group and token. If
  `--alias-radius` and `--alias-radius-full` both exist, naive dash-splitting makes
  `radius` both. Keep compound leaf names as single keys (`brand-dark`), and read set
  boundaries from the source's section comments, never from dashes.
- **Shadows**: CSS strings must be parsed back into `{x, y, blur, spread, color}`
  objects — Figma sets effect fields separately. Split layers on top-level commas only;
  `rgba()` contains commas of its own.
- **Types**: infer `$type` from the *resolved* value, since a reference carries no type.
- **Chain resolution**: depth-capped, so a circular definition can't hang CI.

Each output gets a `--check` mode (regenerate in memory, diff against committed, exit 1
if stale) and all checks join a single `npm run verify`.

## 7. Descriptions

DTCG's `$description` is an optional plain string per token. Worth doing because design
tools display it — Figma shows variable descriptions right in the panel where designers
pick tokens.

**Split hand-written from templated, and be strict about the line.** Descriptions carry
judgement the name can't: *why* the scrim is neutral black, *when* not to use tertiary
text. But at 1,600 tokens you cannot hand-write them all, and a stale description is
worse than none — it reads as authoritative precisely when it's wrong.

- **Hand-write the alias tier** (~90 entries): roles, usage boundaries, rationale.
  Sidecar JSON file: `{ "--alias-color-text-primary": "Default text colour. …" }`.
- **Template everything else at export time**: base → "Blue 800. Raw palette value —
  reference an alias or brand token instead."; component → "Background colour for the
  Button primary in its resting state." — assembled from the token's own segments.
- The exporter merges: sidecar wins, template fills the rest. Coverage: 100%, sidecar
  stays small enough to actually maintain.

Template pitfalls (all shipped before being caught by *reading the output*): naming the
category instead of the ramp ("Color 800"); bare numerics ("4."); a role key that
already contains the state, doubling it ("…on hover … on hover"); printing the state key
instead of its phrase ("default" vs "in its resting state"). A coverage percentage
cannot catch any of these — read a sample from every tier.

**Fail the build on orphans**: a sidecar entry whose token no longer exists is exactly
the stale-authority problem, and it's one set-difference to detect.

## 8. Repository layout

```
src/styles/tokens.css        source of truth — alone in its folder, nothing generated beside it
token-descriptions.json      hand-written descriptions (sidecar)
tokens <version>/            generated outputs, regenerated wholesale, never hand-edited
scripts/token-audit.cjs      linter (§4)
scripts/token-export.cjs     exporter (§6–7)
tokens-retired/              frozen history + README saying what replaced it — retire, don't delete
```

Keeping generated files out of the source folder is not cosmetic: when they sit
side-by-side, someone eventually edits the generated one, and the `--check` that should
catch it is the same check nobody runs on files they believe are source.

## 9. Order of operations

1. Choose source of truth; set up the repo layout
2. Base tier: raw scales (§3 checklist — include motion; everyone forgets motion)
3. Brand tier referencing base
4. Alias tier referencing base/brand — references from day one, never literals
5. Component tier referencing alias, family-grouped, section comments marking sets
6. Audit script; CI gate at zero errors
7. Components consume component/alias tokens only; audit-clean before each commit
8. Exporter: three outputs + `--check` + single `verify` command
9. Descriptions: sidecar for alias, templates for the rest, orphan check
10. Wire design-tool sync from the studio output

Steps 6 and 8's checks are the difference between an architecture and a diagram of one.
Every drift Thematic accumulated — a dead build pipeline, two contradictory JSON
exports, 79 dangling references, 98 unwired aliases — happened in the gap where a check
didn't exist yet. None of it has been able to recur since.
