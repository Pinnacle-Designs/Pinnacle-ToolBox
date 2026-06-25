# Pinnacle Toolbox

Free online tools — fast, simple, no login required. A multi-tool utility site built with Next.js 14, TypeScript, and Tailwind CSS. All tools run fully client-side in the browser.

## Getting Started

```bash
cd toolkit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

- `app/` — Next.js App Router pages (homepage, tools, static pages)
- `app/tools/[slug]/` — 60 flat tool routes (e.g. `/tools/word-counter`)
- `components/` — Shared UI (Navbar, Footer, ToolLayout, AdSlot, etc.)
- `components/tools/` — Individual tool implementations
- `lib/tools.ts` — Master tools registry (single source of truth)
- `lib/seo.ts` — Metadata and JSON-LD helpers
- `lib/utils.ts` — Shared utility functions

## Features

- **60 free tools** across 8 categories
- **Client-side only** — no backend or database
- **SEO optimized** — unique metadata, sitemap, robots.txt, JSON-LD
- **Ad-ready** — placeholder `AdSlot` components for future monetization
- **Mobile responsive** — collapsible sidebar, mobile navigation

## Environment

Optional: set `NEXT_PUBLIC_SITE_URL` for canonical URLs in production (defaults to `https://pinnacletoolbox.com`).

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- lucide-react, jspdf, jszip, qrcode, jsbarcode, marked, date-fns, cron-parser, exifr, spark-md5
