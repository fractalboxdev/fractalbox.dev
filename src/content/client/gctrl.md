---
title: GCtrl
order: 5
featured: true
problem: "Local-first multi-agent orchestrations mission control systems"
role: "Lead Developer"
stack:
  - Rust
  - Electron
  - Effect-ts
---

## Summary

Ground Control (Gctrl) is a mission control systems built to enable local-first multi agent orchestration.

## Approach

- **Harness engineering** — owned the architecture and built guardrails into the agentic workflow itself: spec-driven development, automated code review, and continuous gap analysis. The harness lets a lean team move on tight iteration cycles without trading off correctness.
- **Secure & Compliance-by-design** — security and privacy built in from day one. Authentication, encryption, access control, and audit trails designed against the threat model the category demands; complex country-based regulations such as GDPR & CCPA shape data flow, retention, and consent.
- **Operate at scale** — runtime architecture sized for the forbes.com audience: event streaming through Kafka, edge logic on Cloudflare Workers + Durable Objects + Queues, persistent backend on AWS, business logic written in Effect-TS for predictable error and concurrency semantics.
