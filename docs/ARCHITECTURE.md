# AEMS Technical Architecture (ARCHITECTURE.md)

## 1. High-Level Architecture Overview
The AEMS Prototype is built as a **client-side single-page application (SPA)** adhering to Clean Architecture principles. It uses repository interfaces so that when the production FastAPI / PostgreSQL / Temporal backend is attached, the UI components require zero changes.

```
┌─────────────────────────────────────────────────────────────┐
│                    UI & Presentation Layer                   │
│  Pages (Applicant, Officer, Committee, Admin, Management)    │
│  Components (Layout, Common, UX, Badges, Modals, Tables)     │
└──────────────────────────────┬──────────────────────────────┘
                               │ React Hooks & Stores
┌──────────────────────────────▼──────────────────────────────┐
│                    State & Service Layer                     │
│  applicationStore.tsx (Zustand/React Context with sync)     │
│  Services: aiDemoService, i18nService, themeService          │
└──────────────────────────────┬──────────────────────────────┘
                               │ Repository Interfaces
┌──────────────────────────────▼──────────────────────────────┐
│                  Data & Persistence Layer                    │
│  Mock Seed Data (`src/data/mockApplications.ts`)             │
│  Local Storage Seam (`aems_applications_v2`)                 │
│  (Future Seam: FastAPI REST + Temporal Workflow API)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 18 + Vite | Rapid Hot Module Replacement, optimized static bundles, strict TypeScript |
| **Language** | TypeScript 5 (Strict Mode) | Type-safe domain models matching BRD Appendix D entity definitions |
| **Styling** | Tailwind CSS + Custom CSS Tokens | Responsive layouts, unified token system (`tokens.css`), dark/light theme |
| **Routing** | React Router v6 (`HashRouter`) | Mandatory for GitHub Pages static hosting to support deep links |
| **Icons** | Lucide React | Standardized, accessible, featherweight iconography |
| **Persistence** | Browser `localStorage` | Preserves interactive demo edits across browser reloads |
| **Hosting** | GitHub Pages (`docs/` deployment) | Zero-cost, instantly sharable static preview |

---

## 3. Directory Layout

```
legal-digital-enrolment-agent/
├── docs/                       # Project Documentation & GitHub Pages static bundle
│   ├── PRD.md                  # Product Requirements Document
│   ├── ARCHITECTURE.md         # This architecture document
│   ├── DESIGN.md               # Design System and UI tokens
│   ├── RULES.md                # AI & developer coding rules
│   ├── TASKS.md                # Task tracking and milestone log
│   ├── MEMORY.md               # Living project state and notes
│   ├── DECISIONS.md            # Architecture Decision Records (ADRs)
│   ├── TEST_PLAN.md            # Verification plan & acceptance scenario
│   ├── index.html              # GitHub Pages entry point (built)
│   ├── 404.html                # GitHub Pages fallback (built)
│   └── assets/                 # Compiled JavaScript and CSS bundles
├── src/
│   ├── app/                    # App shell, routing setup (`App.tsx`), providers
│   ├── components/             # Reusable UI component library
│   │   ├── common/             # Button, Badge, Modal, Card, Input
│   │   ├── layout/             # Navbar, Sidebar, Breadcrumbs, Layout shells
│   │   └── ux/                 # SaveStatus, ThemeToggle, LanguageToggle, HandoverBanner
│   ├── data/                   # Pre-seeded application and user datasets
│   ├── pages/                  # Route views
│   │   ├── applicant/          # Application form, uploads, deficiency cure
│   │   ├── officer/            # Scrutiny queues, triage, AI comparison
│   │   ├── committee/          # Candidate dockets, voting, decision recording
│   │   ├── management/         # Analytics, SLA tracking, executive charts
│   │   └── admin/              # User management, audit logs, seed reset
│   ├── services/               # Simulated AI, theme manager, i18n dictionary
│   ├── store/                  # Centralized application state (`applicationStore.tsx`)
│   ├── styles/                 # CSS tokens (`tokens.css`) and global overrides (`index.css`)
│   └── types/                  # Domain TypeScript types matching BRD Appendix D
├── dist/                       # Output of `npm run build`
├── package.json
└── vite.config.ts
```

---

## 4. Key Architectural Patterns

### 4.1. Clean Repository Seam
UI components never manipulate raw storage or global variables directly. They read from and dispatch mutations through `useApplicationStore()`. The store encapsulates read, update, deficiency creation, and status transitions, ensuring future REST/GraphQL endpoints can replace mock storage effortlessly.

### 4.2. Hash-Based Deep Linking
Because GitHub Pages serves static files and does not natively rewrite unknown subpaths to `index.html`, React Router is configured with `HashRouter`:
- `/#/` $\to$ Landing / Home
- `/#/applicant/dashboard` $\to$ Applicant Portal
- `/#/officer/scrutiny` $\to$ Officer Scrutiny Workspace
- `/#/committee/docket` $\to$ Statutory Committee View
This prevents 404 errors when sharing or refreshing URLs on GitHub Pages.

### 4.3. Pure Audit Trail
Every state transition (e.g., `SUBMITTED` $\to$ `UNDER_SCRUTINY` $\to$ `DEFICIENCY_RAISED` $\to$ `APPROVED`) appends an immutable `AuditEvent` with:
- `timestamp`: ISO timestamp
- `performedBy`: User role name and ID
- `action`: State change or comment
- `notes`: Justification or deficiency remarks
No UI allows editing or deleting audit events.
