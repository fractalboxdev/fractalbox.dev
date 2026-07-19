// Export the /f visualization as a square PNG logo: unit box + the F
// polyline (seed 0.362 + 0.953i) — no ring, no glyph, no axes.
//
// Metrics match the page exactly: the plane scale is the page's
// min(w/3.6, h/2.35) at the 1440×900 reference viewport, lines are 2.6px,
// points 4px, with the page's stroke alphas (box 0.4, line 0.55,
// points 0.95). The canvas is sized from the scale so the drawing is
// pixel-identical to the live page.
//
// Also emits favicons (same composition, size-relative strokes and
// boosted alphas so the mark stays legible at tab size) into public/.
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
const AMBER = "240,214,143";
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

// m: { line, dot, alphaBox, alphaLine, alphaDot } — logo uses the page's
// exact metrics; favicons scale them up for tab-size legibility.
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

	// 0-margin box: inset by half the stroke so the full line width stays
	// visible while the box hugs the image edge.
	ctx.strokeStyle = "rgba(" + AMBER + "," + m.alphaBox + ")";
	ctx.lineWidth = m.line;
	const inset = m.line / 2;
	ctx.strokeRect(cx - s + inset, cy - s + inset, 2 * (s - inset), 2 * (s - inset));

	ctx.strokeStyle = "rgba(" + AMBER + "," + m.alphaLine + ")";
	ctx.lineWidth = m.line;
	ctx.beginPath();
	pts.forEach(([re, im], i) => {
		const x = cx + re * s, y = cy - im * s;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});
	ctx.stroke();

	ctx.fillStyle = "rgba(" + AMBER + "," + m.alphaDot + ")";
	pts.forEach(([re, im]) => {
		ctx.fillRect(cx + re * s - m.dot / 2, cy - im * s - m.dot / 2, m.dot, m.dot);
	});
}

// Page-exact metrics: 2.6px strokes, 4px points, page alphas.
const LOGO_METRICS = { line: 2.6, dot: 4, alphaBox: 0.4, alphaLine: 0.55, alphaDot: 0.95 };
// Favicon metrics: strokes/points scale with size, alphas boosted.
const faviconMetrics = (size) => ({
	line: Math.max(2, size * 0.035),
	dot: Math.max(3, size * 0.06),
	alphaBox: 0.7, alphaLine: 0.85, alphaDot: 1,
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
