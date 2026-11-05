# AEMS AI & Developer Operating Rules (RULES.md)

This document establishes the binding rules for developers and AI coding agents working on the AEMS codebase.

---

## 1. Core Operating Principles

### 1.1. Plan Before Code
- For any new feature, screen refactoring, or multi-file change, produce a concise plan (< 30 lines) outlining:
  1. Files to create/modify.
  2. Components or state changes involved.
  3. Tests / validation commands.
- Do not make speculative or sprawling changes without approval.

### 1.2. AI Never Decides
- The system is a statutory legal tool. Under the Advocates Act, 1961, enrolment decisions can only be made by human statutory officers.
- Every automated recommendation must be labeled `SIMULATED AI`.
- Every transition out of review into approval, rejection, or deferral requires an explicit click from an authorized human role.

### 1.3. Demo Integrity
- All names, enrollment numbers, certificates, and fees are fictional illustrative mock data (labelled `ILLUSTRATIVE`).
- Never introduce live third-party network dependencies or secret credentials into client bundles.

---

## 2. Technical & Code Quality Rules

### 2.1. Strict TypeScript & No `any`
- All application entities must use types from `src/types/application.ts`, `src/types/document.ts`, or `src/types/user.ts`.
- Code must pass `tsc` without errors or warnings.

### 2.2. CSS Token Adherence
- **Never hardcode hex colors** (e.g., `#1A73E8`, `#FFFFFF`, `#1E2024`) directly inside JSX styles or custom class strings.
- Always use semantic CSS variables (`var(--color-surface-white)`, `var(--color-border)`, `var(--color-text-primary)`) or Tailwind theme classes with dark variants (`dark:bg-slate-900`, `dark:text-slate-100`).

### 2.3. Single-Line Toolbar Invariance
- Navbar, breadcrumb bars, and action toolbars must remain compact and single-line.
- Use `whitespace-nowrap shrink-0` on button labels, badges, and toggle pills to prevent ugly multi-line text wrapping.

### 2.4. Append-Only Audit Logging
- Every mutation to an application (upload, review note, deficiency flag, cure, committee vote) must append an `AuditEvent` to the record.
- Do not build interfaces that allow deleting or altering past audit entries.

---

## 3. Build & Deployment Rules

### 3.1. Verify Before Concluding
- After completing any task, execute:
  ```bash
  npm run build
  ```
- The task is not complete if Vite or TypeScript throws errors.

### 3.2. GitHub Pages Static Sync
- Whenever a production build is executed, the static output in `dist/` must be synchronized into `docs/`:
  ```bash
  cp dist/index.html docs/index.html && cp dist/index.html docs/404.html && rm -rf docs/assets && cp -r dist/assets docs/assets && touch docs/.nojekyll
  ```

### 3.3. Atomic Commits
- Commit after each logical unit of work with descriptive conventional commit messages:
  - `feat(officer): add side-by-side discrepancy comparator`
  - `fix(theme): improve dark mode contrast on table borders`
  - `docs(tasks): mark M4 statutory committee milestone complete`
