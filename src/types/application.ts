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
  };
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


