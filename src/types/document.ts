export type DocumentCategory =
  | 'degree_certificate'
  | 'law_degree_certificate'
  | 'marksheets'
  | 'identity_proof'
  | 'address_proof'
  | 'photograph'
  | 'signature'
  | 'character_certificate'
  | 'other';

export type DocumentStatus =
  | 'pending'
  | 'verified'
  | 'correction_required'
  | 'correction_submitted'
  | 'flagged_for_review'
  | 'rejected';

export interface DocumentVersion {
  version: number;
  uploadedAt: string;
  fileName: string;
  fileSize: string;
  notes?: string;
}

export interface DocumentItem {
  id: string;
  applicationId: string;
  name: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  version: number;
  versions: DocumentVersion[];
  status: DocumentStatus;
  aiClassification?: string;
  aiConfidence?: number;
  extractedFields?: Record<string, string>;
  validationNotes?: string[];
  discrepancies?: string[];
  verificationRemarks?: string;
  previewUrl?: string;
}
