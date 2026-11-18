<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Work Log

### Navbar design (FixMate)

- [x] **Inspected the project setup** — Next.js 16 App Router, Tailwind CSS v4, shadcn (`base-nova` style, Base UI primitives), `lucide-react` icons, and the `@/*` path alias.
- [x] **Read the relevant Next.js 16 docs** — `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md` and `.../01-getting-started/04-linking-and-navigating.md` before using `next/link`.
- [x] **Added brand color tokens** in `src/app/globals.css` — `--brand` / `--brand-foreground` (light + dark) and mapped them to Tailwind via `@theme inline` (`bg-brand`, `text-brand`, etc.) instead of hardcoding blue utility classes.
- [x] **Built `src/components/shared/Navbar.tsx`**:
  - Sticky, blurred header with a bottom border.
  - Left: blue circular wrench mark + bold “FixMate” wordmark, linked to `/`.
  - Center: Home, Services, About links with active-route highlighting (`usePathname`), blue active color, and an underline indicator (`aria-current="page"`).
  - Right: shadcn `buttonVariants`-styled “Sign In” (outline) and “Sign Up” (brand blue) links.
  - Mobile: accessible hamburger toggle (`aria-expanded`, `aria-controls`, Escape-to-close) with a dropdown panel containing the links and auth buttons.
  - Responsive layout uses a 3-column grid on desktop (`1fr auto 1fr`) so the nav is truly centered, collapsing to 2 columns on mobile.
- [x] **Rendered the navbar globally** in `src/app/layout.tsx` above page content.
- [x] **Verified** with `npx tsc --noEmit`, `npm run lint`, and `npm run build` — all pass.

### Hero section design (FixMate)

- [x] **Inspected the homepage and assets** — `src/app/page.tsx` was a placeholder and no hero image existed in `public/`.
- [x] **Read the Next.js 16 image docs** — used `next/image` with a local asset and `preload` (the `priority` prop is deprecated in Next.js 16).
- [x] **Added a hero image asset** at `public/images/hero-technician.jpg` — a free Unsplash technician photo used as a placeholder. Replace this file with the final brand photo when available (the design’s original cut-out technician image was not present in the repo).
- [x] **Built `src/components/homepage/HeroSection.tsx`**:
  - Full-width light-blue gradient hero with soft decorative blur shapes.
  - “Repair Made Simple” pill badge, three-line headline, and supporting copy.
  - Accessible search form (`role="search"`, labeled input) with a brand-blue “Explore Services” submit button that GETs to `/services?q=…`.
  - Trust row with green icons and vertical dividers: Verified Technicians, Secure Payments, Pay After Completion.
  - Right-side rounded image card using `next/image` with responsive `sizes`, `fill`, and `preload`.
  - Responsive two-column desktop / stacked mobile layout with consistent spacing.
- [x] **Fixed a pre-existing font bug** in `src/app/globals.css` — `--font-sans` referenced itself, so the app rendered in a serif fallback. It now resolves to the next/font Geist variable on `:root`.
- [x] **Rendered the hero on the homepage** in `src/app/page.tsx` inside a `<main>` landmark.
- [x] **Visually verified** with headless browser screenshots at desktop (~1440px) and mobile (~500px) widths; adjusted the image crop to show the technician.
- [x] **Verified** with `npx tsc --noEmit`, `npm run lint`, and `npm run build` — all pass.
- [ ] **Follow-up** — create the `/services` route (the search form and navbar link point there; it currently 404s).

