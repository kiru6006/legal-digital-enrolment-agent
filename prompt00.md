# MASTER PROMPT: ADVOCATE ENROLMENT MANAGEMENT SYSTEM (AEMS)
## Build a Fully Navigable AI-Assisted Digital Enrolment Office MVP

### 1. YOUR ROLE

Act as a senior product architect, UX designer and full-stack React engineer.

Build a functional Minimum Viable Product (MVP) for the **Advocate Enrolment Management System (AEMS)** proposed for the Bar Council of Tamil Nadu and Puducherry.

This is a visual and functional demonstration of how a digital enrolment office can reduce administrative work for officials and improve the application experience for applicants.

Do not build a static dashboard or a collection of disconnected HTML screens.

Build a complete, navigable web application with working buttons, forms, tables, tabs, filters, modals, workflow transitions, simulated AI processing and realistic sample data.

The application must:

- Run locally on a developer's machine.
- Be deployable to GitHub Pages.
- Work without a production backend.
- Use fictional applicant and officer data.
- Demonstrate AI-assisted administrative workflows.
- Allow users to navigate between all screens.
- Preserve demo changes using browser localStorage.
- Have a professional enterprise-government design.

### 2. PRODUCT VISION

Product name:

**AEMS | Digital Enrolment Office**

Tagline:

**Simplifying Advocate Enrolment. Empowering Officials. Improving Transparency.**

The system must demonstrate the transformation from a manual, document-heavy enrolment process into a structured digital workflow.

The core operating principle:

One application. One digital case file. One document checklist. One review history. One accountable decision.

The MVP must demonstrate how AI helps officials prepare and review applications. AI must not independently approve, reject or determine legal eligibility.

### 3. TECHNOLOGY STACK

Use:

- React 18 or later.
- TypeScript.
- Vite.
- React Router.
- Tailwind CSS.
- shadcn/ui or equivalent reusable components.
- Lucide React icons.
- Recharts for charts.
- Zustand or React Context for application state.
- localStorage for persistence.
- Mock service layer for API and AI operations.

Use a modular component architecture.

Suggested folder structure:

src/
  app/
    App.tsx
    routes.tsx
  components/
    layout/
    navigation/
    dashboard/
    tables/
    forms/
    modals/
    charts/
    ai/
    case-file/
    notifications/
  pages/
    landing/
    applicant/
    officer/
    management/
    committee/
    admin/
  features/
    applications/
    documents/
    ai-review/
    deficiencies/
    assignments/
    notifications/
    appointments/
    reports/
  data/
    mockApplicants.ts
    mockApplications.ts
    mockUsers.ts
    mockDocuments.ts
    mockNotifications.ts
  services/
    applicationService.ts
    documentService.ts
    aiDemoService.ts
    notificationService.ts
  store/
    applicationStore.ts
    authStore.ts
  types/
    application.ts
    document.ts
    user.ts
  utils/
  styles/

Use reusable components. Do not place the entire application in one large component.

### 4. DESIGN SYSTEM

Create a modern enterprise administrative application.

Design characteristics:

- Clean and professional.
- Bright, readable colours.
- Strong contrast.
- White and light-grey surfaces.
- Blue as the primary action colour.
- Green for completed work.
- Amber for pending review.
- Red for errors and critical deficiencies.
- Violet for AI-assisted activities.
- Cards with subtle borders and clear visual separation.
- Rounded corners, but avoid excessive pill-shaped UI.
- Professional typography.
- Compact but readable tables.
- Consistent spacing.
- Clear status labels.
- Responsive layout.

Avoid:
- Excessive gradients.
- Excessive shadows.
- Oversized dashboard cards.
- Decorative animations.
- Unnecessary empty space.
- Fake statistics without supporting sample records.

Build a reusable design system for:
- Buttons.
- Cards.
- Tables.
- Status badges.
- Tabs.
- Search fields.
- Date filters.
- Dropdowns.
- Side navigation.
- Modals.
- Drawers.
- Toast notifications.
- Timeline.
- Progress indicators.
- AI insight panels.

### 5. APPLICATION ENTRY AND DEMO ROLE SELECTION

Create a professional landing page.

Display:

AEMS
Digital Enrolment Office

A short explanation:

"A central digital workspace for applicants, enrolment officials and authorised management."

Provide four role-based demo entry cards:

1. Applicant Portal
2. Enrolment Official
3. Senior Management
4. Committee Member

Each card must navigate to its corresponding dashboard.

Also include a persistent Demo Role Switcher in the top navigation so the presenter can switch between roles during a live demonstration.

Do not implement real authentication in this MVP.

Clearly indicate:

"Demonstration environment. Sample data only."

### 6. APPLICATION NAVIGATION

Every screen must be reachable through navigation and working actions.

Use React Router with routes such as:

/
 /applicant/dashboard
 /applicant/new-application
 /applicant/application/:id
 /applicant/documents
 /applicant/notifications
 /applicant/appointments

 /officer/dashboard
 /officer/work-queue
 /officer/case/:id
 /officer/ai-review/:id
 /officer/deficiencies
 /officer/verification
 /officer/completed

 /management/dashboard
 /management/workload
 /management/progress
 /management/reports
 /management/committee

 /committee/dashboard
 /committee/case/:id
 /committee/meeting-pack

 /admin/users
 /admin/checklists
 /admin/configuration

Implement:
- Sidebar navigation.
- Breadcrumbs.
- Top navigation.
- Search.
- Notification centre.
- Profile and role switcher.
- Back navigation.
- Page titles and descriptions.

No dead links or non-functional navigation.

### 7. MODULE 1: APPLICANT PORTAL

#### Screen APP-01: Applicant Dashboard

Display:

- Welcome message.
- Application reference number.
- Current application status.
- Application progress bar.
- Current processing stage.
- Documents submitted.
- Documents requiring attention.
- Recent notifications.
- Next expected action.
- Appointment details, if applicable.

Use fictional applicant data.

Sample application:

Applicant: Arjun Kumar
Reference: AEMS-2026-00125
Status: Correction Required
Progress: 55%

Show an actionable alert:

"Two documents require attention. Review the reasons and upload corrected documents."

Buttons:
- View Application.
- Upload Corrections.
- View Notifications.
- Download Application Summary.

All buttons must work.

#### Screen APP-02: New Application

Create a multi-step application form:

1. Personal Information.
2. Education Details.
3. Employment Details.
4. Communication Address.
5. Law Qualification Details.
6. Supporting Documents.
7. Preview and Submit.

Include:
- Required field validation.
- Save Draft.
- Previous and Next.
- Step progress indicator.
- Preview.
- Submit Application.

Use realistic but fictional fields.

Do not claim the fields represent the complete official BCTNPY application form. Label this as an illustrative MVP application form.

After submission:
- Generate a demo reference number.
- Save the application.
- Navigate to the application details page.
- Show a submission confirmation.

#### Screen APP-03: Application Details

Display:

- Applicant details.
- Application reference.
- Status.
- Processing timeline.
- Submitted documents.
- Official observations visible to applicants.
- Correction requests.
- Appointment information.
- Notification history.

#### Screen APP-04: Document Correction

This is a key demonstration screen.

Show a deficiency request:

Example:
- Name mismatch between application and degree certificate.
- Address proof is unclear.
- Required document page is missing.

For each deficiency display:
- Document name.
- Reason.
- Official observation.
- Required correction.
- Upload button.
- Current document version.
- Correction status.

When the applicant uploads a corrected document:
- Create a new document version.
- Mark the deficiency as correction submitted.
- Update the application.
- Notify the official dashboard.
- Show a confirmation to the applicant.

Use sample PDF files or generated placeholder document previews. Do not require real applicant documents.

#### Screen APP-05: Applicant Notifications

Display notification categories:

- Application received.
- Documents under review.
- Correction required.
- Correction received.
- Verification completed.
- Appointment scheduled.
- Application status updated.

Add:
- Read/unread status.
- Notification date.
- Related application reference.
- View details action.

Demonstrate a daily applicant digest with a clear summary of changes and pending actions.

### 8. MODULE 2: OFFICIAL WORKSPACE

This module is the most important part of the demo.

The system must show how the workload of enrolment officials can be reduced.

#### Screen OFF-01: Official Dashboard

Display:

- My assigned applications.
- New applications today.
- Ready for review.
- Corrections received.
- Verification pending.
- Completed today.
- Cases awaiting external information.

Include a "My Daily Work" section.

Example:

| Work bucket | Count |
|---|---:|
| New applications | 18 |
| Ready for review | 12 |
| Corrections received | 7 |
| Verification pending | 9 |
| External dependency | 3 |
| Completed today | 11 |

All counts must derive from mock application records.

Include a work-priority section:
- Critical.
- High.
- Medium.
- Low.

Add buttons:
- Open Work Queue.
- Review New Applications.
- Review Corrections.
- View Completed Work.

#### Screen OFF-02: Work Queue

Create a searchable and filterable application table.

Columns:
- Application ID.
- Applicant name.
- Submission date.
- Current stage.
- Document status.
- AI preparation status.
- Assigned officer.
- Priority.
- Last updated.
- Action.

Filters:
- Status.
- Priority.
- Date.
- Assigned officer.
- Document completeness.
- AI review status.

Table row click must open the digital case file.

Allow:
- Sorting.
- Search.
- Pagination or a manageable page size.
- Selecting multiple records.
- Bulk assignment.
- Export sample report.

Bulk operations must be simulated and must not perform real legal decisions.

#### Screen OFF-03: Digital Case File

This is the central screen of the official workspace.

Create a complete application case file with tabs:

1. Overview.
2. Applicant Details.
3. Documents.
4. AI Review.
5. Verification.
6. Deficiencies.
7. Activity History.
8. Decision Record.

The Overview should show:
- Application summary.
- Current stage.
- Assigned official.
- Checklist completion.
- Outstanding items.
- Recent activity.
- Next required action.

The Documents tab should show:
- Document name.
- Document category.
- Upload date.
- Version.
- AI classification.
- Verification status.
- Preview action.

The Activity History tab should show every simulated action chronologically.

Add a right-side action panel:
- Start Review.
- Run AI Review.
- Mark Verified.
- Raise Deficiency.
- Forward to Next Stage.

Only authorised demo roles should see relevant actions.

All status transitions must update the shared application state.

#### Screen OFF-04: AI Document Review

This screen must demonstrate AI's practical value.

Create an interactive AI review workspace.

Display document cards for:

- Degree Certificate.
- Law Degree Certificate.
- Marksheets.
- Identity Proof.
- Address Proof.
- Photograph.
- Signature.

Each document should have:
- Preview.
- Detected document category.
- Extracted fields.
- Confidence indicator.
- Validation observations.
- Verification status.

Provide a button:

"Run AI Document Review"

On clicking:
1. Show a processing animation.
2. Display simulated document classification.
3. Display simulated OCR extraction.
4. Compare extracted fields with application information.
5. Compare documents against the approved demo checklist.
6. Generate possible inconsistencies.
7. Generate a structured review summary.

Example AI output:

Document: Law Degree Certificate

Extracted information:
- Applicant name: Arjun Kumar
- University: Sample University
- Degree: Bachelor of Laws
- Year: 2024

Cross-document comparison:
- Applicant name: Match.
- Degree qualification: Match.
- University: Requires verification.
- Certificate number: Extracted.

Checklist:
- Required document uploaded: Yes.
- Document readable: Yes.
- Required fields extracted: Yes.
- Official verification: Pending.

AI observations:
- No obvious name mismatch identified.
- University details require verification against an approved source.
- Final authenticity and eligibility must be checked by an authorised official.

Confidence:
92% extraction confidence.

Important: These are simulated outputs. Do not claim that actual OCR or an external AI model was used.

Provide:
- Accept AI extraction.
- Edit extracted information.
- Mark as verified.
- Flag for manual review.
- View source document.

All actions must be functional.

#### Screen OFF-05: AI Work Reduction Panel

Create a dedicated screen that demonstrates the difference between manual and AI-assisted processing.

Display a side-by-side comparison:

| Manual process | AI-assisted process |
|---|---|
| Open documents individually | Automatic document classification |
| Read documents manually | Extract key fields |
| Enter data repeatedly | Pre-filled extracted information |
| Check each checklist item | Automated checklist preparation |
| Compare applicant details manually | Cross-document comparison |
| Draft deficiency notices manually | AI-assisted deficiency draft |
| Prepare case summary manually | Structured case summary |

Include a sample application workflow.

Show illustrative time estimates:

Manual preparation: 40 minutes.
AI-assisted preparation: 12 minutes.
Illustrative preparation time saved: 28 minutes.

Clearly label these as demo assumptions, not measured production results.

Add a visual chart showing estimated time saved across sample applications.

#### Screen OFF-06: Deficiency Management

Show:
- Deficiencies raised.
- Awaiting applicant correction.
- Corrections received.
- Ready for re-review.
- Resolved deficiencies.

Allow the official to:
- Create deficiency.
- Select document.
- Enter reason.
- Add correction instructions.
- Preview notice.
- Send demo notification.
- Review corrected document.
- Close deficiency.

Provide standard templates.

AI may draft the notice, but the official must review and send it.

#### Screen OFF-07: Verification Workspace

Provide a structured checklist.

Example:
- Applicant identity.
- Personal information consistency.
- Educational qualification documents.
- University verification.
- Address proof.
- Required declarations.
- Payment status.

Each item must have:
- Pending.
- Verified.
- Requires clarification.
- Not applicable.

Allow an official to enter observations and save them.

Do not treat AI output as official verification.

#### Screen OFF-08: Completed Work

Display:
- Completed applications.
- Cases forwarded.
- Verification completed.
- Deficiencies resolved.
- Completion date.
- Officer.

Provide search, filters and export.

### 9. MODULE 3: SENIOR MANAGEMENT COMMAND CENTRE

This module must demonstrate institutional operational visibility.

#### Screen MGT-01: Management Dashboard

Display:

KPI cards:
- Total active applications.
- Applications received this month.
- Applications completed.
- Applications awaiting scrutiny.
- Applications awaiting committee.
- Applications requiring applicant action.

Charts:
- Application stage distribution.
- Weekly application intake.
- Weekly completed applications.
- Team-wise workload.
- Pending application ageing.

Add a "Today's Operational Summary" panel.

Example:
- 25 new applications received.
- 19 applications completed.
- 14 corrections received.
- 8 cases ready for committee review.
- 5 cases awaiting external verification.

All figures must derive from mock data.

#### Screen MGT-02: Team Workload

Show a team and officer workload view.

Columns:
- Officer.
- Assigned cases.
- New cases.
- Completed today.
- Pending cases.
- Cases awaiting external input.
- Workload status.

Do not create a public employee ranking or blame-oriented leaderboard.

The purpose is to help management identify:
- Uneven workloads.
- Capacity constraints.
- Pending dependencies.
- Cases requiring reassignment.
- Training or process support needs.

Provide:
- View officer workload.
- View assigned cases.
- Reassign selected cases.
- Add operational note.

All assignments must update the shared state.

#### Screen MGT-03: Application Progress

Show stage-wise progress:

- Submitted.
- AI preparation.
- Official scrutiny.
- Correction requested.
- Verification.
- Committee preparation.
- Committee consideration.
- Decision recorded.
- Completed.

Include:
- Stage counts.
- Average time in stage using mock data.
- Ageing distribution.
- Cases with blockers.
- Cases requiring attention.

#### Screen MGT-04: Reports

Provide report types:

- Daily application report.
- Weekly processing report.
- Officer workload report.
- Deficiency report.
- Application ageing report.
- Committee preparation report.
- AI processing summary.

Allow date filters and CSV export using mock data.

#### Screen MGT-05: Committee Preparation

Display cases ready for committee consideration.

Provide:
- Applicant summary.
- Case reference.
- Verification completion.
- Outstanding observations.
- Document checklist.
- Meeting agenda.
- Meeting pack preview.

Committee decisions must only be recorded by the committee demo role.

### 10. MODULE 4: COMMITTEE WORKSPACE

#### Screen COM-01: Committee Dashboard

Display:
- Cases awaiting consideration.
- Meeting schedule.
- Deferred cases.
- Decision records.
- Meeting agenda.

#### Screen COM-02: Committee Case Review

Show:
- Complete application summary.
- Verified documents.
- Official observations.
- AI-generated summary, clearly labelled as assistance.
- Outstanding issues.
- Case history.

Provide demo decision options:
- Record decision.
- Defer for further information.
- Return for clarification.

These are simulated workflow actions only. The production decision process and available legal outcomes must be validated.

Record:
- Decision status.
- Observation.
- Committee meeting reference.
- Demo user.
- Date and time.

### 11. MODULE 5: ADMINISTRATION

Create simple administration screens for:

- Demo users and role assignment.
- Checklist configuration.
- Document category configuration.
- Notification templates.
- Workflow stage configuration.

Allow changes to sample configuration and persist them in localStorage.

Do not create unrestricted administrative access to legal decisions.

### 12. AI DEMONSTRATION ENGINE

Implement a dedicated mock AI service.

File:
src/services/aiDemoService.ts

The service should provide deterministic sample outputs for:

1. Document classification.
2. OCR field extraction.
3. Cross-document comparison.
4. Checklist validation.
5. Possible discrepancy detection.
6. Document version comparison.
7. Deficiency notice drafting.
8. Case summary generation.
9. Committee summary generation.
10. Daily management briefing.

Every AI result must contain:

- Task performed.
- Input document or record.
- Output.
- Confidence indicator where meaningful.
- Warnings.
- Source references.
- Human review status.

Provide an AI activity log.

Use a visible label:

"AI-Assisted Demo. Simulated results."

Do not fabricate external AI API connectivity.

Structure the service so that a real approved OCR/LLM backend can replace the mock service later without rebuilding the UI.

### 13. END-TO-END DEMONSTRATION SCENARIO

Create one preconfigured scenario that can be demonstrated in 5–8 minutes.

Use applicant:

Arjun Kumar
Application ID: AEMS-2026-00125

Initial state:
- Application submitted.
- Six documents uploaded.
- One address proof requires attention.
- One name mismatch is flagged for official review.

Demonstration sequence:

**Step 1: Applicant submits application**
- Open Applicant Portal.
- View application status.
- View submitted documents.

**Step 2: Official receives work**
- Switch to Enrolment Official.
- Open daily work queue.
- Find the new application.

**Step 3: AI reviews documents**
- Open digital case file.
- Run AI Document Review.
- Show extracted data.
- Show checklist validation.
- Show possible discrepancy.

**Step 4: Official reviews AI output**
- Inspect source document.
- Accept or edit extraction.
- Record an observation.
- Raise a deficiency.

**Step 5: Applicant receives notification**
- Switch to Applicant Portal.
- Open notifications.
- View deficiency details.
- Upload corrected document.

**Step 6: Official reviews correction**
- Switch to Official Workspace.
- Open corrections received.
- Compare old and new document versions.
- Mark deficiency resolved.

**Step 7: Management sees progress**
- Switch to Senior Management.
- Show workload and stage distribution.
- Show work completed and pending.
- Show the case progressing through the workflow.

**Step 8: Committee preparation**
- Open Committee Workspace.
- Show committee-ready case summary and meeting pack.

All actions must update the same shared application record.

Create a "Reset Demo Scenario" button so the presenter can restore the initial state at any time.

### 14. SHARED APPLICATION STATE

This is a mandatory requirement.

Applicant, officer, management and committee screens must use the same application state.

For example:

When an official raises a deficiency:
- Applicant dashboard must show correction required.
- Applicant notification centre must receive a notification.
- Officer deficiency queue must show the new deficiency.
- Management dashboard must update the relevant counts.

When an applicant uploads a correction:
- The corrected document version must appear in the case file.
- The deficiency status must change.
- The official correction queue must update.
- Management reporting must reflect the new status.

Do not implement separate disconnected mock datasets for each screen.

Use a shared state store and persist changes to localStorage.

### 15. SAMPLE DATA

Create at least:

- 20 fictional applicants.
- 20 fictional applications.
- 5 demo officials.
- 1 senior management user.
- 2 committee members.
- Multiple document records.
- Different application stages.
- Deficiency examples.
- Verification examples.
- Appointment examples.
- Notification examples.

Use varied records to populate dashboards and charts.

Provide one fully configured primary demo application for the end-to-end scenario.

Never use real personal information.

### 16. INTERACTION AND FUNCTIONALITY REQUIREMENTS

Every important visible control must work.

Mandatory:
- Navigation.
- Search.
- Filters.
- Sorting.
- Tabs.
- Dropdowns.
- Form validation.
- File upload simulation.
- Document preview.
- Modals.
- Notifications.
- Status updates.
- Application assignment.
- Deficiency creation.
- Correction submission.
- AI review simulation.
- Document version comparison.
- CSV export.
- Demo reset.
- Role switching.

No buttons that do nothing.

If a feature is not implemented, do not display it as a working feature. Mark it clearly as "Planned".

### 17. GITHUB PAGES AND LOCAL EXECUTION

The project must run locally.

Required commands:

npm install
npm run dev
npm run build
npm run preview

Configure Vite base path correctly for GitHub Pages.

Use a GitHub Pages deployment workflow with GitHub Actions.

Ensure React Router works on GitHub Pages. Use HashRouter if needed to avoid route-refresh 404 errors.

The application must not require environment secrets or a production API.

All sample data and simulated AI processing must work offline after dependencies are installed.

Add:
- README.md
- Setup instructions.
- Local run instructions.
- GitHub Pages deployment instructions.
- Demo walkthrough.
- Known limitations.
- Production architecture notes.

### 18. MVP SCOPE BOUNDARIES

Build now:
- Fully navigable UI.
- Applicant journey.
- Official work queue.
- Digital case file.
- AI-assisted demo processing.
- Deficiency and correction flow.
- Management dashboards.
- Committee preparation screens.
- Shared state.
- Local persistence.
- GitHub Pages deployment.

Do not build now:
- Real authentication.
- Real payment gateway.
- Real SMS or email service.
- Live university verification.
- Production document storage.
- Production AI API integration.
- Real legal decision automation.
- Actual BCTNPY data integration.

Clearly distinguish simulated capabilities from production capabilities.

### 19. ACCEPTANCE CRITERIA

The MVP is complete only when:

1. The application runs locally without errors.
2. All major screens are accessible through navigation.
3. Role switching works.
4. Applicant submissions can be created and viewed.
5. Documents can be simulated and reviewed.
6. AI review generates structured sample results.
7. Officials can raise deficiencies.
8. Applicants can submit corrections.
9. Document versions can be compared.
10. Management dashboards update after workflow changes.
11. Committee screens show the same application records.
12. CSV export works.
13. Demo reset restores the initial scenario.
14. Data persists across page refreshes.
15. GitHub Pages deployment is configured.
16. No real applicant information is present.
17. No critical buttons are non-functional.
18. The production limitations are clearly documented.

### 20. DEVELOPMENT EXECUTION RULES

Do not generate all screens as static placeholders.

Follow this development sequence:

**Phase 1: Foundation**
- Project setup.
- Design system.
- Routing.
- Sidebar and top navigation.
- Role switching.
- Shared state.
- Sample data.

**Phase 2: Applicant Portal**
- Dashboard.
- Application form.
- Application details.
- Document upload.
- Correction journey.
- Notifications.

**Phase 3: Official Workspace**
- Official dashboard.
- Work queue.
- Digital case file.
- AI document review.
- Deficiency management.
- Verification.
- Completed work.

**Phase 4: Management and Committee**
- Management dashboard.
- Team workload.
- Application progress.
- Reports.
- Committee dashboard.
- Case review and meeting pack.

**Phase 5: Integration and Demo**
- Shared workflow.
- AI demo service.
- Notifications.
- State persistence.
- End-to-end scenario.
- Reset function.

**Phase 6: Quality and Deployment**
- Test all navigation.
- Test all workflow transitions.
- Test local build.
- Configure GitHub Pages.
- Write README.
- Fix runtime errors.

After each phase:
- Run the application.
- Check browser console.
- Test the main interactions.
- Fix issues before proceeding.

Do not stop after producing a plan or wireframes. Implement the actual code.

At completion, provide:
- List of implemented screens.
- Local execution instructions.
- GitHub Pages deployment instructions.
- End-to-end demo sequence.
- Known limitations.
- Screens or workflows that remain incomplete.

**Final objective:**

Deliver a working AEMS MVP that can be demonstrated to senior Bar Council officials as a practical example of how AI-assisted document processing, digital case files, applicant self-service and official work management can reduce administrative effort and improve enrolment operations.