import { DocumentItem } from './document';

export type ApplicationStage =
  | 'submitted'
  | 'ai_review'
  | 'officer_scrutiny'
  | 'correction_requested'
  | 'verification'
  | 'committee_prep'
  | 'committee_review'
  | 'decision_recorded'
  | 'completed'
  | 'deferred';

export type ApplicationPriority = 'critical' | 'high' | 'medium' | 'low';

export type DeficiencyStatus = 'open' | 'correction_submitted' | 'resolved';

export interface DeficiencyItem {
  id: string;
  documentId: string;
  documentName: string;
  reason: string;
  officialObservation: string;
  requiredCorrection: string;
  status: DeficiencyStatus;
  createdAt: string;
  resolvedAt?: string;
  noticeDraft?: string;
}

export type VerificationStatus = 'pending' | 'verified' | 'requires_clarification' | 'not_applicable';

export interface VerificationItem {
  id: string;
  category: string;
  name: string;
  status: VerificationStatus;
  remarks?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  stage: ApplicationStage;
  actor: string;
  role: string;
  title: string;
  description: string;
  badgeColor?: 'blue' | 'green' | 'amber' | 'red' | 'violet';
}

export interface CommitteeDecision {
  decision: 'approved' | 'deferred' | 'rejected' | 'clarification_required';
  observation: string;
  meetingRef: string;
  memberName: string;
  date: string;
  legalBasis?: string;
  conditions?: string;
  followUpOwner?: string;
}

export interface Appointment {
  id: string;
  date: string;
  timeSlot: string;
  location: string;
  type: string;
  status: 'scheduled' | 'completed' | 'rescheduled' | 'cancelled';
  instructions?: string;
}

export interface EducationEntry {
  id: string;
  level: '10th' | '12th' | 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'Law Degree';
  institution: string;
  boardOrUniversity: string;
  passingYear: string;
  percentageOrCgpa: string;
  regularOrPrivate: 'Regular' | 'Private';
  rollNumber: string;
  cbseDetails?: {
    schoolNumber?: string;
    centreNumber?: string;
    admitCardId?: string;
  };
}

export interface EducationDetails {
  qualifyingDegree: string;
  qualifyingUniversity: string;
  qualifyingPassingYear: string;
  lawDegree: string; // e.g. 3-Year LL.B or 5-Year B.A. LL.B (Hons)
  lawCollege: string;
  lawUniversity: string;
  lawPassingYear: string;
  lawRollNumber: string;
  percentageOrCgpa: string;
  courseDuration?: '3 Years' | '5 Years';
  studyMode?: 'Regular Full-time' | 'Evening College';
  mediumOfInstruction?: string;
  englishCompulsorySubject?: boolean;
  historyEntries?: EducationEntry[];
}

export interface EmploymentRecord {
  id: string;
  type: 'employment' | 'business';
  companyOrOrg: string;
  designationOrRole: string;
  publicOrPrivate: 'Public Sector' | 'Private Enterprise' | 'Self-Employed';
  fromDate: string;
  toDate: string;
  relievingLetterStatus: 'Uploaded' | 'Exempt' | 'Pending';
  panMasked?: string;
  reasonForLeaving?: string;
}

export interface TimelineGap {
  id: string;
  fromDate: string;
  toDate: string;
  durationMonths: number;
  explanation: string;
  affidavitUploaded: boolean;
}

export interface CriminalAntecedents {
  hasPendingCases: boolean;
  pendingCases?: Array<{
    caseNumber: string;
    court: string;
    policeStation: string;
    firNumber: string;
    sections: string;
    status: string;
    documentRef?: string;
  }>;
  hasPreviousConvictions: boolean;
  convictions?: Array<{
    caseNumber: string;
    court: string;
    judgmentDate: string;
    sections: string;
    judgmentDocRef?: string;
  }>;
  reviewerObservations?: string;
  reviewedBy?: string;
  reviewTimestamp?: string;
  reviewStatus?: 'RESTRICTED_REVIEWED' | 'PENDING_REVIEW';
}

export interface CharacterCertificateRef {
  formNumber: 'Form VI' | 'Form VII';
  advocateName: string;
  enrolmentNumber: string;
  placeOfPractice: string;
  yearsOfPractice: number;
  verifiedAgainstRegister: boolean;
  certificateDocRef?: string;
}

export interface NewspaperNotice {
  newspaperName: string;
  publicationDate: string;
  publishedName: string;
  publishedAddress: string;
  addressMatchStatus: 'Matched' | 'Discrepancy' | 'Pending';
  scanUploaded: boolean;
}

export interface AffidavitRecord {
  id: string;
  type: 'Undertaking' | 'Other-State' | 'Study-Gap' | 'Identity-Affidavit' | 'Bar-Rule-49';
  stampPaperValue: string;
  executionDate: string;
  place: string;
  notaryName: string;
  verified: boolean;
  notes?: string;
}

export interface PhysicalVerification {
  scheduledDate?: string;
  attended: boolean;
  originalDegreesChecked: boolean;
  physicalIdentityVerified: boolean;
  advocateRobingCompliant: boolean;
  verifiedByOfficerId?: string;
  verifiedOfficerName?: string;
  verifiedAt?: string;
  remarks?: string;
  outcome: 'Cleared' | 'Deficient' | 'Pending';
}

export interface PaymentDetails {
  feeCategory: string;
  feeAmount: number;
  challanNumber: string;
  paymentMethod: 'Treasury Challan' | 'Online SBI ePay' | 'Fee Exemption (SC/ST)';
  status: 'Reconciled' | 'Pending' | 'Exempt';
  transactionDate: string;
  receiptRef: string;
}

export interface CrossDocumentValidationItem {
  id: string;
  field: string;
  appValue: string;
  documentValue: string;
  docName: string;
  matchStatus: 'MATCHED' | 'MISMATCH' | 'MANUAL_CHECK' | 'RESOLVED';
  ocrConfidence: number;
  ruleRef: string;
  explanation: string;
}

export interface ApplicationRecord {
  id: string;
  refNumber: string;
  applicantId: string;
  applicantName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  aadhaarMasked?: string;
  fatherName?: string;
  fatherOccupation?: string;
  maritalStatus?: 'Single' | 'Married' | 'Other';
  bloodGroup?: string;
  disabilityStatus?: boolean;
  scStDeclarationForFee?: boolean;
  address: {
    doorNo: string;
    street: string;
    locality: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  education: EducationDetails;
  employment?: {
    currentlyEmployed: boolean;
    previousDesignation?: string;
    organization?: string;
    relievingLetterAvailable?: boolean;
    records?: EmploymentRecord[];
    gaps?: TimelineGap[];
  };
  criminalAntecedents?: CriminalAntecedents;
  characterCertificates?: {
    formVI: CharacterCertificateRef;
    formVII: CharacterCertificateRef;
  };
  newspaperNotice?: NewspaperNotice;
  affidavits?: AffidavitRecord[];
  physicalVerification?: PhysicalVerification;
  paymentDetails?: PaymentDetails;
  crossDocumentValidations?: CrossDocumentValidationItem[];
  stage: ApplicationStage;
  statusLabel: string;
  priority: ApplicationPriority;
  progressPercentage: number;
  assignedOfficerId: string;
  assignedOfficerName: string;
  submissionDate: string;
  lastUpdated: string;
  documents: DocumentItem[];
  deficiencies: DeficiencyItem[];
  verificationItems: VerificationItem[];
  timeline: TimelineEvent[];
  committeeDecision?: CommitteeDecision;
  appointment?: Appointment;
  officialNotes?: string[];
  aiReviewSummary?: {
    reviewedAt: string;
    overallConfidence: number;
    checklistPassed: number;
    checklistTotal: number;
    potentialDiscrepancies: string[];
    summaryText: string;
    recommendedAction?: string;
  };
}

export interface AuditEvent {
  id: string;
  userId: string;
  userName: string;
  userRole?: string;
  action: string;
  entityId: string;
  from?: string;
  to?: string;
  reason?: string;
  timestamp: string;
}
