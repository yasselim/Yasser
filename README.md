# Health & Labs Platform

Public, global, free web app for logging weight, diet, and lab results, with
plain-language test explanations and a rule-based diet plan generator.

This repository is being built in phases per the product spec.

**Phase 1 (Foundation):**

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Design token system (dark default, light optional) as CSS variables
- Sidebar information architecture (collapses to icon-only on tablet,
  bottom tab bar on mobile) with all top-level routes scaffolded
- i18n via `next-intl`: `en` (default) + `ar`, with automatic RTL layout
  switching

**Phase 2 (Core Tracker):**

- Email/password auth via Supabase (`sign-in` / `sign-up` / sign out)
- Daily Log: collapsible per-day accordion to log weight + diet notes
- Dashboard: animated progress ring (current → goal weight) and a weight
  trend chart (Recharts)
- Data layer: Prisma (`Profile`, `DailyLog`) against the Supabase Postgres
  database

## Getting started

1. Create a free project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env` and fill in the values from
   **Project Settings → API** (URL + anon key) and
   **Project Settings → Database** (pooled + direct connection strings).
3. Push the Prisma schema to your database:

   ```bash
   npm install
   npm run db:push
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

The app redirects `/` to `/en` (or `/ar` based on browser preference).
Sign up at `/en/sign-up`, then Daily Log and Dashboard become available.

## Deployment (Hostinger, Business/Cloud Node.js hosting)

The repo includes `server.js`, a minimal custom Node server for hosts that
run apps via Phusion Passenger (Hostinger's Node.js Selector) rather than
the Next.js CLI directly. In hPanel's Node.js app settings, set the
**Application startup file** to `server.js`, set the required environment
variables above, then run `npm install && npm run build` and restart the
app.

## Roadmap

See the full product spec for phases 3–5 (lab glossary + personal results,
diet plan generator, and public launch readiness).
