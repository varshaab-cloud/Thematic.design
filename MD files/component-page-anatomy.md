# Component page anatomy

Every component doc page follows this structure, in this order. All sections are consistent across all 48 components.

---

## H1 — Component name

One line. Matches the import exactly — no tagline, no ambiguity between doc and code.

> e.g. `MessageBubble`

---

## Live canvas — all variants

A rendered Canvas showing the canonical "all variants" story. Gives the reader an immediate visual reference before reading anything.

```mdx
<Canvas of={Stories.AllVariants} withToolbar={false} />
```

---

## Description

2–3 sentences. What the component is, what it renders, what the consumer's responsibility is. Written for engineers, not designers. Plain prose, no bullets.

---

## Variants

One paragraph per variant. Name in bold, role described, visual distinction explained. No canvas per variant unless behaviour differs meaningfully — not just appearance.

> e.g. `assistant` · `user` · `system`

---

## States

Each non-default state gets its own live canvas and a 1–2 line explanation covering what triggers the state and what changes visually.

```mdx
<Canvas of={Stories.AssistantStreaming} withToolbar={false} />
```

> States to cover: streaming · error · edited · loading

---

## Composition

What the component renders internally, which props wire external dependencies, and what the consumer owns. Prevents surprises during implementation.

> e.g. Avatar internals · fallback props · internal defaults

---

## Accessibility *(mandatory on every component)*

Required ARIA roles and attributes, keyboard behaviour, screen reader announcements, and developer responsibilities. This section exists on every component without exception.

Key areas to cover:
- ARIA roles and live region behaviour
- Keyboard interaction model
- Focus management
- Colour contrast requirements
- Developer responsibilities

---

## Playground

An interactive Controls panel wired to the Playground story. Lets the reader adjust props and see the component respond without leaving the doc page.

```mdx
<Controls of={Stories.Playground} />
```
