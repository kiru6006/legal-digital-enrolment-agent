# AEMS Architecture Decisions Records (DECISIONS.md)

This log preserves key permanent architectural decisions and the context behind them.

---

## ADR-001: Selection of React 18 + Vite over Angular Standalone
- **Date**: 2026-11-04
- **Decision**: Build the prototype using React 18, Vite, TypeScript, and Tailwind CSS.
- **Context**: The master BRD Appendix D12 specified React 18 with Tailwind. While some enterprise teams consider Angular, React 18 + Vite provides faster iteration velocity, immediate preview build times (< 6s), and rich ecosystem components (Lucide, Recharts).
- **Consequences**: Standardized on React functional components with custom hooks.

---

## ADR-002: Use of HashRouter for GitHub Pages Static Hosting
- **Date**: 2026-11-04
- **Decision**: Use `HashRouter` instead of `BrowserRouter` in `src/app/App.tsx`.
- **Context**: The prototype must be hosted on static GitHub Pages. GitHub Pages does not have native server-side URL rewrites for deep paths (e.g., `/applicant/dashboard` results in a 404 on direct refresh unless complex single-page 404 hacks are employed).
- **Consequences**: Deep links use `/#/route` format, ensuring 100% reliable direct linking and refreshes across all environments.

---

## ADR-003: Client Repository Seam with `localStorage` Persistence
- **Date**: 2026-11-04
- **Decision**: Centralize all application state mutations through a repository pattern backed by `localStorage` (`aems_applications_v2`).
- **Context**: Evaluators test multi-role handovers (e.g., an applicant submits an application, then switches role to scrutiny officer to review it). In-memory-only state would wipe progress on refresh, while a full backend would require server hosting.
- **Consequences**: Evaluator edits persist across refreshes, and the UI is decoupled from the storage implementation, paving a clean path for the future FastAPI backend.

---

## ADR-004: CSS Variable Token System for Dark & Light Themes
- **Date**: 2026-11-05
- **Decision**: Define semantic color variables in `src/styles/tokens.css` and map them to dark mode variants, rather than scattering ad-hoc Tailwind color classes.
- **Context**: Light mode dark hex colors (e.g., `#1A73E8`, `#188038`, `#C70234`) rendered almost invisible text when dark mode was applied without token overrides.
- **Consequences**: High-contrast dark hexes (`#8AB4F8`, `#81C995`, `#FF6680`) ensure WCAG AA contrast compliance across all cards, modals, and tables in both themes.

---

## ADR-005: Dual-Directory Static Build (`dist/` and `docs/`)
- **Date**: 2026-11-05
- **Decision**: Output the Vite build to `dist/` and synchronize to `docs/` for GitHub Pages.
- **Context**: GitHub Pages serves directly from the `/docs` folder on the `main` branch.
- **Consequences**: Running `npm run build` followed by syncing to `docs/` enables instant deployment to the live public URL upon pushing to GitHub.
