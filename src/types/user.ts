export type UserRole = 'applicant' | 'officer' | 'management' | 'committee' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  designation: string;
  avatar?: string;
  phone?: string;
  department?: string;
}

