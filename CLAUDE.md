# Portfolio Hub

Claus Øeland's Hub. Read [CONTEXT.md](CONTEXT.md) for the vocabulary — Hub,
Showcase, Case Study, Card — and use those words in code, commits and prose.

The visitor is a hiring manager who opened this link between two meetings,
probably on a phone, and gives it about eight seconds.

## The bar: flabbergast

Those eight seconds have to end with the visitor wanting to show someone else.
That is the bar every change is measured against, and it is met by **one
orchestrated moment**, not by decoration spread thin. Name the moment before
building it — the ØELAND type resolving, a Card opening into its Case Study —
then spend the motion, weight and restraint budget there and let the rest of
the page stay quiet enough to make it land.

Craft is the other half, and it is the half that gets noticed on the second
look: optical alignment, a type scale that holds, transitions that share one
easing, nothing shifting as fonts load.

Flabbergast means precision, not intensity. Gradient washes, glassmorphism,
emoji, generic drop shadows, tacked-on parallax and rounded-corner cards with a
coloured left border are what every AI-built portfolio already looks like —
they read as generated, which is the opposite of the goal. Draw from the mood
board in `ref/`: industrial spec-sheet, hairline rules, mono microcopy,
index numerals, flat colour blocks, big square-cap arrows.

## Stack

React, GSAP, plain CSS. Vite. No Tailwind, no CSS-in-JS, no component library,
no second animation library — GSAP does every animation on this site.

Reach for a dependency only when it does something the three above cannot, and
say why in the commit.

## Motion

GSAP lives in React through `useGSAP` from `@gsap/react`:

- Always pass `{ scope: containerRef }` so selector text stays inside the
  component.
- Animations created inside event handlers go through `contextSafe()`, or they
  survive unmount.
- Register plugins once at module level: `gsap.registerPlugin(ScrollTrigger, useGSAP)`.
- After a layout change, `ScrollTrigger.refresh()` — debounced on resize.

One easing vocabulary across the site (`power3.out` for entrances, `power2.inOut`
for state changes) and durations in the 0.3–0.9s range; a timeline that
orchestrates several elements beats several tweens that happen to overlap.

Honour `prefers-reduced-motion`: keep the arrival, drop the travel. Content is
readable at rest — animate opacity and transform on elements that are already
in the DOM, so a visitor who scrolls fast never meets an empty screen.

## CSS

Tokens as custom properties on `:root`, in one stylesheet. Layout is flex and
grid with `gap`. Fonts are the local `.otf` files named in the design spec,
self-hosted with `@font-face` and `font-display: swap`; Spline Sans Mono comes
from Google Fonts.

Phone layout is the one that has to be right, because that is where the link
gets opened. Check every change at 390px before calling it done.

## Design source of truth

[design/PORTFOLIO-SPEC.md](design/PORTFOLIO-SPEC.md) holds the tokens, type
scale, layouts, spacing and the finished copy. `design/template.html` is the
working prototype those values came from. Take exact values from the spec
rather than re-deriving them, and when a build decision changes one, update the
spec in the same commit.

## Content

Every number on this site is a real one. PAXINOX's figures trace back to
`../Claudetraining/claudedataanalysis/`. For work that has no numbers yet,
ship the `[BRACKETED PLACEHOLDER]` — a hiring manager who catches one invented
metric stops believing the rest of the page.

## Verify

`npm run build` passes, and the change is checked in a browser at 390px and
1440px, with the moment it touches actually watched, before it is called done.
