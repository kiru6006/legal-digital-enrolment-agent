# MASTER EXECUTION PROMPT
## Advocate Enrolment Management System (AEMS)
### Bar Council of Tamil Nadu and Puducherry

**ROLE**

Act as a Principal Enterprise Architect, Senior Full-Stack Engineer, UX Architect, AI Engineer, and Business Analyst.

Your task is to develop an enterprise-grade Advocate Enrolment Management System (AEMS) for the Bar Council of Tamil Nadu and Puducherry (BCTNPY).

This is an existing project. First inspect the repository, understand the current architecture, identify completed functionality, and extend the existing application. Do not create a separate project or unnecessarily replace working code.

**PRIMARY OBJECTIVE**

Transform the existing prototype into an AI-assisted digital enrolment office that helps applicants submit applications and enables enrolment officials to process, verify, track, and manage applications efficiently.

The system must support:

1. Applicant registration and application submission.
2. Dynamic document checklist and secure document uploads.
3. AI-assisted document reading and data extraction.
4. Cross-document data validation.
5. Applicant deficiency correction.
6. Official work queues and case allocation.
7. Centralised digital case file.
8. Education and law college verification.
9. Employment, business and study-gap verification.
10. Affidavit and character certificate verification.
11. Restricted criminal antecedent scrutiny.
12. Physical document verification.
13. Fee and payment verification.
14. Appointment scheduling.
15. Enrolment committee review.
16. Senior management dashboards.
17. Audit history and operational reports.

**CORE PRODUCT PRINCIPLE**

One application. One digital case file. One document checklist. One review history. One accountable decision.

All four portals must operate on the same central application record:

- Applicant Portal
- Enrolment Office Portal
- Management Portal
- Enrolment Committee Portal

An applicant correction must update the same case file, preserve previous versions, trigger only relevant revalidations, and return the application to the appropriate official queue.

## PHASE 0: INSPECT THE EXISTING PROJECT

Before writing code:

1. Inspect the complete repository and folder structure.
2. Identify the frontend framework, routing, component library, styling system and build configuration.
3. Inspect all existing pages, components, mock data, assets and reusable UI elements.
4. Identify existing navigation and functional workflows.
5. Identify incomplete screens, broken interactions, duplicated components and technical debt.
6. Check the current GitHub Pages deployment configuration.
7. Identify the existing application entry point and preserve it.

Create an implementation plan based on the actual repository.

Do not:
- Delete existing working screens.
- Replace the entire application without justification.
- Change the deployment configuration unnecessarily.
- Introduce unnecessary dependencies.
- Use real applicant personal information.
- Build a disconnected UI that does not follow the existing application architecture.

After inspection, begin implementation.

## PHASE 1: DESIGN SYSTEM AND APPLICATION SHELL

Create a professional government enterprise application interface.

**Design direction:**
- Clean, modern government administration portal.
- Professional, trustworthy and accessible.
- White and light-grey surfaces.
- Strong contrast using navy blue, royal blue and selected accent colours.
- Clear typography and consistent spacing.
- Cards with subtle borders and highlighted headers.
- Data-dense but readable tables.
- Clear workflow status indicators.
- Responsive layouts for desktop and tablet.

Use the existing design system if it is already suitable. Otherwise, standardise the UI using React, TypeScript, Tailwind CSS and shadcn/ui where appropriate.

Build reusable components:

- ApplicationShell
- SidebarNavigation
- TopNavigation
- Breadcrumbs
- PageHeader
- SummaryCard
- StatusBadge
- DataTable
- SearchFilter
- DocumentUploadCard
- DocumentPreview
- Timeline
- ActivityLog
- ReviewPanel
- ConfirmationDialog
- NotificationPanel
- EmptyState
- LoadingState
- ErrorState

Create four role-based application experiences:

1. Applicant
2. Enrolment Officer
3. Management
4. Committee Member

For the prototype, use a mock role switcher. In production, enforce access through server-side authentication and authorisation.

## PHASE 2: APPLICANT PORTAL

Implement the following screens.

### A01. Fresh Enrolment Registration

Fields:
- Fresh enrolment / already-enrolled advocate selection.
- Full name.
- Email.
- Mobile number.
- Date of birth.
- Gender.
- Email OTP verification.
- Mobile OTP verification.
- Password and confirmation.

Features:
- Duplicate registration check simulation.
- Existing advocate identification.
- OTP verification simulation.
- Application reference generation.

### A02. Applicant Dashboard

Display:
- Application reference number.
- Applicant name.
- Application completion percentage.
- Current application status.
- Pending document count.
- Pending correction count.
- Next required action.
- Appointment details.
- Recent notifications.
- Application activity timeline.

### A03. Instructions and Dynamic Document Checklist

Create a category-based checklist.

Categories:
- Personal identity.
- Photographs and signature.
- School education.
- Higher education.
- Law education.
- Employment and business.
- Affidavits.
- Character certificates.
- Newspaper publication.
- Criminal antecedent declarations.
- Physical submission requirements.

Each checklist item must display:
- Document name.
- Mandatory / conditional / optional.
- Applicable condition.
- Original / scanned copy requirement.
- Upload status.
- OCR status.
- Verification status.
- Deficiency status.
- Applicant action.

The checklist must change dynamically based on applicant declarations.

### A04. Personal Details

Fields:
- Full name as per law degree.
- Gender.
- Disability declaration and certificate, if applicable.
- Date of birth.
- Father's name and occupation.
- Marital status.
- Spouse details, where applicable.
- Blood group.
- Nationality.
- SC/ST declaration for fee purposes, where applicable.
- Alternate mobile number.
- Profile photograph.
- Signature.
- Personal identity proof type, number and document.

### A05. Education History

Support:
- 10th standard.
- 12th / PUC.
- Diploma.
- Other undergraduate degrees.
- Postgraduate qualifications.
- Other qualifications before law education.

Capture:
- Board / university.
- Institution.
- Location.
- Regular / private study.
- Registration number.
- Month and year of passing.
- Marks / percentage / grade.
- Failure attempts.
- Supporting certificates.

Allow multiple education records.

For CBSE records, include:
- School number.
- Examination centre number.
- Admit card ID.

### A06. Education Document Uploads

Create separate upload cards for:
- 10th marksheets.
- 12th marksheets.
- Diploma marksheets and completion certificate.
- Other degree marksheets and completion certificates.
- Law consolidated marksheet.
- Law semester marksheets.

Allow multi-page documents to be uploaded as one PDF.

Provide:
- File preview.
- File replacement.
- Upload progress.
- File validation.
- OCR extraction preview.
- Document version history.

### A07. Employment and Business History

Ask whether the applicant has:
- Employment history.
- Business history.
- Other income or professional activities.

Employment fields:
- Company.
- Designation.
- Public / private employment.
- Appointment date.
- Relieving date.
- Appointment letter.
- Relieving letter.
- PAN.
- Employment-related IT records, where applicable.
- Reason for leaving.
- Employment duration.

Business fields:
- Business name.
- Business category.
- Organisation type.
- Role: proprietor, director, partner or other.
- Start and end dates.
- Business proof.
- Closure proof.
- PAN.
- Relevant tax documents, where applicable.

Allow multiple records.

Calculate education, employment and activity timelines.

Identify gaps and request an appropriate declaration or evidence only when required under Council-approved rules.

Do not automatically treat a study gap, employment gap or absence of tax returns as adverse.

### A08. Communication Details

Capture:
- Address line 1.
- Address line 2.
- Country.
- State.
- District.
- Landmark.
- PIN code.

Compare the declared address against:
- Identity proof.
- Newspaper publication.
- Character certificates.
- Other relevant documents.

Show discrepancies for applicant correction or official review.

### A09. Affidavits and Declarations

Support:
- Undertaking affidavit.
- Other-state affidavit.
- Break affidavit.
- Sworn affidavit.

Capture:
- Affidavit type.
- Execution date.
- Place.
- Stamp paper details.
- Original document confirmation.
- Scanned document.

Use configurable templates. Do not invent legal declarations.

### A10. Law Qualification Details

Capture:
- Law course duration: 3 years / 5 years.
- Course.
- Study mode.
- Country.
- State.
- University.
- College.
- Law registration number.
- Course start date.
- Course completion date.
- Passing month and year.
- Medium of instruction.
- English compulsory subject.
- English proficiency test, if applicable.

Support historical college and university reference data.

The verification reference must account for the academic year in which the applicant studied.

If a college or university cannot be matched, mark it as:

**Manual verification required.**

Do not automatically reject the application.

### A11. Law Documents

Upload:
- Original law degree / provisional certificate.
- Transfer certificate / migration certificate.
- Attendance certificate.
- Consolidated marksheet.
- Conduct certificate.
- Course completion certificate.
- Other applicable supporting records.

Clearly distinguish:
- Original physical document requirement.
- Scanned copy requirement.
- Official verification status.

### A12. Newspaper Notice

Capture:
- Newspaper name.
- Publication date.
- Published name.
- Published address.
- Publication proof.

Include the Council-approved newspaper list as configurable reference data.

Support publication-date and address comparison.

Do not hardcode a legal time period without Council confirmation.

### A13. Criminal Antecedent Declaration

Create two separate sections.

**Pending cases**
- Case number.
- Court.
- Police station.
- FIR number.
- Relevant sections.
- Case status.
- Supporting documents.

**Previous convictions**
- Case number.
- Court.
- Judgment date.
- Relevant sections.
- Judgment and supporting records.

Support FIR, charge sheet, court order and judgment uploads.

Restrict access to authorised officials and committee members.

Critical rule:
An FIR, pending case or allegation is not equivalent to conviction or guilt.

Never use AI to automatically reject an applicant based on criminal antecedent information.

### A14. Character Certificates

Capture:
- Form VI.
- Form VII.
- Advocate enrolment number.
- Advocate name.
- Place of practice.
- Years of practice.
- Supporting documents.
- Verification status.

Support two different recommending advocates, subject to current Council requirements.

Simulate advocate enrolment number lookup using mock data.

### A15. Cross-Document Validation

Create a consolidated validation screen.

Compare:
- Applicant name.
- Father's name.
- Date of birth.
- Address.
- Education details.
- Law college.
- University.
- Registration number.
- Passing year.
- Employment dates.
- Affidavit details.
- Newspaper publication details.

Every discrepancy must show:
- Document name.
- Page number.
- Extracted value.
- Compared value.
- OCR confidence.
- Validation rule.
- Explanation.
- Applicant action.
- Official action.
- Resolution status.

Classify findings as:
1. Missing document.
2. Data mismatch.
3. Low-confidence OCR.
4. Manual verification required.
5. Potential eligibility issue.
6. Resolved.

### A16. Application Preview

Show all applicant-entered information.

Allow the applicant to navigate back and edit sections.

Display outstanding deficiencies and declaration confirmations.

### A17. Payment

Display:
- Applicable fee category.
- Approved fee amount.
- Payment method.
- Transaction reference.
- Payment status.
- Receipt.

Use mock payment integration only.

Never invent current official fee amounts. Use configurable demo values clearly labelled as sample data.

### A18. Submission Confirmation

Generate:
- Application reference.
- Submission receipt.
- Submission timestamp.
- Next steps.
- Original document checklist.
- Appointment guidance.

Clearly state that submission does not mean approval or enrolment.

### A19. Application Tracking

Provide a timeline with:
- Registration.
- Application completion.
- Document upload.
- AI extraction.
- Applicant correction.
- Official scrutiny.
- Physical verification.
- Committee review.
- Decision.
- Enrolment processing.

### A20. Deficiency Correction

Show each deficiency separately.

Allow:
- Correcting information.
- Replacing documents.
- Uploading missing documents.
- Adding explanations.
- Resubmitting affected sections.

Preserve previous submissions and document versions.

Trigger only the validations affected by the correction.

### A21. Appointment Booking

Display available appointment dates and times.

Include:
- Appointment location.
- Date.
- Time.
- Application reference.
- Confirmation.
- Rescheduling.
- Reminder notifications.

Use mock appointment capacity.

### A22. Original Document Checklist

Generate a personalised checklist for physical verification.

Include:
- Original documents.
- Photographs.
- Affidavits.
- Character certificates.
- Newspaper publication.
- Required forms.
- Postal envelope and stamp, if still required.
- Appointment instructions.
- Dress-code guidance, if confirmed by the Council.

Clearly separate online upload requirements from original physical document requirements.

## PHASE 3: ENROLMENT OFFICE PORTAL

This is the most important operational interface.

Design it for officials who must process high volumes of applications.

### O01. Official Login

- Login.
- MFA simulation.
- Role-based navigation.
- Session handling.

### O02. Daily Work Dashboard

Display:
- Total applications.
- New applications.
- Applications awaiting scrutiny.
- Documents awaiting review.
- Deficiency cases.
- Corrections received.
- Physical verification pending.
- Committee-ready applications.
- Overdue tasks.

Use realistic mock data.

### O03. My Work Buckets

Create work queues:

1. New applications.
2. Initial document scrutiny.
3. OCR review.
4. Education verification.
5. Law college verification.
6. Employment and gap review.
7. Affidavit verification.
8. Character certificate verification.
9. Criminal antecedent review.
10. Physical verification.
11. Payment verification.
12. Applicant correction pending.
13. Committee-ready applications.

Each queue must support:
- Search.
- Filters.
- Sorting.
- Priority.
- Assignment.
- Status.
- Ageing.
- Due date.

### O04. Application Search

Search by:
- Application number.
- Applicant name.
- Mobile number.
- Email.
- Law college.
- University.
- Passing year.
- Current status.

Use mock data.

### O05. Digital Case File

This is the central screen of the system.

Display:

**Header**
- Application reference.
- Applicant name.
- Application status.
- Assigned officer.
- Submission date.
- Priority.
- Last updated.

**Left navigation**
- Overview.
- Personal details.
- Education.
- Law qualification.
- Employment.
- Affidavits.
- Newspaper notice.
- Criminal antecedents.
- Character certificates.
- Documents.
- Validation.
- Physical verification.
- Payment.
- Committee history.
- Audit history.

**Main panel**
- Applicant information.
- Document repository.
- OCR extracted information.
- Validation results.
- Official observations.
- Deficiencies.
- Previous decisions.
- Activity timeline.

**Right panel**
- Assigned officer.
- Current task.
- Pending actions.
- Internal notes.
- Escalation.
- Action history.

All information must come from one central mock application record.

### O06. Document Review

Allow officials to:
- Open documents.
- Preview PDFs.
- View document metadata.
- Mark verified.
- Mark deficient.
- Request clarification.
- Add remarks.
- View previous versions.

### O07. OCR Extraction Review

Show a side-by-side layout:

Left:
- Original document preview.

Right:
- Extracted information.
- Confidence score.
- Source page.
- Editable extracted values.
- Verification decision.

Never silently overwrite applicant-entered information.

### O08. Education Verification

Verify:
- School details.
- University.
- College.
- Course.
- Registration number.
- Passing year.
- Marksheets.
- Degree certificate.

Support:
- Verified.
- Mismatch.
- Awaiting external confirmation.
- Manual verification required.

### O09. Employment and Gap Review

Show a chronological education and employment timeline.

Highlight:
- Unexplained gaps.
- Overlapping dates.
- Missing appointment letters.
- Missing relieving letters.
- Business activity.
- Tax document requirements, where applicable.

Provide official remarks and resolution history.

### O10. Affidavit Comparison

Compare declarations against:
- Applicant details.
- Education timeline.
- Address.
- Employment history.
- Other relevant records.

### O11. Law College Verification

Display:
- University.
- College.
- Academic period.
- Course duration.
- Study mode.
- Reference data.
- Verification source.
- Officer decision.

Historical academic-year recognition must be supported.

### O12. Criminal Antecedent Review

Restricted access only.

Display declarations and supporting documents.

Require:
- Authorised reviewer.
- Evidence reference.
- Legal basis.
- Review notes.
- Human decision.

Never automatically infer guilt.

### O13. Deficiency Management

Officials must be able to:
- Select a document or field.
- Enter a clear deficiency reason.
- Specify the correction required.
- Set a response deadline.
- Send the request.
- Track applicant response.
- Reopen scrutiny.

### O14. Physical Verification

Capture:
- Appointment date.
- Original document received.
- Original document checked.
- Document discrepancy.
- Officer remarks.
- Applicant attendance.
- Verification outcome.

### O15. Payment Verification

Display:
- Fee category.
- Payment amount.
- Transaction reference.
- Gateway response simulation.
- Receipt.
- Reconciliation status.

### O16. Appointment Management

Support:
- Calendar.
- Appointment capacity.
- Daily schedule.
- Rescheduling.
- Cancellation.
- Attendance.
- No-show status.

### O17. Committee Preparation

Generate a structured candidate docket containing:
- Application summary.
- Documents.
- Verification outcomes.
- Outstanding issues.
- Official remarks.
- Applicant explanations.
- Prior directions.

### O18. Notifications

Provide applicant and official notifications.

### O19. Reports and Work Progress

Generate:
- Applications received.
- Applications processed.
- Pending applications.
- Average processing time.
- Deficiency rate.
- Correction turnaround time.
- Officer workload.
- Committee-ready cases.

### O20. Audit History

Record:
- User.
- Action.
- Timestamp.
- Previous value.
- New value.
- Reason.
- Related application.
- Document version.

## PHASE 4: MANAGEMENT PORTAL

Create a management command centre.

Screens:

M01. Command Centre
- Total applications.
- Daily receipts.
- Completed applications.
- Pending applications.
- Backlog.
- Processing time.
- Ageing distribution.

M02. Team Workload
- Officer-wise assignments.
- Pending work.
- Completed work.
- Overdue work.
- Capacity.

M03. Work Allocation
- Assign.
- Reassign.
- Bulk allocation.
- Workload balancing.

M04. Daily Progress
- Applications received.
- Applications reviewed.
- Deficiencies issued.
- Corrections received.
- Cases forwarded.

M05. Application Pipeline
- Stage-wise application count.
- Conversion between stages.
- Bottlenecks.

M06. Appointment Capacity
- Available slots.
- Booked slots.
- Attendance.
- No-shows.

M07. Committee Schedule
- Upcoming meetings.
- Cases pending.
- Docket preparation.

M08. Operational Reports
- Date-wise.
- Officer-wise.
- Application-wise.
- Stage-wise.
- Performance trends.

M09. User and Role Management
- Users.
- Roles.
- Permissions.
- Active status.

M10. Audit and Compliance
- Sensitive data access.
- Administrative actions.
- Case changes.
- Decision history.

Do not expose restricted legal or criminal information to management users unless their role specifically authorises it.

## PHASE 5: ENROLMENT COMMITTEE PORTAL

Create a separate committee experience.

Screens:

C01. Committee Dashboard
- Cases awaiting review.
- Upcoming agenda.
- Cases requiring clarification.
- Cases previously deferred.

C02. Committee Agenda
- Meeting date.
- Meeting reference.
- Candidate list.
- Case docket.
- Agenda status.

C03. Candidate Docket
- Applicant profile.
- Education.
- Law qualification.
- Documents.
- Official verification.
- Outstanding discrepancies.

C04. Evidence Review
- Document viewer.
- Verification notes.
- Source references.
- Previous directions.

C05. Decision Recording

Allow authorised committee members to record:
- Decision.
- Reasons.
- Legal basis.
- Conditions.
- Further documents required.
- Follow-up owner.
- Meeting reference.
- Decision date.

Implement the decision workflow only as a simulation until Council-approved committee powers, quorum and delegation rules are supplied.

Do not create automatic approval or rejection.

## PHASE 6: AI DOCUMENT INTELLIGENCE

Implement a simulated AI layer in the prototype, with clear interfaces for future production integration.

AI capabilities:

1. Document classification.
2. OCR extraction.
3. Name and date extraction.
4. Education data extraction.
5. Law college and university extraction.
6. Employment history extraction.
7. Affidavit data extraction.
8. Address extraction.
9. Newspaper publication extraction.
10. Character certificate extraction.
11. Cross-document comparison.
12. Missing document identification.
13. Low-confidence extraction identification.
14. Application summary generation.
15. Evidence-linked discrepancy explanation.

Every AI-generated finding must include:

- Finding.
- Source document.
- Page number.
- Extracted value.
- Confidence.
- Validation rule.
- Human verification status.

For the prototype, use mock OCR output and deterministic validation logic.

Do not pretend mock AI is connected to a real OCR or LLM service.

Production-ready integration boundaries should be defined for:
- OCR service.
- LLM service.
- Document storage.
- Validation engine.
- External verification services.

**AI governance rules:**

AI can assist with extraction, comparison, summarisation and prioritisation.

AI cannot:
- Approve an applicant.
- Reject an applicant.
- Determine legal eligibility independently.
- Decide criminal guilt.
- Replace authorised official scrutiny.
- Modify submitted evidence without traceability.

Sensitive personal characteristics must never be used for operational priority scoring.

## PHASE 7: WORKFLOW ENGINE

Implement a central application state machine.

Suggested statuses:

1. Draft.
2. Registered.
3. Application in progress.
4. Submitted.
5. Document processing.
6. AI review completed.
7. Applicant correction required.
8. Correction submitted.
9. Official scrutiny.
10. External verification pending.
11. Physical verification pending.
12. Payment verification pending.
13. Committee preparation.
14. Committee review.
15. Deferred for clarification.
16. Decision recorded.
17. Enrolment processing.
18. Completed.
19. Withdrawn.

All transitions must be explicit.

Record:
- Previous status.
- New status.
- User.
- Timestamp.
- Reason.
- Related task.

Do not allow unauthorised users to change workflow status.

## PHASE 8: MOCK DATA AND PROTOTYPE BEHAVIOUR

Create realistic fictional applicant data.

Include at least 10 sample applications covering:

- Complete application.
- Missing documents.
- Name mismatch.
- Address mismatch.
- Law college verification pending.
- Education gap.
- Employment history.
- Business history.
- Pending criminal case declaration.
- Applicant correction submitted.

Create:
- Mock official users.
- Mock committee users.
- Mock management users.
- Mock documents.
- Mock notifications.
- Mock appointments.
- Mock audit records.

Use a consistent data model.

All screens must read and update the same mock application state.

Do not build isolated screens with unrelated hardcoded data.

## PHASE 9: TECHNICAL ARCHITECTURE

Preserve the existing frontend framework where practical.

Recommended architecture:

**Frontend**
- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- shadcn/ui.
- React Router.
- TanStack Query when appropriate.
- Zustand or Context for shared state where appropriate.

**Backend production target**
- Python FastAPI.
- PostgreSQL.
- SQLAlchemy.
- Pydantic.
- Secure object storage.
- OCR service.
- LLM integration.
- Notification service.
- Audit service.

Start with a modular monolith. Do not introduce microservices without a clear scaling or security need.

Suggested modules:

src/
  app/
  components/
  layouts/
  modules/
    applicant/
    official/
    management/
    committee/
    administration/
  data/
  services/
  hooks/
  types/
  utils/
  styles/

Organise by business domain.

## PHASE 10: SECURITY AND DATA PROTECTION

Design the prototype to demonstrate:

- Role-based access.
- Object-level application access.
- Sensitive data restrictions.
- Document versioning.
- Audit history.
- Secure upload validation.
- Input validation.
- Session handling.
- No exposure of secrets in frontend code.

Production requirements must include:
- Server-side authentication.
- MFA for officials.
- Encryption in transit and at rest.
- Secure document storage.
- Access logging.
- Backup and recovery.
- Retention and deletion policy.
- Security testing.
- Applicable data protection compliance.

GitHub Pages is a frontend hosting platform. Do not store real applicant records, credentials, API keys or confidential documents in the prototype.

## PHASE 11: FUNCTIONAL TESTING

Test the complete applicant-to-committee workflow.

Scenario 1:
Applicant registers, completes details, uploads documents and submits.

Scenario 2:
AI identifies missing documents and a name mismatch.

Scenario 3:
Official reviews the application and issues a deficiency.

Scenario 4:
Applicant corrects the information and uploads a replacement document.

Scenario 5:
System revalidates the affected fields and returns the case to the correct queue.

Scenario 6:
Official completes scrutiny and physical verification.

Scenario 7:
Case is forwarded for committee review.

Scenario 8:
Committee records a decision with reasons.

Scenario 9:
Management dashboard reflects the updated application status.

Test:
- Navigation.
- Search.
- Filtering.
- Sorting.
- Forms.
- Validation.
- Upload simulation.
- Document preview.
- Workflow transitions.
- Notifications.
- Role access.
- Responsive layouts.
- Error states.

## IMPLEMENTATION RULES

1. Work directly in the existing repository.
2. Inspect before editing.
3. Implement in phases.
4. Complete one phase before starting the next.
5. Do not generate placeholder screens that have no working interactions.
6. All buttons must perform a meaningful action.
7. All forms must validate and save data.
8. All modules must share consistent application records.
9. Use fictional data only.
10. Maintain a clean, reusable component architecture.
11. Avoid unnecessary dependencies.
12. Do not break existing routes or deployment.
13. Keep the application buildable after each phase.
14. Run the build and resolve errors after implementation.
15. Keep the design consistent across all four portals.

## EXECUTION ORDER

Follow this order:

1. Repository inspection and implementation plan.
2. Application shell and design system.
3. Applicant portal.
4. Central mock data model and shared state.
5. Official portal and digital case file.
6. AI simulation and cross-document validation.
7. Management portal.
8. Committee portal.
9. Workflow, notifications and audit.
10. Testing, responsive design and deployment verification.

After each phase:

- List files created or changed.
- Explain functionality implemented.
- Identify incomplete items.
- Run the build.
- Fix errors.
- Confirm the phase acceptance criteria.
- Proceed to the next phase.

Do not stop after producing a plan. Execute the implementation.

## FINAL ACCEPTANCE CRITERIA

The completed prototype must demonstrate:

1. Four role-based portals.
2. A complete applicant enrolment journey.
3. A dynamic document checklist.
4. A central digital case file.
5. Document review and OCR simulation.
6. Cross-document validation.
7. Applicant deficiency correction.
8. Official work queues.
9. Education and law college verification.
10. Physical verification.
11. Payment and appointment simulation.
12. Committee docket and decision simulation.
13. Management dashboards.
14. Notifications.
15. Audit history.
16. Consistent shared application data.
17. Responsive and professional UI.
18. Successful production build.
19. Existing GitHub Pages deployment preserved.

**IMPORTANT LEGAL AND BUSINESS CONSTRAINT**

The supplied BCTNPY enrolment process and document requirements are the initial business baseline. They are not a substitute for current Council-approved rules.

Do not invent statutory requirements, eligibility conditions, fee amounts, committee powers, document requirements or legal time limits.

Make these configurable and flag items requiring confirmation from the Bar Council.

The system must support human scrutiny and accountable decision-making. It must not automate statutory enrolment decisions.

**BEGIN NOW: Inspect the existing repository, report the actual architecture and start Phase 1 implementation.**