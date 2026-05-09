// Build-time fractal SVG generators. All run in Astro frontmatter, no client JS.

type P = [number, number];

/* -------------------------------------------------------------------------- */
/* Sierpinski triangle                                                        */
/* -------------------------------------------------------------------------- */

export function sierpinski(depth: number, a: P, b: P, c: P): P[][] {
	if (depth === 0) return [[a, b, c]];
	const m = (p: P, q: P): P => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
	const ab = m(a, b), bc = m(b, c), ca = m(c, a);
	return [
		...sierpinski(depth - 1, a, ab, ca),
		...sierpinski(depth - 1, ab, b, bc),
		...sierpinski(depth - 1, ca, bc, c),
	];
}

export function sierpinskiPolygons(depth: number, size = 100, cx = 0, cy = 0) {
	const h = (size * Math.sqrt(3)) / 2;
	const a: P = [cx, cy - (h * 2) / 3];
	const b: P = [cx + size / 2, cy + h / 3];
	const c: P = [cx - size / 2, cy + h / 3];
	return sierpinski(depth, a, b, c).map(
		(t) => t.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" "),
	);
}

/* -------------------------------------------------------------------------- */
/* Koch snowflake (closed) and Koch line                                      */
/* -------------------------------------------------------------------------- */

function kochSegment(a: P, b: P, depth: number): P[] {
	if (depth === 0) return [a];
	const dx = b[0] - a[0], dy = b[1] - a[1];
	const p1: P = [a[0] + dx / 3, a[1] + dy / 3];
	const p3: P = [a[0] + (2 * dx) / 3, a[1] + (2 * dy) / 3];
	const ex = p3[0] - p1[0], ey = p3[1] - p1[1];
	const cos = Math.cos(-Math.PI / 3), sin = Math.sin(-Math.PI / 3);
	const p2: P = [p1[0] + ex * cos - ey * sin, p1[1] + ex * sin + ey * cos];
	return [
		...kochSegment(a, p1, depth - 1),
		...kochSegment(p1, p2, depth - 1),
		...kochSegment(p2, p3, depth - 1),
		...kochSegment(p3, b, depth - 1),
	];
}

export function kochSnowflakePath(depth: number, size = 200, cx = 0, cy = 0): string {
	const r = size / 2;
	const tri: P[] = [
		[cx, cy - r],
		[cx + (r * Math.sqrt(3)) / 2, cy + r / 2],
		[cx - (r * Math.sqrt(3)) / 2, cy + r / 2],
	];
	const all: P[] = [];
	for (let i = 0; i < tri.length; i++) {
		all.push(...kochSegment(tri[i], tri[(i + 1) % tri.length], depth));
	}
	all.push(tri[0]);
	return "M" + all.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" L") + " Z";
}

export function kochLinePath(depth: number, length = 600, cx = 0, cy = 0): string {
	const a: P = [cx - length / 2, cy];
	const b: P = [cx + length / 2, cy];
	const pts = kochSegment(a, b, depth);
	pts.push(b);
	return "M" + pts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" L");
}

/* -------------------------------------------------------------------------- */
/* L-system binary tree                                                       */
/* -------------------------------------------------------------------------- */

export function lSystemTree(
	depth: number,
	len = 60,
	angle = 22,
	startX = 0,
	startY = 0,
	startAngle = 0,
	shrink = 0.72,
): string {
	const segs: string[] = [];
	function branch(x: number, y: number, ang: number, length: number, d: number) {
		if (d === 0 || length < 0.5) return;
		const rad = (ang * Math.PI) / 180;
		const x2 = x + length * Math.sin(rad);
		const y2 = y - length * Math.cos(rad);
		segs.push(`M${x.toFixed(2)},${y.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`);
		const nl = length * shrink;
		branch(x2, y2, ang - angle, nl, d - 1);
		branch(x2, y2, ang + angle, nl, d - 1);
	}
	branch(startX, startY, startAngle, len, depth);
	return segs.join(" ");
}

/* -------------------------------------------------------------------------- */
/* Mandelbrot — main cardioid + period-2 bulb (analytic boundary)             */
/* -------------------------------------------------------------------------- */

// Cardioid boundary: c = e^{iθ}/2 - e^{2iθ}/4
export function mandelbrotCardioidPath(scale = 100, cx = 0, cy = 0, samples = 360): string {
	const pts: string[] = [];
	for (let i = 0; i <= samples; i++) {
		const t = (i / samples) * 2 * Math.PI;
		const re = Math.cos(t) / 2 - Math.cos(2 * t) / 4 - 0.25; // shift so cusp at origin
		const im = Math.sin(t) / 2 - Math.sin(2 * t) / 4;
		pts.push(`${(cx + re * scale).toFixed(2)},${(cy + im * scale).toFixed(2)}`);
	}
	return "M" + pts.join(" L") + " Z";
}

// Period-2 bulb: circle of radius 0.25 centered at -1
export function mandelbrotBulbPath(scale = 100, cx = 0, cy = 0): string {
	const r = 0.25 * scale;
	const center = cx + (-1 - (-0.25)) * scale; // shift to match cardioid offset
	return `M${(center - r).toFixed(2)},${cy.toFixed(2)} a${r},${r} 0 1,0 ${(r * 2).toFixed(2)},0 a${r},${r} 0 1,0 ${(-r * 2).toFixed(2)},0 Z`;
}

/* -------------------------------------------------------------------------- */
/* Golden / logarithmic spiral                                                */
/* -------------------------------------------------------------------------- */

export function goldenSpiralPath(turns = 4, startSize = 1.5, samples = 400): string {
	const phi = 1.6180339887;
	const b = Math.log(phi) / (Math.PI / 2);
	const total = turns * 2 * Math.PI;
	const pts: string[] = [];
	for (let i = 0; i <= samples; i++) {
		const t = (i / samples) * total;
		const r = startSize * Math.exp(b * t);
		pts.push(`${(r * Math.cos(t)).toFixed(2)},${(r * Math.sin(t)).toFixed(2)}`);
	}
	return "M" + pts.join(" L");
}

/* -------------------------------------------------------------------------- */
/* Pythagoras tree (squares + nested)                                         */
/* -------------------------------------------------------------------------- */

export function pythagorasTree(depth: number, size = 100, x = 0, y = 0): string[] {
	const rects: string[] = [];
	function rec(d: number, x1: number, y1: number, x2: number, y2: number) {
		if (d === 0) return;
		const dx = x2 - x1, dy = y2 - y1;
		// square above the segment
		const x3 = x2 - dy, y3 = y2 + dx;
		const x4 = x1 - dy, y4 = y1 + dx;
		rects.push(
			`${x1.toFixed(2)},${y1.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)} ${x3.toFixed(2)},${y3.toFixed(2)} ${x4.toFixed(2)},${y4.toFixed(2)}`,
		);
		// next segments — left branch and right branch (45° split for classical tree)
		const mx = (x4 + x3) / 2, my = (y4 + y3) / 2;
		rec(d - 1, x4, y4, mx, my);
		rec(d - 1, mx, my, x3, y3);
	}
	// initial square: from (x, y) to (x+size, y); y axis flipped (SVG)
	rec(depth, x, y, x + size, y);
	return rects;
}
