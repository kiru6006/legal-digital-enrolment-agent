---
name: aems-ux-requirements-addendum
description: UX requirements addendum for AEMS. Keeps critical features visible without hunting, removes duplicate entry and duplicate work, and sets quality, resilience, help and accessibility standards for applicants, officials, committee and management. Extends aems-prototype-build (v1), aems-digital-transformation (v2), aems-ux-interaction-pattern (v3).
---

# AEMS UX Requirements Addendum (v4 delta)

## 0. Agent instruction (paste first)

Apply these requirements to every screen and component. Where this file conflicts with v3 (Quick View / Detailed View), this file wins for visibility and duplication. v3 still governs popup vs page.

Priorities for every screen:

1. The next action the user must take is visible without a click.
2. Information the user already gave is never asked for again.
3. Work already done by a person or the system is never done again by hand.
4. Errors are prevented, and when they occur, the fix is one step away.
5. Nothing important sits behind a menu, hover, tab, or collapsed section.

Plan first (v1 rule). List the components added and the screens affected before coding.

## 1. Visibility rules: no hidden critical features

### 1.1 Always-visible elements

| Element | Where | Shows |
|---|---|---|
| Next action card | Applicant dashboard, top of every applicant page | The single most important action, with count if more |
| Pending items counter | Applicant side panel on every page | Missing documents, open deficiencies, unfinished sections |
| Save status | Top bar on every form | `Saved 10:42` or `Not saved, retry` |
| My work count | Officer nav, persistent | Total open items, with a badge on new or overdue |
| SLA timer | Every officer work card | Age in days, colour plus text (`3 days, due tomorrow`) |
| Correction badge | Application card and case header | `Correction received` until reviewed |
| AI findings count | Case file tab bar | `Findings 2` on the Verification tab; never hidden in the AI tab only |
| Restricted status | Case header | `Criminal review: pending` (status only, no content) |
| Payment status | Applicant dashboard and case header | Paid, pending, failed, with action |
| Help entry | Footer on every page | Help, helpline, assisted desk, language switch |

### 1.2 Make hidden things visible

Items that were previously behind a detail page or secondary tab must show at least a summary on the page where they matter:

| Hidden item (before) | Visible summary (now) |
|---|---|
| Deficiency history | Count and last update on the deficiency card |
| Document versions | `v2 (replaced 06 Nov)` badge on the document card |
| Missing documents | Count in applicant side panel and dashboard |
| Gap periods | Count badge on the Employment step in the progress tracker |
| Affidavit mismatches | Count on the Affidavit step, and on the officer's case header |
| Appointment details | Card on applicant dashboard after booking |
| Committee outcome | Status line on tracking page, with the official decision text |
| Officer's assignment | Name and function on the applicant's tracking page (not the AI) |
| Reason for a deficiency | Shown in full on the card. Never truncated to a link. |
| Receipt and reference numbers | Always in the page header of the confirmation and dashboard |

### 1.3 Progress tracker

- A persistent step list (side on desktop, top chevrons on mobile).
- Each step shows: `Done`, `Action needed (n)`, `In progress`, `Locked`.
- Locked steps explain why in one line: `Unlocks after payment`.
- Clicking any unlocked step jumps there. Clicking a locked step shows the reason.

### 1.4 Checklist panel

- The document checklist is a persistent panel on every applicant section, collapsible but never removed.
- Collapsed state shows the count of outstanding items.
- Each row links to the exact upload field.

## 2. Duplication reduction

### 2.1 Applicant: enter once, reuse everywhere

| Data | Entered at | Reused at | Rule |
|---|---|---|---|
| Name | Registration | Personal details, law certificate match, newspaper notice, affidavit | Prefilled read-only, edit requires reason |
| Mobile and email | Registration (OTP) | All notifications | Verified, changed only through verified flow |
| Date of birth | Personal details | Affidavit, identity check | Single field, one source |
| Communication address | Communication step | Newspaper notice, Form VI and VII comparison, identity check | `Same as communication address` checkbox |
| Education dates | Education step | Law qualification, affidavit, gap timeline | Auto-linked, not re-typed |
| Employment records | Employment step | Affidavit, gap timeline, IT e-filing check | Single record, linked |
| Law college | Law qualification | Affidavit, newspaper notice | Selected once from reference list |

Rules:

- A value entered once is shown as a chip with `Edit` in every other place it applies.
- Edits propagate. The system asks once: `Update this everywhere?` with a preview of affected fields.

### 2.2 OCR to confirm, not to retype

- OCR prefills the form. The applicant confirms with one click or edits.
- Each prefilled field shows a small `From [document], page n` link.
- A confirmed value is locked until the applicant chooses to change it, which creates a new audit entry.
- Bulk confirm: `Confirm all 6 extracted values` when all are high confidence. Low-confidence values are never included in bulk confirm.

### 2.3 Documents: upload once, attach many

- A single document repository per applicant. Upload once, then attach to every requirement it satisfies (for example, a degree certificate linked to Law Qualification and Law Documents).
- The applicant sees `This file is already used for: Law degree`. They do not upload it again.
- Attachment rules are config. A document cannot satisfy a requirement it is not approved for.
- Originals are tracked separately: one physical-original record per document, with an `Original required at verification` tag.

### 2.4 Deficiencies: one notice, not many

- All open deficiencies are grouped into one notice per submission cycle. The applicant gets one notification with a count, not one per item.
- Within the notice, items are cards (v3). Each card has its own upload or clarification action.
- Officers add items to a draft notice. The notice is sent once.
- Resubmission sends the applicant a single receipt listing all items received.

### 2.5 Officer: work once

- AI-prepared case summary replaces opening every document. The summary links to evidence.
- Bulk actions on work buckets: verify multiple items of the same type where all checks pass, assign many applications at once, send one notice for many cases with the same deficiency text.
- Bulk verify is allowed only for items that passed all automatic checks with no findings. Each item is still recorded individually with its own timestamp and officer ID. Bulk does not mean one aggregate record.
- Observation templates: pick from a list (`Marksheet illegible`, `Name differs`, `Original not produced`), add free text only if needed. Templates are configurable and standardise records.
- No Excel registers. Every register view is an exportable report from the same data.
- Handover note on reassignment: the previous officer's observations appear at the top of the new officer's case, so nobody restarts a review.
- `What changed since you last opened this case` banner: lists new documents, corrections, findings and notes since the officer's last visit.

### 2.6 Committee: docket built from the record

- Docket is generated from the case file. No retyping of applicant data into papers.
- Previous directions for the same issue appear as linked references, not copied text.
- Each docket records which members opened it and when (pre-read tracking).
- Decision captured in the same sitting screen. The minutes draft is generated from the recorded decisions, then edited by the secretary only for wording.

### 2.7 Management: report once, read many

- Every number on a dashboard and every report comes from the same metric definition. A metric has one name, one definition, one owner, shown on hover and in a glossary.
- Scheduled report delivery replaces manual reports. The same PDF or CSV is used for the daily briefing.
- Notifications are deduplicated by event ID. If an event already produced a notification, a repeated trigger produces nothing.

## 3. Quality requirements

### 3.1 Forms and validation

- Validation runs on blur and on submit. Never on every keystroke for final checks, to avoid noise.
- Every format error shows an example: `PIN code: 6 digits, example 600001`.
- Error text says what to do. Not `Invalid input`. Use `Enter the 6-digit PIN code on your address proof`.
- Errors at top of form with links to each field, plus inline text at the field.
- Required fields are marked with text (`required`), not only an asterisk.
- Dates use a date picker with typed entry allowed. Accepts `12/11/2026` and `12 Nov 2026`, stores ISO.
- Long forms autosave every change after 2 seconds of inactivity and on section change.
- Session expiry: warn 2 minutes before. Extend in one click. Drafts are never lost on expiry.
- Preview before submit lists every field with an `Edit` link that returns to the exact field.

### 3.2 Uploads

- Drag-and-drop plus `Choose file` plus camera capture on mobile.
- Camera capture includes edge detection, auto-crop, and guidance (`Fit the whole page in the frame`).
- Multi-page documents: add pages one at a time, reorder, delete a page, then combine into one PDF in the browser. The applicant sees a page thumbnail list.
- Chunked, resumable upload. Network drop shows `Upload paused. Resume when connected.` and continues from the last chunk.
- Per-file status: `Uploading 60%`, `Checking readability`, `Accepted`, `Needs a clearer copy`.
- Quality checks run before upload is accepted: readability, page count, orientation, blank page, size limit from config.
- Size limit messages show the exact limit and a compression option where permitted.

### 3.3 Language

- English and Tamil toggle on every page, persistent per user.
- Tamil covers all applicant guidance text and deficiency templates.
- Form labels, field names and document names are in both languages.
- Numbers, dates and names in documents are never translated.
- Tamil text uses approved copy only. Machine translation is not shown to applicants without human approval.

### 3.4 Plain language

- Applicant-facing copy at about reading level grade 8.
- One idea per sentence. No legal jargon in applicant instructions unless quoting the rule.
- Acronyms expanded once per page: `Form VI (character certificate by an advocate)`.
- Each instruction starts with the verb: `Upload`, `Confirm`, `Choose`.

### 3.5 Feedback and recovery

- Every error is reported to the user with a recovery action. Dead ends are not allowed.
- Every destructive action has a confirmation step. Every non-destructive mistake has undo for at least 30 seconds where the system allows it.
- For legal or verification actions, undo is not allowed. Use `Correct this with a reason`, which creates a new audit entry and keeps the earlier one.
- Failed payment: show the reason, the reference, and `Try again` plus `Contact help`. Duplicate payment is detected before a second charge.

## 4. Help, guidance and support

- Field help text beside each label, not only in a tooltip. Hover-only help is not allowed.
- `Why we ask this` expandable text on sensitive fields (identity, criminal declaration, Aadhaar reference, PAN).
- First visit: a short walkthrough of the progress tracker and checklist. Skippable, re-openable from Help.
- Help menu on every page: FAQ, document guide, helpline number, assisted desk locations, `Report a problem`.
- `Report a problem` captures the page, the step, and a screenshot only if the user agrees. No sensitive data sent with it.
- Assisted mode: an officer at a help desk can view the applicant's dashboard and checklist with applicant consent, logged. This supports applicants without smartphones or stable internet.
- Chat or ticket support: optional channel with the case reference attached. Support staff see only what the applicant shares.
- Every empty state explains the next step.

## 5. Officer experience standards

| Area | Requirement |
|---|---|
| Keyboard-first review | `J`/`K` next and previous item, `V` verify, `D` deficiency, `N` note, `/` search. Shortcut list visible under `?`. |
| Global search | Search by application reference, name, mobile, email, college, and case state from any page. |
| Saved views | Officer saves filter combinations, for example `My ready-for-review, sorted oldest first`. |
| Split view | Document left, extracted fields right, always. Scroll sync between extraction and page highlight. |
| Priority | Work order uses approved rules. Officer can see why an item is ranked where it is. |
| Interruption recovery | Opening a case resumes where the officer stopped: last tab, last field, scroll position. |
| Notes | Notes are visible to the next reviewer, marked internal vs applicant-visible. |
| Fatigue | No modal confirmation for routine verification steps that are already audited. Confirm only for irreversible steps. |

## 6. Management experience standards

- Every tile follows v3 (Quick View and Open details).
- Every chart has a table view one click away and an export.
- Every figure shows its date range and last refresh time.
- Filters apply to the whole page. Active filters are shown as removable chips.
- Comparison to previous period available on every headline figure.
- Annotations: a leader can add a dated note to a metric, visible to the team.
- No individual ranking. Staff are shown by function and workload capacity only.
- Waiting-on categories are explicit: `Waiting on applicant`, `Waiting on external`, `Waiting on staff`. Only the last counts against staff capacity.

## 7. Committee experience standards

- Docket has a one-screen summary first, detail on drill-down.
- Evidence is linked from every docket line. Clicking a line opens the page, not a new document.
- Member bookmarks and private notes on a docket. Notes are not visible to other members.
- Agenda reorder by drag or keyboard.
- Quorum and voting display follow the Council's procedure configuration, not hard-coded.
- The decision screen shows the docket summary beside the decision form, so the member does not switch screens.
- Deferred items keep their history and the reason for deferral in view.

## 8. Accessibility and device standards

- WCAG 2.1 AA as minimum.
- Contrast 4.5:1 for text, 3:1 for UI components.
- Full keyboard use on every flow. Logical tab order. Skip-to-content link.
- Screen reader labels on every icon-only button.
- Text resize to 200% without loss of content.
- Touch targets at least 44 px.
- Mobile first for applicant screens. Officer screens are desktop first with a tablet layout.
- Works on low-end Android browsers with slow networks. Target: first useful render under 3 seconds on 3G-class throughput (verify with measured test).
- No content depends on colour, hover, or motion.

## 9. Consistency and design system

- One status vocabulary. Glossary defined once and used everywhere: `Submitted`, `Action needed`, `Under review`, `Verified`, `Deficiency open`, `Awaiting original`, `Scheduled`, `Committee ready`, `Decided`.
- One button hierarchy: primary (one per view), secondary, tertiary (text link). Destructive actions in red and always last.
- One date and number format. Indian format for amounts (`₹60`), DD MMM YYYY for dates.
- One empty-state pattern, one error pattern, one loading pattern.
- Icons always with text labels on applicant screens.

## 10. Measurement and continuous improvement

Build these into the product from the start.

| Signal | Use |
|---|---|
| Step drop-off in applicant journey | Find confusing steps |
| Field error rate by field | Improve help text or validation |
| Time on step (median, 90th percentile) | Spot slow or confusing screens |
| Upload failure rate by device and file type | Improve capture guidance |
| Help menu opens by page | Find missing guidance |
| Re-entered data count (same field, same user, two sessions) | Measures duplication, target zero |
| Officer manual document opens per case | Measures duplication in review |
| Deficiency count per application | Quality of applicant guidance |
| Feedback thumbs per screen with reason | Direct user signal |

Quality gate: each release runs a usability test with at least 5 applicants (mixed device and language) and 5 officers before rollout. Record task completion, time, and errors. Fix anything that fails in more than 2 of 5 sessions.

Privacy of analytics: track events, not content. No names, document text, or criminal data in analytics. Session replay disabled on applicant forms and restricted pages.

## 11. Acceptance criteria

1. Next action is visible on every applicant page without scrolling on mobile.
2. No critical item listed in section 1.2 is hidden behind a menu, tab, or collapsed section without a visible summary.
3. A value the applicant entered once is never asked again. Verified by test script for each reuse row in section 2.1.
4. A file uploaded once is reusable for every requirement it satisfies, with no second upload prompt.
5. Deficiencies are sent as one notice per cycle, verified by notification count test.
6. Officer can verify, raise deficiency, and forward using keyboard only.
7. Every form autosaves. Session expiry does not lose entered data.
8. Every error message names the field and the fix. No generic error text remains (automated string check).
9. Every page has a help entry and the Tamil toggle, with no untranslated applicant string in Tamil mode.
10. Legal or verification actions cannot be undone; they can be corrected with a reason, with both audit entries kept.
11. Bulk actions record each item individually (verified by audit query).
12. WCAG 2.1 AA scan passes with zero critical or serious issues on primary flows.
13. Usability test passes per section 10 quality gate.
14. Analytics events contain no personal or restricted content (automated check).

## 12. UX open decisions for BCTNPY

1. Helpline hours, channels, and whether chat or ticket support is offered.
2. Assisted-desk locations and consent wording.
3. Whether applicants may use the system through a family member or agent, and the verification rule.
4. Tamil form field scope (labels only, or also entry values).
5. Official-to-official handover rules and who may reassign.
6. Bulk verification rules: which item types qualify.
7. Whether camera capture is allowed for originals or scans only.
8. Notification channels and quiet hours.

## 13. Build additions for the milestone plan

Add these to the v1 plan:

- M0.5: UX pattern library (v3) plus visibility components: `NextActionCard`, `PendingPanel`, `SaveStatus`, `ProgressTracker`, `ChecklistPanel`, `HelpFooter`, `LanguageToggle`.
- M2.5: Reuse engine: `PrefillService`, `DocumentRepository` with attachment mapping, `ConfirmChip`, `PropagateEditDialog`.
- M3.5: Upload pipeline UX: `MultiPageUploader`, `CameraCapture`, `ResumableUpload`, `FileStatusList`.
- M4.5: Officer productivity: keyboard map, global search, saved views, handover banner, observation templates, bulk-verify rules.
- M5.5: Usability and accessibility gate before pilot.
