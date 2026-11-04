# BUSINESS REQUIREMENTS DOCUMENT (BRD)

## Advocate Enrolment Management System (AEMS)

**Proposed for:** Bar Council of Tamil Nadu and Puducherry  
**Document Type:** Business Requirements and Project Proposal  
**Version:** 1.0  
**Status:** Draft for stakeholder discussion and approval

---

# 1. Executive Summary

The Bar Council of Tamil Nadu and Puducherry manages the enrolment of eligible law graduates as advocates. The process involves collecting applicant information, receiving supporting documents, checking educational qualifications, verifying identity and declarations, managing payments, conducting scrutiny, coordinating committee activities and maintaining enrolment records.

Although an online application facility exists, digitising the application form alone does not address the wider administrative workload involved in processing applications.

Officials still need an effective way to manage their daily work, review documents, identify missing information, communicate with applicants, coordinate between departments, prepare committee records and monitor application progress.

Applicants also need better visibility into their application status, pending requirements, corrections and next steps.

The proposed **Advocate Enrolment Management System (AEMS)** will provide a unified digital platform connecting applicants, enrolment officials, verification teams, senior administrators and authorised committee members.

The system will use workflow automation, AI-assisted document processing, digital case files, automatic task allocation, daily notifications and management dashboards to reduce repetitive administrative work.

The central objective is:

**Enable the Bar Council to process a higher volume of enrolment applications with less paperwork, fewer manual activities, better coordination, improved transparency and accountable decision-making.**

The proposed solution will not replace the statutory authority or judgement of the Bar Council or its authorised committees. AI will assist officials by preparing information, identifying potential issues and reducing repetitive work. Decisions will remain with authorised human officers and committees.

# 2. Business Background

## 2.1 Existing business process

The advocate enrolment process involves multiple stages:

1. Applicant registration.
2. Personal information submission.
3. Educational qualification details.
4. Employment and previous experience details, where applicable.
5. Communication and address information.
6. Document uploads.
7. Application preview and submission.
8. Law-related declarations and details.
9. Payment.
10. Application scrutiny and verification.
11. Appointment and enrolment-day coordination.
12. Final enrolment status and record management.

The existing online portal provides an applicant-facing digital process. However, the complete internal operational workflow, including officer work allocation, digital case management, automated document review and management reporting, requires further assessment.

## 2.2 Business opportunity

The opportunity is to move from an application-submission platform to a complete digital enrolment office.

Instead of officials manually managing applications, documents, registers, spreadsheets, emails and reports, the system should coordinate these activities through a common workflow.

The platform should make information available to the right person at the right time and automatically prepare the next action.

# 3. Problem Statement

The core business problem is not simply that applications are submitted through forms.

The bigger problem is the administrative effort required to process, verify, coordinate, communicate and complete those applications.

## 3.1 Problems faced by Bar Council officials

| Problem area | Current operational challenge | Business impact |
|---|---|---|
| Document review | Officers manually open and inspect multiple documents | High review effort |
| Application completeness | Missing documents must be identified manually | Repeated checking |
| Information verification | Applicant details must be compared with certificates and identity documents | Time-consuming scrutiny |
| Work allocation | Officials need visibility into their assigned applications and pending tasks | Coordination effort |
| Application movement | Cases move between different functions and officials | Manual follow-up |
| Applicant communication | Clarifications and deficiencies require communication | Repetitive administrative work |
| Correction handling | Updated documents must be reviewed again | Repeated document inspection |
| Daily reporting | Progress information must be collected and consolidated | Time spent preparing reports |
| Committee preparation | Case details and supporting documents must be organised | Administrative preparation |
| Record management | Registers, documents and historical records must be maintained | Record retrieval effort |

## 3.2 Problems faced by applicants

| Problem area | Applicant pain point | Business impact |
|---|---|---|
| Application status | Uncertainty about current application progress | Repeated enquiries |
| Missing documents | Unclear information about what is missing | Delayed corrections |
| Communication | Applicants may not receive timely and specific updates | Poor experience |
| Correction process | Applicants may need to understand which document requires correction | Repeated submissions |
| Application history | Limited visibility into previous observations and corrections | Confusion |
| Next steps | Applicants may not know what happens after submission | Uncertainty |
| Appointment information | Need for clear scheduling and attendance details | Additional enquiries |

## 3.3 Problems faced by senior officials

Senior officials need an organisation-wide view of enrolment operations.

Without a consolidated operational dashboard, they may need to collect information from different teams and reports to understand:

- How many applications have been received.
- How many applications have been completed.
- How many are currently under scrutiny.
- Which teams have applications assigned to them.
- How many cases are ready for committee consideration.
- How many applicant corrections have been received.
- How many decisions are awaiting authorised action.
- How much work is expected in the coming days.
- What work has been completed during the reporting period.

The proposed system should automatically generate this information.

The objective is better administration and coordination, not employee surveillance or blame-oriented performance monitoring.

# 4. Proposed Solution

AEMS will be a unified digital platform consisting of three major operational areas.

## 4.1 Applicant Portal

A self-service portal for applicants to:

- Register and submit enrolment applications.
- Enter personal, educational and employment details.
- Upload supporting documents.
- Save and resume applications.
- View application status.
- Receive daily progress notifications.
- View specific deficiencies raised by officials.
- Upload corrected documents.
- Track previous submissions and corrections.
- View appointment information.
- Access official communications and receipts.

## 4.2 Officials' Workspace

A central working environment for enrolment officials to:

- View their assigned applications.
- Access daily work buckets.
- Review AI-generated application summaries.
- Verify supporting documents.
- Identify missing and inconsistent information.
- Record observations and comments.
- Raise applicant deficiencies.
- Review corrected documents.
- Forward cases to the next authorised function.
- Complete assigned tasks.
- Prepare and issue communications using approved templates.
- Access application history without searching multiple records.

## 4.3 Senior Management Command Centre

A consolidated operational dashboard for authorised senior officials to:

- Monitor total enrolment workload.
- View team-wise progress.
- View assigned and completed tasks.
- Understand application movement across stages.
- Monitor committee preparation.
- Review applications requiring authorised decisions.
- Distribute work across teams.
- Generate daily and periodic reports.
- Review enrolment trends.
- Plan operational capacity and upcoming enrolment activities.

# 5. Key Business Objectives

The proposed system will target the following outcomes.

| ID | Business objective | Expected benefit |
|---|---|---|
| BO-01 | Reduce paper-based application processing | Less physical documentation |
| BO-02 | Reduce repetitive manual document review | Lower officer workload |
| BO-03 | Automate work allocation | Better task coordination |
| BO-04 | Provide individual work dashboards | Clear daily responsibilities |
| BO-05 | Automate applicant notifications | Fewer status enquiries |
| BO-06 | Introduce AI-assisted document review | Faster application preparation |
| BO-07 | Digitise deficiency and correction management | Fewer repeated interactions |
| BO-08 | Automate daily and periodic reporting | Less Excel-based reporting |
| BO-09 | Introduce central digital case files | Easier case retrieval |
| BO-10 | Improve committee preparation | Better organised records |
| BO-11 | Maintain complete application history | Better accountability |
| BO-12 | Increase processing capacity | Higher operational throughput |

# 6. Proposed End-to-End Business Workflow

The proposed workflow will connect applicant actions, AI processing and official decisions.

## Stage 1: Application submission

1. Applicant registers.
2. Applicant completes the required details.
3. Applicant uploads supporting documents.
4. System validates mandatory fields and file formats.
5. Application is submitted and assigned a unique reference number.
6. Applicant receives an acknowledgement.

## Stage 2: AI-assisted application preparation

1. System classifies uploaded documents.
2. OCR extracts relevant information.
3. System identifies document categories.
4. Extracted details are compared against applicant information.
5. Required documents are checked against an approved checklist.
6. Potential missing information is identified.
7. Potential inconsistencies are highlighted.
8. AI generates a structured application summary.
9. Application is placed into the appropriate official work queue.

AI observations must be linked to their source documents and evidence.

## Stage 3: Official scrutiny

The assigned official opens a single digital case file containing:

- Applicant summary.
- Educational details.
- Employment information.
- Uploaded documents.
- AI-extracted information.
- Document completeness.
- Potential inconsistencies.
- Previous observations.
- Pending actions.
- Application history.

The official reviews the information and performs the authorised action.

Possible actions include:

- Mark verified.
- Raise deficiency.
- Add observation.
- Request clarification.
- Forward for further verification.
- Escalate for authorised review.
- Defer consideration.
- Record a decision within delegated authority.

## Stage 4: Applicant correction

1. Official raises a specific deficiency.
2. System generates a structured correction request.
3. Applicant receives a notification.
4. Applicant logs in and views the required correction.
5. Applicant uploads the corrected document.
6. System stores the new version.
7. AI compares the updated document with the previous version.
8. Only relevant changed information is highlighted.
9. Case returns to the appropriate work queue.
10. Official reviews and records the next action.

## Stage 5: Final scrutiny and committee processing

1. Complete applications are forwarded to the appropriate authorised function.
2. System prepares indexed digital case files.
3. Committee-ready applications are grouped for agenda preparation.
4. Supporting documents and observations are available in one place.
5. Authorised committee members review cases.
6. Decisions and observations are recorded.
7. Applications move to the next authorised stage.

## Stage 6: Enrolment and record management

Subject to approved procedures:

- Appointment schedules are maintained.
- Attendance lists are generated.
- Candidate identity and QR-based verification can be supported.
- Final enrolment details are recorded.
- Enrolment register entries are generated.
- Certificates and approved records are prepared.
- Applicant receives the official status update.

# 7. Officials' Daily Work Management

This is one of the most important components of AEMS.

The system should not expect officials to search through hundreds of applications to identify their responsibilities.

Every official should receive a personalised daily work dashboard.

## 7.1 My Work Dashboard

The dashboard should display:

- Total assigned applications.
- New applications received.
- Documents awaiting verification.
- Applications ready for review.
- Applicant corrections received.
- Cases ready to forward.
- Approvals awaiting action within the official's authority.
- Scheduled appointments.
- Tasks completed today.
- Remaining assigned tasks.

## 7.2 Functional work buckets

| Functional area | Proposed work buckets |
|---|---|
| Enrolment scrutiny | New applications, personal details, declarations, final scrutiny |
| Education verification | Degree certificates, marksheets, university verification, exceptions |
| Document verification | Identity, address, affidavits, photograph and signature |
| Accounts | Payment pending, payment mismatch, receipt confirmation |
| Appointment management | Slot allocation, rescheduling, attendance |
| Committee secretariat | Agenda preparation, committee review, deferred matters |
| Records administration | Approved applications, enrolment register, certificate preparation |
| Senior administration | Matters for review, authorised decisions, workload overview |

The exact functional responsibilities and sanctioned designations must be validated with the Bar Council.

## 7.3 Automatic task allocation

The system should assign tasks using approved workflow rules.

Allocation criteria may include:

- Functional responsibility.
- Officer role and permissions.
- Current assigned workload.
- Application category.
- Required verification function.
- Availability and leave status.
- Supervisor-approved reassignment.

Every task should have:

- Unique task ID.
- Application reference.
- Assigned official.
- Task category.
- Creation date.
- Current status.
- Required next action.
- Supporting documents.
- Completion record.

# 8. Daily Applicant Notification System

Applicants should receive meaningful daily updates without repeatedly contacting the office.

## 8.1 Notification information

Each update should include:

- Application reference number.
- Current application stage.
- Recently completed activities.
- Current processing status.
- Any action required from the applicant.
- Missing documents, if applicable.
- Correction instructions.
- Appointment information, where relevant.
- Next expected workflow step.

## 8.2 Notification channels

- Applicant portal.
- Email.
- SMS.
- WhatsApp, subject to approved integration and consent.

## 8.3 Notification rules

- Send daily summaries for active applications.
- Send immediate notifications for important action requests.
- Send reminders for applicant corrections.
- Avoid repetitive messages where nothing has changed.
- Record notification delivery status.
- Maintain communication history.

The system must distinguish between an estimated processing update and a formal decision or statutory notice.

# 9. Senior Officials' Command Centre

The command centre will provide a consolidated view of enrolment operations.

## 9.1 Management dashboard

The dashboard should display:

- Total applications received.
- Applications under processing.
- Applications completed.
- Applications awaiting scrutiny.
- Applications awaiting applicant corrections.
- Applications ready for committee consideration.
- Applications awaiting authorised decisions.
- Applications scheduled for enrolment.
- Team-wise workload.
- Daily completed work.
- Weekly and monthly progress.

## 9.2 Team progress management

Senior officials should be able to view:

- Work assigned to each functional team.
- Work completed during the reporting period.
- Current workload.
- Work distribution.
- Applications moving between teams.
- Work requiring management intervention.
- Upcoming workload and committee requirements.

The system should support fair interpretation of work volumes. Complex cases should not be treated as equivalent to straightforward applications when assessing capacity.

## 9.3 Daily briefing

The system should automatically generate a management briefing containing:

1. Total applications received.
2. Applications completed.
3. Applications moved to the next stage.
4. Corrections received.
5. Cases prepared for committee review.
6. Decisions requiring authorised attention.
7. Appointments scheduled.
8. Upcoming operational activities.

# 10. AI-Assisted Document Processing

AI should reduce the amount of manual work required to prepare applications for official scrutiny.

## 10.1 AI capabilities

| Capability | Business function |
|---|---|
| Document classification | Identify uploaded document type |
| OCR | Extract text from scanned documents |
| Information extraction | Identify names, dates, institutions and other fields |
| Document matching | Match uploaded documents against checklist requirements |
| Completeness checking | Identify potentially missing documents |
| Consistency checking | Highlight differences between application and documents |
| Document comparison | Compare corrected documents with earlier versions |
| Case summarisation | Generate an application briefing |
| Deficiency drafting | Prepare draft correction messages |
| Search assistance | Search approved records and procedural guidance |

## 10.2 AI case summary

Each application should have a structured summary showing:

- Required document categories.
- Documents received.
- Extracted information.
- Potential missing documents.
- Potential inconsistencies.
- AI confidence.
- Source document references.
- Recommended officer action.
- Human verification status.

## 10.3 Human decision requirement

AI must not independently:

- Decide legal eligibility.
- Reject an application.
- Approve final enrolment.
- Determine disputed legal facts.
- Override an authorised committee decision.

AI outputs must remain reviewable and traceable.

# 11. Digital Case File

Each application should have one consolidated digital case file.

It should contain:

1. Applicant information.
2. Education history.
3. Employment history, where applicable.
4. Supporting documents.
5. AI extraction results.
6. Category-wise checklist.
7. Officer verification records.
8. Deficiency notices.
9. Applicant corrections.
10. Document versions.
11. Payment records.
12. Appointment details.
13. Committee observations.
14. Authorised decisions.
15. Complete audit history.

The case file should eliminate the need to search across multiple folders, spreadsheets and communication records.

# 12. Bulk Operations and Administrative Automation

The system should support bulk operations where they are safe and authorised.

Examples:

- Assign multiple applications to an officer.
- Reassign tasks to another official.
- Generate multiple deficiency notices.
- Send applicant reminders.
- Prepare university verification requests.
- Generate appointment lists.
- Prepare committee agenda bundles.
- Export reports.
- Generate enrolment registers.
- Prepare certificate batches.

Bulk actions must retain application-level validation and audit records.

Bulk rejection, bulk legal approval or automatic final enrolment decisions must not be permitted.

# 13. Committee and Enrolment-Day Management

## 13.1 Committee management

Proposed capabilities:

- Prepare committee-ready application lists.
- Generate meeting agendas.
- Provide digital case files.
- Record observations and decisions.
- Track deferred matters.
- Maintain meeting minutes.
- Record authorised member participation.
- Maintain decision history.

## 13.2 Enrolment-day management

Proposed capabilities:

- Generate candidate lists.
- Allocate appointment slots.
- Support QR-based attendance.
- Support photograph and identity verification.
- Generate roll-of-advocates information.
- Prepare enrolment records.
- Generate certificates using approved formats.
- Maintain attendance and completion records.

These capabilities must follow the Bar Council's approved enrolment procedures.

# 14. Reporting and Analytics

The system should generate reports automatically.

| Report | Intended users |
|---|---|
| Daily application report | Secretary and senior administration |
| Officer work allocation report | Supervisors |
| Team progress report | Senior administration |
| Applicant deficiency report | Scrutiny teams |
| Education verification report | Education verification team |
| Payment reconciliation report | Accounts |
| Appointment report | Appointment team |
| Committee-ready application report | Committee secretariat |
| Enrolment register report | Records administration |
| Monthly enrolment statistics | Senior management |
| Historical application report | Authorised administration and audit |

Reports should be filterable by date, enrolment batch, application stage, team and authorised user access.

# 15. Proposed User Roles and Permissions

The following are proposed functional roles, not confirmation of existing sanctioned designations.

| Proposed role | Main responsibilities |
|---|---|
| Chairman | Authorised oversight and governance |
| Secretary | Administrative supervision and authorised functions |
| Enrolment Committee Chairman | Committee-related responsibilities |
| Enrolment Committee Member | Review and decisions within statutory authority |
| Supervisory Officer | Work allocation and team coordination |
| Scrutiny Officer | Application scrutiny and deficiency management |
| Education Verification Officer | Academic document verification |
| Document Verification Officer | Identity and supporting document verification |
| Accounts Officer | Payment and financial reconciliation |
| Appointment Officer | Scheduling and attendance |
| Records Officer | Enrolment records and certificate administration |
| IT Administrator | Technical configuration and system support |
| Auditor / Inspection Officer | Authorised read-only inspection |

Permissions must be based on approved delegations and assigned responsibilities.

Technical administrators must not automatically receive legal decision-making authority.

The system should maintain an audit trail for all important actions and permission changes.

# 16. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | Applicant registration and login | Critical |
| FR-002 | Digital application submission | Critical |
| FR-003 | Document upload and storage | Critical |
| FR-004 | Application status tracking | Critical |
| FR-005 | AI document classification | High |
| FR-006 | OCR and data extraction | High |
| FR-007 | Approved checklist validation | Critical |
| FR-008 | Digital case file | Critical |
| FR-009 | Officials' personal work dashboard | Critical |
| FR-010 | Automatic task allocation | Critical |
| FR-011 | Application assignment and reassignment | Critical |
| FR-012 | Deficiency management | Critical |
| FR-013 | Applicant correction workflow | Critical |
| FR-014 | Daily applicant notifications | High |
| FR-015 | Official work notifications | High |
| FR-016 | Senior management dashboard | Critical |
| FR-017 | Team progress reports | High |
| FR-018 | Automatic daily reports | High |
| FR-019 | Bulk administrative operations | High |
| FR-020 | Committee agenda management | High |
| FR-021 | Appointment management | High |
| FR-022 | Enrolment register generation | High |
| FR-023 | Certificate generation | High |
| FR-024 | Audit history | Critical |
| FR-025 | Role-based permissions | Critical |
| FR-026 | Document version comparison | High |
| FR-027 | Search and retrieval | Critical |
| FR-028 | University verification workflow | Medium |
| FR-029 | Knowledge and procedure assistant | Medium |
| FR-030 | Operational analytics and forecasting | Medium |

# 17. Non-Functional Requirements

## Security

- Role-based access control.
- Strong authentication.
- Secure document storage.
- Encryption in transit and at rest.
- Access logging.
- Session management.
- Protection against unauthorised access.
- Regular security testing.

## Performance

- Support high-volume application submissions.
- Support multiple officials working simultaneously.
- Process documents asynchronously.
- Provide responsive dashboards.
- Avoid unnecessary repeated document processing.

## Reliability

- Scheduled backups.
- Recovery procedures.
- Error monitoring.
- Reliable notification delivery.
- Document integrity checks.

## Usability

- Simple and consistent interface.
- Searchable digital records.
- Minimal data entry repetition.
- Responsive applicant portal.
- Accessible interface.
- Clear action instructions.

## Auditability

- Record application changes.
- Record task assignments.
- Record document versions.
- Record official comments.
- Record decisions and approvals.
- Preserve historical records according to approved retention rules.

# 18. Proposed Business KPIs

The following are proposed pilot targets. Actual targets must be validated using baseline measurements.

| KPI | Proposed target |
|---|---|
| Applications digitally prepared | 100% |
| Reduction in repeated manual data entry | At least 70% |
| Document classification accuracy | At least 95% on the validated test set |
| Missing-document identification recall | At least 98% on the validated test set |
| Actionable deficiency communications | 100% |
| Critical actions with audit records | 100% |
| Role and permission test coverage | 100% of defined critical scenarios |
| Daily management reporting | Automatically generated |
| Application status visibility | Available throughout defined workflow stages |
| Standard-case review time | Pilot target of 11 minutes or less |

## Throughput measurement

The project should distinguish between:

- Applications submitted.
- Applications digitally prepared.
- Applications reviewed.
- Applications with deficiencies raised.
- Applications corrected by applicants.
- Applications forwarded.
- Applications considered by the committee.
- Applications finally disposed of or enrolled.

A high number of AI-prepared applications does not mean the same number of legal decisions have been completed.

The pilot should measure actual processing capacity before setting a production throughput commitment.

# 19. Expected Business Benefits

## 19.1 Benefits to officials

- Reduced manual document inspection.
- Reduced repetitive data entry.
- Less time spent preparing reports.
- Reduced need to maintain parallel registers.
- Clear daily work allocation.
- Easier application retrieval.
- Faster applicant correction handling.
- Better team coordination.
- Easier handover of assigned work.
- Reduced preparation effort for committee meetings.

## 19.2 Benefits to applicants

- Clear application status.
- Timely progress notifications.
- Specific correction instructions.
- Reduced uncertainty.
- Better visibility into application history.
- Easier document resubmission.
- Fewer unnecessary visits and enquiries.
- Clear appointment and enrolment information.

## 19.3 Benefits to senior administration

- Organisation-wide operational visibility.
- Automatic daily reports.
- Better resource allocation.
- Easier workload planning.
- Better committee preparation.
- Improved record retrieval.
- Consistent and traceable administrative processes.

## 19.4 Institutional benefits

- Reduced dependency on paper files.
- Better record preservation.
- More consistent processes.
- Improved administrative transparency.
- Greater processing capacity.
- Better service delivery to advocates.

# 20. Implementation Approach

The project should be implemented in phases to reduce operational risk.

## Phase 1: Discovery and Business Validation

- Study the complete existing application form.
- Review existing enrolment rules and checklists.
- Understand the current officer workflow.
- Identify all registers and reports.
- Confirm official roles and delegated authority.
- Interview applicants and officials.
- Establish baseline processing times.

**Deliverable:** Approved business requirements and process maps.

## Phase 2: Core Digital Platform

- Applicant portal.
- Officer portal.
- Central application record.
- Document repository.
- Digital case file.
- Basic work queues.
- Role-based access.

**Deliverable:** Working core enrolment management platform.

## Phase 3: Workflow Automation

- Automatic task allocation.
- Deficiency management.
- Applicant correction workflow.
- Daily notifications.
- Officer work buckets.
- Task reassignment.
- Workflow audit history.

**Deliverable:** End-to-end digital application processing.

## Phase 4: AI-Assisted Processing

- Document classification.
- OCR.
- Information extraction.
- Checklist validation.
- AI case summaries.
- Document comparison.
- Deficiency draft generation.

**Deliverable:** AI-assisted officer review environment.

## Phase 5: Management and Committee Operations

- Senior command centre.
- Daily and weekly reports.
- Team progress dashboard.
- Bulk operations.
- Committee agenda management.
- Appointment management.
- Enrolment register and certificate preparation.

**Deliverable:** Digital administrative operations platform.

## Phase 6: Pilot and Production Rollout

- Controlled pilot.
- User acceptance testing.
- Security testing.
- Performance testing.
- Officer training.
- Applicant communication.
- Production deployment.
- Continuous improvement.

**Deliverable:** Production-ready AEMS.

# 21. Proposed Pilot

The initial pilot should include a controlled group of fictional or properly authorised test applications.

Recommended test scenarios:

1. Complete application with all required documents.
2. Application with a missing academic document.
3. Application with a name inconsistency.
4. Application requiring conditional employment documentation.
5. Applicant submitting corrected documents.
6. Application requiring authorised committee consideration.
7. Multiple applications assigned to different officials.
8. Daily progress reporting across teams.

## Pilot acceptance criteria

The pilot will be successful when:

- Officials can access their assigned applications from one dashboard.
- AI can prepare a structured application summary.
- Missing documents are identified against the approved checklist.
- Officials can record observations and raise deficiencies.
- Applicants can submit corrections.
- Corrected documents are versioned and compared.
- Tasks move automatically between approved workflow stages.
- Senior officials can view team-wise progress.
- Daily reports are generated without manual Excel consolidation.
- All important actions are recorded in the audit history.

# 22. Assumptions and Dependencies

The proposal assumes:

- The Bar Council will provide access to approved application forms and procedural guidelines.
- The Bar Council will validate document requirements.
- The Bar Council will approve the internal workflow.
- Official designations and delegated powers will be confirmed.
- Applicable enrolment rules and statutory requirements will be validated by authorised legal personnel.
- Integration with payment, SMS, email, WhatsApp and external verification services will depend on approved access and provider arrangements.
- Historical data migration will require a separate assessment.
- Production infrastructure will be approved by the Bar Council.

# 23. Out of Scope for the Initial Pilot

The initial demonstration and pilot will not independently:

- Make statutory eligibility decisions.
- Automatically reject applications.
- Automatically approve final enrolment.
- Replace committee authority.
- Replace official signatures or statutory procedures.
- Conduct real payment transactions.
- Access university systems without authorised integration.
- Send real SMS or WhatsApp messages without approved integration.
- Store real applicant documents in an unapproved demonstration environment.

# 24. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| Incorrect AI extraction | Human verification and source-linked evidence |
| Incorrect checklist rules | Approval of rules by authorised Bar Council personnel |
| Unauthorised access | Role-based permissions and audit controls |
| Applicant data exposure | Secure infrastructure and privacy controls |
| Resistance to process changes | User participation, training and phased rollout |
| Poor historical data quality | Data cleansing and controlled migration |
| Excessive notifications | Notification preferences and event-based rules |
| Workflow complexity | Pilot and iterative validation |
| External verification delays | Dedicated tracking and follow-up workflow |
| Legal or procedural changes | Configurable rules with controlled approval |

# 25. Legal, Regulatory and Governance Considerations

The system must be designed around the applicable legal and procedural framework, including the Advocates Act, 1961, applicable Bar Council of India rules, State Bar Council rules, approved enrolment procedures and relevant data protection requirements.

Particular attention must be given to:

- Statutory authority of the State Bar Council.
- Enrolment committee functions and decision-making.
- Approved qualification and document requirements.
- Record preservation and access.
- Electronic records and evidence.
- Personal data processing and security.
- Official communication and digital approval.
- Auditability of administrative and legal decisions.

The system must not alter statutory responsibilities or delegate legal decisions to an AI model.

Final legal requirements and applicable commencement dates of relevant regulations must be verified before production deployment.

# 26. Proposed Technical Direction

The following is an indicative architecture, subject to technical discovery and approval.

| Layer | Proposed technology |
|---|---|
| Applicant frontend | React and TypeScript |
| Officer frontend | React and TypeScript |
| UI framework | Tailwind CSS and shadcn/ui |
| Backend | Python and FastAPI |
| Database | PostgreSQL |
| Document storage | Secure object storage |
| OCR | AWS Textract or equivalent |
| AI processing | Approved enterprise AI model |
| Agent orchestration | LangGraph or equivalent |
| Workflow | Workflow engine with auditable state transitions |
| Authentication | Enterprise identity provider |
| Reporting | Custom dashboards and reporting engine |
| Hosting | Approved cloud or government-compliant infrastructure |

A modular architecture is recommended initially. The platform should support future integration with authorised external systems.

# 27. Approval Requested

The proposal requests the Bar Council's consideration and approval to proceed with the following activities:

1. Conduct a detailed business and process discovery exercise.
2. Review the existing enrolment application and internal workflows.
3. Conduct discussions with senior officials and operational teams.
4. Validate document checklists, responsibilities and approval authorities.
5. Prepare an interactive AEMS demonstration using fictional applicant data.
6. Review the proposed solution with Bar Council stakeholders.
7. Finalise the detailed BRD, functional specifications and implementation plan.
8. Estimate project cost, infrastructure requirements and implementation timeline.
9. Obtain approval for a controlled pilot.
10. Proceed towards production implementation after successful validation.

# 28. Conclusion

The proposed Advocate Enrolment Management System is intended to improve the overall functioning of the enrolment office.

It goes beyond digitising application forms.

It provides a connected working environment where applicants can submit and track applications, officials can complete daily tasks efficiently, AI can prepare documents for review, and senior officials can monitor operational progress through a single command centre.

The expected result is a more efficient, transparent, organised and scalable enrolment process.

**The ultimate business objective is to reduce administrative effort, improve applicant experience and increase the Bar Council's capacity to process enrolment applications accurately and efficiently, while preserving statutory authority and human decision-making.**

---

**End of Business Requirements Document**