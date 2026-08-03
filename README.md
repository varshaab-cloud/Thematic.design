# Thematic.design

An enterprise design system built to be used by humans and AI alike — 54 components,
1,533 tokens across three tiers, documented so that an AI assistant can build correct
pages from it without guessing.

**Live Storybook:** [thematic-design.vercel.app](https://thematic-design.vercel.app)

```bash
npm install
npm run storybook   # component docs at localhost:6006
npm run dev         # the Next.js app at localhost:3000
npm run verify      # token audit + generated files fresh — must pass before commit
```

---

## How the documentation is organised

Every document below is one of three kinds. Knowing which kind you're holding tells
you whether you may move or edit it:

- **Pinned** — a machine finds it at this exact path. Don't move or rename.
- **Generated** — a script writes it. Don't edit; regenerate.
- **Reference** — written for humans. Lives in `MD files/`, organise freely.

## Pinned — read by machines

| File | Read by | Purpose |
|------|---------|---------|
| [`CLAUDE.md`](CLAUDE.md) | every AI session, automatically | The rules: tokens only, compose from `components/ui/`, honour the a11y contract, verify before commit |
| [`.claude/agents/token-auditor.md`](.claude/agents/token-auditor.md) | Claude Code | Project agent that runs the audit loop — verify → fix → re-verify to zero errors |
| [`src/stories/*.mdx`](src/stories/) | Storybook · `design-index.cjs` | One doc page per component: variants, states, composition, accessibility contract |
| [`src/styles/tokens.css`](src/styles/tokens.css) | the app, Storybook, all generators | **The source of truth.** Base → alias → component; only base holds raw values |
| [`token-descriptions.json`](token-descriptions.json) | `token-export-1.5.cjs` | Hand-written `$description` for the ~90 tokens where intent needs explaining |

## Generated — regenerate, never edit

| File | Command | Contents |
|------|---------|----------|
| [`DESIGN.generated.md`](DESIGN.generated.md) | `npm run design-index` | Machine-readable index of all 54 components — intent, avoid, tokens, relationships, a11y. What the AI reads to choose components |
| [`tokens 1.5/`](tokens%201.5/) | `npm run tokens` | Three exports of tokens.css: flat JSON, W3C DTCG with descriptions, Tokens Studio for Figma |
| [`token-chains.html`](token-chains.html) | `node scripts/token-chain-viewer.cjs` | Standalone visual explorer — every component's token chain, component → alias → base |

## Reference — for humans, in [`MD files/`](MD%20files/)

| File | What it covers |
|------|----------------|
| [`thematic-case-study.md`](MD%20files/thematic-case-study.md) | The case study: stats, taste-profile-to-decision trace, token architecture, what was built |
| [`taste-profile.md`](MD%20files/taste-profile.md) | The founding brief — the design principles everything else traces back to |
| [`thematic-governance.md`](MD%20files/thematic-governance.md) | Contribution rules: before writing code, before committing, proposing additions |
| [`design-token-architecture-guide.md`](MD%20files/design-token-architecture-guide.md) | Portable start-to-finish guide to building this token architecture elsewhere |
| [`context-engineering.md`](MD%20files/context-engineering.md) | How the docs were designed to be read by AI: the three-layer model |
| [`component-page-anatomy.md`](MD%20files/component-page-anatomy.md) | The 8-section standard every component doc page follows |
| [`overview-introduction.md`](MD%20files/overview-introduction.md) | The design system's introduction page as prose |
| [`PROTOTYPE-CONTEXT.md`](MD%20files/PROTOTYPE-CONTEXT.md) | How to add prototype screens to the Next.js app |

Root-level reference: [`ai-build-workflow.md`](ai-build-workflow.md) — the six-step
workflow for building a page with AI, and where tokens and the verify gate sit in it.
Diagrams: [`token-workflow-simple`](token-workflow-simple.png) ·
[`token-workflow-diagram`](token-workflow-diagram.png) ·
[`ai-build-workflow`](ai-build-workflow.png) (SVG sources alongside).

## The one-paragraph architecture

`tokens.css` is the single source of truth, hand-maintained, three tiers: **base**
(raw values) → **alias** (semantic roles) → **component** (per-component slots). Code
consumes it directly via `globals.css`; everything else — the JSON exports, the
component index, the chain visualiser — is generated from it by scripts, and
`npm run verify` fails if any generated file is stale or any component hardcodes a
value the tokens already express. The result: an AI can build pages from this system,
and the gate proves the output honest without a human reading every line.

## History

`tokens 1.4/` and `tokens-retired/` are frozen — earlier generations of the token
pipeline, kept for reference with READMEs explaining what replaced them.
