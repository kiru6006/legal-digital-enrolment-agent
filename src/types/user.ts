export type UserRole = 'applicant' | 'officer' | 'management' | 'committee' | 'admin' | 'auditor';

export type ProposedRole =
  | 'Applicant'
  | 'Document Verification Officer'
  | 'Education Verification Officer'
  | 'Scrutiny Officer'
  | 'Supervisory Officer'
  | 'Accounts Officer'
  | 'Records Officer'
  | 'Committee Secretary'
  | 'Committee Member'
  | 'Senior Official'
  | 'IT Administrator'
  | 'Auditor';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  proposedRole?: ProposedRole;
  email: string;
  designation: string;
  avatar?: string;
  phone?: string;
  department?: string;
}
