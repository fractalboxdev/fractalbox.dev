// Export the /f visualization as a square PNG logo: unit box + the F
// polyline (seed 0.362 + 0.953i) — no ring, no glyph, no axes.
//
// Metrics match the page exactly: the plane scale is the page's
// min(w/3.6, h/2.35) at the 1440×900 reference viewport, lines are 1px,
// points 4px, with the page's stroke alphas (box 0.4, line 0.55,
// points 0.95). The canvas is sized from the scale so the drawing is
// pixel-identical to the live page.
import { chromium } from "playwright";

const SPAN = 1.25;                                 // half-extent shown — box (±1) = 80% of the image
const PAGE_SCALE = Math.min(1440 / 3.6, 900 / 2.35); // page px per unit
const SIZE = Math.round(2 * SPAN * PAGE_SCALE);      // → 1226
const outDir = process.env.OUT ?? "src/assets";

const html = `<!doctype html><html><body style="margin:0">
<canvas id="logo" width="${SIZE}" height="${SIZE}"></canvas>
<script>
const SIZE = ${SIZE};
const F_RE = 0.362, F_IM = 0.953;
const AMBER = "240,214,143";

function draw(withBg) {
	const ctx = document.getElementById("logo").getContext("2d");
	ctx.clearRect(0, 0, SIZE, SIZE);
	if (withBg) {
		ctx.fillStyle = "#0a0a0a";
		ctx.fillRect(0, 0, SIZE, SIZE);
	}
	const s = ${PAGE_SCALE};
	const cx = SIZE / 2, cy = SIZE / 2;

	// Unit box — page metrics: 1px stroke, alpha 0.4
	ctx.strokeStyle = "rgba(" + AMBER + ",0.4)";
	ctx.lineWidth = 1;
	ctx.strokeRect(cx - s, cy - s, 2 * s, 2 * s);

	// Powers of the seed by repeated squaring — first 4 strokes only
	// (the F itself, without the fly-off tail).
	const pts = [[F_RE, F_IM]];
	let zR = F_RE, zI = F_IM;
	for (let i = 0; i < 4; i++) {
		const nR = zR * zR - zI * zI;
		zI = 2 * zR * zI;
		zR = nR;
		pts.push([zR, zI]);
	}
	// Polyline — page metrics: 1px stroke, alpha 0.55
	ctx.strokeStyle = "rgba(" + AMBER + ",0.55)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	pts.forEach(([re, im], i) => {
		const x = cx + re * s, y = cy - im * s;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});
	ctx.stroke();
	// Points — page metrics: 4px squares, alpha 0.95
	ctx.fillStyle = "rgba(" + AMBER + ",0.95)";
	const d = 4;
	pts.forEach(([re, im]) => {
		ctx.fillRect(cx + re * s - d / 2, cy - im * s - d / 2, d, d);
	});
}
window.draw = draw;
draw(true);
</script></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
await page.setContent(html);
const canvas = page.locator("#logo");
await canvas.screenshot({ path: `${outDir}/logo_f_box.png` });
await page.evaluate(() => window.draw(false));
await canvas.screenshot({ path: `${outDir}/logo_f_box_transparent.png`, omitBackground: true });
await browser.close();
console.log(`exported ${SIZE}x${SIZE} logo_f_box.png + logo_f_box_transparent.png`);
