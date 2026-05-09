// Box-counting (Minkowski–Bouligand) dimensions for every fractal we render.
// These are the *actual* mathematical values — labelling figures with these
// turns decoration into declaration: each fractal announces its own dimension.

export interface BoxDim {
  expr: string; // typeset expression: "log 3 / log 2 ≈ 1.585"
  short: string; // compact: "1.585"
  approx: number; // numeric: 1.585
  what: string; // friendly: "Sierpinski triangle"
}

export const BOX_DIMS: Record<string, BoxDim> = {
  sierpinski: {
    expr: "log 3 / log 2 ≈ 1.585",
    short: "1.585",
    approx: 1.585,
    what: "Sierpinski triangle",
  },
  koch: {
    expr: "log 4 / log 3 ≈ 1.262",
    short: "1.262",
    approx: 1.262,
    what: "Koch curve",
  },
  mandelbrot: {
    expr: "= 2  (Shishikura, 1991)",
    short: "2.000",
    approx: 2.0,
    what: "Mandelbrot boundary",
  },
  cantor: {
    expr: "log 2 / log 3 ≈ 0.631",
    short: "0.631",
    approx: 0.631,
    what: "Cantor set",
  },
  ltree: {
    expr: "≈ 1.620  (binary, ratio 0.7)",
    short: "1.620",
    approx: 1.62,
    what: "L-system tree",
  },
  spiral: {
    expr: "= 1  (rectifiable curve)",
    short: "1.000",
    approx: 1.0,
    what: "Logarithmic spiral",
  },
};

/**
 * The brand line. "Box" reads two ways at once:
 *   - "think out of the box"  — the creative posture
 *   - "hack the box"          — the security posture (pen-testing reflex)
 * The fractal claim: that out-of-box reflex applied recursively, at every scale.
 */
export const BOX_MOTTO = {
  short: "Out of the box · hack the box · at every scale",
  long: "Two ways past any box: think past it, or hack past it. We do both — at every scale.",
  mathy: "out_of_box(d) ⊂ out_of_box(d+1)  ·  the reflex is self-similar",
  studio: "out of the box",
};
