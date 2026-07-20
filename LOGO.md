# LOGO — the box

The logo is an export of the `/f` visualization ([src/pages/f.astro](src/pages/f.astro)):
the unit box plus the polyline that strokes an **F** — the powers
z₀, z₀², z₀⁴, z₀⁸ of the seed **z₀ = 0.363 + 0.965i** under repeated squaring
(a nudge off the 3:41 moment of Numberphile's [Mandelbrot video](https://www.youtube.com/watch?v=FFftmWSzgmk),
z₀ ≈ 0.362 + 0.953i — the exported mark tunes the seed for shape).

## Requirements

- **Square PNG.**
- **The box lines are 0-margin** — the box spans the full image edge to edge
  (plane half-extent 1.0), inset only by half its stroke so the full line width
  stays visible. Polyline points overflowing the box are clipped — accepted.
- **First 4 line strokes only** (z₀ → z₀¹⁶): the F itself, without the fly-off tail.
- **Without the circle** — no lock ring, no F glyph, no coordinate label, no axes.
- **Lines only — no points.** The export draws no orbit points; the page keeps its.
- **One stroke weight across every export**: a single stroke-to-image ratio,
  anchored on the 180px apple-touch icon at **4.5px** (`STROKE_RATIO = 4.5/180` →
  **≈19px** on the 766 logo, floored at 2px), so the mark reads at the same
  boldness whether it's the full logo or a 64px favicon.
  This is heavier than the page's own strokes and intentionally does not track
  them — the reference plane scale `min(1440/3.6, 900/2.35) ≈ 382.98 px/unit`
  sets the **766×766** canvas geometry, but stroke weight is the export's own.
  (The page itself draws strokes and points *proportional to its plane scale* —
  2.6px / 4px at the reference scale — and backs its canvas at
  `devicePixelRatio`, so its look is viewport-invariant and crisp.)
- **Single mint tone, no overlap darkening** — unlike the page, which layers a
  dimmer box (α 0.4) under a brighter polyline (α 0.55), the export draws the
  box and the F as **one stroked path in a single alpha (0.85)** — the
  favicon/apple-touch brightness, applied to the full logo too so it doesn't
  read dim. A lone `stroke()` unions its own coverage, so where the polyline
  crosses the box the overlap stays that flat color instead of compositing two
  translucent strokes into a denser square. Holds for the dark-bg and
  transparent variants alike.
- **Mint ink** (`rgba(176, 222, 240)` at α 0.85 — the same mint phosphor as the
  live visualization), on `#0a0a0a` plus a transparent-background variant.

## Favicon

The logo is also the site favicon. Same composition, single-tone treatment,
stroke ratio, and ink alpha (0.85); strokes therefore scale with the icon size
(floored at 2px) so the mark stays legible at tab size; always on the dark
background.

- [public/favicon.png](public/favicon.png) — 64×64, linked as `rel="icon"`
- [public/apple-touch-icon.png](public/apple-touch-icon.png) — 180×180, linked as `rel="apple-touch-icon"`

Both are referenced from the site layout ([src/layouts/FractalMay2026.astro](src/layouts/FractalMay2026.astro))
and the standalone `/f` head.

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
