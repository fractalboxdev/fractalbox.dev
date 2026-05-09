---
title: ForbesPredict powered by Axiom
logoSrc: src/assets/logo_forbes_predict.png
role: Fractional CTO/CISO
order: 1
featured: true
problem: "Led the development and launch of ForbesPredict with harness engineering, fully agentic and rapid iteration cycles, ensuring strict regulatory compliance at scale for forbes.com's 140M+ monthly active users."
stack:
  - Effect-ts
  - Kafka
  - AWS
  - Cloudflare Workers, DO & Queues
---

## Summary

ForbesPredict by Axiom is a gamified prediction market launched on Forbes.com which reaches more than 140 million people per month. The brief was twofold: ship the product through fully agentic workflows with rapid iteration cycles, and meet the regulatory bar required to operate at that scale.

Engagement was as **Fractional CTO/CISO** — leading both the development trajectory and the security/compliance posture, so the two never traded off against each other.

## Approach

- **Harness engineering** — owned the architecture and built guardrails into the agentic workflow itself: spec-driven development, automated code review, and continuous gap analysis. The harness lets a lean team move on tight iteration cycles without trading off correctness.
- **Secure & Compliance-by-design** — security and privacy built in from day one. Authentication, encryption, access control, and audit trails designed against the threat model the category demands; complex country-based regulations such as GDPR & CCPA shape data flow, retention, and consent.
- **Operate at scale** — runtime architecture sized for the forbes.com audience: event streaming through Kafka, edge logic on Cloudflare Workers + Durable Objects + Queues, persistent backend on AWS, business logic written in Effect-TS for predictable error and concurrency semantics.
