# Claus Øeland — portfolio landing page

Personal site for Claus Øeland (designer → strategist → CMO). Objective: a client-acquisition page that shows what he does for new products. Structure: services bar, name lockup, tagline + Email me, three project cards that unfold into a full case (Problem → What was done → Results).

## Files
- `Claus Oeland - Landing.dc.html` — the live design (source of truth). Edit this one.
- `claus-oeland-site/` — React 18 + Vite + Tailwind v4 export of the same design. Keep in sync when the design changes; content in `src/data/cases.js`.
- `Landing A/B*.dc.html` — early rejected directions. Do not develop further.
- `uploads/` — user references: `LandingPage.jpg` (layout frame), `LandingPageUnfold.jpg` (unfold behavior), `ref.jpg` (style moodboard), PAXINOX style guide PDF, portfolio-tips PDF.

## Visual rules (from the user's frames)
- Background `#F8F6F2`, ink `#1E1E1E`, card teal `#4E9E87`, card red `#DE3E2D`. Card 2 is outlined (ink border, paper fill).
- Type: IBM Plex Mono for everything; Barlow Condensed for the name (CLAUS weight 300, ØELAND weight 900) and case headlines (800). Stand-ins for the Figma fonts until the user names the real ones.
- Style reference ("ref"): techno/industrial spec-sheet look — small uppercase mono labels, index numbers (01/03), thin rules, arrows ↗ ↑, tag chips, metric cells. Keep it restrained; no gradients.
- Cards: 3-up, square, 14px radius, always in one row.

## Interaction rules
- Unfold: clicked card drops its bottom radius, a connector grows down, and a full-width panel opens below the row (grid-template-rows 0fr → 1fr) with concave corners joining the card. Pushes the page down; never overlays other cards. One open at a time; "Collapse ↑" closes.
- Scroll motion: CLAUS compresses/skews into ØELAND, ØELAND tilts back (rotateX); smoothed follower, GSAP-scrub feel. Tweaks: `scrollEffects`, `scrollIntensity` (user prefers ~2).
- Primary CTA is "Email me" (mailto:clausnich@gmail.com). No contact form.

## Content
- Case 1 PAXINOX (NYX Medico, 2022–2024, DK/SE/NO) is real; keep the card's bullet list verbatim. Its metrics are placeholders.
- Cases 2 and 3 are placeholders based on PAXINOX until the user supplies them.
- Wanted asset: transparent bottle PNG to overflow the card top as in the frame.

## Working style
- User is concise; answer briefly. Ask before adding sections.
- Small change requests → targeted edits only.
