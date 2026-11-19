# AGENTS.md

## What this is

Single Next.js 16 (App Router) client app — **FixMate**, a home-services marketplace frontend. Not a monorepo; no packages, no CI workflows, no pre-commit hooks, no test runner configured (do not invent `npm test`).

- Stack: Next 16.4 + React 19 + TypeScript (strict) + Tailwind CSS v4 + shadcn/ui + better-auth + MongoDB.
- Entry points: `src/app/layout.tsx` (root layout, Navbar/Footer), `src/app/page.tsx` (homepage only so far).
- Path alias: `@/*` → `./src/*` (tsconfig).

## Commands

```bash
npm run dev        # next dev (Turbopack)
npm run build      # next build
npm run lint       # eslint (flat config, eslint-config-next 16) — no args
npx tsc --noEmit   # typecheck (no npm script for this)
```

Verification order before finishing a change: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

**Gotcha:** typecheck depends on generated `.next/types` (e.g. `LayoutProps<"/">` in `layout.tsx`). After a clean checkout or `.next` wipe, run `npm run build` (or start `npm run dev` once) first, or `tsc` fails with missing Next.js types.

## Toolchain quirks (easy to get wrong)

- **Tailwind v4 is CSS-first.** There is no `tailwind.config`. Theme tokens live in `src/app/globals.css` under `@theme inline`; styling is compiled through the `@tailwindcss/turbopack` loader rule in `next.config.ts`. Edit CSS, not config.
- **shadcn style is `base-nova`** (`components.json`): UI primitives use `@base-ui/react`, **not Radix**. Existing components: `src/components/ui/{button,card}.tsx`. When adding shadcn components, pass the right options rather than copying Radix-based snippets; aliases are `@/components`, `@/lib`, `@/components/ui`.
- **React Compiler is on** (`reactCompiler: true` + `babel-plugin-react-compiler`). Components must follow Rules of React — no manual memoization hacks, no mutating props/state.
- ESLint flat config (`eslint.config.mjs`) ignores `.next/`, `out/`, `build/`, `next-env.d.ts` only.

## Auth (better-auth)

- Server config: `src/lib/auth.ts` → mounted at the catch-all route `src/app/api/auth/[...all]/route.ts` (exports `GET`/`POST`). Client: `src/lib/auth-client.ts`.
- Database: `@better-auth/mongo-adapter` over a **hardcoded** `mongodb://localhost:27017/database` in `src/lib/auth.ts`. The `.env` key `BETTER_AUTH_MONGO_DB_URL` exists but is currently unused — auth needs a local MongoDB running at that URI.
- Known inconsistencies (verify before "fixing" either way):
  - The `google` social provider reads `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` (copy-paste bug), and no `GITHUB_*` keys exist in `.env` — social login is non-functional as-is.
  - `auth-client.ts` exports `signIn, signUp, signOut, useSession` from a **second** `createAuthClient()` call that ignores `baseURL`; the `authClient` const (with `baseURL: process.env.BETTER_AUTH_URL`) is separate. Unify carefully — existing imports use the named exports.

## Environment

`.env` (gitignored, required for auth to run): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_MONGO_DB_URL` (unused, see above).

## Layout conventions

- `src/components/homepage/` — page sections (Hero, HowItWorks, PopularCategories, WhyChoosUs); `src/components/shared/` — Navbar/Footer; `src/lib/globalshare/` — shared data/constants (e.g. `Category.ts`).
- Section components are currently untyped props-wise and mostly presentational; keep new homepage sections in `src/components/homepage/` and compose them in `src/app/page.tsx`.
