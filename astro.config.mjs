// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	output: "static",
	redirects: {
		"/": "/themes/fractal-may2026/",
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
