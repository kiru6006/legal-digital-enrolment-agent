# AEMS Screen Inventory & Architecture Map

This document maps every screen identifier from the **Bar Council of Tamil Nadu & Puducherry Advocate Enrolment Management System (AEMS)** Business Requirements Document (BRD) to its corresponding React component, route, authorized role, priority level, and primary functional responsibilities.

---

## 1. Applicant Portal (`APP-01` .. `APP-05`)

| Screen ID | Route | Authorized Role | Priority | Implementation Component | Key UI Elements & Functional Scope |
|---|---|---|---|---|---|
| **APP-01** | `#/applicant`, `#/applicant/dashboard` | `Applicant` | **P0** | [`ApplicantDashboard.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/applicant/ApplicantDashboard.tsx) | **5-Stage Progress Bar**, overall completion percentage (78%), Action Required alert card (for deficiencies), live document checklist summary, ceremony appointment slot preview, and latest notifications. |
| **APP-02** | `#/applicant/application`, `#/applicant/new-application` | `Applicant` | **P0** | [`NewApplication.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/applicant/NewApplication.tsx) | Structured 4-step wizard: Personal Information, Qualifying Education (B.Com/B.A. + LL.B), Bar Rule 49 Employment Declarations, Document checklist upload, and draft save/submit with validation. |
| **APP-03** | `#/applicant/application/:id` | `Applicant` | **P0** | [`ApplicationDetails.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/applicant/ApplicationDetails.tsx) | Complete applicant view of the submitted dossier, category-wise uploaded files with version badges, timeline milestones, and official correspondence. |
| **APP-04** | `#/applicant/documents`, `#/applicant/corrections` | `Applicant` | **P0** | [`DocumentCorrection.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/applicant/DocumentCorrection.tsx) | Deficiency rectification workspace: exact defect reason, officer observations, required remedial actions, file upload creating immutable v2 version, and side-by-side history. |
| **APP-05** | `#/applicant/notifications` | `Applicant` | **P1** | [`ApplicantNotifications.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/applicant/ApplicantNotifications.tsx) | Multi-channel delivery digest (In-App, simulated SMS, simulated Email) with delivery timestamps, category filters, and direct action deep-links. |

---

## 2. Official Scrutiny & Verification Desk (`OFF-01` .. `OFF-06`)

| Screen ID | Route | Authorized Role | Priority | Implementation Component | Key UI Elements & Functional Scope |
|---|---|---|---|---|---|
| **OFF-01** | `#/officer`, `#/officer/dashboard` | `Enrolment Official` | **P0** | [`OfficerDashboard.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/officer/OfficerDashboard.tsx) | Real-time intake metrics (Assigned, Completed Today, Ready for Review, Awaiting Candidate Action), priority breakdown, quick-filter queue links, and benchmark case card (`AEMS-2026-1045`). |
| **OFF-02** | `#/officer/work`, `#/officer/work-queue` | `Enrolment Official` | **P0** | [`WorkQueue.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/officer/WorkQueue.tsx) | 5 Work Buckets (New Intake, Ready to Forward, Corrections Received, Under Verification, Approvals & Committee), full text search, multi-filter dropdowns, bulk assignment, and CSV export. |
| **OFF-03** | `#/officer/case/:id` | `Enrolment Official` | **P0** | [`DigitalCaseFile.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/officer/DigitalCaseFile.tsx) | Single-page comprehensive digital case file with 8 structured tabs: Overview, Candidate Details, Documents, AI Review, Verification Checklist, Deficiencies, Audit History, and Decision Record, with consequence-annotated action panel. |
| **OFF-04** | `#/officer/case/:id/ai`, `#/officer/ai-review/:id` | `Enrolment Official` | **P0** | [`AIDocumentReview.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/officer/AIDocumentReview.tsx) | Assistive AI review workspace: OCR text extractions, confidence percentage pills, amber warning flags (< 80%), source document previews, and human Accept/Edit/Flag controls. |
| **OFF-05** | `#/officer/case/:id/deficiency`, `#/officer/deficiencies` | `Enrolment Official` | **P0** | [`DeficiencyManagement.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/officer/DeficiencyManagement.tsx) | Statutory deficiency management desk: template notice generator (Address scan blurred, Missing Marksheet, Employment disclosure gap), review of applicant rectifications, and resolution workflow. |
| **OFF-06** | `#/supervisor/allocation` | `Supervisory Officer` | **P1** | [`TeamWorkload.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/management/TeamWorkload.tsx) | Officer capacity and workload distribution table (Officer A..D), re-allocation modal, assignment logs, and bottleneck tracking. |

---

## 3. Executive Management Command (`MGT-01` .. `MGT-03`)

| Screen ID | Route | Authorized Role | Priority | Implementation Component | Key UI Elements & Functional Scope |
|---|---|---|---|---|---|
| **MGT-01** | `#/management`, `#/management/dashboard` | `Senior Official` (Secretary/Chairman) | **P1** | [`ManagementDashboard.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/management/ManagementDashboard.tsx) | Wireframe headline metrics (486 Active Docket, 126 Completed this Month, 94 Ready for Review, 32 Committee Pending), 6-stage distribution pie/bar charts, daily secretariat briefing text, and drill-down links. |
| **MGT-02** | `#/management/teams`, `#/management/workload` | `Senior Official` | **P1** | [`TeamWorkload.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/management/TeamWorkload.tsx) | Scrutiny and verification team throughput, assigned vs cleared workloads, active bottlenecks, and section supervisor assignment. |
| **MGT-03** | `#/management/reports` | `Senior Official` | **P1** | [`Reports.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/management/Reports.tsx) | Turnaround time SLA tracking, deficiency frequency analysis, university degree clearance rates, and raw CSV export of all mock datasets. |

---

## 4. Statutory Enrolment Committee (`COM-01` .. `COM-02`)

| Screen ID | Route | Authorized Role | Priority | Implementation Component | Key UI Elements & Functional Scope |
|---|---|---|---|---|---|
| **COM-01** | `#/committee`, `#/committee/dashboard` | `Committee Secretary` / `Member` | **P1** | [`CommitteeDashboard.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/committee/CommitteeDashboard.tsx), [`MeetingPack.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/committee/MeetingPack.tsx) | Committee sitting workspace: scheduled meeting date (`20 November 2026`), table of candidates on the agenda, quorum status, and 1-click meeting pack builder. |
| **COM-02** | `#/committee/case/:id` | `Committee Member` | **P1** | [`CommitteeCaseReview.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/committee/CommitteeCaseReview.tsx) | Indexed case file pack for committee bench hearing, candidate academic credentials, statutory observations, Grant Enrolment / Defer resolution recording, and disabled Reject/Withdraw action. |

---

## 5. System Administration & Governance (`ADM-01`)

| Screen ID | Route | Authorized Role | Priority | Implementation Component | Key UI Elements & Functional Scope |
|---|---|---|---|---|---|
| **ADM-01** | `#/admin`, `#/admin/users` | `IT Administrator` | **P1** | [`AdminUsers.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/admin/AdminUsers.tsx), [`AdminConfig.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/admin/AdminConfig.tsx), [`AdminChecklists.tsx`](file:///Users/apple/projects/legal-digital-enrolment-agent/src/pages/admin/AdminChecklists.tsx) | Proposed roles inventory with `PROPOSED ROLE` badge, statutory separation of concerns notice (IT Admin has zero legal decision authority), append-only audit trail viewer with CSV export, and checklist rule administration. |

