export type NotificationCategory =
  | 'application_received'
  | 'under_review'
  | 'correction_required'
  | 'correction_received'
  | 'verification_completed'
  | 'appointment_scheduled'
  | 'committee_scheduled'
  | 'status_updated'
  | 'general';

export interface NotificationItem {
  id: string;
  recipientRole: 'applicant' | 'officer' | 'management' | 'committee' | 'all';
  recipientId?: string;
  title: string;
  message: string;
  category: NotificationCategory;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
  date: string;
  relatedApplicationId?: string;
  relatedRefNumber?: string;
  actionUrl?: string;
}
