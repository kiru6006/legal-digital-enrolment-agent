# AEMS Workflow State Machine Specification

This document formally specifies the **Advocate Enrolment Management System (AEMS)** workflow state machine based on BRD Appendix D5.1.

---

## 1. Statutory State Machine Table

All state transitions in AEMS are governed by strict role permissions, immutable audit logs, and deterministic transition guards. Invalid state transitions throw an exception and are rejected by the workflow engine.

| # | Current State (`From`) | Authorized Role & Trigger Action | Resulting State (`To`) | Required Audit & Metadata |
|---|---|---|---|---|
| **1** | `DRAFT` | **Applicant**: Submits completed enrolment application form with required statutory attachments. | `SUBMITTED` | Emits `APPLICATION_SUBMITTED`, records submission timestamp, locks draft edits. |
| **2** | `SUBMITTED` | **System (Intake AI)**: File validation passes, OCR text extraction and checklist matching executed. | `AI_PREPARATION` | Emits `AI_PREPARATION_STARTED`, extracts fields, generates confidence scores. |
| **3** | `AI_PREPARATION` | **System (Intake AI)**: AI processing completes, observations and discrepancy flags stored. | `READY_FOR_SCRUTINY` | Emits `AI_INTAKE_ANALYSIS_COMPLETED`, flags exceptions, queues for officer assignment. |
| **4** | `READY_FOR_SCRUTINY` | **Official (Scrutiny Officer)**: Official claims case file from unassigned docket into active work queue. | `UNDER_REVIEW` | Emits `SCRUTINY_OPENED`, records assigned officer ID, starts scrutiny SLA timer. |
| **5** | `UNDER_REVIEW` | **Official (Scrutiny Officer)**: Officer identifies document discrepancy and issues statutory notice. | `DEFICIENCY_RAISED` | Emits `DEFICIENCY_RAISED`, requires defect reason + remedy action, dispatches notification to candidate. |
| **6** | `DEFICIENCY_RAISED` | **Applicant**: Candidate uploads replacement/rectified document file. | `CORRECTION_SUBMITTED` | Emits `CORRECTION_UPLOADED`, creates immutable version `v2`, preserves `v1`. |
| **7** | `CORRECTION_SUBMITTED` | **System**: Workflow engine detects uploaded rectification and queues for re-review. | `RE_REVIEW` | Emits `RE_REVIEW_QUEUED`, triggers automated AI diff comparing `v1` and `v2`. |
| **8** | `RE_REVIEW` | **Official (Scrutiny Officer)**: Officer confirms defect cured and accepts corrected document. | `UNDER_REVIEW` | Emits `DEFICIENCY_RESOLVED`, updates document status to verified. |
| **9** | `UNDER_REVIEW` | **Official (Education/Verification Officer)**: Officer flags university degree/character dependency. | `VERIFICATION_PENDING` | Emits `VERIFICATION_FLAGGED`, logs external verification reference. |
| **10** | `VERIFICATION_PENDING` | **Official (Education/Verification Officer)**: External university or police verification verified. | `UNDER_REVIEW` | Emits `VERIFICATION_COMPLETED`, records confirming official ID. |
| **11** | `UNDER_REVIEW` | **Official (Scrutiny Officer / Supervisor)**: Full scrutiny and statutory checklist complete. | `COMMITTEE_READY` | Emits `COMMITTEE_READY_DECLARED`, compiles digital meeting pack. |
| **12** | `COMMITTEE_READY` | **Committee Secretary / Bench**: Statutory Enrolment Committee meeting begins. | `COMMITTEE_CONSIDERATION` | Emits `COMMITTEE_SITTING_CONVENED`, associates meeting minute reference. |
| **13** | `COMMITTEE_CONSIDERATION` | **Committee Member / Chairman**: Bench authorizes deferral for further inquiry. | `DEFERRED` | Emits `COMMITTEE_DEFERRED`, requires statutory deferral reason recorded in minutes. |
| **14** | `DEFERRED` | **Committee Secretary**: Re-listed for subsequent statutory committee sitting. | `COMMITTEE_READY` | Emits `COMMITTEE_RELISTED`, updates sitting agenda date. |
| **15** | `COMMITTEE_CONSIDERATION` | **Committee Member / Chairman**: Bench passes statutory resolution granting enrolment. | `DECISION_RECORDED` | Emits `COMMITTEE_DECISION_RECORDED`, records signed member name and resolution text. |
| **16** | `DECISION_RECORDED` | **Records Officer / Admin**: Final enrolment number assigned and roll record entered into archive. | `COMPLETED` | Emits `ENROLMENT_COMPLETED`, generates certificate, triggers applicant SMS/Email. |

---

## 2. Non-Negotiable Governance Rules

1. **AI Never Changes State**: Simulated AI is strictly assistive. All state transitions (`UNDER_REVIEW`, `DEFICIENCY_RAISED`, `COMMITTEE_READY`, etc.) require an explicit action by an authenticated human officer.
2. **Document Version Immutability**: Any modification or correction to a submitted document creates an append-only new version (`v2`, `v3`). Previous versions (`v1`) remain accessible for judicial and audit scrutiny.
3. **IT Admin Restriction**: Per BRD Section 15, IT Administrators possess system administration rights only and are programmatically blocked from making legal or scrutiny determinations.
4. **Append-Only Audit Log**: Every transition writes an immutable audit record containing `timestamp`, `actorId`, `actorName`, `fromState`, `toState`, and `reason`.

