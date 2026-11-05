# AEMS Test Plan & Acceptance Scenarios (TEST_PLAN.md)

This test plan defines how to verify that the AEMS prototype satisfies statutory requirements and user acceptance criteria (BRD Appendix B7).

---

## 1. Acceptance Scenario B7: Arjun Kumar End-to-End Walkthrough

### Step 1: Initial Applicant Submission
- **Role**: Applicant (*Arjun Kumar*)
- **Route**: `/#/applicant/dashboard`
- **Verification Checklist**:
  - [ ] Dashboard shows welcome banner for Arjun Kumar.
  - [ ] Timeline indicates application status: `DRAFT` or `SUBMITTED`.
  - [ ] Document checklist reflects mandatory submissions:
    - LL.B Degree Certificate (or Provisional)
    - Law College Transfer Certificate (TC)
    - Attendance Certificate
    - Two Character Certificates (from Advocates of 10+ yrs standing)
    - Residential Proof & Passport Photograph

### Step 2: Officer Scrutiny & AI-Assisted Triage
- **Role**: Scrutiny Officer (*S. Ramanathan*)
- **Route**: `/#/officer/scrutiny`
- **Verification Checklist**:
  - [ ] Application queue displays Arjun Kumar in `SUBMITTED` / `READY_FOR_SCRUTINY` state.
  - [ ] Clicking the row opens the Dossier Review workspace.
  - [ ] Side-by-side view displays uploaded document preview alongside extracted fields.
  - [ ] AI badge shows `SIMULATED AI` with discrepancy score / confidence indicator.
  - [ ] Officer can flag a deficiency (e.g., *"Photograph background is non-white"* or *"University TC stamp unclear"*).
  - [ ] Clicking **"Issue Deficiency Notice"** updates status to `DEFICIENCY_RAISED` and logs an `AuditEvent`.

### Step 3: Applicant Deficiency Cure
- **Role**: Switch back to Applicant (*Arjun Kumar*)
- **Route**: `/#/applicant/dashboard`
- **Verification Checklist**:
  - [ ] Amber deficiency banner appears with statutory cure notice.
  - [ ] Clicking **"Resolve Deficiency"** opens the re-upload modal.
  - [ ] Uploading a replacement file updates the document status to `CORRECTED`.
  - [ ] Clicking **"Submit Cure"** moves status to `RE_REVIEW` / `CORRECTION_SUBMITTED`.

### Step 4: Verification & Handover
- **Role**: Scrutiny / Verification Officer
- **Route**: `/#/officer/scrutiny`
- **Verification Checklist**:
  - [ ] Corrected document appears marked with `RE-UPLOADED`.
  - [ ] Officer marks document as `VERIFIED`.
  - [ ] Officer clicks **"Forward to Committee"**.
  - [ ] Status updates to `COMMITTEE_READY`.

### Step 5: Statutory Committee Review & Decision
- **Role**: Committee Member (*Hon. Committee Chair*)
- **Route**: `/#/committee/docket`
- **Verification Checklist**:
  - [ ] Arjun Kumar appears in the active Batch Docket.
  - [ ] Clicking candidate opens the complete credential summary.
  - [ ] Committee member clicks **"Record Decision"**.
  - [ ] Modal allows selecting:
    - **Recommend Enrolment** (Statutory approval)
    - **Defer** (Request further inquiry)
    - **Reject** (Record statutory grounds under Section 24/26)
  - [ ] Selecting **"Recommend Enrolment"** and submitting transitions status to `DECISION_RECORDED` / `COMPLETED`.

---

## 2. Cross-Cutting UI & System Tests

### 2.1. Theme & Accessibility
- [ ] Toggle theme to **Dark Mode**:
  - Text across all tables, headings, and badges remains sharp and readable ($\ge 4.5:1$ contrast).
  - No jarring white background boxes appear behind cards or alerts.
- [ ] Toggle theme back to **Light Mode**:
  - All borders and text maintain clean visual distinction.

### 2.2. Bilingual Switching
- [ ] Toggle language to **Tamil (`தமிழ்`)**:
  - Header, breadcrumbs, status badges, and action buttons render correct Tamil translations.
- [ ] Toggle back to **English**:
  - UI seamlessly reverts without page refresh or data loss.

### 2.3. Responsive Breakpoints
- [ ] Test at **375px (Mobile)**:
  - Header buttons collapse cleanly without horizontal overflow.
  - Sidebar toggles via mobile hamburger sheet.
- [ ] Test at **768px (Tablet)**:
  - Tables scroll horizontally or collapse into readable cards.
- [ ] Test at **1440px (Desktop)**:
  - Dual-panel document viewer displays full side-by-side comparison.

### 2.4. Data Integrity & Reset
- [ ] Modify applicant details, upload a file, or change status.
- [ ] Hard refresh browser (`Cmd+Shift+R` / `Ctrl+F5`).
  - All modified data persists from `localStorage`.
- [ ] Click **"Reset Demo"** in header toolbar.
  - System confirms and restores pristine initial seed dataset.
