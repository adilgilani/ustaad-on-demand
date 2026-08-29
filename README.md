# Ustaad — On-Demand Roadside Mechanic

**Ustaad is a mobile app for roadside breakdowns.** Tap what broke — puncture, dead battery, no petrol — and nearby mechanics bid with price and ETA, like inDrive. You pick one on price, ETA or rating, then track him to you live, like foodpanda. Price is fixed before he moves.

Pakistan already has a mechanic on almost every corner. Ustaad is the layer that makes them reachable in the 15 minutes that matter.

> **Status:** working customer-side prototype. The mechanic-side app and live GPS feed are the next build. Offers and tracking currently run against seeded data.

---

## The problem

Your car or bike stops dead on a Pakistani road and there is no number to call. The closest thing to a service is a phone number painted on a roadside wall — you call it, one man shows up, and he names whatever price he wants, because you are stranded and cannot walk away. No rating, no ETA, no way to know if he has even left.

## The flow

| Screen | What happens |
|---|---|
| [Home](src/pages/Home.tsx) | Pick bike or car, tap one of 14 icon-based issue tiles. No typing, no describing symptoms. |
| [Location](src/pages/Location.tsx) | GPS detect, or enter a landmark — Pakistani street addresses are unreliable. |
| [UploadPhoto](src/pages/UploadPhoto.tsx) | Optional photo so the mechanic arrives knowing what he is fixing. |
| [PetrolFlow](src/pages/PetrolFlow.tsx) | Fuel billed at the fixed government rate, service fee competed separately. |
| [MapOffers](src/pages/MapOffers.tsx) | Nearby ustaads bid. Compare price, ETA, distance and rating side by side, then choose. |
| [Tracking](src/pages/Tracking.tsx) | Live ETA countdown and Confirmed → On the Way → Arrived. |
| [Chat](src/pages/Chat.tsx) | In-app chat and call with the assigned ustaad. |

Issue types and seed data live in [src/data/issues.ts](src/data/issues.ts).

## Design decisions worth noting

- **Structured intake, not a search box.** Tapping 🔗 *Chain Broke* works one-handed on the shoulder of a road; typing a description does not. It also produces clean `{vehicle, issue_type, GPS, photo}` data that can be routed by capability — a puncture-wallah never receives an electrical job.
- **Price before commitment.** Competing offers replace a single take-it-or-leave-it quote from someone who knows you are stuck.
- **Visible movement.** The worst failure in on-demand services is an accepted job where nobody has actually set off. Tracking makes that obvious within a minute.
- **Built for the user who cannot type symptoms.** Icon-first intake, Roman Urdu copy, mobile-only layout.

## Tech

React 18 · TypeScript · Vite · Tailwind · shadcn/ui · Framer Motion · React Router · Vitest · Playwright

## Run locally

```bash
npm install
npm run dev
```

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
