// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	output: "static",
	vite: {
		plugins: [tailwindcss()],
		server: {
			// Allow access via Tailscale MagicDNS hosts when the dev server is
			// exposed with `tailscale serve`.
			allowedHosts: [".ts.net"],
		},
	},
});
