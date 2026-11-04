Appendix B: Detailed User Stories and Acceptance Criteria
Advocate Enrolment Management System (AEMS)
Purpose: Convert the business proposal and wireframes into clear, testable software requirements.

This appendix will help:
- Bar Council officials validate whether the system solves their actual problems.
- Business analysts understand what each user needs.
- Developers understand what functionality to build.
- Testers verify whether each feature works correctly.
- Project managers measure delivery progress.
B1. Applicant portal user stories
B1.1 Application submission
ID	User story	Priority
US-APP-001	As an applicant, I want to register and log in securely so that I can access my enrolment application.	Critical
US-APP-002	I want to save my application and resume later so that I do not lose entered information.	High
US-APP-003	I want to enter personal, educational and employment details in structured sections.	Critical
US-APP-004	I want to upload supporting documents under the correct categories.	Critical
US-APP-005	I want to preview my application before submission.	High
US-APP-006	I want to receive an acknowledgement and application reference number.	Critical
US-APP-007	I want to know whether my application was successfully submitted.	Critical

Acceptance criteria
1. Applicant can register and authenticate.
2. Mandatory fields are validated.
3. Application data can be saved.
4. Uploaded files are checked for allowed type and size.
5. Applicant can preview information before final submission.
6. Submitted applications receive unique reference numbers.
7. Submission history is retained.
B1.2 Application tracking
ID	User story	Priority
US-APP-008	I want to see the current status of my application.	Critical
US-APP-009	I want to see which stages have been completed.	High
US-APP-010	I want to see which stages are pending.	High
US-APP-011	I want to see the latest action taken by the office.	High
US-APP-012	I want to receive notifications when my application status changes.	High
US-APP-013	I want to see the next expected action.	High

Acceptance criteria
- Status reflects the actual workflow state.
- Completed stages are visibly distinguished from pending stages.
- Applicant-facing information does not expose internal confidential comments.
- Status history is available.
- Notifications are generated according to approved notification rules.
B1.3 Applicant correction management
ID	User story	Priority
US-APP-014	I want to receive a specific explanation when a document is missing or incorrect.	Critical
US-APP-015	I want to know exactly which document requires correction.	Critical
US-APP-016	I want to upload only the corrected document.	Critical
US-APP-017	I want to see my previous document submission history.	High
US-APP-018	I want to know whether the corrected document has been accepted.	High

Acceptance criteria
1. Every deficiency must identify the affected document or field.
2. The reason and required action must be visible.
3. Applicant can submit a corrected document.
4. Earlier versions must remain available to authorised officials.
5. New versions must be distinguishable.
6. Corrected documents must return to the appropriate review queue.
7. Applicant must receive confirmation of successful submission.
B2. Officials' workspace user stories
This is the most important operational component of AEMS.
B2.1 Daily work management
ID	User story	Priority
US-OFF-001	As an official, I want to see all applications assigned to me.	Critical
US-OFF-002	I want to see my daily work buckets.	Critical
US-OFF-003	I want to see newly assigned tasks.	Critical
US-OFF-004	I want to filter tasks by category and status.	High
US-OFF-005	I want to identify applications ready for review.	Critical
US-OFF-006	I want to see corrected documents submitted by applicants.	Critical
US-OFF-007	I want to see tasks completed during the day.	High
US-OFF-008	I want to receive a daily work summary.	High

Acceptance criteria
- Every task has a unique identifier.
- Every assigned task has an accountable owner.
- The dashboard displays accurate task counts.
- Completed tasks are removed from active work buckets.
- Corrected applications return to the relevant queue.
- Officials can access only authorised applications.
- Dashboard counts update when tasks change state.
B2.2 Digital case file
ID	User story	Priority
US-OFF-009	I want all applicant information in one digital case file.	Critical
US-OFF-010	I want to see documents grouped by category.	Critical
US-OFF-011	I want to view AI-generated document summaries.	High
US-OFF-012	I want to see missing documents.	Critical
US-OFF-013	I want to identify potential inconsistencies.	High
US-OFF-014	I want to view previous officer observations.	High
US-OFF-015	I want to see document submission versions.	High

Acceptance criteria
- The case file contains all submitted application information.
- Documents are displayed under their relevant categories.
- Every AI observation references supporting evidence.
- Missing-document results are based on approved checklists.
- Historical observations remain available.
- Documents can be opened without downloading the entire application file.
B2.3 Application scrutiny
ID	User story	Priority
US-OFF-016	I want to mark documents as verified.	Critical
US-OFF-017	I want to record an observation.	Critical
US-OFF-018	I want to raise a deficiency.	Critical
US-OFF-019	I want to forward a case to another authorised function.	Critical
US-OFF-020	I want to escalate a case when required.	High
US-OFF-021	I want to see the history of actions taken.	Critical

Acceptance criteria
- Every action is permission-controlled.
- Verification requires an authenticated official.
- Comments are timestamped.
- Deficiency notices use approved communication templates.
- Forwarding changes the workflow state and destination queue.
- Escalations are recorded with their reasons.
- No unauthorised user can make a final statutory decision.
B3. Senior officials' user stories
B3.1 Command centre
ID	User story	Priority
US-MGT-001	As a senior official, I want to see total active applications.	Critical
US-MGT-002	I want to see completed applications.	Critical
US-MGT-003	I want to see applications at each processing stage.	Critical
US-MGT-004	I want to see team-wise work distribution.	Critical
US-MGT-005	I want to see daily work completed.	High
US-MGT-006	I want to identify cases requiring authorised decisions.	Critical
US-MGT-007	I want to generate daily management reports.	High
US-MGT-008	I want to view historical enrolment statistics.	Medium

Acceptance criteria
- Dashboard metrics come from central workflow records.
- Metrics can be filtered by date and enrolment batch.
- Senior officials can drill down into authorised team and application details.
- Reports can be exported in approved formats.
- Data refreshes according to defined operational requirements.
B3.2 Work distribution
ID	User story	Priority
US-MGT-009	I want to assign applications to officials.	Critical
US-MGT-010	I want to reassign tasks when officials are unavailable.	High
US-MGT-011	I want to see team workload.	Critical
US-MGT-012	I want to view upcoming workload.	Medium
US-MGT-013	I want to prepare daily operational briefings.	High

Acceptance criteria
- Only authorised supervisors can assign and reassign work.
- Assignment history is retained.
- Reassignment preserves existing case comments and evidence.
- Workload is calculated using actual active assignments.
- Reports distinguish assigned, completed and pending tasks.
B4. AI and automation user stories
ID	User story	Priority
US-AI-001	As an officer, I want uploaded documents classified automatically.	High
US-AI-002	I want text extracted from scanned documents.	High
US-AI-003	I want applicant details compared with supporting documents.	High
US-AI-004	I want the system to identify potentially missing documents.	Critical
US-AI-005	I want a one-page AI-generated case summary.	High
US-AI-006	I want corrected documents compared with previous versions.	High
US-AI-007	I want AI to prepare draft deficiency communications.	High
US-AI-008	I want AI to prepare committee case summaries.	Medium
US-AI-009	I want AI observations to link to source evidence.	Critical

Acceptance criteria
- AI must use approved document categories and rules.
- AI must distinguish extracted facts from inferred observations.
- Confidence and review status must be visible.
- Low-confidence extraction must be flagged for human review.
- Every observation must link to source evidence where available.
- AI cannot independently approve or reject enrolment.
- AI processing failures must not silently change an application's legal or administrative status.
B5. Notifications and reporting user stories
ID	User story	Priority
US-NOT-001	As an applicant, I want daily application progress updates.	High
US-NOT-002	I want immediate notification when action is required.	Critical
US-NOT-003	As an official, I want my daily work allocation notification.	High
US-NOT-004	I want notifications for newly assigned work.	High
US-NOT-005	As a senior official, I want a morning operational briefing.	High
US-NOT-006	I want an automatic end-of-day progress report.	High
US-NOT-007	I want to see whether a notification was successfully delivered.	Medium

Acceptance criteria
- Notifications use approved templates.
- Duplicate notifications are prevented.
- Delivery attempts are logged.
- Failed messages are available for authorised follow-up.
- Sensitive information is not unnecessarily included in SMS or email.
- Daily summaries do not repeat unchanged information unnecessarily.
B6. Committee and administration user stories
ID	User story	Priority
US-COM-001	As a committee secretary, I want to prepare a list of committee-ready applications.	High
US-COM-002	I want to generate an indexed digital meeting pack.	High
US-COM-003	I want to record committee observations.	Critical
US-COM-004	I want to record authorised decisions.	Critical
US-COM-005	I want to maintain deferred-case records.	High
US-ADM-001	As an administrator, I want to manage user access.	Critical
US-ADM-002	I want to assign role-based permissions.	Critical
US-ADM-003	I want to view the audit history.	Critical

B7. End-to-end acceptance scenario
This is the most important demonstration scenario for the Bar Council.

Scenario: Applicant submits an incomplete application and later corrects it.
1. Applicant submits application
   
   Application AEMS-2026-1045 is submitted with 12 of 14 expected documents.
   Submission successful
2. AI prepares application
   
   The system classifies documents, extracts information and identifies two potential exceptions.
3. Official receives work
   
   Application appears in the education verification officer's work bucket.
4. Official reviews case
   
   Officer checks the AI observations and confirms that a marksheet is missing.
5. Applicant receives notification
   
   A specific correction request is sent to the applicant.
6. Applicant submits correction
   
   The new document is stored as a new version.
7. AI compares versions
   
   The updated document is processed and the relevant differences are highlighted.
8. Official completes verification
   
   Officer reviews the new document and records the verification action.
9. Application moves forward
   
   The application enters the next authorised processing queue.
10. Management dashboard updates
    
    The completed task, application movement and operational statistics are updated.

Expected outcome
- Applicant knows exactly what was missing.
- Official does not need to manually search for the corrected document.
- Previous document versions remain available.
- Work allocation updates automatically.
- Senior officials can see progress without requesting a separate report.
- The complete action history is available for audit.
B8. Non-functional acceptance criteria
Category	Acceptance criterion
Security	Unauthorised users cannot access restricted applications
Performance	Common dashboard and case views meet agreed response-time targets
Reliability	Failed document processing is recorded and can be retried
Data integrity	Application history and document versions are preserved
Audit	Critical actions have user and timestamp records
Accessibility	Primary workflows support keyboard navigation
Usability	Officials can locate an assigned case with minimal navigation
Privacy	Applicant information is visible only to authorised users
Scalability	System supports the forecast application and document volumes
Recovery	Approved backup and recovery procedures are tested

B9. Requirements traceability
Every requirement should be linked to the following delivery artefacts.
Business need	User story	UI screen	Test case
Applicants need status visibility	US-APP-008	APP-01	TC-APP-001
Applicants need corrections	US-APP-014	APP-04	TC-APP-002
Officials need daily work	US-OFF-002	OFF-01	TC-OFF-001
Officials need one case file	US-OFF-009	OFF-03	TC-OFF-002
AI needs source evidence	US-AI-009	OFF-04	TC-AI-001
Senior officials need progress	US-MGT-004	MGT-01	TC-MGT-001
Supervisors need allocation	US-MGT-009	OFF-06	TC-MGT-002
Committee needs digital packs	US-COM-002	COM-01	TC-COM-001

B10. Proposed development priority
Priority	Scope
P0	Applicant application, digital case file, official work buckets, role permissions, deficiency and correction workflow
P1	AI document processing, daily notifications, management command centre, task allocation and reporting
P2	Committee automation, appointment management, university verification and advanced analytics
P3	Predictive workload planning, advanced AI assistant and further external integrations

B11. Business sign-off checklist
The following should be agreed before development begins:
- [ ] Applicant journey and application stages approved.
- [ ] Official work buckets and responsibilities approved.
- [ ] Document checklists validated.
- [ ] Deficiency and correction workflow approved.
- [ ] Committee workflow validated.
- [ ] Role and permission matrix approved.
- [ ] Notification rules approved.
- [ ] Management reports agreed.
- [ ] AI usage and human review boundaries approved.
- [ ] Pilot acceptance criteria signed off.
Appendix B conclusion

This appendix provides the functional bridge between the business proposal and software development. Each user story can be converted into a development task, a screen, a workflow and a test case.

The next logical appendix is Appendix C: Detailed Business Process Models, RACI Matrix and Department-wise Responsibility Mapping. That will establish who performs each action, who approves it, who receives the output and which activities can be automated.