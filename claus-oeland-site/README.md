# Claus Øeland — portfolio landing page

React 18 + Vite + Tailwind CSS v4. No other runtime dependencies.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
index.html                 fonts (Barlow Condensed, IBM Plex Mono) + root
public/paxinox-pack.jpg    case image (swap for a cut-out bottle PNG)
src/
  index.css                Tailwind import, theme tokens (colors, fonts, keyframes)
  App.jsx                  page composition, wires scroll progress into Hero + Projects
  hooks/useScrollProgress.js   smoothed 0..1 scroll progress across the hero
  data/cases.js            all case copy, colours, metrics — edit content here
  components/
    Header.jsx             service list + contact
    Hero.jsx               name lockup with scroll "fold" effect, tagline, Email me
    Projects.jsx           3-up card grid + accordion state + full-width panel
    ProjectCard.jsx        square card + connector with concave corners
    CasePanel.jsx          unfolded case: header row, headline, problem / done / results, metrics, collapse
```

## Theme tokens (src/index.css)

- paper `#F8F6F2`, ink `#1E1E1E`, teal `#4E9E87`, red `#DE3E2D`
- `font-mono` IBM Plex Mono · `font-display` Barlow Condensed (300 / 800 / 900)
- Utilities: `animate-rise-in`, `animate-fade-up`

## Behaviour

- Click a card → it loses its bottom radius, a connector grows down, and the panel below expands (grid-template-rows 0fr → 1fr) pushing the page down. Only one card open at a time. Collapse ↑ folds it back.
- Scroll: CLAUS compresses/skews down, ØELAND tilts back (rotateX) — driven by `progress` from `useScrollProgress`. Tune the multipliers in Hero.jsx; cards get a light parallax in Projects.jsx.

## To do

- Replace placeholder copy for proj 2 / proj 3 and the PAXINOX metrics in `src/data/cases.js`.
- Provide a transparent bottle PNG to overflow the card top as in the Figma frame.
- Responsive: grid is fixed at 3 columns; add `md:` breakpoints if you want a single column on mobile.
