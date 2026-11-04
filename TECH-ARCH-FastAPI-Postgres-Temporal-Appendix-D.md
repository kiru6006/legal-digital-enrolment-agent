# Appendix D: Data Model, Application Lifecycle and Integration Architecture

Project: Advocate Enrolment Management System (AEMS)\
Proposed for: Bar Council of Tamil Nadu and Puducherry

Purpose: Define how AEMS will store, connect, process and protect information across applicants, applications, documents, officials, tasks, notifications, committees and enrolment records.

This appendix is intended for business analysts, solution architects, database developers, security teams and Bar Council IT stakeholders.

The central design principle is:

One applicant can have multiple records over time, but every enrolment application must have one central digital case file containing its documents, tasks, observations, communications and decision history.

# D1. High-level system architecture

The proposed platform has three user experiences connected to a shared application platform.

AEMS user interfaces

Applicant

Portal

Officials

Workspace

Management

Command centre

API and application services

Authentication · Application management · Search · Workflow · Notifications

Business services

Validation · Assignment · Approval · Reporting

AI services

OCR · Classification · Extraction · Summary

Central data and document services

PostgreSQL · Secure document repository · Audit logs · Search index

Approved external integrations

Payment · SMS · Email · University verification · Digital signature

# D2. Core data entities

The database should be designed around the application lifecycle rather than individual screens.

| Entity              | Purpose                                        | Example                    |
| ------------------- | ---------------------------------------------- | -------------------------- |
| Applicant           | Stores applicant identity                      | Applicant ID               |
| Application         | Main enrolment case                            | AEMS-2026-1045             |
| Application details | Personal, education and employment information | DOB, degree, institution   |
| Document            | Uploaded document metadata                     | LLB degree certificate     |
| Document version    | Preserves each upload version                  | Version 1, Version 2       |
| Document extraction | Stores OCR and AI-extracted information        | Extracted applicant name   |
| Checklist           | Defines required document categories           | Education checklist        |
| Checklist item      | Defines individual requirements                | Final semester marksheet   |
| Task                | Stores work assigned to officials              | Verify education           |
| User                | Stores official account                        | Officer ID                 |
| Role                | Defines functional permissions                 | Scrutiny Officer           |
| Assignment          | Connects tasks to officials                    | Task assigned to Officer A |
| Observation         | Stores officer findings                        | Name mismatch              |
| Deficiency          | Stores applicant correction requests           | Missing document           |
| Notification        | Stores communication records                   | Email sent                 |
| Payment             | Stores payment and reconciliation data         | Transaction reference      |
| Appointment         | Stores scheduled enrolment activities          | Appointment date           |
| Committee meeting   | Stores meeting information                     | Meeting ID                 |
| Committee case      | Connects applications to meetings              | Application reference      |
| Decision            | Stores authorised decisions                    | Decision record            |
| Enrolment record    | Stores final enrolment details                 | Enrolment number           |
| Audit log           | Records system activities                      | User, action, timestamp    |

# D3. Entity relationship model

\#chatgpt-mermaid-\_r_bf8\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_bf8\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_bf8\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_bf8\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_bf8\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bf8\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_bf8\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_bf8\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_bf8\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_bf8\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_bf8\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_bf8\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bf8\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bf8\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_bf8\_ p{margin:0;}#chatgpt-mermaid-\_r_bf8\_ .entityBox{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_bf8\_ .relationshipLabelBox{fill:rgba(255, 255, 255, 0.96);opacity:0.7;background-color:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_bf8\_ .relationshipLabelBox rect{opacity:0.5;}#chatgpt-mermaid-\_r_bf8\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_bf8\_ .edgeLabel{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_bf8\_ .edgeLabel .label rect{fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_bf8\_ .edgeLabel .label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bf8\_ .edgeLabel .label{fill:rgb(83, 154, 248);font-size:14px;}#chatgpt-mermaid-\_r_bf8\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bf8\_ .edge-pattern-dashed{stroke-dasharray:8,8;}#chatgpt-mermaid-\_r_bf8\_ .node rect,#chatgpt-mermaid-\_r_bf8\_ .node circle,#chatgpt-mermaid-\_r_bf8\_ .node ellipse,#chatgpt-mermaid-\_r_bf8\_ .node polygon{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_bf8\_ .relationshipLine{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;fill:none;}#chatgpt-mermaid-\_r_bf8\_ .marker{fill:none!important;stroke:rgba(26, 28, 31, 0.494)!important;stroke-width:1;}#chatgpt-mermaid-\_r_bf8\_ [data-look=neo].labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_bf8\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_bf8\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_bf8\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_bf8\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_bf8\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bf8\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_bf8\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bf8\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}APPLICANTAPPLICATIONDOCUMENTDOCUMENT_VERSIONAI_EXTRACTIONCHECKLIST_ITEMTASKUSERTASK_ASSIGNMENTOBSERVATIONDEFICIENCYNOTIFICATIONPAYMENTAPPOINTMENTCOMMITTEE_MEETINGCOMMITTEE_CASEDECISIONENROLMENT_RECORDAUDIT_LOGsubmitscontainshasproducesrequiresgeneratesreceivesassigned_throughrecordsraisesreceivesgenerateshasschedulesincludesconsidered_inrecordsresults_inperforms

Design note: A task assignment, a document version and an authorised decision are separate records. This is important for preserving history and avoiding accidental overwriting.

# D4. Proposed application data structure

Every application should have a central record with a unique reference number.

Example:

```
{
  "application_id": "AEMS-2026-1045",
  "applicant_id": "APPL-10045",
  "enrolment_batch": "2026",
  "application_status": "UNDER_REVIEW",
  "submission_date": "2026-10-15",
  "assigned_function": "EDUCATION_VERIFICATION",
  "assigned_officer": "OFF-1002",
  "document_summary": {
    "required": 14,
    "received": 12,
    "verified": 10,
    "potential_exceptions": 2
  },
  "workflow": {
    "current_stage": "EDUCATION_VERIFICATION",
    "next_action": "OFFICER_REVIEW",
    "human_review_required": true
  }
}
```

This is an illustrative data structure, not an actual applicant record.

# D5. Application lifecycle and state transitions

The workflow engine should control which actions are allowed at each stage.

\#chatgpt-mermaid-\_r_bfl\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_bfl\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_bfl\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_bfl\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_bfl\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_bfl\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_bfl\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_bfl\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_bfl\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_bfl\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_bfl\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bfl\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bfl\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_bfl\_ p{margin:0;}#chatgpt-mermaid-\_r_bfl\_ defs [id$="-barbEnd"]{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bfl\_ g.stateGroup text{fill:rgb(83, 154, 248);stroke:none;font-size:10px;}#chatgpt-mermaid-\_r_bfl\_ g.stateGroup text{fill:rgb(26, 28, 31);stroke:none;font-size:10px;}#chatgpt-mermaid-\_r_bfl\_ g.stateGroup .state-title{font-weight:bolder;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ g.stateGroup rect{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_bfl\_ g.stateGroup line{stroke:rgba(26, 28, 31, 0.494);stroke-width:1;}#chatgpt-mermaid-\_r_bfl\_ .transition{stroke:rgba(26, 28, 31, 0.494);stroke-width:1;fill:none;}#chatgpt-mermaid-\_r_bfl\_ .stateGroup .composit{fill:transparent;border-bottom:1px;}#chatgpt-mermaid-\_r_bfl\_ .stateGroup .alt-composit{fill:#e0e0e0;border-bottom:1px;}#chatgpt-mermaid-\_r_bfl\_ .state-note{stroke:rgb(107, 198, 127);fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_bfl\_ .state-note text{fill:rgb(26, 28, 31);stroke:none;font-size:10px;}#chatgpt-mermaid-\_r_bfl\_ .stateLabel .box{stroke:none;stroke-width:0;fill:rgb(224, 237, 254);opacity:0.5;}#chatgpt-mermaid-\_r_bfl\_ .edgeLabel .label rect{fill:rgb(224, 237, 254);opacity:0.5;}#chatgpt-mermaid-\_r_bfl\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_bfl\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_bfl\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_bfl\_ .edgeLabel .label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ .label div .edgeLabel{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ .stateLabel text{fill:rgb(26, 28, 31);font-size:10px;font-weight:bold;}#chatgpt-mermaid-\_r_bfl\_ .node circle.state-start{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bfl\_ .node .fork-join{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bfl\_ .node circle.state-end{fill:rgb(83, 154, 248);stroke:transparent;stroke-width:1.5;}#chatgpt-mermaid-\_r_bfl\_ .end-state-inner{fill:transparent;stroke-width:1.5;}#chatgpt-mermaid-\_r_bfl\_ .node rect{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_bfl\_ .node polygon{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_bfl\_ [id$="-barbEnd"]{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bfl\_ .statediagram-cluster rect{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_bfl\_ .cluster-label,#chatgpt-mermaid-\_r_bfl\_ .nodeLabel{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ .statediagram-cluster rect.outer{rx:5px;ry:5px;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-state .divider{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_bfl\_ .statediagram-state .title-state{rx:5px;ry:5px;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-cluster.statediagram-cluster .inner{fill:transparent;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-cluster.statediagram-cluster-alt .inner{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_bfl\_ .statediagram-cluster .inner{rx:0;ry:0;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-state rect.basic{rx:5px;ry:5px;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-state rect.divider{stroke-dasharray:10,10;fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_bfl\_ .note-edge{stroke-dasharray:5;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-note rect{fill:rgba(255, 255, 255, 0.96);stroke:rgb(107, 198, 127);stroke-width:1px;rx:0;ry:0;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-note rect{fill:rgba(255, 255, 255, 0.96);stroke:rgb(107, 198, 127);stroke-width:1px;rx:0;ry:0;}#chatgpt-mermaid-\_r_bfl\_ .statediagram-note text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ .statediagram-note .nodeLabel{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ .statediagram .edgeLabel{color:red;}#chatgpt-mermaid-\_r_bfl\_ [id$="-dependencyStart"],#chatgpt-mermaid-\_r_bfl\_ [id$="-dependencyEnd"]{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);stroke-width:1;}#chatgpt-mermaid-\_r_bfl\_ .statediagramTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].statediagram-cluster rect{fill:rgb(224, 237, 254);stroke:url(#chatgpt-mermaid-\_r_bfl\_-gradient);stroke-width:1;}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].statediagram-cluster rect.outer{rx:5px;ry:5px;filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bfl\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_bfl\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_bfl\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_bfl\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_bfl\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bfl\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_bfl\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bfl\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}DraftSubmittedAI_PreparationReady_for_ScrutinyManual_ReviewUnder_ReviewDeficiency_RaisedCorrection_SubmittedRe_ReviewVerification_PendingCommittee_ReadyCommittee_ConsiderationDeferredDecision_RecordedCompleted

The production workflow must also include valid rejection, withdrawal, closure and other legally permitted outcomes where applicable. Those transitions require approval from the Bar Council.

## D5.1 Transition rules

| Current state           | Triggering action                  | Next state              |
| ----------------------- | ---------------------------------- | ----------------------- |
| Draft                   | Applicant submits                  | Submitted               |
| Submitted               | Submission validation succeeds     | AI preparation          |
| AI preparation          | Required processing completes      | Ready for scrutiny      |
| Ready for scrutiny      | Task assigned and opened           | Under review            |
| Under review            | Deficiency authorised              | Deficiency raised       |
| Deficiency raised       | Applicant uploads correction       | Correction submitted    |
| Correction submitted    | Review task generated              | Re-review               |
| Under review            | Required verification outstanding  | Verification pending    |
| Under review            | Scrutiny complete                  | Committee ready         |
| Committee ready         | Meeting process begins             | Committee consideration |
| Committee consideration | Authorised deferral                | Deferred                |
| Committee consideration | Authorised outcome recorded        | Decision recorded       |
| Decision recorded       | Required administrative completion | Completed               |

The system should prevent invalid state changes and record the user and reason for every important transition.

# D6. Document management architecture

Documents are central to the enrolment process. AEMS must maintain a structured document repository rather than treating uploads as ordinary attachments.

## D6.1 Document categories

| Category                | Illustrative documents                                   |
| ----------------------- | -------------------------------------------------------- |
| Personal identity       | Identity proof, photograph, signature                    |
| School education        | 10th and 12th certificates                               |
| Undergraduate education | Degree certificate and marksheets                        |
| Legal education         | LLB degree, provisional certificate, semester marksheets |
| Employment              | Employment proof, relieving documents where applicable   |
| Address                 | Address proof                                            |
| Declarations            | Affidavits and prescribed declarations                   |
| Payment                 | Payment receipt and transaction evidence                 |
| Other                   | Additional documents required under approved rules       |

The final checklist must be approved by the Bar Council. Some requirements may be conditional based on applicant circumstances.

## D6.2 Document version management

Example:

Document: Semester 6 Marksheet

Version 1

Correction requested

Uploaded 15 October 2026

Version 2

Submitted for review

Uploaded 18 October 2026

AI comparison summary

- New file detected.
- Document category appears consistent.
- Applicant name extracted.
- Key fields require officer verification.

Illustrative document history.

Required document controls

- Preserve the original uploaded file.
- Generate a unique document ID.
- Store each correction as a new version.
- Record uploader and upload timestamp.
- Record the document's category and application reference.
- Maintain verification status separately from upload status.
- Prevent unauthorised replacement or deletion.
- Support secure document preview.
- Maintain checksums to detect file alteration.

# D7. AI document processing architecture

AI processing should operate as a preparation service. It should not directly change statutory application outcomes.

\#chatgpt-mermaid-\_r_bg0\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_bg0\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_bg0\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_bg0\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_bg0\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_bg0\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_bg0\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_bg0\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_bg0\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_bg0\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bg0\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bg0\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_bg0\_ p{margin:0;}#chatgpt-mermaid-\_r_bg0\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ .cluster-label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ .cluster-label span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_bg0\_ .label text,#chatgpt-mermaid-\_r_bg0\_ span{fill:rgb(26, 28, 31);color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ .node rect,#chatgpt-mermaid-\_r_bg0\_ .node circle,#chatgpt-mermaid-\_r_bg0\_ .node ellipse,#chatgpt-mermaid-\_r_bg0\_ .node polygon,#chatgpt-mermaid-\_r_bg0\_ .node path{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ .rough-node .label text,#chatgpt-mermaid-\_r_bg0\_ .node .label text,#chatgpt-mermaid-\_r_bg0\_ .image-shape .label,#chatgpt-mermaid-\_r_bg0\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_bg0\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ .rough-node .label,#chatgpt-mermaid-\_r_bg0\_ .node .label,#chatgpt-mermaid-\_r_bg0\_ .image-shape .label,#chatgpt-mermaid-\_r_bg0\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_bg0\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_bg0\_ .root .anchor path{fill:rgba(26, 28, 31, 0.494)!important;stroke-width:0;stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bg0\_ .arrowheadPath{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bg0\_ .edgePath .path{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ .flowchart-link{stroke:rgba(26, 28, 31, 0.494);fill:none;}#chatgpt-mermaid-\_r_bg0\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_bg0\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_bg0\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_bg0\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_bg0\_ .cluster rect{fill:rgba(255, 255, 255, 0.96);stroke:rgba(26, 28, 31, 0.08);stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ .cluster text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ .cluster span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:12px;background:rgba(255, 255, 255, 0.96);border:1px solid rgba(26, 28, 31, 0.08);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_bg0\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_bg0\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_bg0\_ .icon-shape,#chatgpt-mermaid-\_r_bg0\_ .image-shape{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_bg0\_ .icon-shape p,#chatgpt-mermaid-\_r_bg0\_ .image-shape p{background-color:rgb(255, 255, 255);padding:2px;}#chatgpt-mermaid-\_r_bg0\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_bg0\_ .image-shape .label rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_bg0\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_bg0\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_bg0\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_bg0\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_bg0\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_bg0\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_bg0\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bg0\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_bg0\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_bg0\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_bg0\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_bg0\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_bg0\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_bg0\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ .node rect,#chatgpt-mermaid-\_r_bg0\_ .node circle,#chatgpt-mermaid-\_r_bg0\_ .node ellipse,#chatgpt-mermaid-\_r_bg0\_ .node polygon,#chatgpt-mermaid-\_r_bg0\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_bg0\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_bg0\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_bg0\_ .edgePaths .flowchart-link{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_bg0\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_bg0\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}Applicant uploads documentSecure document storageFile validation and malwarescanOCR and text extractionAI document classificationStructured informationextractionApproved checklistcomparisonCross-document consistencychecksAI case summaryEvidence and confidencevalidationOfficial review queueAuthorised human actionProcessing exception

## D7.1 AI processing components

| Component             | Responsibility                    | Output                    |
| --------------------- | --------------------------------- | ------------------------- |
| Document classifier   | Identify document type            | Category and confidence   |
| OCR service           | Extract text                      | Extracted text            |
| Extraction service    | Extract relevant fields           | Structured JSON           |
| Checklist engine      | Compare against approved rules    | Missing-item candidates   |
| Consistency engine    | Compare application and documents | Potential inconsistencies |
| Summary generator     | Prepare case briefing             | Structured summary        |
| Evidence validator    | Link findings to source material  | Evidence references       |
| Human review workflow | Route results to officials        | Review task               |

## D7.2 AI output example

```
{
  "application_id": "AEMS-2026-1045",
  "document_category": "EDUCATION",
  "ai_observations": [
    {
      "observation": "Semester 6 marksheet not identified",
      "confidence": 0.98,
      "source_document": null,
      "requires_human_review": true
    },
    {
      "observation": "Applicant name differs from application record",
      "confidence": 0.87,
      "source_document": "DOC-1055",
      "source_page": 1,
      "requires_human_review": true
    }
  ],
  "overall_status": "REVIEW_REQUIRED"
}
```

A missing-document finding must be based on the correct approved checklist for that applicant. A confidence score does not establish legal correctness.

# D8. Proposed database schema

The following is a simplified logical schema. Final production data types, indexes, constraints and security policies will be established during technical design.

| Table                  | Key fields                                                  |
| ---------------------- | ----------------------------------------------------------- |
| applicants             | applicant_id, name, date_of_birth, contact                  |
| applications           | application_id, applicant_id, batch, status, submitted_at   |
| application_education  | education_id, application_id, institution, qualification    |
| application_employment | employment_id, application_id, employer, period             |
| documents              | document_id, application_id, category, current_version      |
| document_versions      | version_id, document_id, storage_key, checksum, uploaded_at |
| ai_extractions         | extraction_id, version_id, extracted_data, confidence       |
| checklists             | checklist_id, version, effective_date, approval_status      |
| checklist_items        | item_id, checklist_id, category, condition_rule             |
| tasks                  | task_id, application_id, task_type, status                  |
| task_assignments       | assignment_id, task_id, user_id, assigned_at                |
| observations           | observation_id, application_id, user_id, comment            |
| deficiencies           | deficiency_id, application_id, document_id, status          |
| notifications          | notification_id, application_id, channel, delivery_status   |
| payments               | payment_id, application_id, transaction_reference, status   |
| appointments           | appointment_id, application_id, date, status                |
| committee_meetings     | meeting_id, meeting_date, status                            |
| committee_cases        | meeting_id, application_id, agenda_sequence                 |
| decisions              | decision_id, application_id, authority, decision_status     |
| enrolment_records      | enrolment_id, application_id, enrolment_number              |
| users                  | user_id, username, account_status                           |
| roles                  | role_id, role_name                                          |
| permissions            | permission_id, permission_name                              |
| user_roles             | user_id, role_id                                            |
| audit_logs             | audit_id, user_id, action, entity_id, timestamp             |

Important data design rules

1. Applicant details and application details should be separate entities.
2. A document's metadata and its actual file should be stored separately.
3. Document versions should be immutable.
4. Checklist rules must be version-controlled.
5. Decisions must be separate from workflow statuses.
6. Audit records must not be casually edited or deleted.
7. Access should be checked at application and document level, not just at menu level.

# D9. API architecture

The platform should expose controlled APIs for each business function.

| API group      | Example endpoint                     | Purpose                     |
| -------------- | ------------------------------------ | --------------------------- |
| Authentication | POST /api/auth/login                 | Authenticate users          |
| Applicant      | POST /api/applicants                 | Register applicant          |
| Application    | POST /api/applications               | Create application          |
| Application    | GET /api/applications/               | Retrieve case               |
| Documents      | POST /api/applications//documents    | Upload document             |
| Documents      | GET /api/documents//versions         | Retrieve version history    |
| AI review      | POST /api/documents//process         | Start document processing   |
| AI review      | GET /api/applications//summary       | Retrieve AI summary         |
| Work queue     | GET /api/work-queue/my-tasks         | Retrieve assigned tasks     |
| Assignment     | POST /api/tasks//assign              | Assign task                 |
| Deficiency     | POST /api/applications//deficiencies | Create deficiency           |
| Correction     | POST /api/deficiencies//responses    | Submit correction           |
| Workflow       | POST /api/applications//transitions  | Request state transition    |
| Notification   | GET /api/notifications               | Retrieve notifications      |
| Management     | GET /api/management/overview         | Retrieve dashboard metrics  |
| Committee      | POST /api/committee/meetings         | Create meeting record       |
| Audit          | GET /api/audit/                      | Retrieve authorised history |

These are illustrative API contracts. Authentication, validation, request formats, response schemas and permission checks must be defined before implementation.

## D9.1 Example: Officer completes a task

```
POST /api/tasks/TASK-1055/complete
Authorization: Bearer <access-token>
Content-Type: application/json
```

```
{
  "action": "DOCUMENT_VERIFIED",
  "observation": "Document reviewed and verified",
  "evidence_document_id": "DOC-1055"
}
```

Expected backend behaviour:

1. Authenticate the official.
2. Check permission and task ownership.
3. Validate the current task state.
4. Save the officer's observation.
5. Record the action in the audit log.
6. Update the task status.
7. Generate the next workflow task if applicable.
8. Update the work buckets.
9. Trigger relevant notifications.

A successful HTTP response alone must not be treated as proof that a legal or statutory approval has occurred.

# D10. Integration architecture

AEMS may need to connect with external services. All integrations require formal approval and technical access.

| Integration                   | Purpose                                | Requirement                               |
| ----------------------------- | -------------------------------------- | ----------------------------------------- |
| Email provider                | Application and official notifications | Approved sender and delivery tracking     |
| SMS gateway                   | Applicant alerts                       | Approved provider and templates           |
| WhatsApp Business             | Optional applicant communication       | Consent and approved business integration |
| Payment gateway               | Payment collection and reconciliation  | Secure transaction verification           |
| University systems            | Academic verification                  | Authorised institutional access           |
| Digital signature provider    | Approved electronic signing            | Legal and technical validation            |
| Identity verification service | Identity checks, if authorised         | Lawful basis and approved integration     |
| Reporting service             | Management reporting                   | Controlled data access                    |

## D10.1 Integration failure handling

The platform should not lose application data when an external provider is unavailable.

For example:

- If an SMS fails, record the failure and allow a retry.
- If a university service is unavailable, retain the verification request.
- If payment confirmation is delayed, mark reconciliation as pending.
- If AI processing fails, route the document for manual review.
- If a digital signature provider is unavailable, preserve the unsigned draft.

# D11. Security and privacy architecture

Applicant data includes personal identity, educational records and other potentially sensitive information. Production implementation must apply strong controls.

Mandatory security requirements

- Role-based and application-level access.
- Multi-factor authentication for officials.
- Encryption in transit and at rest.
- Secure document storage with private access.
- Malware scanning of uploaded files.
- Session expiry and account lockout controls.
- Audit logging for important actions.
- Backup and disaster recovery.
- Restricted access to AI providers.
- Data minimisation.
- Defined retention and deletion policies.
- Security monitoring and incident response.
- Regular vulnerability assessments and penetration testing.

The final privacy and compliance design must be reviewed against applicable Indian law, the current DPDP implementation timeline and the Bar Council's own record-retention and confidentiality requirements.

# D12. Recommended technology architecture

| Layer               | Proposed technology                  | Reason                        |
| ------------------- | ------------------------------------ | ----------------------------- |
| Applicant frontend  | React + TypeScript                   | Reusable applicant experience |
| Officials' frontend | React + TypeScript                   | Rich operational dashboards   |
| UI framework        | Tailwind CSS + shadcn/ui             | Consistent design             |
| Backend             | Python + FastAPI                     | API and AI integration        |
| Database            | PostgreSQL                           | Relational business records   |
| Document storage    | Private object storage               | Secure file handling          |
| OCR                 | AWS Textract or equivalent           | Document text extraction      |
| AI                  | Approved enterprise LLM              | Classification and summaries  |
| Workflow            | Temporal or BPMN engine              | Durable task orchestration    |
| Authentication      | Enterprise identity provider         | Centralised access management |
| Reporting           | Metabase or custom dashboards        | Operational analytics         |
| Hosting             | Approved secure cloud infrastructure | Production operation          |

Architecture recommendation: Begin with a modular monolith. Keep application management, workflow, document services, AI processing and reporting as separate modules, but do not introduce a large microservices architecture before there is a clear operational need.

# D13. Prototype architecture versus production architecture

This distinction is important because the proposed demonstration is intended to run on GitHub Pages.

| Capability                    | GitHub Pages demonstration      | Production AEMS                        |
| ----------------------------- | ------------------------------- | -------------------------------------- |
| Applicant portal              | Yes, simulated                  | Yes                                    |
| Officials' dashboard          | Yes, simulated                  | Yes                                    |
| Management dashboard          | Yes, simulated                  | Yes                                    |
| Fictional application records | Yes                             | Test and authorised production records |
| Workflow transitions          | Browser simulation              | Backend-controlled workflow            |
| AI document processing        | Simulated results               | Secure OCR and AI services             |
| Document uploads              | Demo-only, temporary/local      | Private object storage                 |
| Authentication                | Demo role selection only        | Secure authentication                  |
| Database                      | Mock data/local browser storage | PostgreSQL                             |
| Notifications                 | In-app simulation               | Approved email/SMS integrations        |
| Payment                       | Simulated                       | Approved payment gateway               |
| Audit                         | Demo event history              | Durable protected audit service        |

GitHub Pages cannot securely host the backend or private application documents. It must not be used to process real applicant data.

# D14. Data ownership and governance

The Bar Council should retain control over:

- Applicant records.
- Application documents.
- Enrolment records.
- Official observations.
- Committee decisions.
- Workflow history.
- Audit records.
- Approved document checklists.
- AI-generated summaries and extraction records.

The technology provider should have only the access required to develop, operate and support the approved system.

AI providers must not be allowed to use applicant documents for unrelated model training or purposes outside the approved processing arrangement.

# D15. Appendix D acceptance criteria

- All major business entities have been identified.
- Applicant and application records are separated.
- Document versions are preserved.
- Application state transitions are controlled.
- Tasks are linked to applications and officials.
- AI observations are linked to source evidence.
- Decisions are stored separately from AI recommendations.
- APIs enforce authentication and permissions.
- External integration failures are handled safely.
- Security and privacy controls are approved.
- Prototype and production environments are clearly separated.

Appendix D conclusion

This architecture provides the technical foundation for a central digital enrolment office. It ensures that the applicant journey, official work allocation, document processing, management reporting and committee workflow all operate on the same controlled application record.

# Next: Appendix E. Project Delivery, Implementation Roadmap and Business Case

The next section should establish:

1. Implementation phases and deliverables.
2. Project team and responsibilities.
3. Proposed 16-week pilot.
4. Development and testing strategy.
5. Training and change management.
6. Cost estimation framework.
7. Business benefits and return-on-investment model.
8. Production rollout and support model.
9. Final approval and go-live criteria.

This will complete the core BRD proposal and make it suitable for a formal project approval discussion.