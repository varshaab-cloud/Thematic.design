# Thematic Design System

A design system for enterprise and healthcare products

---

Thematic is a design system designed for complex, information-rich applications where accuracy, consistency, and efficiency matter. It provides a shared language for designers, engineers, and AI-assisted workflows to build interfaces that remain clear and predictable as products evolve.

The system is shaped by the realities of professional software: dense information, multi-step workflows, regulatory requirements, and users who rely on the interface for extended periods of focused work. Every component, pattern, and guideline exists to reduce cognitive overhead and support confident decision-making.

---

## Design principles

**Hierarchy before decoration**
Visual hierarchy should communicate structure before aesthetics. Typography, spacing, alignment, and layout establish priority and guide attention. Emphasis is used intentionally, ensuring primary actions remain clear while secondary functionality is revealed through progressive disclosure.

**Information density with clarity**
Enterprise and healthcare workflows require access to meaningful information without unnecessary navigation. Components are designed to support data-rich experiences while maintaining scanability, readability, and clear relationships between content.

**Consistency builds trust**
Users should not need to relearn interactions from screen to screen. Common patterns, behaviours, terminology, and visual cues are applied consistently across the system, allowing attention to remain on the task rather than the interface.

**Accessible by default**
Accessibility is a foundational requirement, not an enhancement. Components are designed and tested with keyboard navigation, assistive technologies, semantic structure, and contrast requirements in mind from the outset.

**Systems over exceptions**
Design decisions are made systematically rather than individually. Shared foundations govern spacing, typography, colour, motion, and interaction behaviour, creating a cohesive experience that can scale across products and teams.

---

## Visual language

The visual language prioritises clarity over expression.

Colour is used sparingly and purposefully. A single anchor colour identifies primary actions, active states, and key moments of emphasis, while neutral surfaces and controls carry the majority of the interface. This creates a predictable visual rhythm and makes important actions easier to locate.

Feedback states communicate meaning without competing for attention. Success, warning, error, and loading states provide clear guidance while remaining proportional to the situation they represent. The goal is to inform action, not create urgency.

---

## Documentation as a product

Thematic documentation is maintained as a source of truth for both people and AI systems.

For designers and engineers, documentation explains intent, usage, constraints, accessibility considerations, and implementation guidance. The objective is not only to describe components, but to explain the reasoning behind them so teams can make consistent decisions in new situations.

For AI-assisted workflows, documentation is structured and maintained to provide sufficient context for interface generation and implementation tasks. Component relationships, recommended usage patterns, states, variants, and constraints are documented in a way that can be interpreted by both humans and AI models. As the system evolves, the documentation evolves with it, ensuring generated output reflects the current system rather than outdated patterns.

---

## Using Thematic

The system is organised into a small set of layers.

**Foundations** define the core principles, tokens, accessibility standards, and visual language.

**Components** provide reusable building blocks with documented behaviour and implementation guidance.

**Patterns** describe how components work together to support common workflows.

**Templates** demonstrate complete page structures and application layouts built from established patterns.

Start with the problem you are solving, then work downward from patterns to components and foundations. The system is designed to help teams make fewer decisions, not more.
