# Context engineering — Thematic.design documentation

How the Thematic documentation system was designed to be readable by both humans and AI models.

---

## The problem it solves

A design system is only useful if the people (and models) building on it make consistent decisions. The documentation strategy here was built around one question: *what does an AI need to read to implement a component correctly, without guessing?*

The answer was three layers, each serving a different retrieval need.

---

## Layer 1 — CLAUDE.md: the boot file

A repo-level file that any AI model reads before touching anything. It functions as a system prompt for the codebase.

It answers four questions up front:

- Where are the component specs? (`src/stories/<Component>.mdx`)
- Where is the full component index? (`DESIGN.generated.md`)
- What are the token rules? (use `var(--…)`, never raw values, prefer the most specific tier)
- What must happen before committing? (`node scripts/token-audit.cjs components/ui` — zero errors required)

A quick-reference table maps "what do I need" to "where is it" so a model doesn't have to scan the whole file.

The constraint this creates: no guessing, no hardcoding, compose only from what already exists in `components/ui/`.

---

## Layer 2 — DESIGN.generated.md: the structured index

A generated index of all 48 components. Every entry has the same fields, in the same order:

- `source` — exact file paths
- `component tokens` — count and namespace prefix (e.g. `--component-button-*`)
- `intent` — when and why to use it, not just what it is
- `variants` — each variant with its role and visual rationale
- `states` — what triggers each non-default state and what changes visually
- `avoid_when` — negative examples, what not to do
- `accessibility` — ARIA roles named explicitly, keyboard behaviour, developer responsibilities

The consistency is the point. Every entry is structured identically so a model can retrieve exactly the fields it needs across any component without parsing narrative prose.

---

## Layer 3 — Component MDX: the implementation spec

Each component has a dedicated Storybook page following an 8-section standard. The sections were chosen to eliminate the most common failure modes in AI-generated component code.

**1. H1** — Component name matching the import exactly. No ambiguity about what to `import`.

**2. Live canvas** — All variants rendered immediately. Visual ground truth before anything is read.

**3. Description** — What the component renders and what the consumer's responsibility is. The boundary between "what the component owns" and "what the developer wires up" is stated explicitly — this is the most important line in the doc for AI code generation.

**4. Variants** — Role described, not just named. "Left-aligned with avatar, uses secondary surface to keep visual weight low" tells a model more than "assistant variant".

**5. States** — Each non-default state gets both: what *triggers* it, and what *changes* visually. Both are required.

**6. Composition** — What the component renders internally, which props wire external dependencies, what the consumer owns. Exists specifically to prevent AI from re-implementing internals the component already handles.

**7. Accessibility** — Required ARIA roles, keyboard interaction model, focus management, screen reader behaviour. Written as developer responsibilities, not design notes. Mandatory on every component without exception.

**8. Playground** — Interactive Controls panel wired to the Playground story.

---

## How the layers connect

| Layer | Purpose | When a model uses it |
|-------|---------|----------------------|
| `CLAUDE.md` | Entry point — rules, pointers, constraints | Before any code is written |
| `DESIGN.generated.md` | Fast retrieval — which component, roughly how | Picking the right component |
| `Component MDX` | Deep spec — exact implementation | Writing the component correctly |

---

## The token system as documentation

The naming convention reinforces readability at the code level. `--component-message-user-color-bg` is self-documenting — a model can read it without a lookup and know it refers to the background colour of a user message bubble. No comment needed.

The three-tier chain (base → alias → component) makes the architecture auditable: follow any component token up through alias to base and you reach a single raw value. The audit script enforces this — if a component file has a hardcoded value that a token already covers, it fails before commit.

---

## The stated intent

The Introduction page makes the design goal explicit:

> *"For AI-assisted workflows, documentation is structured and maintained to provide sufficient context for interface generation and implementation tasks. Component relationships, recommended usage patterns, states, variants, and constraints are documented in a way that can be interpreted by both humans and AI models. As the system evolves, the documentation evolves with it, ensuring generated output reflects the current system rather than outdated patterns."*

Documentation here is treated as a product surface — not a reference manual that trails behind the components, but a live spec that any contributor (human or AI) reads first.
