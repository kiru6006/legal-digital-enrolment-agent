# AEMS Project Tasks & Milestones (TASKS.md)

This living task list tracks the implementation phases of the AEMS interactive prototype.

---

## Milestone Progress Summary

| Phase | Milestone Name | Status | Completion Date |
| :--- | :--- | :--- | :--- |
| **M1** | Project Setup & Shell Architecture | **COMPLETED** | Nov 4, 2026 |
| **M2** | Applicant Portal (APP-01 to APP-05) | **COMPLETED** | Nov 5, 2026 |
| **M3** | Scrutiny Officer Workflows (OFF-01 to OFF-06) | **COMPLETED** | Nov 5, 2026 |
| **M4** | Statutory Committee Workspace (COM-01 to COM-02) | **COMPLETED** | Nov 5, 2026 |
| **M5** | Management Dashboard (MGT-01 to MGT-03) | **COMPLETED** | Nov 5, 2026 |
| **M6** | UI Refinements, Themes & Navigation Overhaul | **COMPLETED** | Nov 5, 2026 |
| **M7** | End-to-End Acceptance & Spec Documentation | **IN PROGRESS** | Current |

---

## Detailed Task Breakdown

### Phase 1: Setup & Foundations (M1) — ✅ COMPLETED
- [x] **TASK-101**: Initialize Vite + React 18 + TypeScript strict project.
- [x] **TASK-102**: Configure Tailwind CSS with custom legal palette tokens (`tokens.css`).
- [x] **TASK-103**: Setup React Router with `HashRouter` for GitHub Pages deep links.
- [x] **TASK-104**: Build domain TypeScript models (`Application`, `Document`, `User`, `AuditEvent`).
- [x] **TASK-105**: Build seed data generator with realistic test candidates (Arjun Kumar, Priya Raman, Suresh Babu).

### Phase 2: Applicant Experience (M2) — ✅ COMPLETED
- [x] **TASK-201**: Applicant Dashboard with application progress timeline.
- [x] **TASK-202**: Multi-step application wizard (Personal, Educational, Declarations).
- [x] **TASK-203**: Document Upload Manager with drag-and-drop simulated upload and validation.
- [x] **TASK-204**: Deficiency Resolution Screen allowing applicants to cure flagged documents.
- [x] **TASK-205**: Digital Certificate and Enrolment Day Pass download preview.

### Phase 3: Officer Scrutiny Experience (M3) — ✅ COMPLETED
- [x] **TASK-301**: Unified Scrutiny Queue with filtering by stage, priority, and date.
- [x] **TASK-302**: Dossier Review Workspace with side-by-side document comparison.
- [x] **TASK-303**: Simulated AI Assistant extraction & discrepancy flagging badge.
- [x] **TASK-304**: Deficiency Notice Creator with predefined statutory citation templates.
- [x] **TASK-305**: Verification Officer Sign-off and handover action buttons.

### Phase 4: Statutory Committee Experience (M4) — ✅ COMPLETED
- [x] **TASK-401**: Committee Batch Docket listing candidates for upcoming session.
- [x] **TASK-402**: Candidate Dossier summary view with scrutiny officer remarks and AI verification summary.
- [x] **TASK-403**: Committee Voting & Decision Recording modal (Enrol / Defer / Reject with statutory reasons).
- [x] **TASK-404**: Secretary Batch Finalization and enrolment notification dispatch.

### Phase 5: Management & Administration (M5) — ✅ COMPLETED
- [x] **TASK-501**: Executive Dashboard with throughput metrics, SLA tracking, and backlog charts.
- [x] **TASK-502**: Stage Distribution Recharts visualization.
- [x] **TASK-503**: Audit Trail viewer with filterable chronological event history.
- [x] **TASK-504**: Demo Reset button to restore initial seed data state instantly.

### Phase 6: UX Polish, Accessibility & Dual-Theme (M6) — ✅ COMPLETED
- [x] **TASK-601**: Standardize all navbar and toolbar controls to 36px (`h-9`).
- [x] **TASK-602**: Fix text wrapping on navbar elements with `whitespace-nowrap shrink-0`.
- [x] **TASK-603**: Redesign Language Selector to icon-first dropdown with English & Tamil (`தமிழ்`).
- [x] **TASK-604**: Redesign Theme Toggle to 36x36px icon button with Sun/Moon micro-animations.
- [x] **TASK-605**: Redesign Role Switcher into an executive categorized popover menu.
- [x] **TASK-606**: Complete Dark/Light theme token overrides ensuring WCAG 2.1 AA text contrast.

### Phase 7: Spec-Driven Documentation & Next Enhancements (M7) — 🔄 IN PROGRESS
- [x] **TASK-701**: Create standardized Vibe Coding specification documents (`PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `RULES.md`, `TASKS.md`, `MEMORY.md`, `DECISIONS.md`, `TEST_PLAN.md`).
- [x] **TASK-702**: Create root `.env.example` template for future backend integration.
- [ ] **TASK-703**: Run full Playwright / automated scenario B7 validation.
- [ ] **TASK-704**: Plan FastAPI + PostgreSQL production backend seam transition.
