The BRD should include HTML-style wireframes alongside the business requirements so Bar Council officials can understand how the proposed system will actually work.

I recommend adding the following visual sections. These are illustrative screen designs, not representations of the existing BCTNPY portal.

# 1. Applicant portal

## 1.1 Applicant dashboard

Business purpose: Give applicants a single place to view application progress, outstanding actions, notifications and enrolment information.

## Advocate Enrolment Portal

Logged in

Welcome, Applicant · Application AEMS-2026-1045

# 65%

Application progress

# 1

Action required

Application progress

1. Application submitted&#x20;

   Complete

2. Document verification&#x20;

   In progress

3. Final scrutiny&#x20;

   Pending

4. Committee consideration&#x20;

   Pending

5. Enrolment and certificate&#x20;

   Pending



Action required\
Upload your missing semester marksheet.

Correction required

Illustrative application information.

Recent notifications

- Application received.
- Identity documents verified.
- Education verification started.
- Missing document notification issued.

## 1.2 Applicant correction screen

Business purpose: Remove confusion about what needs to be corrected. Applicants should not have to contact the office to understand a deficiency.

Correction request

AEMS-2026-1045

Action required

Missing document: Semester 6 marksheet

Reason: The submitted academic records do not include the final semester marksheet.

Required action: Upload the complete semester 6 marksheet.

Upload corrected document

PDF or image. File requirements will follow the approved document policy.

Select document to upload

Illustrative control only

Previous submission history

- Version 1: Submitted 12 October.
- Correction requested: 15 October.
- Version 2: Awaiting submission.

# 2. Officials' workspace

## 2.1 Daily work bucket dashboard

Business purpose: Every official should know exactly what work is assigned to them, what they have completed and what needs their attention.

Officials' Workspace

Education Verification

# Good morning

Today's work allocation · Illustrative data

# 28

Assigned

# 12

Completed

# 10

Ready for review

# 6

Awaiting action

My work buckets

| Task                      | Count |
| ------------------------- | ----- |
| New applications          | 8     |
| Degree verification       | 10    |
| Corrections received      | 4     |
| Ready to forward          | 3     |
| Approvals awaiting action | 2     |
| Appointments today        | 1     |

My assigned applications

| Application | Work item           | Status |
| ----------- | ------------------- | ------ |
| AEMS-1045   | Degree verification | Review |
| AEMS-1046   | Marksheets          | New    |
| AEMS-1047   | Corrected document  | Review |

## 2.2 Digital case file and AI review

Business purpose: Eliminate the need to open many separate documents and manually prepare summaries.

Digital Case File

Under review

## AEMS-2026-1045

Applicant: Demo Applicant · Enrolment batch: 2026

# 12/14

Documents received

# 2

Potential exceptions

Category-wise review

| Category         | AI preparation           | Officer action      |
| ---------------- | ------------------------ | ------------------- |
| Personal details | Extracted                | Verify              |
| Identity         | Matched                  | Confirm             |
| Education        | One item missing         | Review              |
| Employment       | Conditional item flagged | Check applicability |
| Payment          | Receipt identified       | Reconcile           |

AI-generated case briefing

- Degree certificate identified.
- Semester 1 to 5 marksheets identified.
- Semester 6 marksheet not identified.
- Name comparison requires officer verification.

  Human review required

  Every observation must link to the source document and extraction evidence.

Officer actions

Mark verified

Raise deficiency

Request clarification

Forward case

Escalate

# 3. Senior management command centre

Business purpose: Give senior officials a consolidated view of work across the enrolment office without requiring manual reports from every team.

AEMS Command Centre

Management view

# 486

Active applications

# 126

Completed this month

# 94

Ready for review

# 32

Committee pending

Team progress

| Department             | Assigned | Completed today |
| ---------------------- | -------- | --------------- |
| Document scrutiny      | 120      | 35              |
| Education verification | 85       | 22              |
| Accounts               | 46       | 18              |
| Final scrutiny         | 34       | 12              |

Application stage distribution

Document scrutiny

35%

Education verification

25%

Final scrutiny

20%

Committee

12%

Other

8%

Daily operational summary

- 87 applications moved to the next stage.
- 24 applicant corrections received.
- 19 applications prepared for committee.
- 12 authorised decisions recorded.
- 8 cases require administrative intervention.

  All figures are illustrative, not actual Bar Council data.

# 4. Task allocation screen

Business purpose: Help supervisors distribute work based on functional responsibility, capacity and application requirements.

Work allocation

Supervisor view · Illustrative

| Official  | Assigned | Completed today |
| --------- | -------- | --------------- |
| Officer A | 28       | 12              |
| Officer B | 24       | 16              |
| Officer C | 32       | 14              |
| Officer D | 20       | 11              |

New assignment

Application: AEMS-2026-1048

Functional queue: Education verification

Select an authorised officer and assign the task.

Assignment controls

- Officer selection
- Work category
- Assignment priority
- Due date, if applicable
- Assignment notes

Illustrative controls. Actual assignments must follow approved role permissions.

# 5. Committee management screen

Business purpose: Reduce manual preparation of committee papers and ensure that authorised members can review complete, indexed case files.

Committee meeting workspace

Illustrative meeting

Agenda preparation

Upcoming committee meeting

Meeting date: 20 November 2026

# 32

Cases identified

# 26

Case files prepared

Agenda list

| Application | File readiness        |
| ----------- | --------------------- |
| AEMS-1045   | Complete              |
| AEMS-1046   | Complete              |
| AEMS-1047   | Clarification pending |
| AEMS-1048   | Complete              |

Digital meeting pack

- Applicant summary.
- Indexed supporting documents.
- Officer observations.
- Previous decisions, where applicable.
- Space to record authorised committee observations and decisions.

# 6. Daily notification examples

## Applicant notification

Daily enrolment update

Your application AEMS-2026-1045 is currently under education verification.

Your identity documents have been verified. One academic document requires correction.

Please log in to the applicant portal to review the correction request.

Illustrative notification. Actual delivery depends on approved integration.

## Official notification

Your daily work allocation

You have 8 new applications, 4 corrected documents and 3 cases ready for forwarding.

Your assigned appointments and pending review tasks are available in your work dashboard.

Illustrative notification.

## Senior official briefing

Daily enrolment briefing

- 42 applications received.
- 87 applications advanced to the next stage.
- 24 applicant corrections received.
- 19 cases prepared for committee consideration.
- 12 authorised decisions recorded.

The detailed team-wise dashboard is available in the command centre.

Illustrative briefing.

# 7. End-to-end process visual

Applicant submits application

Personal information and supporting documents

AI-assisted preparation

Classification, OCR, checklist and case summary

Official work bucket

Assigned officer reviews the digital case file

Correction needed

Notify applicant and receive corrected documents

Ready for next stage

Forward for authorised scrutiny or decision

Committee and final processing

Approved workflow and human decision-making

Enrolment records and applicant notification

Final status, register and certificate processes

# 8. HTML skeleton for the BRD and Antigravity

The following is a reusable low-fidelity HTML screen structure. It can be expanded into the full interactive prototype during development.

```
<div class="aems-app">
  <header class="topbar">
    <div class="brand">AEMS</div>
    <nav>
      <a href="#dashboard">Dashboard</a>
      <a href="#applications">Applications</a>
      <a href="#notifications">Notifications</a>
    </nav>
    <div class="profile">Demo User</div>
  </header>

  <aside class="sidebar">
    <a href="#overview">Overview</a>
    <a href="#my-work">My Work</a>
    <a href="#case-review">Case Review</a>
    <a href="#deficiencies">Deficiencies</a>
    <a href="#committee">Committee</a>
    <a href="#reports">Reports</a>
  </aside>

  <main class="content">
    <section id="dashboard">
      <h1>Enrolment Dashboard</h1>

      <div class="metrics-grid">
        <article class="metric-card">
          <h2>486</h2>
          <p>Active Applications</p>
        </article>

        <article class="metric-card">
          <h2>126</h2>
          <p>Completed</p>
        </article>

        <article class="metric-card">
          <h2>94</h2>
          <p>Ready for Review</p>
        </article>
      </div>
    </section>

    <section id="my-work">
      <h2>My Work Buckets</h2>
      <div class="work-list">
        <!-- Dynamic work items -->
      </div>
    </section>

    <section id="case-review">
      <h2>Digital Case File</h2>
      <div class="case-summary">
        <!-- Applicant information -->
      </div>
      <div class="document-review">
        <!-- Document checklist and AI observations -->
      </div>
      <div class="officer-actions">
        <!-- Authorised officer actions -->
      </div>
    </section>

    <section id="notifications">
      <h2>Notifications</h2>
      <div class="notification-list">
        <!-- Applicant and officer notifications -->
      </div>
    </section>
  </main>
</div>
```

Important: The HTML skeleton illustrates structure only. It does not implement authentication, workflow logic, data persistence or actual notifications.

# 9. How to incorporate these visuals into the BRD

I recommend the final document structure:

| BRD section               | Visual to include                                |
| ------------------------- | ------------------------------------------------ |
| Executive summary         | Overall AEMS architecture                        |
| Existing problem          | Applicant and official pain-point comparison     |
| Proposed solution         | Three-portal/role experience diagram             |
| Applicant portal          | Applicant dashboard and correction screen        |
| Officials' workspace      | Daily work bucket and digital case file          |
| Management command centre | Management dashboard and team progress           |
| Task allocation           | Supervisor assignment screen                     |
| Committee management      | Committee agenda and meeting pack                |
| Notifications             | Applicant, official and senior briefing examples |
| Business workflow         | End-to-end process diagram                       |
| Implementation            | Phase-wise architecture and roadmap              |

Recommendation: Keep the business requirements in the main BRD and place the HTML skeletons in a dedicated appendix titled "Appendix A: Illustrative User Interface Wireframes." This keeps the proposal readable for senior officials while giving business analysts and developers enough visual detail to understand the expected system.

All mock figures, applicant names, application references and screen layouts must be clearly labelled as illustrative.