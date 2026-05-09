# Website Revamp Spec — fractal.box

## 1. Context

`fractal.box` is the public website for **FractalBox**, a boutique development studio offering **fractional CTO / CISO services** and shipping **local-first, privacy-preserving, compliance-aware, secure-by-design** software.

The current site (Astro + Tailwind v4, deployed on Cloudflare) is a single-page landing with a Julia-set background and a stack of "box" sections (Intro, CTO/CISO, Team, Contact). Copy is strong; visual identity, IA, and conversion paths are not.

This spec defines a revamp that lifts the site to match the studio's positioning: **professional, modern, technical, innovative, secure** — with **fractal geometry** as the guiding visual motif.

Stack stays the same: **Astro 5 + Tailwind v4 + Cloudflare Pages**. No SPA framework, no CMS migration. Content collections (`src/content/**`) remain the source of truth.

## 2. Goals & Non-Goals

### Goals

1. Communicate the studio's three pillars within 5 seconds of landing: **fractional leadership**, **secure-by-design engineering**, **local-first / privacy / compliance**.
2. Establish a distinctive visual identity rooted in fractal geometry (Julia, Mandelbrot, L-systems, Sierpinski, golden spiral) — used **with restraint**, as a signature, not as decoration.
3. Provide clear, scannable proof: client logos, case studies, team credentials, public-goods / OSS work.
4. Convert qualified visitors (founders, heads of platform, CISOs, VCs) into a discovery call or email.
5. Stay fast: Lighthouse Performance ≥ 95 on mobile, no client-side JS for hero animation by default (CSS / SVG / static canvas snapshot first).

### Non-Goals

- No blog redesign in this pass (existing `/blog` route stays; styling inherits the new design system).
- No CMS / headless backend.
- No i18n in this pass (English only).
- No interactive WebGL fractal explorer (deferred — see §10 future work).

## 3. Audience & Jobs-To-Be-Done

| Persona | What they came for | What we want them to do |
|---|---|---|
| Founder / CEO of a Series A–B startup | "Can these people own my tech / security without me hiring a full-time CTO yet?" | Book a discovery call |
| Head of Platform / VP Eng | "Do they actually ship secure, compliant systems, or just write decks?" | Read a case study, then email |
| CISO / Compliance lead | "Do they understand SOC2 / ISO27001 / data residency / local-first constraints?" | Read the secure-by-design page, request audit |
| VC / portfolio operator | "Could I refer them to portfolio companies?" | Skim team + clients, save the link |
| Engineer evaluating us | "Is this team technical enough for me to want to work with?" | View GitHub, blog, OSS contributions |

## 4. Information Architecture

Single primary route stays `/` but is restructured into clear sections with anchored navigation. New routes are additive.

```
/
├── #intro        — Hero + one-line positioning + primary CTA
├── #services     — Fractional CTO, Fractional CISO, Secure-by-Design Engineering
├── #approach     — Local-first, privacy, compliance, secure-by-design (the differentiator)
├── #work         — Client logos + 2–3 featured case studies
├── #team         — Founders + signature credentials
├── #writing      — Latest from /blog + selected OSS/public-goods work
└── #contact      — Email + Calendly/Cal.com embed + office address

/blog              — existing
/blog/[slug]       — existing
/work/[slug]       — NEW, optional, one page per case study (sourced from src/content/client/)
/services/cto      — NEW, deep-dive landing for fractional CTO engagement
/services/ciso     — NEW, deep-dive landing for fractional CISO engagement
/approach          — NEW, the secure-by-design / local-first manifesto page
```

Sticky top nav with anchor links on `/`; converts to a hamburger on mobile. Footer carries the legal entity, Singapore office address, and social links.

## 5. Visual Language — Fractal Geometry as Identity

The motif is **fractals as structure**, not fractals as wallpaper. Pick a small, deliberate vocabulary and use it consistently.

### 5.1 Motif vocabulary

| Element | Where it shows up | Why |
|---|---|---|
| **Mandelbrot / Julia set** (existing `JuliaBackground.astro`) | Hero only, dimmed and desaturated, never behind body copy | Signature mark — recognisable, mathematical, "we go deep" |
| **Sierpinski triangle** | Section dividers, loading states, favicon/logo lockup | Self-similarity = "the same rigour at every scale of engagement" |
| **Golden spiral / Fibonacci grid** | Layout grid for case-study hero images | Already alluded to (`GoldenSpiral.astro`); ties to the package name `golden-landing` |
| **L-system / branching trees** | Service / approach diagrams (org structure, threat model trees, data lineage) | Visualises decomposition — natural fit for CTO/CISO mental models |
| **Koch snowflake edge** | Subtle horizontal rules between major sections | Replaces flat `<hr>` with a fractal edge — once is enough |

**Restraint rules:**
- One fractal motif per viewport at most.
- Fractal art never sits behind body text — only behind hero or in dedicated illustration cards.
- All fractal SVGs ship as static assets (or CSS gradients); no per-frame compute on first paint.

### 5.2 Color

Dark-mode-first, with a precise light mode. The palette signals **technical + secure** without being a generic "cybersecurity dark blue" cliché.

| Token | Dark | Light | Use |
|---|---|---|---|
| `bg.base` | `#0B0D10` (near-black, slight green tint) | `#FAFAF7` (warm off-white) | Page background |
| `bg.elevated` | `#13171C` | `#FFFFFF` | Cards, boxes |
| `fg.primary` | `#E8ECEF` | `#0B0D10` | Body text |
| `fg.muted` | `#8A95A1` | `#5C6772` | Secondary text |
| `accent.fractal` | `#7FE3C4` (mint / phosphor) | `#0E8A6B` | Links, fractal stroke |
| `accent.warn` | `#E5B567` (warm amber) | `#9A6E1F` | Highlights, metrics |
| `border.subtle` | `#1F2429` | `#E5E5E0` | Dividers |

The mint `accent.fractal` is the only saturated color. It echoes phosphor terminals and oscilloscope traces — "technical, deliberate, alive."

### 5.3 Typography

- **Display / headings:** a geometric sans with strong character — `Geist` or `Inter Display`, weight 600, tight tracking. Used sparingly.
- **Body:** `Inter` 400/500, 17px base on desktop, 16px on mobile, line-height 1.6.
- **Mono:** `JetBrains Mono` or `Geist Mono` — used for metrics, code, and "technical proof" elements (commit hashes, CVE IDs, certifications).
- All fonts self-hosted via `@fontsource` to keep the site fully static and avoid third-party requests (consistent with the privacy stance).

### 5.4 Motion

- Hero fractal: a single, slow zoom (~30s loop) rendered to a pre-baked WebM/MP4 or animated SVG; no live shader on first paint.
- Section reveals: 200ms fade + 8px translate, `prefers-reduced-motion` respected.
- No parallax, no scroll-jacking, no entrance animations on body copy.

## 6. Page-by-Page

### 6.1 Hero (`#intro`)

- Full-viewport, dark.
- Background: dimmed Julia/Mandelbrot animation behind a left-aligned text block.
- H1: **"Fractional CTO & CISO for teams that ship secure, private, local-first software."**
- Sub: one sentence — "A boutique studio of ex-founders and tech leads from Animoca, PALO IT, and hyper-growth startups. 50+ projects since 2018."
- Primary CTA: **"Get in touch"** → `mailto:v@fractalbox.dev`.
- Secondary CTA: **"See our work"** → `#work`.
- Trust strip below the fold: 6–8 client logos in a single muted row.

### 6.2 Services (`#services`, plus `/services/cto`, `/services/ciso`)

Three cards in a row on desktop, stacked on mobile:

1. **Fractional CTO** — own architecture, hiring, and delivery for pre–Series B teams without the full-time hire.
2. **Fractional CISO** — own security posture, audits, incident response, SOC2 / ISO27001 readiness.
3. **Secure-by-Design Engineering** — embed with your team to ship the hard parts: identity, payments, agentic systems, data privacy.

Each card has: icon (L-system branch SVG, color-shifted per service), 1-line value prop, 3 bullets, "How an engagement works" link to its `/services/*` page.

### 6.3 Approach (`#approach`, plus `/approach`)

This is the **differentiating page** — the manifesto. Long-form on `/approach`, summary on `/`.

Four pillars, each with a fractal-tree diagram showing decomposition:

1. **Local-first** — data lives with the user, sync is an optimisation, not the source of truth. Why we default to CRDTs, on-device encryption, and offline-capable UX.
2. **Privacy-preserving** — minimum data collected, minimum data retained, end-to-end where it matters. Threat models include the operator.
3. **Compliance-aware** — SOC2, ISO27001, GDPR, MAS TRM, HIPAA where relevant. Designed in from day one, not retrofitted.
4. **Secure-by-design** — STRIDE + abuse-case modelling at design time; supply-chain pinning, SBOMs, signed releases, audited dependencies.

Each pillar closes with a **concrete artifact**: a sample threat model, a CRDT pattern, an SBOM workflow, a SOC2 readiness checklist. These are real public-goods deliverables, not marketing — authored as markdown under `specs/approach/` in this repo and rendered into `/approach`.

### 6.4 Work (`#work`, plus `/work/[slug]`)

- Logo grid (existing clients in `src/content/client/` — Animoca, BTSE, Filecoin, Mocaverse, Mozilla, Spaceship, etc.).
- 2–3 featured case studies as cards: problem → approach → outcome → metric. Each card links to a `/work/[slug]` page sourced from `src/content/client/*.md` (extend frontmatter to support featured-case content).
- Each case study page includes: one fractal-grid hero image, a "system at a glance" diagram, and a quote.

### 6.5 Team (`#team`)

- Founders and core members as cards: photo, name, role, 1-line credential, links (LinkedIn, GitHub).
- Signature credentials line: "CKA · CKAD · ETHGlobal Finalist x3 · ex-Animoca / PALO IT / Mon Studio".
- Sourced from `src/content/team/`.

### 6.6 Writing (`#writing`)

- Latest 3 posts from `/blog`.
- A second column for **public-goods / OSS**: GitHub org link, notable repos, and any grants / hackathon wins.

### 6.7 Contact (`#contact`)

- Plain `mailto:v@fractalbox.dev` as the single primary action — no third-party scheduler embed (consistent with the privacy stance; see §9).
- Office address: 7 Temasek Boulevard, #12-07, Suntec Tower One, Singapore 038987.
- Legal entity line: "PeraPera Private Limited (Singapore)".
- Social row: GitHub, LinkedIn, X.

## 7. Component Inventory

New / reworked Astro components under `src/components/`:

| Component | Replaces | Notes |
|---|---|---|
| `SiteNav.astro` | (none) | Sticky, anchor-driven, mobile drawer |
| `Hero.astro` | `Welcome.astro` | New layout + CTA + trust strip |
| `FractalBackground.astro` | `JuliaBackground.astro` | Pre-baked video / SVG, reduced-motion aware |
| `ServiceCard.astro` | (new) | Used in `#services` |
| `PillarCard.astro` | (new) | Used in `#approach`, includes L-system SVG |
| `CaseStudyCard.astro` | `ClientProfile.astro` (rework) | Logo grid + featured cases |
| `TeamMember.astro` | `Member.astro` (rework) | Aligned with new typography |
| `WritingList.astro` | (new) | Latest blog + OSS column |
| `ContactBlock.astro` | (footer in `index.astro`) | mailto CTA, address, socials |
| `FractalDivider.astro` | (new) | Koch-edge SVG horizontal rule |

Retire: `Boxes.astro`, `LandingBoxes.astro`, `SocialBox.astro`, `TeamBox.astro` (merge their content into the new components).

## 8. Content Model Changes

`src/content/config.ts` gains:

- `services` collection: one entry per service (`cto.md`, `ciso.md`, `engineering.md`) with frontmatter for title, summary, bullets, engagement model, FAQ.
- `client` collection extended: `featured: boolean`, `metric: string`, `metricLabel: string`, `logo: image`, `summary: string`, `body: markdown` (full case study).
- `landing` collection: keep `intro.md`, `ctociso.md`, `team.md`; add `approach.md` for the manifesto section.

All copy edits stay in markdown frontmatter — no hardcoded strings in `.astro` files for headlines, metrics, or CTAs.

## 9. Performance, Accessibility, Privacy Budget

- **Performance:** Lighthouse mobile ≥ 95 on Performance / Accessibility / Best Practices / SEO. LCP < 1.8s on simulated 4G. No client JS for hero on first paint.
- **A11y:** WCAG 2.2 AA. All fractal art has `aria-hidden="true"` and a text-only fallback path. `prefers-reduced-motion` disables hero animation. Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text.
- **Privacy budget (we eat our own dog food):**
  - No Google Fonts, no Google Analytics, no Hotjar.
  - Self-hosted analytics (Plausible self-hosted on Cloudflare, or none at all in v1).
  - No third-party trackers, no third-party iframes. Contact is a plain `mailto:` link.
  - CSP header that disallows inline scripts (Astro's static output already aligns).
  - All images self-hosted, served from Cloudflare.

## 10. Out of Scope / Future Work

- Interactive WebGL fractal explorer on `/approach` (Mandelbrot zoom with shareable URLs).
- `/playground` — public threat-model templates and CRDT demos as runnable artifacts.
- i18n (likely JP and zh-Hant given client geography).
- Switch from Cloudflare Pages to Cloudflare Workers static if we add edge-rendered case-study pages.

## 11. Milestones

| # | Milestone | Definition of done |
|---|---|---|
| M1 | Design tokens + nav + hero | New `tailwind.config` tokens, `SiteNav`, `Hero`, `FractalBackground` shipped to a `revamp` preview branch on Cloudflare Pages |
| M2 | Services + Approach sections | `#services` + `#approach` render from content collections; `/services/cto`, `/services/ciso`, `/approach` pages live |
| M3 | Work + Team + Writing | Client case studies migrated; `/work/[slug]` route; team and writing sections live |
| M4 | Contact + Polish + Launch | Cal.com embed, Lighthouse ≥ 95, a11y audit clean, replace production |

Each milestone ships behind a preview URL; production cutover happens at M4.

## 12. Resolved Decisions

1. **No scheduler embed** — contact is a plain `mailto:v@fractalbox.dev`. Skipping Cal.com keeps the site free of third-party iframes and consistent with the privacy stance.
2. **Keep the existing logo** (`src/assets/logo_fractal_box.png`). No new mark; the fractal identity is carried by the hero motif, dividers, and pillar diagrams.
3. **Approach artifacts live in this repo under `specs/approach/`** — one markdown file per artifact (threat-model template, CRDT pattern, SBOM workflow, SOC2 readiness checklist). The `/approach` page renders them via Astro content collections.

## 13. Open Questions

1. Do we want a public OSS / public-goods page now, or fold it into `#writing`?

---

## 14. Iteration · Fractal IFS Background (May 2026 update)

This section supersedes parts of §4 and §5 for the production layout.

### 14.1 Multi-page hub at `/themes/fractal-may2026/*`

The site is structured as **six routes**, each assigned an iteration index `i ∈ {0..5}`. Each route is the same studio brief surveyed at a deeper level of detail — services elaborate the overview, approach elaborates the services, etc. Same shape, every scale.

| `i` | Route                                           | Page label  | Focus                                  |
|-----|--------------------------------------------------|-------------|----------------------------------------|
| 0   | `/themes/fractal-may2026/`                       | OVERVIEW    | Hero, all sections in summary          |
| 1   | `/themes/fractal-may2026/services`               | SERVICES    | Three engagement branches in depth     |
| 2   | `/themes/fractal-may2026/approach`               | APPROACH    | Four-pillar manifesto, concrete artefacts |
| 3   | `/themes/fractal-may2026/work`                   | WORK        | Trust register + case studies in depth |
| 4   | `/themes/fractal-may2026/team`                   | TEAM        | Operators of record + writing          |
| 5   | `/themes/fractal-may2026/contact`                | CONTACT     | Open the channel; attractor closer     |

Root `/` issues a static redirect to `i=0`.

### 14.2 IFS Background

Every page renders a **Sierpinski IFS attractor** as a fixed, full-viewport background image (component `src/components/IFSBackground.astro`). The component:

- Takes a single prop `iter` (the route's `i`).
- Renders the IFS at depth `i` — `3^i` triangles. Stroke width thins with depth so deeper iterations feel denser, not heavier.
- Uses `position: fixed; z-index: 0; pointer-events: none; mix-blend-mode: screen` — it never occupies layout space and can't intercept input.
- Reacts to cursor position via the CSS custom properties exposed by `CursorReactor`:
  - `translate3d(calc(var(--mlx) * -18px), calc(var(--mly) * -18px), 0)` — gentle parallax opposite the cursor.
  - `rotate(calc(var(--mr) * 0.10))` — dampened rotation toward cursor angle.
  - `scale(calc(1 + var(--md) * 0.025))` — faint breathe based on distance from centre.

The IFS is the **box decoration**: a literal Iterated Function System attractor, drawn at the route's iteration depth, reacting to the cursor in realtime. As the visitor navigates, the same attractor subdivides further — visualising "same shape, deeper iteration."

### 14.3 Layout shell

`src/layouts/FractalMay2026.astro` provides:

- `IFSBackground` (z-index 0)
- HUD frame with corner brackets + math-notation readouts (`λ`, `φ`, `ƒ`, `∂(secure-by-design) ≡ 0`)
- Sticky nav with 6-entry sub-nav, active link highlighted, iteration chip `i = N` next to the page tag
- `FractalVeil` for view-transitions and `CursorReactor` for cursor → CSS-variable bridge
- A unified arrival cascade: every direct child of `.page-body` fades up in stagger; bordered grid cells (`.card-grid > *`, `.bordered-grid > *`, `.logo-cell`) pop in cell-by-cell after their containing section settles. The whole page assembles top-to-bottom on every navigation.

### 14.4 Page transitions

Astro `<ClientRouter />` drives soft navigation. The transition reads as a *helical zoom into the next iteration*:

- Old page: `scale 1 → 1.32`, `rotate 0° → 3°`, `blur 0 → 2px`, fade out — 380ms
- New page: `scale 0.84 → 1`, `rotate −3° → 0`, `blur 3px → 0`, three-keyframe fade-in (early settle at 35%) — 520ms with a 60ms delay so it appears almost immediately while the old is still fading
- Total wall-clock: 580ms · heavy crossfade (60–380ms is both layers visible simultaneously)
- Same `cubic-bezier(0.4, 0, 0.2, 1)` on both halves so the motion reads as one continuous arc
- A faint Sierpinski lattice (`FractalVeil`) flashes underneath, rotating clockwise to match — soft sweep, never strobe
- All transitions respect `prefers-reduced-motion: reduce`

### 14.5 Cursor reactivity (no visible cursor element)

`src/components/CursorReactor.astro` listens to `mousemove` and writes these custom properties on `:root`:

| Property | Range            | Use                                                         |
|----------|------------------|-------------------------------------------------------------|
| `--mx`   | `-1..1`          | Normalised X from viewport centre                            |
| `--my`   | `-1..1`          | Normalised Y from viewport centre                            |
| `--mlx`  | `-1..1` (lerped) | Slow-following X, for parallax of background-depth elements  |
| `--mly`  | `-1..1` (lerped) | Slow-following Y                                             |
| `--mr`   | degrees          | Angle from centre — used for rotation                        |
| `--md`   | `0..1`           | Distance from centre — used for breathe / glow intensity     |
| `--cx`   | px               | Raw `clientX` — used to position cursor-pinned bloom         |
| `--cy`   | px               | Raw `clientY`                                                |

Theme-side CSS reads these to drive every reactive element (IFS background, cardioid console rotation, HUD parallax, page bloom). There is **no DOM element following the cursor** — only realtime variables.

### 14.6 Box-counting dimension annotations

Every page declares `dim_B ≈ 1.585` next to the iteration chip (Sierpinski's box-counting dimension is `log 3 / log 2`). The annotation is rendered by `src/components/BoxDimChip.astro` which is itself a tiny boxed pill — the chip declaring the box dimension *is itself* a box.

### 14.7 Brand line

Recurs across every page (defined in `src/data/spec.ts`):

> **Out-of-the-box thinking. Hack-the-box rigour. Same reflex, applied at every scale.**

"Box" reads two ways simultaneously: *think out of the box* (creative posture) and *hack the box* (security / pen-test reflex). The fractal claim ties them: that reflex applied recursively, at every iteration depth.

### 14.8 Stack

- Astro 5 with `output: "static"` (no adapter — pure HTML deploy)
- Tailwind v4 via Vite plugin
- View Transitions API via `<ClientRouter />`
- All fractal SVGs computed at build time in `src/data/fractals.ts`
- All animations CSS-only; cursor lerping is the only client JS, ~1KB
