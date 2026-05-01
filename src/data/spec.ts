export const tagline =
	"Fractional CTO & CISO for teams that ship secure, private, local-first software.";

export const subtagline =
	"A boutique studio of ex-founders and tech leads from Animoca, PALO IT, and hyper-growth startups. 50+ projects since 2018.";

/**
 * The brand line — recurs across every theme.
 * "Box" carries two reads simultaneously:
 *   1. think out of the box — the creative posture
 *   2. hack the box — the security posture (penetration testing, breaking constraints)
 * The fractal claim: the same out-of-box reflex applied recursively, at every scale.
 */
export const boxLine =
	"Out-of-the-box thinking. Hack-the-box rigour. Same reflex, applied at every scale.";

export const boxKicker =
	"FRACTAL.BOX · OUT OF THE BOX · HACK THE BOX · AT EVERY SCALE";

export const services = [
	{
		id: "cto",
		name: "Fractional CTO",
		lead: "Own architecture, hiring, and delivery for pre–Series B teams without the full-time hire.",
		bullets: [
			"Tech strategy + roadmap aligned to runway",
			"Hiring loop, eng ladder, code review culture",
			"Vendor + cloud architecture decisions",
		],
	},
	{
		id: "ciso",
		name: "Fractional CISO",
		lead: "Own security posture, audits, incident response, SOC2 / ISO27001 readiness.",
		bullets: [
			"SOC2 / ISO27001 / MAS TRM readiness",
			"Threat modelling, pentests, incident response",
			"Vendor risk + customer security questionnaires",
		],
	},
	{
		id: "engineering",
		name: "Secure-by-Design Engineering",
		lead: "Embed with your team to ship the hard parts: identity, payments, agentic systems, data privacy.",
		bullets: [
			"Identity, payments, key management",
			"Agentic systems with safe tool use",
			"CRDTs, on-device crypto, offline-first UX",
		],
	},
] as const;

export const pillars = [
	{
		n: "01",
		name: "Local-first",
		body: "Data lives with the user. Sync is an optimisation, not the source of truth. CRDTs, on-device encryption, offline-capable UX as defaults.",
	},
	{
		n: "02",
		name: "Privacy-preserving",
		body: "Minimum data collected, minimum data retained, end-to-end where it matters. Threat models include the operator.",
	},
	{
		n: "03",
		name: "Compliance-aware",
		body: "SOC2, ISO27001, GDPR, MAS TRM, HIPAA where relevant. Designed in from day one, not retrofitted.",
	},
	{
		n: "04",
		name: "Secure-by-design",
		body: "STRIDE + abuse-case modelling at design time. Supply-chain pinning, SBOMs, signed releases, audited dependencies.",
	},
] as const;

export const clients = [
	"Animoca",
	"BTSE",
	"Filecoin",
	"Mocaverse",
	"Mozilla",
	"Spaceship",
	"PALO IT",
	"ETHGlobal",
];

export const cases = [
	{
		client: "Mocaverse",
		problem: "Wallet-native identity for 4M+ holders without custodial lock-in.",
		outcome: "Self-custody auth flow shipped in 9 weeks; 0 incidents in 12 months.",
		metric: "0 incidents",
		metricLabel: "12 months post-launch",
	},
	{
		client: "BTSE",
		problem: "Threat-model and harden a multi-region exchange ahead of a regulated launch.",
		outcome: "STRIDE coverage + control library; passed third-party audit on first pass.",
		metric: "1st-pass audit",
		metricLabel: "third-party review",
	},
	{
		client: "Filecoin",
		problem: "Retrieval gateway with abuse-resistant rate limits + provider scoring.",
		outcome: "Open-source service handling >10M requests / day at p99 < 200ms.",
		metric: "10M req/day",
		metricLabel: "p99 < 200ms",
	},
] as const;

export const team = [
	{
		name: "Vincent",
		role: "Founder, Fractional CTO",
		creds: "ex-Animoca · CKA · CKAD · ETHGlobal Finalist x3",
	},
	{
		name: "Co-Lead",
		role: "Fractional CISO",
		creds: "ex-PALO IT · CISSP · ISO27001 LA",
	},
	{
		name: "Engineer",
		role: "Secure-by-Design",
		creds: "ex-Mon Studio · Rust · Effect-TS · CRDTs",
	},
];

export const writing = [
	"Threat-modelling agentic systems: a practitioner's STRIDE",
	"Local-first compliance: how CRDTs change your data-residency story",
	"Why we self-host fonts, analytics, and our coffee machine",
];

export const contact = {
	email: "v@fractalbox.dev",
	address: "7 Temasek Boulevard, #12-07, Suntec Tower One, Singapore 038987",
	entity: "PeraPera Private Limited (Singapore)",
	socials: [
		{ label: "GitHub", href: "https://github.com/fractaldotbox" },
		{ label: "LinkedIn", href: "https://linkedin.com/company/fractalbox" },
		{ label: "X", href: "https://x.com/fractaldotbox" },
	],
};

export const themes = [
	{
		slug: "phosphor",
		name: "Phosphor Terminal",
		blurb: "Near-black + mint phosphor. Geist + JetBrains Mono. The spec's default palette.",
	},
	{
		slug: "substrate",
		name: "Substrate",
		blurb: "Sierpinski lattice as the page itself. Graphite + bone + one phosphor pulse. Architectural, sparse, monumental.",
	},
	{
		slug: "fractal-may2026",
		name: "Fractal · May 2026",
		blurb: "Multi-page hub: phosphor terminal layout meets manuscript-grade typography. Each route is a deeper iteration; transitions carry you through.",
	},
	{
		slug: "studio-light",
		name: "Studio Light",
		blurb: "Warm-paper light mode. Deep teal · slate · burnt amber on cream. Reads like a printed engineering monograph.",
	},
] as const;
