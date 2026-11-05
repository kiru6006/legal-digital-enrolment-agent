---
name: aems-digital-transformation
description: Specialist update spec to convert BCTNPY fresh advocate enrolment (paper + PDF + physical verification) into AEMS, a digital case system with AI assistance for applicants, enrolment officials, committee members and senior management. Covers as-is to to-be mapping, AI roles, rule configuration, restricted data, governance, data model, phased rollout, open decisions. Extends aems-prototype-build (v1).
---

# AEMS Digital Transformation: Specialist Update Spec (v2)

## 0. Position

- Replace paper-plus-PDF intake with **one digital application record** feeding applicant, official, committee and management views.
- AI **prepares, flags, summarises, drafts**. It **never decides** eligibility, verification outcome, deficiency finality, or enrolment.
- Every rule in the Council's instructions becomes **versioned configuration**, not React or backend code.
- This spec extends `aems-prototype-build` (v1). v1 covers the browser prototype; v2 covers the production path plus the expanded screen set (A01–A22, O01–O20, M01–M10, plus committee screens).

Verification note: the as-is process is taken from the pasted BCTNPY instructions and the AEMS product design document. I have not independently checked the live BCTNPY portal. Confirm every rule against the current Council notification before configuring it.

## 1. As-is to to-be

| Stage | Today (pain) | To-be mechanism | AI role | Human owner |
|---|---|---|---|---|
| Registration | Repeated details across forms | OTP-verified account, duplicate check, existing-application detection | Duplicate and near-duplicate detection | Applicant |
| Instructions | Long static page, easy to miss items | Dynamic checklist per applicant category | Personalise checklist from answers | Applicant |
| Basic details | Re-typed everywhere | Single applicant profile reused downstream | Name/DOB/father-name consistency across sources | Applicant |
| Education | Multiple route formats, failure attempts | Route-based dynamic forms, timeline | OCR extraction, route detection | Applicant, then officer |
| Employment/business | Gaps not visible, IT e-filing confusion | Activity timeline, gap detection, rule-based evidence request | Gap detection, which evidence applies | Officer decides |
| Affidavits | Manual comparison with form data | Template-driven, OCR, side-by-side comparison | Statement extraction and mismatch flags | Officer |
| Law qualification | College status hard to confirm | Reference DB with historical validity | College/university match, period check | Officer confirms reference |
| Newspaper / address | Address mismatch found late | Early comparison | Address normalisation and comparison | Officer |
| Criminal antecedents | Free text, mixed with other data | Separate restricted module | Factual summary of FIR/order documents | Authorised reviewer only |
| Character certificates | Advocate details unchecked | Lookup against authorised advocate register | Name/enrolment match | Officer |
| Deficiencies | Letters, calls, resubmission of whole file | Item-level deficiency cards and targeted re-upload | Draft clear explanation; re-run only affected rules | Officer sends |
| Physical verification | Paper checklist, no link to digital file | Tablet desk screen linked to case | Personalised original-document checklist | Verification officer |
| Payment | Reconciliation by hand | Gateway reference, reconciliation view | Exception detection | Accounts officer |
| Committee | Papers compiled manually | Structured docket with evidence index | Docket compilation, open-issue summary | Secretary, members decide |
| Management | Manual reports | Live command centre | Briefings, bottleneck alerts | Senior official |

## 2. AI role catalogue

### 2.1 Applicant-facing AI

| Capability | What it does | Guardrail |
|---|---|---|
| Personalised checklist | Shows only applicable documents from answers | Rules from config, not model output |
| Upload quality check | Readable, page count, orientation, size, blur | Advisory; applicant may still upload |
| Document classification | Suggests category (marksheet, degree, affidavit) | Applicant confirms category |
| Plain-language guidance | Explains a deficiency or requirement in English/Tamil | Fixed templates for deficiency text; LLM only for translation/simplification of approved text |
| Gap prompts | Asks about uncovered periods | Triggered by timeline rule, not model guess |
| Writing help | Helps phrase clarifications | Applicant writes sworn statements; AI never drafts affidavit content |
| Status Q&A | Answers "what is pending?" from record | Read-only, reads workflow state only |

### 2.2 Official-facing AI

| Capability | What it does | Output label |
|---|---|---|
| OCR and field extraction | Name, DOB, register no., year, college, university, dates, case no. | EXTRACTED, with page and confidence |
| Classification | Identifies document type and expected category | SUGGESTED |
| Cross-document validation | Compares application vs document vs affidavit vs newspaper | MISMATCH |
| Missing-document check | Compares uploads with approved checklist | MISSING |
| Gap detection | Uncovered periods across education/employment timeline | GAP |
| College/university match | Matches OCR name to reference DB with alternate names and validity period | MATCHED / REVIEW / NOT_FOUND |
| Affidavit statement extraction | Pulls declared facts, links to page | EXTRACTED |
| Case summary | One-page factual summary of the file | SUMMARY (non-decisional) |
| Priority suggestion | Orders bucket by approved SLA and age | SUGGESTED, officer can reorder |
| Duplicate and anomaly flags | Same register no. on two applications, reused certificate hash | ANOMALY |
| Deficiency draft | Drafts applicant message from finding | DRAFT, officer approves |
| Restricted criminal summary | Classifies document type (FIR, charge sheet, order, judgment) and extracts facts | FACTUAL_SUMMARY, reviewer-only |

Hard rule for officials: OCR success never equals verification. The officer records the verification action with identity, timestamp and evidence reference.

### 2.3 Committee-facing AI

| Capability | Notes |
|---|---|
| Docket compilation | Applicant profile, qualifications, verification results, open items, evidence index |
| Open-issue summary | Lists unresolved MISSING, MISMATCH, LEGAL_REVIEW items with status |
| Prior-direction retrieval | Retrieves earlier committee directions on similar issues from approved records (RAG over decision archive) |
| Consistency check | Flags where a docket statement contradicts evidence |
| Decision capture | Structured form (decision, reasons, legal basis, follow-up owner) |

Hard rule for committee AI: **no eligibility recommendation.** It summarises facts and retrieves precedent. The committee applies law and votes under the Council's procedure. Show this statement on every docket.

### 2.4 Management-facing AI

| Capability | Notes |
|---|---|
| Daily briefing | Generated from aggregate metrics; no individual ranking |
| Bottleneck detection | Stage with rising age or queue size vs baseline |
| Capacity planning | Forecast from receipts and throughput; scenario sliders |
| Natural-language query | Answers only from approved metric views; no raw table access |
| Anomaly alerts | Sudden drop or spike in corrections, rejections, payment failures |

Distinguish waiting-on-applicant, waiting-on-external-verification, and waiting-on-staff. Never present waiting-on-applicant as staff underperformance.

### 2.5 AI governance layer (mandatory)

- Model and prompt registry with version, owner, approval date.
- Every AI output stored with: input hash, model version, prompt version, confidence, reviewer action, final value.
- Confidence thresholds per field type (example starting point: extraction below 0.85, or any name/register-number mismatch, goes to human review; calibrate on gold set).
- Gold-set evaluation before go-live: at least a few hundred anonymised or synthetic documents per category, reported per field (precision, recall, override rate).
- Drift monitoring: weekly override rate and false-mismatch rate.
- Kill switch per AI feature. Fallback = manual process with the same screens.
- No model training on applicant data by any third party. Contractual and technical confirmation required.
- Minimise data sent to models; redact fields not needed for the task.
- Hosting and data residency for OCR/LLM must be approved by the Council's IT and security owner.

## 3. Processing pipeline

```
Upload
 -> file validation (type, size, page count, encryption check)
 -> malware scan (quarantine on failure)
 -> page split and hash (immutable version record)
 -> classification (document category)
 -> OCR (language-aware: English, Tamil where present)
 -> field extraction (template-based first, LLM only for unstructured text)
 -> normalisation (dates, names incl. initials and transliteration, register numbers, addresses)
 -> validation rules (deterministic)
 -> findings (MISSING | MISMATCH | GAP | ANOMALY | LEGAL_REVIEW)
 -> human review queue (only affected items)
 -> officer action recorded (verified / clarification / incorrect / further verification / N/A with reason)
```

Design rules:

1. **Deterministic rules for any statutory or eligibility-adjacent check.** LLM assists extraction and summarisation only.
2. **Name matching** uses normalised comparison plus fuzzy score; differences are shown, never auto-resolved.
3. **Dates and register numbers** use exact match after normalisation; any difference is a MISMATCH shown to human.
4. **Re-validation is scoped.** Build a dependency graph: document version -> extractions -> rules -> findings. A new upload re-runs only dependent rules.
5. **Original OCR output and human correction are stored separately.**

## 4. Rule and reference configuration

Do not hard-code. Create an admin configuration module with versioned records:

- Document requirements by applicant category and education route.
- Conditional logic (employment, business, break, other-state, provisional certificate).
- Gap-period evidence requirements.
- Affidavit templates and required originals.
- Form versions (V, VI, VII, II, III).
- Law college reference records with historical validity.
- University records.
- Newspaper accepted list and address/publication rules.
- Fee rules.
- Appointment and capacity rules.
- Original-document checklist for physical verification.
- Criminal antecedent review procedure.
- SLA and bucket priority rules.

Rule record schema:

```json
{
  "rule_id": "DOC-LAW-ATTENDANCE-01",
  "category": "LAW_RECORDS",
  "condition": { "field": "law.course_duration", "op": "in", "value": [3, 5] },
  "requirement": { "document": "LAW_ATTENDANCE_CERT", "mandatory": true, "original_at_verification": "CHECK_PROCEDURE" },
  "effective_from": "2026-01-01",
  "effective_to": null,
  "source_ref": "Council notification [number/date, to be confirmed]",
  "approved_by": "[Authority name, to be confirmed]",
  "version": 3,
  "history": ["v1", "v2", "v3"]
}
```

Rules rule-of-thumb:

- A rule with no `source_ref` and `approved_by` cannot be activated.
- Changes create a new version. Past submissions keep the rule version they were judged under.
- Effective dates let the Council change rules without a code release.

## 5. Data model additions (on top of v1 Appendix D)

| Entity | Key fields | Notes |
|---|---|---|
| applicant_profile | applicant_id, name, dob, contact, identity_ref_masked | Aadhaar stored as masked reference only; confirm UIDAI rules |
| education_record | route (10th, 12th/HSC, PUC, diploma, graduation, other), board/univ, reg_no, year, score, attempts[] | One row per qualification |
| activity_period | type (education, employment, business, other, none), start, end, evidence_refs[] | Feeds gap detection |
| employment_record | employer, designation, public_private, dates, pan_ref, letters[] | Multiple allowed |
| business_record | name, role, dates, pan_ref, proof[] | Multiple allowed |
| affidavit | type, template_version, executed_on, place, scan_ref, original_required | Immutable after upload |
| affidavit_statement | affidavit_id, field, declared_value, page, confidence | Extracted, never edited |
| law_qualification | course, duration, mode, state, college_id, university_id, reg_no, dates, medium | Links to reference DB |
| law_college_ref | college_id, name, alt_names[], state, university_id, valid_from, valid_to, source, last_verified | Historical, not just current |
| newspaper_notice | paper_id, language, pub_date, name_as_published, address_as_published, scan_ref | Accepted list is config |
| criminal_declaration | has_pending, has_conviction, case records[], doc_refs[] | RESTRICTED, separate schema and access |
| character_cert | advocate_enrolment_no, verified_name, practice_years, form_version, scan_ref | Applicant cannot edit advocate master |
| extraction_result | doc_version_id, field, value_ocr, value_corrected, page, bbox, confidence, model_version | Keep OCR and correction separate |
| validation_finding | application_id, type (MISSING, MISMATCH, GAP, ANOMALY, LEGAL_REVIEW), field, rule_id, sources[], status | Typed, not generic red |
| deficiency | item_ref, reason, required_action, status, response_due | One card per item |
| appointment | slot_id, date, time, centre, qr_ref, attendance, outcome | |
| payment | gateway_ref, amount, status, reconciliation_status | No card data stored |
| committee_docket | meeting_id, application_id, pack_version, sealed_at | Immutable once sealed |
| committee_decision | docket_id, decision, reasons, legal_basis, participants[], recorded_by | Separate from workflow state |
| rule_version | rule_id, version, effective_from/to, approved_by, source_ref | |
| access_grant | user_id, resource_class, reason, expires_at, approved_by | For restricted data |
| audit_event | actor, action, entity, before, after, source, timestamp, ip/session | Append-only |

Mandatory data rules:

1. Document metadata and file stored separately; versions immutable.
2. Decisions separate from workflow states.
3. Restricted classes (criminal, detailed academic for non-verifiers, payment card data) access-checked at record level, not only menu level.
4. No full Aadhaar, PAN or bank numbers in logs, notifications, or AI prompts.

## 6. Screen change map

Applicant (replaces 12-step journey; 22 screens grouped under the 12 steps to avoid confusing applicants):

| Step | Screens | Change from current |
|---|---|---|
| 1 Registration | A01 | OTP both channels, duplicate detection, resume existing application |
| 2 Instructions | A03, A22 | Dynamic checklist; original-document list generated per applicant |
| 3 Personal details | A04, A08 | Sectioned; address comparison begins |
| 4 Education | A05, A06 | Route-based; OCR confirm step |
| 5 Employment/business | A07 | Activity timeline with gap prompts; multiple records |
| 6 Affidavits | A09 | Template download, OCR, statement comparison |
| 7 Law qualification | A10, A11 | College picker, reference-based verification |
| 8 Newspaper | A12 | Address comparison |
| 9 Criminal declaration | A13 | Separate restricted module |
| 10 Character certificates | A14 | Advocate register lookup |
| 11 Validation and preview | A15, A16 | Findings typed; applicant explains or corrects before submit |
| 12 Payment and submission | A17, A18, A19, A20, A21 | Tracking, item-level deficiency, appointment |

Official portal (priority order for build):

| Priority | Screens | Why first |
|---|---|---|
| P0 | O05 digital case file, O03 work buckets, O06 document review, O13 deficiency | Largest manual-work removal |
| P0 | O02 daily dashboard, O07 OCR review, O10 affidavit comparison | Makes P0 usable |
| P1 | O08 education, O09 gap review, O11 law college, O14 physical verification | Verification depth |
| P1 | O15 payment, O16 appointments, O18 notifications, O19 reports | Operations |
| P2 | O12 criminal review (restricted), O17 committee prep, O04 search, O20 audit view | Sensitive or dependent |

Management: M01 command centre, M02 workload, M03 allocation, M04 daily progress, M05 pipeline, M06 appointment capacity, M07 committee schedule, M08 reports, M09 roles, M10 audit.

Committee portal (new):

| ID | Screen | Purpose |
|---|---|---|
| C01 | Sitting schedule | Upcoming sittings, dockets ready |
| C02 | Docket list | Cases ready, deferred, pending info |
| C03 | Docket view | Sealed pack: profile, qualifications, verification results, open items, evidence index, AI factual summary |
| C04 | Evidence viewer | Open source page from any docket line |
| C05 | Decision record | Structured decision with reasons, legal basis, follow-up owner |
| C06 | Deferred and follow-up tracker | Carries directions forward |

## 7. Restricted data

Criminal antecedent data and detailed sensitive records:

| Role | Access |
|---|---|
| Applicant | Own declaration only |
| General office officer | No access to content; sees status "criminal review pending" |
| Authorised reviewer | Read and record review notes |
| Committee member | Only the section the statutory role permits, shown inside sealed docket |
| Management | Counts only, never names or case details |
| IT admin | No content access; can manage roles, logged |
| Auditor | Access logs; content only with recorded reason |

Controls: field-level encryption, access requires stated purpose, time-limited grants, every read logged, break-glass with second approval, no export of restricted content from the case file.

Classification language:

- FIR registered is not a conviction.
- Pending case is not a conviction.
- Conviction or adverse finding triggers formal review under applicable law. Legal significance is decided by authorised persons only.
- Red status requires a human-recorded adverse legal finding. AI cannot assign it.
- Use the three categories consistently: MISSING (information absent), MISMATCH (sources differ), LEGAL_REVIEW (authorised person must assess).

## 8. Workflow and SLA

States follow v1 D5.1, extended with:

- `AWAITING_APPLICANT` (deficiency open; clock visible to applicant).
- `AWAITING_EXTERNAL` (university, college reference or advocate register confirmation pending).
- `PHYSICAL_VERIFICATION_PENDING`.
- `LEGAL_REVIEW` (restricted route, parallel to scrutiny).

Stage clocks distinguish: applicant-waiting, external-waiting, staff-waiting. Only staff-waiting time counts against officer work-queue metrics.

Deficiency rules:

- One card per item. Applicant uploads only requested items.
- Response window and reminder rules are config.
- Non-response triggers approved escalation, not automatic rejection.
- Automatic rejection is out of AI scope and requires an approved Council procedure.

## 9. Notifications

| Event | Applicant | Official | Management |
|---|---|---|---|
| Submitted | Confirmation | Work item (on assignment) | Count |
| OCR done | Only if action needed | Review item if findings | Aggregate |
| Deficiency | Action card + SMS/email | Case history | Bucket count |
| Correction received | Confirmation | Re-review item | Movement |
| Appointment reminder | Scheduled (T-2 days, T-1 day) | Desk list | Capacity |
| Committee decision | Approved communication | Case closed | Summary |

Rules: daily digest only when content changed; no duplicate events; sensitive data not in SMS text; delivery status logged; failed messages retried and visible to admin. Bilingual templates (English, Tamil) from approved copy only.

## 10. Non-negotiables

1. AI does not decide eligibility, verification, enrolment, or rejection.
2. OCR success is not verification.
3. Sworn content is never generated or altered by AI.
4. Criminal antecedent data is restricted and never shown in general dashboards.
5. Applicants never re-enter data already held in the record; they correct flagged items only.
6. Every AI output is labelled with source, confidence and reviewer status.
7. No rule lives in code without a version, source reference and approver.
8. Paper fallback must exist for every digital step during pilot.
9. Demo environments use fictional data only.
10. Management and committee views never rank individual staff.

## 11. Legal and compliance checkpoints (verify with counsel)

| Area | Checkpoint |
|---|---|
| Advocates Act 1961 and BCI Rules | Enrolment procedure, delegation, committee powers. Confirm the basis for each configured rule. |
| Section 24A, Advocates Act | Cited in the design document for relevant cases. Verify its current application before any system logic depends on it. |
| DPDP Act 2023 and Rules | Consent, purpose limitation, notice, retention, data principal rights, breach handling. Confirm current commencement status. |
| Aadhaar | Verify UIDAI rules on storage and display; mask by default. |
| IT Act 2000 | Electronic records, e-signature and evidentiary standing for applicant declarations. |
| Stamp law and affidavits | E-stamp or physical stamp paper requirements in Tamil Nadu. |
| Records retention | Council's retention schedule; apply to all record classes. |
| Language | Tamil guidance must match English approved text. |

## 12. Metrics

Measure a **baseline** from current process before go-live.

| Area | Metric | Direction |
|---|---|---|
| Applicant | Time to complete submission | Down |
| Applicant | Deficiencies per application | Down |
| Applicant | Corrections resolved in one cycle | Up |
| Official | Staff-waiting time per case | Down |
| Official | Cases with complete digital file on first open | Up |
| Official | Manual document opens per case | Down |
| Committee | Docket preparation time | Down |
| Committee | Dockets returned for missing information | Down |
| AI | Field extraction precision and recall (gold set) | Up |
| AI | Human override rate per field type | Track, investigate spikes |
| AI | False mismatch rate | Down |
| Governance | Restricted-data access without reason | Zero |

## 13. Phased rollout

| Phase | Scope | Exit criteria |
|---|---|---|
| 0. Council decisions | Resolve section 14 questions; approve rule set v1 | Signed rule register |
| 1. Foundation | Identity, applicant profile, config module, audit, storage with malware scan | Security review passed |
| 2. Applicant intake | A01–A09, A16, A18, A19 | Test cohort completes with fictional and then real volunteer data under consent |
| 3. Verification engine | OCR pipeline, findings, A10–A15 | Gold-set thresholds met |
| 4. Official case file | O02, O03, O05, O06, O07, O10, O13 | Officers complete test cases faster than baseline |
| 5. Physical and committee | O14, A21, A22, C01–C05 | Dockets sealed and reviewed in pilot |
| 6. Management and restricted | M01–M04, O12 with access controls | Access audit passed |
| 7. Pilot and parallel run | Digital and paper run side by side for one enrolment cycle | Metric targets met; sign-off |

## 14. Open decisions for BCTNPY

1. Exact current document list per route, including provisional certificate condition.
2. Authoritative source for college and university recognition across academic years.
3. Newspaper acceptance rules and publication timing.
4. Affidavit templates and whether e-stamping is accepted.
5. Form V, II, III, VI, VII current versions.
6. Employment, IT e-filing and NIL-return evidence rules.
7. Break-affidavit trigger.
8. Criminal declaration procedure and authorised reviewers.
9. Committee quorum, voting, delegation and decision categories.
10. Fee schedule and payment gateway.
11. Upload size and format limits (current 1 MB PDF rule retained or changed).
12. Retention periods and restricted classes.
13. Hosting, data residency, and approved AI/OCR providers.
14. Whether Aadhaar is used for identity, and in what form.
15. Language scope: English plus Tamil guidance, or Tamil form fields too.

## 15. Key risks

| Risk | Mitigation |
|---|---|
| AI error leads to wrong adverse flag | Typed findings, human action required, appeal path, override logging |
| Rule drift between notification and config | Rule register with source refs; monthly review |
| Officers over-trust AI output | Show source page, confidence and "not verified" label until officer acts |
| Applicants unable to use digital upload | Assisted-desk option, mobile upload, Tamil guidance |
| Restricted data leaks into general views | Record-level access, separate schema, log review |
| Legacy applicants mid-process at cutover | Grandfathering rule: finish under old process or migrate with reviewed mapping |
| Vendor/LLM data use | Contract clause, no training on data, residency controls |
| Scope creep into eligibility decisions | Written boundary in section 10, reviewed at each phase gate |

## 16. Next actions (in order)

1. Council workshop on section 14 questions. Output: signed rule register v1.
2. Baseline measurement of current process (time, deficiencies, rework, document opens).
3. Build gold-set of synthetic documents for each OCR category.
4. Extend the v1 prototype with A01–A22, O02–O07, O13, C03, C05 screens per section 6.
5. Security and DPDP review of the data model in section 5 before any real data.
6. Pilot design and parallel-run plan.
