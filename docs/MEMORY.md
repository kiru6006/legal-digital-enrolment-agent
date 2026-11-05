# AEMS Project Memory & Current State (MEMORY.md)

This document records the active status, working environment, and latest verified changes to keep developers and AI assistants aligned.

---

## Current Project Status
- **Application**: AEMS (Advocate Enrolment Management System) Prototype
- **Live Deployment**: GitHub Pages (`https://kiru6006.github.io/legal-digital-enrolment-agent/`)
- **Git Branch**: `main` (clean, in sync with `origin/main`)
- **Build Status**: ✅ Passing (0 TypeScript errors, bundle size ~1.06 MB uncompressed / 275 kB gzip)
- **Active Phase**: Phase 7 (Documentation standardization & acceptance verification)

---

## Seed Test Personas & Accounts

| Role | Active Persona | Primary Dashboard Route | Key Scenario Action |
| :--- | :--- | :--- | :--- |
| **Applicant** | *Arjun Kumar* | `/#/applicant/dashboard` | Submits LL.B certs, cures photo deficiency |
| **Applicant** | *Priya Raman* | `/#/applicant/dashboard` | Track pending police clearance |
| **Scrutiny Officer** | *S. Ramanathan* | `/#/officer/scrutiny` | Reviews dossiers, flags deficiencies |
| **Verification Officer** | *V. Murugan* | `/#/officer/verification` | Conducts university & police verification |
| **Committee Member** | *Hon. Committee Chair* | `/#/committee/docket` | Reviews docket, votes on enrolment |
| **Administrator** | *System Admin* | `/#/admin` | Views audit trail, resets demo data |

---

## Recent Accomplishments
1. **Header Layout & Single-Line Fix**:
   - Eliminated text wrapping on all navbar controls with `whitespace-nowrap shrink-0`.
   - Converted Language toggle into an icon-first dropdown with English & Tamil (`தமிழ்`).
   - Converted Theme toggle into a standardized 36x36px icon button (`w-9 h-9`).
   - Converted Reset Demo into a compact icon button with tooltip and toast.
   - Built an executive, categorized popover for the Role Switcher.
2. **Dark Theme Contrast Overhaul**:
   - Replaced low-contrast dark tokens in `tokens.css` with WCAG AA compliant colors (`#8AB4F8`, `#81C995`, `#F28B82`, `#D7AEFB`).
   - Added global `.dark` cascading overrides in `index.css` for all text and alert backgrounds.
3. **Spec-Driven Architecture Documentation**:
   - Created standardized Vibe Coding specification files in `docs/` (`PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `RULES.md`, `TASKS.md`, `DECISIONS.md`, `MEMORY.md`, `TEST_PLAN.md`).

---

## Known Quirks & Design Constraints
1. **Vite Chunk Warning**: Some vendor chunks exceed 500 kB (Recharts + Lucide). In future phases, code-splitting via dynamic imports can optimize this further.
2. **GitHub Pages Routing**: Always use hash-based routing (`/#/...`) when creating links or navigating in tests.

---

## Immediate Next Steps
1. Perform automated or manual walkthrough of the Appendix B7 test script using `TEST_PLAN.md`.
2. Keep `MEMORY.md` updated after any functional changes.
