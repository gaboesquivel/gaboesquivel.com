# 0004: Bounded motion for editorial explainers

Status: Proposed (2026-11-03).

## Context

[DESIGN.md](../../DESIGN.md) protects the site's identity with a restrained palette, mono type, real photography, flat surfaces and a small enumerated motion budget. That budget also prevents useful process diagrams from showing transfers and changing state. The user requested a more alive, elegant editorial experience and selected Animdiagram as the preferred visual reference. [Spec 002](../specs/002-editorial-explainers.md) bounds the first use to the Context Engineering article.

## Decision

Propose the following addition to DESIGN.md's motion budget and Motion & View Transitions section on acceptance:

> Authored editorial explainers may animate a transfer, state change or sequence when that movement explains the article's subject. Playback starts only on explicit reader action and exposes pause, next step, phase selection and reset. Every figure remains understandable when paused, with motion disabled, without JavaScript, and in print. This allowance is local to approved explainer figures; it does not authorize decorative, ambient, page-load or scroll-triggered animation elsewhere.

Keep all identity bans and the existing motion allowances. Use Animdiagram as a compositional reference, not permission for its glows, arrival rings or ambient streams. Prefer React/SVG and CSS with one native clock. Adding an animation/editor library remains outside this allowance.

On acceptance, update `docs/agents/motion.md` with the explainer's single-clock, lifecycle, reduced-motion and timing rules, and `docs/agents/content.md` plus `docs/agents/design/editorial-images.md` to permit a registered interactive article component owning its single figure, caption, static overview and text fallback. Static article SVGs remain valid. `/ai`, `/web3` and `/bio` remain diagram-free. Record the implemented scene/controller boundary in ARCHITECTURE.md when it exists.

## Alternatives considered

- Keep every diagram static: simplest, but cannot let a reader inspect the changing context in this use case.
- Relax the site's motion budget globally: grants unrelated decorative effects and weakens the editorial identity.
- Adopt an editor/runtime such as React Flow or DrawCMS: adds capabilities and dependency/license scope this figure does not need.
- Embed an automatically looping SVG: lightweight, but does not by itself meet step selection, precise pause/resume, text parity and lifecycle requirements.

## Rationale

The durable distinction is between identity constraints and interaction constraints. A bounded exception permits meaningful explanation while retaining the rules that prevent generic visual treatments. Original authored scenes, a static first view and reader control keep the effect accountable to comprehension.

## Consequences

An explainer must satisfy both the existing design checks and behavioral/accessibility review. It has an explicit state model, deterministic text equivalent and maintenance cost. A successful first figure does not automatically authorize other routes or GenUI catalog changes. Acceptance updates the owning policies in the same commit; this Proposed record alone changes no current policy.
