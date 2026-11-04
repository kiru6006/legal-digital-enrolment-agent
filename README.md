# Advocate Enrolment Management System (AEMS)
### Digital Enrolment Office MVP — Bar Council of Tamil Nadu & Puducherry

> **"Simplifying Advocate Enrolment. Empowering Officials. Improving Transparency."**

---

## 🏛️ Executive Summary

The **Advocate Enrolment Management System (AEMS)** is a functional Minimum Viable Product (MVP) and reference architecture illustrating the transformation of the Bar Council enrolment office from a paper-heavy, manual scrutiny process into a modern, accountable, and transparent digital workflow.

### Core Operating Principle
> **One Application &bull; One Digital Case File &bull; One Document Checklist &bull; One Review History &bull; One Accountable Decision**

### ⚠️ Strict AI Statutory Safeguard
In AEMS, AI functions strictly as an **administrative preparation assistant** (optical character recognition, document classification, cross-credential demographic checks, and checklist pre-matching). **AI does not independently approve, reject, or determine legal eligibility.** All legal admission decisions are reserved exclusively for authorized Bar Council officials and the statutory Enrolment Committee under the Advocates Act, 1961.

---

## 🚀 Key Modules & Capabilities

| Module | Primary Persona | Key Capabilities |
|---|---|---|
| **Applicant Portal** | Enrolment Applicant (Arjun Kumar) | Multi-step online application form, real-time stage progress bar, instant deficiency notifications, version-controlled document re-upload desk, and ceremonial robing schedule pass. |
| **Official Workstation** | Senior Scrutiny Officers | Unified digital docket, priority SLA queues, single-pane digital case files, one-click simulated AI OCR analysis, deficiency notice issuing with standard templates, and version diffing (v1 vs v2). |
| **Command Centre** | Registrar / Executive Directorate | Executive KPI summary, live stage distribution analytics, team caseload rebalancing, ageing SLA monitoring, and one-click statutory CSV export. |
| **Committee Chamber** | Enrolment Committee Members | Tabled meeting pack review, statutory scrutiny sign-offs, and formal recording of decisions (Grant Enrolment, Defer Sitting, or Seek Clarification). |
| **Administration** | System Administrator | Role-based identity switching, statutory checklist management (Rules 7–14), and system parameter configuration. |

---

## ⏱️ 5–8 Minute Live Demonstration Sequence

A dedicated interactive **Demo Script Guide** is embedded in the application top navigation. Presenters can follow this 8-step sequence:

1. **Step 1: Applicant Portal — Review Status & Alerts**
   - Open **Applicant Portal** (`/applicant/dashboard`).
   - Examine candidate Arjun Kumar's file (`AEMS-2026-1045`) showing *Action Required* with pending deficiency rectifications.
2. **Step 2: Official Workstation — Work Queue & Prioritization**
   - Switch to **Enrolment Official** (`/officer/work-queue`).
   - Filter by high priority or search by candidate name to inspect the centralized digital docket.
3. **Step 3: Digital Case File & AI Intake Scrutiny**
   - Open Arjun Kumar's **Digital Case File** (`/officer/case/AEMS-2026-1045`).
   - Click **Run AI Document Review** (`/officer/ai-review/AEMS-2026-1045`).
   - Demonstrate simulated OCR classification, confidence indicators (92%), and automated flagging of:
     - Blurry residential utility bill scan.
     - Name initial disparity ("Arjun K." on B.Com degree vs "Arjun Kumar" on LL.B).
4. **Step 4: Statutory Deficiency Notice Drafting**
   - In the Official Workspace, view pre-drafted legal deficiency notices citing Bar Council rules.
   - Demonstrate notice dispatch to the applicant.
5. **Step 5: Applicant Self-Service Rectification**
   - Switch back to **Applicant Portal** &rarr; **Correction Desk** (`/applicant/documents`).
   - Click **Simulate Corrected Upload (v2)** to upload a high-resolution 300-DPI e-bill PDF.
   - Observe real-time state transition from *Action Required* to *Correction Under Review*.
6. **Step 6: Officer Re-Scrutiny & Side-by-Side Version Diff**
   - Switch to **Official Workspace** &rarr; **Deficiency Tracking** (`/officer/deficiencies`).
   - Open **Compare v1 vs v2** to inspect visual improvements detected by the system.
   - Click **Accept & Resolve Deficiency** to update the shared case state.
7. **Step 7: Senior Management Oversight & Throughput**
   - Switch to **Senior Management** (`/management/dashboard`).
   - Inspect dynamic pipeline distribution, SLA ageing charts, and team workload balance.
   - View the **AI Workload Reduction Benchmark** (`/officer/time-savings`) showing an illustrative **28 minutes saved per case (70% reduction)**.
8. **Step 8: Statutory Enrolment Committee Decision**
   - Switch to **Committee Member** (`/committee/dashboard`).
   - Open candidate dossier (`/committee/case/AEMS-2026-1045`).
   - Click **Record Statutory Decision** &rarr; select **Grant Enrolment (Approved)** &rarr; submit formal minute reference (`EC-MINUTES-2026/19`).
   - Notice the candidate file updates to **100% Complete &bull; Enrolment Approved**.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Bundler & Tooling**: Vite
- **Routing**: React Router (HashRouter configured for 100% reliable GitHub Pages routing without 404s)
- **Styling**: Tailwind CSS with enterprise government color palette
- **Iconography**: Lucide React
- **Data Visualization**: Recharts
- **State Architecture**: Centralized React Context with automatic `localStorage` synchronization
- **Mock Service Layer**: Deterministic simulated AI classification, OCR extraction, and document diffing

---

## 💻 Local Setup & Execution

Ensure you have **Node.js (v18+)** and **npm** installed.

```bash
# 1. Clone the repository
git clone https://github.com/kiru6006/legal-digital-enrolment-agent.git
cd legal-digital-enrolment-agent

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

The application will be accessible at `http://localhost:5173/`.

---

## 🌐 GitHub Pages Deployment

The repository includes a ready-to-run GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Deployment Steps:
1. Push code to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: complete AEMS Digital Enrolment Office MVP"
   git push origin main
   ```
2. On GitHub, navigate to **Settings &rarr; Pages**.
3. Under **Build and deployment &rarr; Source**, select **GitHub Actions**.
4. The workflow will automatically trigger, build the TypeScript bundle, and publish the site to:
   ```
   https://kiru6006.github.io/legal-digital-enrolment-agent/
   ```

---

## 🔒 Scope Boundaries & Future Production Roadmap

| Capability | Current MVP Status | Production Target Architecture |
|---|---|---|
| **Identity & Authentication** | Role-based persona switcher for demonstrations | Aadhaar eKYC via DigiLocker / UIDAI OTP authentication |
| **Degree Verification** | Preconfigured database records & simulated OCR | Direct API integration with National Academic Depository (NAD) & Digilocker |
| **Bar Council Rule 49** | Signed declaration with relieving letter verification | Direct EPFO / MCA director database cross-check |
| **Payment Gateway** | Simulated treasury challan reconciliation | SBI ePay / Bharatkosh treasury gateway integration |
| **AI Inference** | Deterministic browser service engine | Document AI / Gemini Flash API running in a secure GovCloud sandbox |
| **Persistence** | Browser `localStorage` with instant scenario reset | PostgreSQL / Cloud SQL with write-once audit logs and Cloud Storage for PDFs |

---

## 📚 Technical Specifications & Architecture Documentation

All technical documentation, engineering blueprints, wireframe specifications, and statutory requirements are organized under the [`docs/`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/) directory:

| Document | Category / Tech Stack | Focus & Description |
|---|---|---|
| **[`docs/TECH-SPEC-React-Vite-Tailwind-Frontend-MVP.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/TECH-SPEC-React-Vite-Tailwind-Frontend-MVP.md)** | **React 18 + Vite + Tailwind** | Master engineering specification for the client-side prototype, screen inventory, state store, and acceptance scenario. |
| **[`docs/TECH-ARCH-FastAPI-Postgres-Temporal-Appendix-D.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/TECH-ARCH-FastAPI-Postgres-Temporal-Appendix-D.md)** | **FastAPI + PostgreSQL + Temporal.io** | Production backend architecture, JSON schema data models, RLS security policies, and enterprise IdP integration (Appendix D). |
| **[`docs/WORKFLOW-BPMN-Process-RACI-Appendix-C.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/WORKFLOW-BPMN-Process-RACI-Appendix-C.md)** | **BPMN 2.0 + RACI Matrix** | Multi-departmental process models, decision authorities, handoffs, and operational workloads (Appendix C). |
| **[`docs/REQUIREMENTS-User-Stories-E2E-Scenarios-Appendix-B.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/REQUIREMENTS-User-Stories-E2E-Scenarios-Appendix-B.md)** | **Requirements & E2E Testing** | Detailed user stories (`US-APP`, `US-OFF`, `US-MGT`, `US-COM`) and the 10-step E2E verification scenario (Appendix B). |
| **[`docs/UI-UX-Wireframes-Screen-Specs-Appendix-A.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/UI-UX-Wireframes-Screen-Specs-Appendix-A.md)** | **UI / UX Wireframe Architecture** | Comprehensive visual wireframes and screen blueprints across all 3 user experiences (Appendix A). |
| **[`docs/UI-UX-HTML-Wireframes-Tokens-Spec.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/UI-UX-HTML-Wireframes-Tokens-Spec.md)** | **Design System & Layout Tokens** | HTML/CSS wireframes, typographic scales, design tokens, and accessibility contrast standards. |
| **[`docs/BRD-Master-Functional-Requirements.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/BRD-Master-Functional-Requirements.md)** | **Master Business Requirements** | Core statutory legal basis (Advocates Act 1961), business requirements, and operational scope boundaries. |
| **[`docs/BRD-00-Master-Business-Proposal-Blueprint.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/BRD-00-Master-Business-Proposal-Blueprint.md)** | **Executive Blueprint** | Master business proposal and institutional modernization rationale for the Bar Council. |
| **[`docs/DELIVERY-Roadmap-SLA-Business-Case-Appendix-E.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/DELIVERY-Roadmap-SLA-Business-Case-Appendix-E.md)** | **Project Delivery & SLAs** | Phased rollout roadmap, team staffing model, turnaround SLA targets, and ROI business case (Appendix E). |
| **[`docs/screen-map.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/screen-map.md)** | **Frontend Route & Screen Map** | Direct mapping from BRD Screen IDs (`APP-01..05`, `OFF-01..06`, etc.) to React components and routes. |
| **[`docs/workflow-states.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/workflow-states.md)** | **State Machine Transition Table** | Pure 16-transition workflow state machine specification. |
| **[`docs/production-path.md`](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/production-path.md)** | **Production Migration Seam** | Technical blueprint for replacing prototype repositories with FastAPI REST adapters. |

---

## 📄 License & Attribution

Developed for presentation to the **Bar Council of Tamil Nadu and Puducherry**. Sample applicant records, dates, and contact particulars are entirely synthetic and created solely for technical evaluation.

