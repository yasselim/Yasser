# Health & Labs Platform

Public, global, free web app for logging weight, diet, and lab results, with
plain-language test explanations and a rule-based diet plan generator.

This repository is being built in phases per the product spec. **Phase 1
(Foundation)** is implemented here:

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Design token system (dark default, light optional) as CSS variables
- Sidebar information architecture (collapses to icon-only on tablet,
  bottom tab bar on mobile) with all top-level routes scaffolded
- i18n via `next-intl`: `en` (default) + `ar`, with automatic RTL layout
  switching

## Getting started

```bash
npm install
npm run dev
```

The app redirects `/` to `/en` (or `/ar` based on browser preference).

## Roadmap

See the full product spec for phases 2–5 (core tracker, lab glossary +
personal results, diet plan generator, and public launch readiness).
