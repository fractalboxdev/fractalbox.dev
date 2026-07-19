# LOGO — the box

The logo is an export of the `/f` visualization ([src/pages/f.astro](src/pages/f.astro)):
the unit box plus the polyline that strokes an **F** — the powers
z₀, z₀², z₀⁴, z₀⁸ of the seed **z₀ = 0.362 + 0.953i** under repeated squaring
(the 3:41 moment of Numberphile's [Mandelbrot video](https://www.youtube.com/watch?v=FFftmWSzgmk)).

## Requirements

- **Square PNG.**
- **The box occupies 80% of the image** — plane half-extent 1.25, box spans ±1.
- **First 4 line strokes only** (z₀ → z₀¹⁶): the F itself, without the fly-off tail.
- **Without the circle** — no lock ring, no F glyph, no coordinate label, no axes.
- **Point size and line width follow the page exactly**: 1px strokes, 4×4px points
  (all points equal size), stroke alphas box 0.4 / polyline 0.55 / points 0.95,
  at the page's reference plane scale `min(1440/3.6, 900/2.35) ≈ 382.98 px/unit`
  → **957×957** canvas.
- **Amber ink** (`rgba(240, 214, 143)` — the page's found-the-F state), on
  `#0a0a0a` plus a transparent-background variant.

## Files

- [src/assets/logo_f_box.png](src/assets/logo_f_box.png) — dark background
- [src/assets/logo_f_box_transparent.png](src/assets/logo_f_box_transparent.png) — transparent

## Regenerate

```sh
npm i -D playwright   # once, if not present
node scripts/export-logo.mjs          # writes into src/assets/
OUT=/some/dir node scripts/export-logo.mjs
```

Any change to the seed, metrics, or palette on `/f` should be mirrored in
[scripts/export-logo.mjs](scripts/export-logo.mjs) and this document, then re-exported.
