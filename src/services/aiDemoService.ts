import { ApplicationRecord } from '../types/application';
import { DocumentItem } from '../types/document';

export interface AIResult<T = any> {
  task: string;
  inputReference: string;
  output: T;
  confidence: number;
  warnings?: string[];
  sourceReferences?: string[];
  humanReviewStatus: 'pending_review' | 'accepted' | 'modified' | 'rejected';
  executedAt: string;
  modelSignature: string;
}

export interface ExtractedFieldData {
  field: string;
  value: string;
  confidence: number;
  sourceDoc: string;
  matchWithForm: boolean;
  notes?: string;
}

export interface DocumentClassificationResult {
  detectedCategory: string;
  formalTitle: string;
  issuingAuthority: string;
  confidence: number;
  pageCount: number;
  resolutionQuality: 'High' | 'Acceptable' | 'Poor (Sub-threshold)';
  extractedFields: ExtractedFieldData[];
}

export interface ComparisonItem {
  attribute: string;
  formValue: string;
  documentValue: string;
  status: 'exact_match' | 'fuzzy_match' | 'mismatch' | 'unverified';
  note: string;
}

export interface ChecklistVerificationResult {
  checklist: Array<{
    id: string;
    requirement: string;
    ruleReference: string;
    status: 'passed' | 'flagged' | 'pending_manual';
    evidence: string;
  }>;
  overallScore: number;
}

export interface VersionDiffResult {
  previousVersion: number;
  currentVersion: number;
  fileComparison: string;
  improvementsDetected: string[];
  remainingIssues: string[];
  recommendedAction: string;
}

export class AIDemoService {
  private static instance: AIDemoService;

  private constructor() {}

  public static getInstance(): AIDemoService {
    if (!AIDemoService.instance) {
      AIDemoService.instance = new AIDemoService();
    }
    return AIDemoService.instance;
  }

  // 1. Run full document review simulation on an application
  public async simulateFullApplicationAIReview(
    application: ApplicationRecord
  ): Promise<{
    summary: AIResult<{
      overview: string;
      checklistCompliance: number;
      flagsIdentified: number;
      recommendedOfficerAction: string;
    }>;
    documentResults: Record<string, DocumentClassificationResult>;
    comparisons: ComparisonItem[];
  }> {
    // Artificial latency for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    const documentResults: Record<string, DocumentClassificationResult> = {};

    application.documents.forEach((doc) => {
      documentResults[doc.id] = this.classifyAndExtractDocument(doc, application);
    });

    const comparisons = this.crossDocumentComparison(application);

    const summary: AIResult<{
      overview: string;
      checklistCompliance: number;
      flagsIdentified: number;
      recommendedOfficerAction: string;
    }> = {
      task: 'Comprehensive Intake & Document Cross-Verification Scrutiny',
      inputReference: application.refNumber,
      confidence: 0.92,
      warnings: [
        'Notice: Automated AI extraction is assistive only. Official statutory decision rest with designated Enrolment Officers.',
      ],
      sourceReferences: application.documents.map((d) => d.name),
      humanReviewStatus: 'pending_review',
      executedAt: new Date().toLocaleTimeString(),
      modelSignature: 'AEMS-LegalDocument-Analyzer v2.4 (Statutory Rules Engine)',
      output: {
        overview: `Intake analysis completed for candidate ${application.applicantName}. Verified recognized Law Degree from Bar Council approved law faculty. Detected 1 critical visual resolution deficiency in residential proof and 1 initial abbreviation disparity in undergraduate degree.`,
        checklistCompliance: 86,
        flagsIdentified: 2,
        recommendedOfficerAction:
          'Issue deficiency notice for clear residential proof; seek formal one-and-the-same identity affidavit for B.Com certificate initial disparity.',
      },
    };

    return { summary, documentResults, comparisons };
  }

  // 2. Document classification and OCR extraction
  public classifyAndExtractDocument(
    doc: DocumentItem,
    app: ApplicationRecord
  ): DocumentClassificationResult {
    switch (doc.category) {
      case 'law_degree_certificate':
        return {
          detectedCategory: 'Statutory Law Qualification Certificate',
          formalTitle: 'Degree of Bachelor of Laws (LL.B)',
          issuingAuthority: 'The Tamil Nadu Dr. Ambedkar Law University',
          confidence: 0.95,
          pageCount: 1,
          resolutionQuality: 'High',
          extractedFields: [
            {
              field: 'Candidate Name',
              value: app.applicantName,
              confidence: 0.98,
              sourceDoc: doc.name,
              matchWithForm: true,
              notes: 'Exact match with application form',
            },
            {
              field: 'Degree Program',
              value: app.education.lawDegree,
              confidence: 0.96,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
            {
              field: 'Law College / Faculty',
              value: app.education.lawCollege,
              confidence: 0.94,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
            {
              field: 'Year of Passing',
              value: app.education.lawPassingYear,
              confidence: 0.99,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
            {
              field: 'Registration / Roll Number',
              value: app.education.lawRollNumber,
              confidence: 0.97,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
          ],
        };

      case 'degree_certificate':
        return {
          detectedCategory: 'Qualifying Undergraduate Degree Certificate',
          formalTitle: 'Degree of Bachelor of Commerce (B.Com)',
          issuingAuthority: 'University of Madras, Chepauk Campus',
          confidence: 0.89,
          pageCount: 1,
          resolutionQuality: 'High',
          extractedFields: [
            {
              field: 'Candidate Name',
              value: 'Arjun K',
              confidence: 0.92,
              sourceDoc: doc.name,
              matchWithForm: false,
              notes: 'Initial "K" detected instead of full surname "Kumar". Disparity flagged.',
            },
            {
              field: 'Degree',
              value: 'B.Com General (Regular)',
              confidence: 0.95,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
            {
              field: 'University Register No',
              value: '411802991',
              confidence: 0.91,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
            {
              field: 'Passing Division',
              value: 'First Class with Distinction',
              confidence: 0.93,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
          ],
        };

      case 'address_proof':
        return {
          detectedCategory: 'Residential Utility Bill (TANGEDCO)',
          formalTitle: 'LT Electricity Consumption Bill & Receipt',
          issuingAuthority: 'Tamil Nadu Generation and Distribution Corp Ltd',
          confidence: 0.68,
          pageCount: 1,
          resolutionQuality: 'Poor (Sub-threshold)',
          extractedFields: [
            {
              field: 'Consumer Name',
              value: '[Unclear / Cropped Header]',
              confidence: 0.42,
              sourceDoc: doc.name,
              matchWithForm: false,
              notes: 'Blurry scan; consumer name line unreadable',
            },
            {
              field: 'Service Connection No',
              value: '01-140-004-98',
              confidence: 0.88,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
            {
              field: 'Address snippet',
              value: 'Door 14, Gandhi Rd, Adyar...',
              confidence: 0.65,
              sourceDoc: doc.name,
              matchWithForm: false,
              notes: 'Locality and pincode cut off on right margin',
            },
          ],
        };

      default:
        return {
          detectedCategory: 'Statutory Supporting Document',
          formalTitle: doc.name,
          issuingAuthority: 'Official Issuing Authority',
          confidence: 0.92,
          pageCount: 1,
          resolutionQuality: 'High',
          extractedFields: [
            {
              field: 'Document Title',
              value: doc.name,
              confidence: 0.95,
              sourceDoc: doc.name,
              matchWithForm: true,
            },
          ],
        };
    }
  }

  // 3. Cross-document comparison
  public crossDocumentComparison(app: ApplicationRecord): ComparisonItem[] {
    return [
      {
        attribute: 'Candidate Full Name',
        formValue: app.applicantName,
        documentValue: 'Degree: "Arjun K." | LL.B: "Arjun Kumar" | Aadhaar: "Arjun Kumar"',
        status: 'fuzzy_match',
        note: 'Undergraduate degree has single letter initial. LL.B and Aadhaar match form perfectly.',
      },
      {
        attribute: 'Date of Birth',
        formValue: app.dob,
        documentValue: 'Aadhaar: 14/08/1999 | SSLC: 14/08/1999',
        status: 'exact_match',
        note: 'Exact match across all primary demographic records.',
      },
      {
        attribute: 'Law Faculty Accreditation',
        formValue: app.education.lawUniversity,
        documentValue: 'TNDALU Statutory University (BCI Recognition Ref: BCI/LE/2021)',
        status: 'exact_match',
        note: 'Recognized by Bar Council of India under Advocates Act Section 24(1)(c).',
      },
      {
        attribute: 'Residential Address',
        formValue: `${app.address.doorNo}, ${app.address.street}, ${app.address.city} ${app.address.pincode}`,
        documentValue: 'EB Bill: Poor scan, truncated street address',
        status: 'mismatch',
        note: 'Document verification incomplete due to illegible scan.',
      },
      {
        attribute: 'Bar Rule 49 Employment Bar',
        formValue: 'Self-declaration: Not gainfully employed',
        documentValue: 'Relieving letter & resignation confirmation verified',
        status: 'exact_match',
        note: 'No conflict with professional bar on dual employment.',
      },
    ];
  }

  // 4. Draft deficiency notice
  public draftDeficiencyNotice(
    documentName: string,
    issue: string,
    app: ApplicationRecord
  ): string {
    return `OFFICE OF THE BAR COUNCIL OF TAMIL NADU AND PUDUCHERRY
HIGH COURT CAMPUS, CHENNAI - 600 104
---------------------------------------------------------------------------------
SCRUTINY DEFICIENCY NOTICE
Reference No: ${app.refNumber}
Applicant: ${app.applicantName}

Subject: Scrutiny of Enrolment Application - Rectification of Document Defect

Sir / Madam,

On preliminary scrutiny of the electronic application submitted by you for enrolment as an Advocate on the rolls of the Bar Council of Tamil Nadu and Puducherry, the following defect has been observed in relation to:

DOCUMENT: ${documentName}
OBSERVATION: ${issue}

You are hereby requested to log in to the AEMS Digital Enrolment Portal and upload the rectifying document / attested affidavit within seven (7) working days from the date of this notice, failing which processing of your application will be delayed for the upcoming enrolment ceremony.

By Order of the Enrolment Scrutiny Section
Bar Council of Tamil Nadu and Puducherry`;
  }

  // 5. Version comparison when applicant uploads a correction
  public compareDocumentVersions(
    oldVersion: number,
    newVersion: number,
    docName: string
  ): VersionDiffResult {
    return {
      previousVersion: oldVersion,
      currentVersion: newVersion,
      fileComparison: `Comparison between v${oldVersion} (original blurred upload) and v${newVersion} (re-uploaded digital e-bill).`,
      improvementsDetected: [
        'Image resolution increased from 96 DPI to 300 DPI vector clarity.',
        'Consumer name "Arjun Kumar" is now clearly legible in the header.',
        'Full address including Door No 14, Gandhi Road, Adyar, Chennai 600020 is fully visible.',
        'Official TANGEDCO digital transaction barcode and receipt stamp are verified.',
      ],
      remainingIssues: [],
      recommendedAction: 'All previous quality defects resolved. Officer may mark deficiency as RESOLVED.',
    };
  }

  // 6. Case summary for Senior Management & Committee
  public generateCaseSummary(app: ApplicationRecord): string {
    return `DIGITAL CASE SUMMARY: ${app.refNumber}
Candidate: ${app.applicantName} | Age: 27 | Law Degree: ${app.education.lawDegree}
University: ${app.education.lawUniversity} (Passing Year: ${app.education.lawPassingYear})
Scrutiny Officer: ${app.assignedOfficerName}
Statutory Checklist: 6 of 6 checks completed.
Status: Eligible for enrolment subject to routine statutory ceremony and oath.`;
  }
}

export const aiDemoService = AIDemoService.getInstance();
