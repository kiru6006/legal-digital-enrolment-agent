# Appendix C: Business Process Models, RACI Matrix and Department-wise Responsibilities

Project: Advocate Enrolment Management System (AEMS)\
Proposed for: Bar Council of Tamil Nadu and Puducherry

Purpose: Define how applications move through the organisation, who performs each activity, who has authority to approve it, and how AEMS reduces manual work at every stage.

This appendix is particularly important for senior officials. A software system will only work effectively if the responsibilities, handoffs and approval authority are clearly defined.

# C1. Proposed organisational operating model

The following is a proposed functional structure. It does not claim to represent the Bar Council's confirmed sanctioned staffing structure.

Chairman / Authorised Leadership

Governance and oversight within statutory authority

Secretary / Authorised Administration

Administrative supervision and coordination

Enrolment Supervision

Work allocation and coordination

Verification Functions

Education and document review

Accounts and Appointments

Payments and scheduling

Committee Secretariat

Agenda and meeting preparation

Operational Officers and Administrative Staff

Assigned case processing and record maintenance

The Enrolment Committee must retain its statutory role. Its authority must not be treated as a normal administrative reporting line.

# C2. End-to-end business process model

## C2.1 Overall enrolment process

1\. Applicant registration

Applicant creates and submits application

2\. Document submission

Supporting documents uploaded

3\. AI preparation

OCR, classification and checklist validation

4\. Administrative scrutiny

Assigned officers review the case

5\. Correction loop

Applicant responds to specific deficiencies

6\. Verification and final scrutiny

Authorised functions complete checks

7\. Committee process

Committee consideration under applicable procedure

8\. Enrolment and records

Authorised outcome and enrolment records

The correction loop can occur at the appropriate scrutiny stage. It should not force an application to restart from the beginning.

## C2.2 Application processing state model

The system should use defined workflow states rather than free-text status labels.

| State                | Meaning                                    | Next possible state                         |
| -------------------- | ------------------------------------------ | ------------------------------------------- |
| Draft                | Applicant has not submitted                | Submitted                                   |
| Submitted            | Application received                       | AI preparation                              |
| AI preparation       | Documents being processed                  | Ready for scrutiny / Processing exception   |
| Ready for scrutiny   | Prepared for official review               | Under review                                |
| Under review         | Official is reviewing                      | Deficiency / Verified / Forwarded           |
| Deficiency raised    | Applicant action required                  | Correction submitted                        |
| Correction submitted | Updated documents received                 | Re-review                                   |
| Re-review            | Corrected information under review         | Verified / Further deficiency               |
| Verification pending | External or internal verification required | Verified / Exception                        |
| Committee ready      | Prepared for committee process             | Committee consideration                     |
| Deferred             | Further action or consideration required   | Reassigned workflow state                   |
| Decision recorded    | Authorised outcome recorded                | Subsequent statutory or administrative step |
| Completed            | Defined enrolment process completed        | Historical record                           |

Important: These are proposed system states. They must be mapped to the actual legal and administrative process. An application being technically complete does not mean it is legally eligible or approved.

# C3. Detailed department-wise workflows

## C3.1 Applicant registration and submission

Responsible function: Applicant-facing administration.

| Activity                | Applicant | System              | Official      |
| ----------------------- | --------- | ------------------- | ------------- |
| Create account          | Performs  | Validates           | No action     |
| Enter details           | Performs  | Saves               | No action     |
| Upload documents        | Performs  | Checks files        | No action     |
| Submit application      | Performs  | Generates reference | Receives case |
| Receive acknowledgement | Receives  | Sends notification  | No action     |

Automation opportunities

- Mandatory-field validation.
- Duplicate application alerts.
- Automatic reference number generation.
- File type and size checks.
- Save and resume.
- Application acknowledgement.

## C3.2 Document verification

Responsible function: Designated document verification officers.

| Activity               | AI/System         | Verification officer      | Supervisor          |
| ---------------------- | ----------------- | ------------------------- | ------------------- |
| Classify documents     | Performs          | Reviews exceptions        | No action           |
| Extract details        | Performs          | Validates                 | No action           |
| Match checklist        | Performs          | Confirms                  | No action           |
| Identify inconsistency | Flags             | Examines evidence         | Supports escalation |
| Record verification    | No final decision | Performs within authority | Oversees            |
| Forward case           | Updates queue     | Performs                  | Monitors            |

Automation opportunities

- AI document classification.
- OCR.
- Category-wise checklist.
- Comparison of applicant details and supporting documents.
- Automatic digital case summary.
- Version comparison.

## C3.3 Education verification

Responsible function: Designated education verification officers.

| Activity                    | System   | Education officer | Supervisor              |
| --------------------------- | -------- | ----------------- | ----------------------- |
| Identify academic documents | Assists  | Reviews           | No action               |
| Extract institution details | Performs | Validates         | No action               |
| Compare academic records    | Assists  | Reviews           | No action               |
| Identify missing records    | Flags    | Confirms          | No action               |
| Prepare university query    | Drafts   | Reviews           | Approves where required |
| Record response             | Stores   | Verifies          | Monitors                |

The system should support grouping verification requests by university to reduce repeated administrative communication.

It must not treat an AI-generated match as confirmation from an institution.

## C3.4 Accounts and payment reconciliation

Responsible function: Accounts function.

| Activity                     | System   | Accounts officer       | Supervisor |
| ---------------------------- | -------- | ---------------------- | ---------- |
| Identify payment reference   | Assists  | Reviews                | No action  |
| Match payment                | Assists  | Confirms               | No action  |
| Identify mismatch            | Flags    | Investigates           | Escalation |
| Record reconciliation        | Stores   | Performs               | Oversees   |
| Generate receipt information | Prepares | Authorises as required | Monitors   |

Financial records and payment reconciliation must be controlled by the approved accounts process.

## C3.5 Applicant deficiency management

Responsible function: Assigned scrutiny or verification officer.

| Activity            | System        | Official                  | Applicant |
| ------------------- | ------------- | ------------------------- | --------- |
| Identify deficiency | Assists       | Reviews                   | No action |
| Prepare notice      | Drafts        | Approves                  | No action |
| Send communication  | Sends         | Authorises where required | Receives  |
| Upload correction   | Stores        | No action                 | Performs  |
| Compare versions    | Assists       | Reviews                   | No action |
| Resume scrutiny     | Updates queue | Performs                  | No action |

The system should prevent vague deficiency requests. Each request should identify the affected field or document, reason, corrective action and applicable deadline where one is formally prescribed.

## C3.6 Committee processing

Responsible function: Committee secretariat and authorised committee members.

| Activity                       | System          | Secretariat     | Committee                 |
| ------------------------------ | --------------- | --------------- | ------------------------- |
| Identify committee-ready cases | Assists         | Validates       | No action                 |
| Prepare agenda                 | Generates draft | Reviews         | Receives                  |
| Prepare case bundle            | Generates       | Validates       | Reviews                   |
| Record observations            | Stores          | Supports        | Performs                  |
| Record authorised decision     | Records         | Maintains       | Performs within authority |
| Update workflow                | Updates         | Verifies record | Authorises as required    |

# C4. RACI responsibility matrix

RACI defines responsibility for each activity:

- R: Responsible. Performs the work.
- A: Accountable. Has final responsibility for the activity.
- C: Consulted. Provides input.
- I: Informed. Receives updates.

The following is a proposed functional matrix. It is not a statement of existing legal authority. The final matrix must be approved against the Advocates Act, applicable rules, committee powers and sanctioned delegations.

| Activity                   | Applicant | Scrutiny officer | Supervisor | Secretary / authorised admin | Committee |
| -------------------------- | --------- | ---------------- | ---------- | ---------------------------- | --------- |
| Submit application         | R         | I                | I          | I                            | I         |
| Upload documents           | R         | I                | I          | I                            | I         |
| Initial document scrutiny  | I         | R                | A\*        | I                            | I         |
| Raise deficiency           | I         | R                | A\*        | I                            | I         |
| Review correction          | R         | R                | A\*        | I                            | I         |
| Academic verification      | I         | R                | A\*        | I                            | I         |
| Payment reconciliation     | I         | R\*\*            | A\*        | I                            | I         |
| Work allocation            | I         | I                | R          | A\*                          | I         |
| Prepare committee agenda   | I         | R                | C          | A\*                          | I         |
| Committee consideration    | I         | C                | I          | C                            | A/R\*\*\* |
| Maintain enrolment records | I         | R                | A\*        | C                            | I         |
| Management reporting       | I         | C                | R          | A\*                          | I         |

\\\* Accountable role must be confirmed against approved administrative delegation.

\\\*\* The R role for payment reconciliation should be assigned specifically to authorised accounts staff, not general scrutiny staff.

\\\*\*\* Committee accountability and responsibility must follow statutory provisions and the committee's lawful authority.

# C5. Automated versus human activities

This distinction should be explicitly agreed before development.

| Activity                       | Automated                 | Human required                    |
| ------------------------------ | ------------------------- | --------------------------------- |
| File type validation           | Yes                       | Exception review                  |
| OCR extraction                 | Yes                       | Validate uncertain results        |
| Document classification        | AI-assisted               | Review exceptions                 |
| Checklist comparison           | Yes, using approved rules | Confirm disputed requirements     |
| Missing document detection     | AI/rules-assisted         | Confirm deficiency                |
| Draft deficiency communication | Yes                       | Authorise and send where required |
| Work allocation                | Rules-assisted            | Supervisor oversight              |
| Daily notifications            | Yes                       | Handle exceptional cases          |
| Daily management reports       | Yes                       | Interpret and act                 |
| University verification        | Request preparation       | Validate external response        |
| Legal eligibility decision     | No                        | Authorised human decision         |
| Final statutory approval       | No                        | Authorised committee or authority |
| Audit record creation          | Yes                       | Review when required              |

# C6. Department-wise work reduction matrix

This table explains the practical business value of AEMS.

| Function               | Work currently requiring manual effort to validate | Proposed system improvement          | Expected result            |
| ---------------------- | -------------------------------------------------- | ------------------------------------ | -------------------------- |
| Applicant support      | Responding to status enquiries                     | Applicant tracking and notifications | Fewer repetitive enquiries |
| Document scrutiny      | Opening and comparing PDFs                         | AI-assisted case summary             | Reduced review preparation |
| Education verification | Checking marksheets and certificates               | Structured academic checklist        | Easier verification        |
| Accounts               | Reconciling payment details                        | Payment matching workspace           | Less manual reconciliation |
| Appointment team       | Preparing lists and managing schedules             | Automated scheduling                 | Less coordination          |
| Committee secretariat  | Preparing files and agendas                        | Digital meeting packs                | Less paper preparation     |
| Records team           | Maintaining registers                              | Central digital records              | Faster retrieval           |
| Senior administration  | Collecting team reports                            | Command centre                       | Less report consolidation  |

These are proposed benefits. Actual reductions should be measured during the pilot.

# C7. Escalation and handover model

AEMS should support administrative handover without losing case history.

Example: Officer is unavailable

Officer A has 15 active tasks

Supervisor reviews workload

Checks role, availability and existing assignments

Tasks reassigned to Officer B

Preserve documents, comments and history

Officer B resumes work

Receives updated work bucket and case context

The system should record:

- Previous owner.
- New owner.
- Reassignment reason.
- Date and time.
- Supervisor authorisation.
- Outstanding tasks.
- Existing observations.

# C8. Exception management

Not every application can follow the standard path.

The system should support exceptions such as:

| Exception                       | Proposed handling                             |
| ------------------------------- | --------------------------------------------- |
| Poor-quality scan               | Request clearer document                      |
| Name mismatch                   | Officer review and supporting evidence        |
| Missing university response     | Track verification request and response       |
| Duplicate application           | Flag for authorised examination               |
| Payment mismatch                | Route to accounts                             |
| Conditional employment document | Check applicability against approved rules    |
| AI processing failure           | Place in manual review queue                  |
| Applicant disputes deficiency   | Route to designated review function           |
| Committee deferral              | Record authorised observation and next action |

No exception should be automatically treated as grounds for rejection.

# C9. Business process governance

The Bar Council should approve the following before production implementation:

1. Application stages and permitted transitions.
2. Required document checklists.
3. Conditional document rules.
4. Official roles and responsibilities.
5. Approval and delegation matrix.
6. Committee workflow.
7. Deficiency communication templates.
8. Notification policies.
9. Record retention requirements.
10. Audit and exception handling policies.

# C10. Appendix C acceptance criteria

- Every major workflow activity has an identified responsible function.
- Every approval has an authorised accountable role.
- All application transitions are controlled.
- Work can be reassigned without losing case history.
- Applicant corrections return to the correct queue.
- AI tasks are separated from human legal decisions.
- Committee authority is preserved.
- Exceptions have defined handling procedures.
- All important workflow actions are auditable.

Appendix C conclusion

The proposed operating model establishes how AEMS will function as a digital enrolment office. It connects applicant actions, administrative work, AI-assisted preparation, supervisory coordination and authorised committee decisions.

The next appendix should cover Appendix D: Data Model, Application Lifecycle, Database Entities and Integration Architecture. This will explain what information the system must store, how it connects applicant records to documents and tasks, and how the technology will support the business workflows.