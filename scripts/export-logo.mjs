// Export the /f visualization as a square PNG logo: unit box + the F
// polyline (seed 0.362 + 0.953i) — no ring, no glyph, no axes.
//
// Geometry matches the page: the plane scale is the page's min(w/3.6, h/2.35)
// at the 1440×900 reference viewport, and the canvas is sized from it so the
// drawing lines up with the live page. Stroke weight does not — the export
// uses ONE stroke-to-image ratio across every size (logo + favicons) so the
// mark reads at the same boldness everywhere. And unlike the page — which
// layers a dimmer box under a brighter polyline — the export draws the whole
// mark in ONE mint tone via a single stroked path, so where the polyline
// crosses the box the coverage is unioned, not alpha-stacked: overlaps stay
// that flat color instead of darkening into a denser square.
//
// Also emits favicons (same composition and stroke ratio, alpha boosted so
// the thinner small marks stay legible at tab size) into public/.
import { chromium } from "playwright";

const SPAN = 1.0;                                  // half-extent shown — box (±1) is 0-margin, edge to edge
const PAGE_SCALE = Math.min(1440 / 3.6, 900 / 2.35); // page px per unit
const SIZE = Math.round(2 * SPAN * PAGE_SCALE);      // → 766
const outDir = process.env.OUT ?? "src/assets";
const faviconDir = process.env.FAVICON_OUT ?? "public";

const html = `<!doctype html><html><body style="margin:0">
<canvas id="logo" width="${SIZE}" height="${SIZE}"></canvas>
<script>
const F_RE = 0.362, F_IM = 0.953;
const MINT = "176,222,240";
const SPAN = ${SPAN};

// Powers of the seed by repeated squaring — first 4 strokes only
// (the F itself, without the fly-off tail).
const pts = [[F_RE, F_IM]];
{
	let zR = F_RE, zI = F_IM;
	for (let i = 0; i < 4; i++) {
		const nR = zR * zR - zI * zI;
		zI = 2 * zR * zI;
		zR = nR;
		pts.push([zR, zI]);
	}
}

// m: { line, alpha } — one mint tone for the whole mark. The box and the F
// polyline share a single path stroked once, so overlaps are unioned into
// one flat color rather than compositing two translucent strokes into a
// darker square. Lines only — the export draws no orbit points.
function draw(size, withBg, m) {
	const canvas = document.getElementById("logo");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, size, size);
	if (withBg) {
		ctx.fillStyle = "#0a0a0a";
		ctx.fillRect(0, 0, size, size);
	}
	const s = size / (2 * SPAN);
	const cx = size / 2, cy = size / 2;

	// Box + F polyline as ONE path, stroked once. 0-margin box: inset by half
	// the stroke so the full line width stays visible while it hugs the edge.
	const inset = m.line / 2;
	ctx.strokeStyle = "rgba(" + MINT + "," + m.alpha + ")";
	ctx.lineWidth = m.line;
	ctx.beginPath();
	ctx.rect(cx - s + inset, cy - s + inset, 2 * (s - inset), 2 * (s - inset));
	pts.forEach(([re, im], i) => {
		const x = cx + re * s, y = cy - im * s;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});
	ctx.stroke();
}

// Unified stroke weight: ONE stroke-to-image ratio for every export, anchored
// on the 180px apple-touch icon at 4px, so the mark reads at the same boldness
// at any size. Floored at 2px so the 64px favicon stays visible where the
// proportional stroke drops sub-2px. One alpha per mark keeps box + F a single
// flat color.
const STROKE_RATIO = 4 / 180;                // apple-touch 180px → 4px; ≈17px on the 766 logo
const strokeFor = (size) => Math.max(2, size * STROKE_RATIO);
const LOGO_METRICS = { line: strokeFor(${SIZE}), alpha: 0.55 };
// Favicons share the ratio; alpha boosted so the thinner small marks stay legible.
const faviconMetrics = (size) => ({
	line: strokeFor(size),
	alpha: 0.85,
});

window.drawLogo = (withBg) => draw(${SIZE}, withBg, LOGO_METRICS);
window.drawFavicon = (size) => draw(size, true, faviconMetrics(size));
window.drawLogo(true);
</script></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
await page.setContent(html);
const canvas = page.locator("#logo");
await canvas.screenshot({ path: `${outDir}/logo_f_box.png` });
await page.evaluate(() => window.drawLogo(false));
await canvas.screenshot({ path: `${outDir}/logo_f_box_transparent.png`, omitBackground: true });
await page.evaluate(() => window.drawFavicon(64));
await canvas.screenshot({ path: `${faviconDir}/favicon.png` });
await page.evaluate(() => window.drawFavicon(180));
await canvas.screenshot({ path: `${faviconDir}/apple-touch-icon.png` });
await browser.close();
console.log(`exported ${SIZE}x${SIZE} logos → ${outDir}, favicons (64, 180) → ${faviconDir}`);
