# AEMS Product Requirements Document (PRD)

## 1. Product Identification
- **System**: Advocate Enrolment Management System (AEMS)
- **Client / Jurisdiction**: Bar Council of Tamil Nadu and Puducherry
- **Prototype Status**: Browser-only, Clickable Interactive Prototype (Vite + React + TypeScript + Tailwind CSS)
- **Deployment**: Static GitHub Pages Demo (`docs/` root)

---

## 2. Problem Statement
The statutory enrolment process under the Advocates Act, 1961 currently relies on manual paper files, physical submission counters, and offline verification across multiple universities and police departments.
- **Cycle Time**: Takes **90–120 days** from application to enrolment day.
- **Pain Points**: High applicant anxiety, paper file loss risks, administrative backlog for scrutiny officers, and delayed scrutiny ahead of statutory Enrolment Committee sittings.

---

## 3. Product Vision & Goal
Deliver a modern, end-to-end digital enrolment workflow cutting cycle times from **90+ days down to < 14 days** by:
1. Giving law graduates a self-service digital application, fee payment, and deficiency cure experience.
2. Giving scrutiny staff an assisted triage workspace with simulated AI document verification and discrepancy flagging.
3. Providing the statutory Enrolment Committee with a digital docket for reasoned, auditable decisions.

---

## 4. Target User Personas
1. **Advocate Applicant** (e.g., *Arjun Kumar*): Law graduate submitting credentials, certificates, affidavits, and tracking scrutiny status.
2. **Scrutiny Officer / Staff** (e.g., *S. Ramanathan*): Verifies educational certificates, bar council forms, and criminal antecedents; raises deficiencies.
3. **Verification Officer / Field Verifier**: Confirms university bona fides and police clearances.
4. **Secretary / Registrar**: Reviews compiled scrutiny packets and schedules applications for the committee.
5. **Statutory Enrolment Committee Member** (e.g., *Hon. Committee Chair*): Senior Bar Council advocates reviewing dockets, conducting interviews, and voting on statutory enrolment.
6. **Administrator / Management**: Bar Council leadership monitoring application velocity, backlogs, and committee batches.

---

## 5. Core MVP Scope (The Acceptance Scenario)
The prototype proves the end-to-end statutory scenario (**BRD Appendix B7**):
- **APP-01 to APP-05**: Applicant registration, application form submission, document bundle upload, deficiency notification receipt, document re-upload cure, and enrolment status tracking.
- **OFF-01 to OFF-06**: Officer queue management, document comparison scrutiny, simulated AI extraction & discrepancy triage, deficiency notice issuance, and verification sign-off.
- **COM-01 to COM-02**: Statutory Committee docket view, candidate credential review, and reasoned decision recording (Enrol / Defer / Reject).
- **MGT-01 to MGT-03**: Executive dashboard with queue metrics, turnaround times, and batch performance.
- **System-Wide Capabilities**:
  - Global Role Switcher across all personas.
  - Bilingual Interface: English and Tamil (`தமிழ்`).
  - Dark and Light Theme toggle meeting WCAG AA contrast.
  - Reset Demo state to restart the acceptance scenario at any time.

---

## 6. Out of Scope for Prototype
- Real bank payment gateway processing (simulated mock payment).
- Real SMS / WhatsApp gateway dispatch (simulated notification center).
- Live university or state police API integrations (simulated verification responses).
- Real OCR / live LLM API calls without human oversight (simulated AI suggestions labelled `SIMULATED AI`).
- Automated statutory approval without human role sign-off (**AI Never Decides**).

---

## 7. Success Criteria
1. An evaluator can run the complete Arjun Kumar end-to-end lifecycle in under 7 minutes without encountering broken buttons, blank screens, or dead-ends.
2. Zero data loss during browser reloads (synced with `localStorage`).
3. Fully functional on GitHub Pages with zero 404 errors on deep routes.
