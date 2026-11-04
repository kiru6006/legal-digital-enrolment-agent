The next step is to consolidate the BRD with a dedicated Appendix A: User Interface Wireframes and Screen Requirements. This will help Bar Council officials understand the proposed system visually and help business analysts and developers convert the proposal into working software.

# Appendix A: AEMS User Interface Wireframes

All screens below are illustrative. Actual layouts, terminology, permissions and workflows must be validated with the Bar Council.

## A1. Overall application structure

The platform will have three connected user experiences using one central application and workflow database.

AEMS Digital Enrolment Platform

One application record · One workflow · One source of truth

Applicant

Apply, upload, track and correct

Officials

Review, verify, process and forward

Management

Monitor, allocate and manage

Central services

AI document processing · Workflow engine · Notifications · Audit · Reports

## A2. Screen catalogue

| Screen ID | Screen name           | Primary user          | Main purpose                  |
| --------- | --------------------- | --------------------- | ----------------------------- |
| APP-01    | Applicant dashboard   | Applicant             | View overall progress         |
| APP-02    | Application details   | Applicant             | Submit and update information |
| APP-03    | Document upload       | Applicant             | Submit supporting documents   |
| APP-04    | Correction centre     | Applicant             | Respond to deficiencies       |
| APP-05    | Notification centre   | Applicant             | View communications           |
| OFF-01    | Official dashboard    | Official              | View daily assigned work      |
| OFF-02    | My work buckets       | Official              | Process assigned tasks        |
| OFF-03    | Digital case file     | Official              | Review complete application   |
| OFF-04    | AI document review    | Official              | Inspect extracted information |
| OFF-05    | Deficiency management | Official              | Request applicant corrections |
| OFF-06    | Work assignment       | Supervisor            | Allocate and reassign work    |
| MGT-01    | Command centre        | Senior official       | Monitor enrolment operations  |
| MGT-02    | Team progress         | Senior official       | View workload distribution    |
| MGT-03    | Reports               | Senior official       | Generate management reports   |
| COM-01    | Committee workspace   | Committee secretariat | Prepare meeting agenda        |
| COM-02    | Committee case review | Authorised member     | Review assigned cases         |
| ADM-01    | Role management       | Administrator         | Manage system permissions     |

## A3. Applicant dashboard HTML skeleton

```
<div class="applicant-dashboard">
  <header>
    <h1>Advocate Enrolment Portal</h1>
    <span>Applicant: Demo Applicant</span>
  </header>

  <main>
    <section class="application-summary">
      <h2>Application AEMS-2026-1045</h2>
      <p>Status: Under Verification</p>
      <progress value="65" max="100"></progress>
    </section>

    <section class="application-timeline">
      <h2>Application Progress</h2>
      <ol>
        <li>Application Submitted</li>
        <li>Document Verification</li>
        <li>Final Scrutiny</li>
        <li>Committee Consideration</li>
        <li>Enrolment</li>
      </ol>
    </section>

    <section class="action-required">
      <h2>Action Required</h2>
      <p>Upload the missing semester marksheet.</p>
      <button>Upload Document</button>
    </section>

    <section class="notifications">
      <h2>Recent Updates</h2>
      <div class="notification-list"></div>
    </section>
  </main>
</div>
```

Business requirements

- Display application progress.
- Display completed and pending stages.
- Show specific applicant actions.
- Display communication history.
- Provide document upload and correction facilities.
- Preserve previous submissions and document versions.

## A4. Officials' work dashboard HTML skeleton

```
<div class="official-dashboard">
  <header>
    <h1>Officials' Workspace</h1>
    <span>Education Verification Officer</span>
  </header>

  <section class="work-summary">
    <article>Assigned: 28</article>
    <article>Completed Today: 12</article>
    <article>Ready for Review: 10</article>
    <article>Awaiting Action: 6</article>
  </section>

  <section class="work-buckets">
    <h2>My Work Buckets</h2>
    <div>New Applications: 8</div>
    <div>Education Verification: 10</div>
    <div>Corrections Received: 4</div>
    <div>Ready to Forward: 3</div>
    <div>Approvals Awaiting Action: 2</div>
  </section>

  <section class="assigned-work">
    <h2>Assigned Applications</h2>
    <table>
      <thead>
        <tr>
          <th>Application</th>
          <th>Work Item</th>
          <th>Priority</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>
</div>
```

Business requirements

- Display only work authorised for the logged-in official.
- Allow filtering by task type and status.
- Open the digital case file directly.
- Record completion and forward tasks.
- Maintain assignment and completion history.
- Automatically update related work buckets.

## A5. Digital case file HTML skeleton

```
<div class="digital-case-file">
  <header>
    <h1>Application AEMS-2026-1045</h1>
    <span>Under Review</span>
  </header>

  <section class="applicant-details">
    <h2>Applicant Information</h2>
    <div class="applicant-summary"></div>
  </section>

  <section class="document-checklist">
    <h2>Document Checklist</h2>
    <table>
      <tr>
        <th>Document Category</th>
        <th>Required</th>
        <th>Submitted</th>
        <th>Verification</th>
      </tr>
      <tbody></tbody>
    </table>
  </section>

  <section class="ai-summary">
    <h2>AI Review Summary</h2>
    <div class="missing-documents"></div>
    <div class="inconsistencies"></div>
    <div class="source-evidence"></div>
  </section>

  <section class="officer-observations">
    <h2>Officer Observations</h2>
    <textarea></textarea>
  </section>

  <section class="case-actions">
    <button>Mark Verified</button>
    <button>Raise Deficiency</button>
    <button>Forward Case</button>
    <button>Escalate</button>
  </section>
</div>
```

Business requirements

- Show all application information in one place.
- Display documents by approved category.
- Display AI observations with source evidence.
- Show previous officer comments.
- Record official observations and actions.
- Enforce role-based decision permissions.

## A6. Senior management command centre HTML skeleton

```
<div class="management-command-centre">
  <header>
    <h1>Enrolment Operations</h1>
    <span>Management Dashboard</span>
  </header>

  <section class="organisation-metrics">
    <article>Total Active Applications</article>
    <article>Completed Applications</article>
    <article>Ready for Review</article>
    <article>Committee Pending</article>
  </section>

  <section class="team-progress">
    <h2>Team-wise Progress</h2>
    <table>
      <thead>
        <tr>
          <th>Department</th>
          <th>Assigned</th>
          <th>Completed Today</th>
          <th>Remaining</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>

  <section class="daily-briefing">
    <h2>Daily Operational Briefing</h2>
    <div class="completed-work"></div>
    <div class="pending-decisions"></div>
    <div class="upcoming-activities"></div>
  </section>

  <section class="reports">
    <button>Daily Report</button>
    <button>Weekly Report</button>
    <button>Monthly Report</button>
  </section>
</div>
```

Business requirements

- View organisation-wide application statistics.
- Drill down into teams and application stages.
- View assigned and completed work.
- Prepare automatic daily briefings.
- Export authorised reports.
- Support management-level work allocation.

## A7. Committee workspace HTML skeleton

```
<div class="committee-workspace">
  <header>
    <h1>Committee Management</h1>
  </header>

  <section class="meeting-summary">
    <h2>Upcoming Committee Meeting</h2>
    <p>Meeting Date: 20 November 2026</p>
    <p>Cases Prepared: 26</p>
  </section>

  <section class="agenda">
    <h2>Agenda Applications</h2>
    <table>
      <thead>
        <tr>
          <th>Application</th>
          <th>Case File</th>
          <th>Readiness</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>

  <section class="meeting-record">
    <h2>Meeting Observations and Decisions</h2>
    <textarea></textarea>
    <button>Save Authorised Record</button>
  </section>
</div>
```

Business requirements

- Prepare committee agenda lists.
- Generate indexed case bundles.
- Provide authorised members access to relevant files.
- Record meeting observations and decisions.
- Maintain decision history and deferred matters.

# A8. User interaction and validation requirements

| Interaction                      | Expected system behaviour                      |
| -------------------------------- | ---------------------------------------------- |
| Applicant uploads document       | Validate file and create a new version         |
| Applicant submits correction     | Notify assigned official and update work queue |
| Official opens case              | Display complete digital case file             |
| Official marks document verified | Record identity, timestamp and evidence        |
| Official raises deficiency       | Generate applicant action item                 |
| Supervisor assigns application   | Update official's work bucket                  |
| Official completes task          | Update application workflow                    |
| Committee receives case          | Add case to committee preparation queue        |
| Senior official opens dashboard  | Display live permitted operational data        |
| Daily notification runs          | Generate relevant status summaries             |

# A9. Visual design requirements

The proposed interface should follow a common design system.

- Clear navigation with separate applicant, official and management experiences.
- High-contrast tables and status indicators.
- Card-based summary metrics.
- Searchable, filterable data tables.
- Consistent action buttons.
- Clear visual difference between completed, pending, correction-required and decision-pending states.
- Responsive layout for desktop and tablet.
- Accessible typography and keyboard navigation.
- Avoid excessive colours and unnecessary animations.

# A10. Appendix acceptance criteria

The design and eventual prototype should meet these conditions:

1. Each user role has a distinct and understandable dashboard.
2. The applicant can understand progress and required action without contacting the office.
3. Officials can see their complete daily work allocation.
4. A case can be reviewed without opening multiple disconnected screens.
5. AI observations can be traced to supporting documents.
6. Applicant corrections return to the right official's work bucket.
7. Senior officials can see progress across teams.
8. Committee files can be prepared from central records.
9. The interface makes clear which actions require human authorisation.
10. All displayed demo data is fictional and clearly labelled.

Appendix conclusion: These wireframes translate the business proposal into a visual system specification. They should be used as the starting point for stakeholder workshops, screen approval and subsequent Antigravity implementation.

## Recommended next BRD appendix

The next important section is Appendix B: Detailed User Stories and Acceptance Criteria. This will convert each screen and business requirement into testable statements, for example:

- As an enrolment officer, I want all my assigned cases in one work bucket so that I do not have to search manually.
- As an applicant, I want to see the exact missing document so that I can correct my application without contacting the office.
- As the Secretary, I want to see daily team-wise progress so that I can manage operations without collecting manual reports.

This is the bridge between the proposal, the approved requirements and the actual software development work.