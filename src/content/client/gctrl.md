---
title: GCtrl
order: 5
featured: true
problem: "Local-first multi-agent orchestration mission control system"
role: "Lead Developer"
stack:
  - Rust
  - Electron
  - Effect-ts
  - Cloudflare Worker
---

## Summary

Ground Control (Gctrl) is an open source, mission-control system for multi-agent workflows — a local-first desktop application that gives operators a single surface to drive multiple AI agents across providers, sync their state for team collaboration, and observe what each run actually did. A Cloudflare-backed sync layer turns the same vault into shared substrate for the team without giving up the local-first guarantee.


## Approach

- **Provider Agnoistic** — Support Claude Code, Codex, Hermes Agent are supported 
- **Local-first** — File-first by design. Vault is sync with R2 for team collaborations. Run both cloud and local LLM for work.
- **Agent-first** — Agents are first-class citizen. Kanban enable human to provide context and handle handoffs across agents. Otel-based analytics and evals are built-in for harness engineering
