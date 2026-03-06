# CLAUDE.md — SGA Honey Campaign V2 (Next.js)

## Project Overview
- **Client:** Daugherty & Honey SGA Campaign — Belmont University
- **Tagline:** "Make It Golden"
- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion
- **Original:** V1 lives at `../sga-honey-revamp/` (plain HTML, deployed on Vercel)
- **Repo:** https://github.com/abdul49656/sga-honey-campaign

## Brand
- **Fonts:** Cormorant Garamond (display), DM Sans (body), Figtree (UI)
- **Colors:**
  - Gold primary: `#FDCE00`
  - Gold hover: `#E8BD00`
  - Gold pale: `#FFF9D6`
  - Dark: `#1A1814`
  - Cream: `#FDFBF7`
  - Text primary: `#1A1A1A`
- **Logo:** "D&H" text with gold star

## Architecture
- `src/app/` — layout + single page (all sections composed)
- `src/components/sections/` — Hero, Marquee, Stats, Candidates, Platform, Campus, CTA, GetInvolved
- `src/components/layout/` — Navbar, Footer
- `src/components/ui/` — Eyebrow, GrainOverlay, MagneticButton, ScrollReveal, SectionHeading, TextReveal
- `src/components/providers/` — SmoothScrollProvider (Lenis)
- `src/lib/utils.ts` — cn() helper (clsx + tailwind-merge)
- `public/campus/` — locally hosted Belmont campus images
- `public/hero-video.mp4` — hero background video

## Key Features
- Scroll-linked animations: sticky candidates section (200vh), horizontal platform scroll (300vh)
- Odometer-style stat counters
- Gold particle effects in hero
- Lenis smooth scroll
- SVG grain overlay for texture
- Contact form submits to Google Sheets via Apps Script
- Responsive: mobile-first with desktop scroll effects hidden on mobile

## Google Sheets Integration
- URL: `https://script.google.com/macros/s/AKfycbxT5KQsuLEFscY4drvf_FSMxHaOl3Ogs7p4q3f3NTKX9FoPhPY5LfzN19zTrWWy_E93og/exec`
- Fields: name, email, interest, message
- Method: POST with URLSearchParams, mode: no-cors

## Dev Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## Notes
- Campus images were downloaded from belmont.edu (hotlink protection) to `public/campus/`
- Navbar text color adapts: white on hero (transparent bg), dark when scrolled (cream bg)
- The `split-type` package is installed but not actively used (TextReveal uses custom impl)
