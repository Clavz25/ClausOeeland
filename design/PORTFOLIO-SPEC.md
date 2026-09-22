# Claus Øeland — Portfolio Hub · Design Spec

Handoff for building the real site from the design canvas
(https://claude.ai/code/artifact/706105b6-99d1-4c8c-a7e0-70095f3fbb6c).
Vocabulary follows `CONTEXT.md`: **Hub** (this page) → **Card** → **Case Study**.

Source of truth for markup: `design/template.html` (built into `Main.dc.html` /
`Mobile.dc.html` by `design/build.py`). Everything below is lifted from there.

---

## 1. Direction

- Reference: `ref/Claus Landingpage.fig` — the LandingPage frame plus the
  mood board (industrial spec-sheet / cartridge-label aesthetic: thin rules,
  mono microcopy, index numerals, big square-cap arrows, flat colour blocks).
- Applied with restraint: warm off-white paper, 1px black rules, one bold
  condensed display face, mono labels. No gradients, no emoji, no rounded cards.
- Copy language: English.

## 2. Tokens

```css
:root {
  --paper:     #fcf8f5;   /* page background */
  --ink:       #111111;   /* text, rules */
  --ink-2:     #4a4745;   /* secondary text */
  --muted:     #8f8d8b;   /* labels, placeholders */
  --line:      #c5c2c0;
  --line-soft: #e6e1dc;   /* chart gridlines, legend divider */

  /* palette from the Figma "colors" group */
  --green:  #5a9480;      /* card 01 background */
  --red:    #d53f30;      /* card 03 background, accent */
  --cyan:   #16b1cf;
  --orange: #e38727;
  --gray:   #969696;

  --display: "Tabular", "Archivo Narrow", "Arial Narrow", sans-serif;
  --mono:    "Spline Sans Mono", "IBM Plex Mono", Menlo, monospace;
  --index:   "Punc", "Spline Sans Mono", monospace;
}
```

Accent is a single variable (`--red` by default). The canvas exposes it as a
tweak with options red / cyan / green / orange; it only drives card 03 and
hover states.

## 3. Typography

| Role | Face | Weight | Size / line-height | Tracking |
|---|---|---|---|---|
| Name line 1 ("CLAUS") | Tabular | 700 | 72px / .95 | -.01em |
| Name line 2 ("ØELAND") | Tabular | 700 | 168px / .88 | -.02em |
| Case title | Tabular | 700 | 128px / .88 | -.02em |
| Main finding | Tabular | 700 | 40px / 1.05 | -.01em |
| Card title | Tabular | 700 | 44px / .95 | -.01em |
| Tagline / case intro | Tabular | 400 | 22px / 1.3 | — |
| Body | Tabular | 400 | 15–17px / 1.5 | — |
| Takeaway heading | Tabular | 700 | 20px / 1.15 | — |
| Meta number | Tabular | 700 | 32px / 1.1 | — |
| `.label` | Spline Sans Mono | 400 | 11px, uppercase | .08em |
| `.btn` | Spline Sans Mono | 400 | 12px, uppercase | .08em |
| `.idx` (01, 02, "CASE 01 / 03") | Punc | 400 | 14px | .04em |
| Services list | Spline Sans Mono | 400 | 13px / 1.9 | — |

Font files (already on this Mac, embed with `@font-face`):
`~/Library/Fonts/Tabular-Bold.otf`, `Tabular-Regular.otf`, `punc-regular.otf`.
Spline Sans Mono is on Google Fonts:
`https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:wght@400;500&display=swap`

Mobile (≤760px): ØELAND 96px/.9, CLAUS 44px, case title 72px, cards stack,
services list one column, side padding 20px.

## 4. Layout — Hub (1440 desktop)

Page padding 48px horizontal. Every section separated by a 1px `--ink` rule.

1. **Top bar** — `padding: 18px 48px`, flex space-between.
   - Left: scrolling ticker (40s linear loop, duplicated string):
     `BRANDING | MARKETING STRATEGY | DESIGN | DATA ANALYSIS | DEVELOPMENT |`
   - Right: `email: clausnich@gmail.com` (mailto) · `tlf: 23676950`
2. **Hero** — grid `1.4fr 1fr`, gap 48px, `padding: 56px 48px 40px`, items
   aligned to bottom.
   - Left: CLAUS / ØELAND / tagline *"Designing with creativity and
     statistical data"* (max-width 520px, margin-top 22px).
   - Right: "What I do" block, top rule, label + `SERIES 01 / 07`, then a
     two-column mono list:
     `01 MVP development · 02 Go-to-market development · 03 Marketing analytics ·
     04 Branding dev / strategy · 05 Marketing strategy · 06 Social marketing · 07 SEO`
3. **Section header** — "Selected work" / "Click a card to open the case".
4. **Cards** — grid `repeat(3, 1fr)`, gap 20px, `padding: 20px 48px 48px`.
5. **Footer** — "© 2026 Claus Øeland · Denmark", five 12px colour squares
   (red, cyan, green, orange, gray), "Get in touch ↗" button (mailto).

### Card anatomy (min-height 520px, padding 20px, flex column space-between)

```
[ 01 ]                       [ ROLE LABEL ]
          (image / dashed image frame)
TITLE (44px)
One-sentence description (15px)
────────────────────────────────────────
CASE 01                                ↗
```

| Card | Background | Ink | Image |
|---|---|---|---|
| 01 PAXINOX | `--green` #5a9480 | `--paper` | `paxinox-spray.webp`, absolute right, 46% width, drop-shadow |
| 02 slot | `--paper`, 1px `--ink` border | `--ink` | dashed `[IMAGE .PNG]` frame, fills remaining height |
| 03 slot | `--accent` (#d53f30) | `--paper` | dashed frame, paper at 60% |

Hover (350ms `cubic-bezier(.2,.8,.2,1)`): card `translateY(-8px)` + shadow
`0 30px 50px -30px rgba(17,17,17,.45)`; image `scale(1.04)`; arrow
`translate(6px,-6px)`. Whole card is the click target; min hit target 44px.

Arrow icon (inline SVG, 24 grid, stroke 2, square caps):
`<path d="M6 18 18 6M8 6h10v10"/>`. Back arrow: `M18 12H6M12 6l-6 6 6 6`.
Forward: `M6 12h12M12 6l6 6-6 6`.

## 5. Layout — Case Study (shared template)

1. **Top bar** — "← Index" (borderless button) · `CASE 0n / 03` in Punc.
2. **Case head** — grid `1.4fr 1fr`, `padding: 48px 48px 32px`, bottom rule.
   - Left: role label · title (128px) · intro (22px, max 560px).
   - Right: 2×2 **meta grid** with 1px internal rules — two number cells
     (label / 32px number / unit), "My role", "Tools".
3. **Body** — `padding: 40px 48px`, gap 32px:
   - "Main finding" label in `--red` + 40px statement (+ paragraph).
   - Hero panel (chart, or dashed `[HERO IMAGE .PNG]` frame, min-height 360px).
   - **Takeaways** — 3 columns, each `border-top: 2px --ink`, Punc index,
     20px heading, 15px body.
4. **Footer** — previous / next case buttons; last case returns to index.

## 6. Content — Case 01 · PAXINOX

- **Role label:** Data analysis · Branding visuals · 2026
- **Title:** PAXINOX
- **Intro:** A new anti-snoring nasal spray went through a user test. I turned
  22 questionnaires into one honest answer for the product team.
- **Meta:** Sample **22** test persons · Questions **9** Likert-scale items ·
  My role: Survey analysis, charting, written report, product & audience
  visuals · Tools: Python (pandas, matplotlib), Excel, Photoshop
- **Main finding:** The product is well tolerated — but the test does not
  document an effect on snoring.
- **Paragraph:** The decisive question is the one where snoring was judged
  from outside — by a partner or a recording. There, 81% see no or only a
  slight change, and not a single participant reports a big one.
  Participants' own experience is a touch more positive, which points to
  self-report bias rather than a real effect.
- **Takeaways:**
  1. *Outside view beats self-report* — Partners saw less change than
     participants felt. When the external measure is the weaker one, the
     honest reading is bias, not effect. The 52% "moderate" middle should not
     be counted as a partial win.
  2. *Two questions, one contradiction* — 82% report no side effects, yet 45%
     feel noticeable discomfort using the spray. The questions don't measure
     the same thing — and that friction is what makes people quit a daily
     product.
  3. *What the next test needs* — A baseline measurement and a control group
     before any effect claim; a reworded discomfort question; and a taste
     that is more than "acceptable" — 0% called it very pleasant.

### Chart data (diverging stacked bars, % of answers, centred on neutral)

| Question | n | Clearly neg | Slightly neg | Neutral | Slightly pos | Clearly pos |
|---|---|---|---|---|---|---|
| Self-reported snoring reduction | 21 | 10 | 14 | 52 | 19 | 5 |
| Partner's / recording's assessment | 21 | 24 | 57 | 0 | 19 | 0 |
| Side effects (none = positive) | 22 | 18 | 0 | 0 | 0 | 82 |
| Discomfort during use | 22 | 14 | 32 | 18 | 32 | 5 |
| Would continue using it | 22 | 27 | 9 | 18 | 27 | 18 |
| Would recommend to others | 22 | 23 | 0 | 36 | 0 | 41 |

Series colours (same as the PAXINOX dashboard):
`#a82a29 · #e9605d · #d3d5de · #6da7ec · #1c5cab`. Bars 26px tall, 2px gaps
between segments, direct labels on segments ≥ 8%, gridlines at ±50/±100 in
`--line-soft`, zero line in `--ink`, legend row below. Source data:
`Claudetraining/claudedataanalysis/PAXINOX - analyse af surveyresultater.md`.

## 7. Content — Cases 02 and 03 (templates)

Fill these in; every `[bracket]` is a placeholder, nothing is invented.

```
Card:     [PROJECT 0n] · [YOUR ROLE] · [One sentence on what the project was
          and what you achieved.] · image: [IMAGE .PNG]
Head:     [YOUR ROLE] · [YEAR] · [Two sentences: what the client or product
          needed, and what you did about it.]
Meta:     [Metric] [00] [unit] ×2 · My role: [What you owned] · Tools: [Stack]
Finding:  [The one-line outcome a hiring manager should remember.]
Hero:     [HERO IMAGE .PNG — screenshot, chart or visual]
Takeaways: [Challenge] / [Approach] / [Outcome — with a number if you have one]
```

## 8. Behaviour / prototype

- Single-page state machine: `hub | pax | slot2 | slot3`. Card click →
  case; Index / prev / next buttons move between views; scroll to top on
  change. Enter animation: 700ms fade + 14px rise.
- For the real Hub (per `CONTEXT.md`) each Card links out to its Showcase
  deployment instead — keep the same card markup, swap the click handler for
  an `<a>`.

## 8b. Mobile (as built in `claus-oeland-site`)

Breakpoint 760px (`--breakpoint-md: 47.5rem`); everything below it is the phone
layout, and 390px is the width every change is checked at.

- Side padding 20px (48px only from 1024px up; 40px in the 760–1024 band).
- Top bar stacks: services list wraps with its rules, contacts below. The two
  contact links get 36px padded hit areas and a 6px gap so they can't be
  mistapped for each other.
- Hero: CLAUS `clamp(40px, 11vw, 72px)`, ØELAND `clamp(76px, 24vw, 120px)`
  (≈43 / 94px at 390px), tagline `clamp(16px, 4.4vw, 20px)`, "Email me" runs
  full width at 48px tall. Fold perspective 600px.
- Cards stack one per row, gap 16px, still square, no parallax offset.
- **Case Study opens under its own Card**, not below the whole row — one column
  means the panel is per-Card (accordion), and the tapped Card scrolls to the
  top of the viewport. No connector corner cut-outs, since there is no
  neighbouring Card to cut into.
- Case panel: padding 20px, meta row wraps, headline `clamp(32px, 8.5vw, 48px)`,
  body 15px. The step tile drops to 48px and sits on the label line so the copy
  keeps the full width. Metrics are a 2-column grid; an odd last cell spans both
  so the 1px rules don't leave a hole. Collapse button 48px, full width.
- `prefers-reduced-motion`: entrances land instantly and the scroll fold is
  disabled — the page is complete at rest.

## 9. Assets

- `design/paxinox-spray.webp` — 360×640, transparent, from the Figma
  (`paxinox_v02_hero01`). Larger originals: Figma export, and
  `~/Desktop/paxinox_AIR_v01_couple_wAlpha.png`,
  `~/Desktop/PaxinoxTargetAudience01.jpg` for branding visuals.
- Fonts: see §3.
