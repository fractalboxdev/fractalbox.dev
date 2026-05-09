import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		author: reference("author"),
	}),
});

const client = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/client" }),
	schema: z.object({
		title: z.string(),
		logoClass: z.string().optional(),
		logoSrc: z.string().optional(),
		order: z.number().optional(),
		featured: z.boolean().default(false),
		problem: z.string().optional(),
		outcome: z.string().optional(),
		metric: z.string().optional(),
		metricLabel: z.string().optional(),
		role: z.string().optional(),
		duration: z.string().optional(),
		stack: z.array(z.string()).optional(),
	}),
});

const teamCompany = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/team/company" }),
	schema: z.object({
		title: z.string(),
		logoClass: z.string(),
		logoSrc: z.string().optional(),
		order: z.number().optional(),
	}),
});

const services = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		lead: z.string(),
		bullets: z.array(z.string()),
		order: z.number(),
	}),
});

const pillars = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/pillars" }),
	schema: z.object({
		n: z.string(),
		name: z.string(),
		body: z.string(),
		concrete: z.string(),
		artifact: z.string(),
		standards: z.string(),
		order: z.number(),
	}),
});

const people = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/people" }),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		creds: z.string(),
		order: z.number(),
		avatar: z.string().optional(),
	}),
});

const writing = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
	schema: z.object({
		title: z.string(),
		href: z.string().optional(),
		order: z.number(),
	}),
});

const faq = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
	schema: z.object({
		q: z.string(),
		a: z.string(),
		order: z.number(),
	}),
});

const phases = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/phases" }),
	schema: z.object({
		k: z.string(),
		t: z.string(),
		d: z.string(),
		order: z.number(),
	}),
});

const site = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/site" }),
	schema: z.object({
		tagline: z.string(),
		subtagline: z.string(),
		boxLine: z.string(),
		email: z.string(),
		entity: z.string(),
		address: z.string(),
		socials: z.array(z.object({ label: z.string(), href: z.string() })),
	}),
});

export const collections = {
	blog,
	client,
	teamCompany,
	services,
	pillars,
	people,
	writing,
	faq,
	phases,
	site,
};
