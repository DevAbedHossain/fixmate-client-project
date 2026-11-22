# FixMate — Smart Device & Home Appliance Repair Platform

FixMate is a role-based repair service platform. Verified **technicians** list the repair services they offer, **customers** send repair requests and track every job step by step, and they **pay only after the job is completed**. **Admins** approve service listings, manage users and monitor every job and payment.

- **Live site:** _add your live URL_
- **Server repository:** _add your server repo URL_

## Test accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | _add admin email_ | _add admin password_ |
| Technician | technician@fixmate.com | Technician123 |
| Customer | customer@fixmate.com | Customer123 |

More seeded accounts: `technician2@fixmate.com`, `technician3@fixmate.com` (password `Technician123`) and `customer2@fixmate.com` (password `Customer123`).

## Key features

- **Three roles with separate dashboards** — customer, technician and admin, each with a dynamic sidebar menu. Every dashboard route is protected on the server; opening another role's page redirects to your own dashboard.
- **Repair request flow** — customers request a repair from the service details page (phone, address, preferred date, problem description). The server blocks duplicate active requests, past dates, and requests from technicians/admins.
- **Job status pipeline** — Requested → Accepted → In Progress → Completed (or Rejected / Cancelled). Only the technician who owns the job can move it forward, one step at a time; the customer can cancel only while it is still requested.
- **Pay after service with Stripe** — a Pay Now button appears only on completed, unpaid jobs. The amount always comes from the database, and the same payment can never be saved twice.
- **Server-side search, filter & sort** — search by title or category, filter by category and service mode, sort by price or newest. Filters live in the URL, so they survive a reload and home-page category cards open the page pre-filtered.
- **Admin moderation** — approve or reject services (pending shown first), change user roles (never your own), read-only view of all bookings and every Stripe transaction with total revenue.
- **Profiles with ImgBB uploads** — update name, phone, area, bio and photo; the navbar and dashboard update immediately.
- **Polished UX** — responsive layout, loading skeletons, custom 404 and error pages, empty states, confirmation modals and toast notifications for every action.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui (Base UI) · BetterAuth (MongoDB adapter, JWT plugin) · Stripe Checkout · ImgBB

## npm packages

| Package | Purpose |
| --- | --- |
| `next`, `react`, `react-dom` | Framework and UI |
| `better-auth`, `@better-auth/mongo-adapter`, `mongodb` | Authentication, sessions and JWT issuing |
| `@base-ui/react`, `shadcn`, `class-variance-authority`, `cn`, `tw-animate-css` | UI components and styling helpers |
| `lucide-react` | Icons |
| `tailwindcss`, `@tailwindcss/turbopack` | Styling |
| `babel-plugin-react-compiler` | React Compiler |

## Getting started

```bash
npm install
npm run dev
```

Create a `.env` file (never commit it):

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_MONGO_DB_URL=
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
# Comma-separated, e.g. your production domain
TRUSTED_ORIGINS=
```

The Express server verifies the BetterAuth JWT using the public keys at `/api/auth/jwks`, so the client must be running for private API calls to work.
