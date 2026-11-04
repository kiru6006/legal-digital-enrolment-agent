import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApplicationRecord, ApplicationStage, VerificationStatus, AuditEvent } from '../types/application';
import { DocumentItem } from '../types/document';
import { NotificationItem } from '../types/notification';
import { User, UserRole } from '../types/user';
import { initialMockApplications, PRIMARY_DEMO_APP_ID } from '../data/mockApplications';
import { initialMockNotifications } from '../data/mockNotifications';
import { mockUsers } from '../data/mockUsers';
import { aiDemoService } from '../services/aiDemoService';

const STORAGE_KEY_APPS = 'aems_demo_applications_v1';
const STORAGE_KEY_NOTIFS = 'aems_demo_notifications_v1';
const STORAGE_KEY_ROLE = 'aems_demo_current_role_v1';
const STORAGE_KEY_AUDIT = 'aems_demo_audit_events_v1';

export const initialSeedAuditEvents: AuditEvent[] = [
  {
    id: 'audit-001',
    userId: 'user-app-001',
    userName: 'Arjun Kumar',
    userRole: 'Applicant',
    action: 'APPLICATION_SUBMITTED',
    entityId: PRIMARY_DEMO_APP_ID,
    from: 'DRAFT',
    to: 'SUBMITTED',
    reason: 'New enrolment docket created with 14 uploaded documents',
    timestamp: '2026-11-01 10:14:22',
  },
  {
    id: 'audit-002',
    userId: 'system-ai',
    userName: 'SIMULATED AI Assistant',
    userRole: 'Intake AI',
    action: 'AI_INTAKE_ANALYSIS_COMPLETED',
    entityId: PRIMARY_DEMO_APP_ID,
    from: 'SUBMITTED',
    to: 'READY_FOR_SCRUTINY',
    reason: 'Identified 12 confirmed documents and 2 potential exceptions (Semester 6 marksheet missing)',
    timestamp: '2026-11-01 10:14:45',
  },
  {
    id: 'audit-003',
    userId: 'user-off-001',
    userName: 'M. Srinivasan',
    userRole: 'Scrutiny Officer',
    action: 'SCRUTINY_OPENED',
    entityId: PRIMARY_DEMO_APP_ID,
    from: 'READY_FOR_SCRUTINY',
    to: 'UNDER_REVIEW',
    reason: 'Case docket claimed into official work queue',
    timestamp: '2026-11-02 09:30:10',
  },
  {
    id: 'audit-004',
    userId: 'user-off-001',
    userName: 'M. Srinivasan',
    userRole: 'Scrutiny Officer',
    action: 'DEFICIENCY_RAISED',
    entityId: PRIMARY_DEMO_APP_ID,
    from: 'UNDER_REVIEW',
    to: 'DEFICIENCY_RAISED',
    reason: 'Rule 8 Marksheet Gap: Semester 6 marksheet missing; Residential Proof expired',
    timestamp: '2026-11-02 11:20:00',
  },
];

interface ApplicationStoreContextType {
  currentRole: UserRole;
  currentUser: User;
  switchRole: (role: UserRole) => void;
  applications: ApplicationRecord[];
  notifications: NotificationItem[];
  auditEvents: AuditEvent[];
  primaryApplication: ApplicationRecord;
  getApplication: (id: string) => ApplicationRecord | undefined;
  updateApplication: (id: string, updates: Partial<ApplicationRecord>) => void;
  addApplication: (newApp: ApplicationRecord) => void;
  raiseDeficiency: (
    appId: string,
    documentId: string,
    documentName: string,
    reason: string,
    observation: string,
    requiredCorrection: string
  ) => void;
  submitCorrection: (
    appId: string,
    deficiencyId: string,
    fileData: { fileName: string; fileSize: string; notes?: string }
  ) => void;
  resolveDeficiency: (appId: string, deficiencyId: string, remarks?: string) => void;
  updateVerificationItem: (
    appId: string,
    itemId: string,
    status: VerificationStatus,
    remarks?: string
  ) => void;
  runAIReviewForApp: (appId: string) => Promise<void>;
  recordCommitteeDecision: (
    appId: string,
    decision: 'approved' | 'deferred' | 'rejected' | 'clarification_required',
    observation: string,
    meetingRef?: string
  ) => void;
  reassignApplication: (appId: string, officerId: string, officerName: string) => void;
  forwardStage: (appId: string, nextStage: ApplicationStage, statusLabel: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoScenario: () => void;
  isAIProcessing: boolean;
}

const ApplicationStoreContext = createContext<ApplicationStoreContextType | null>(null);

export const ApplicationStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize role
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ROLE);
    return (saved as UserRole) || 'applicant';
  });

  // 2. Initialize applications
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved applications from localStorage', e);
    }
    return initialMockApplications;
  });

  // 3. Initialize notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved notifications from localStorage', e);
    }
    return initialMockNotifications;
  });

  // 4. Initialize audit events
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUDIT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved audit events from localStorage', e);
    }
    return initialSeedAuditEvents;
  });

  const [isAIProcessing, setIsAIProcessing] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(auditEvents));
  }, [auditEvents]);

  // Active user derived from role
  const currentUser: User =
    mockUsers.find((u) => u.role === currentRole) || mockUsers[0];

  const primaryApplication =
    applications.find((a) => a.id === PRIMARY_DEMO_APP_ID) || applications[0];

  const recordAuditEvent = (
    action: string,
    entityId: string,
    details?: { from?: string; to?: string; reason?: string }
  ) => {
    const newEvent: AuditEvent = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.proposedRole || currentUser.role,
      action,
      entityId,
      from: details?.from,
      to: details?.to,
      reason: details?.reason,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setAuditEvents((prev) => [newEvent, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const getApplication = (id: string) => {
    return (
      applications.find((a) => a.id === id || a.refNumber === id) ||
      (id === 'AEMS-2026-00125' || id === 'AEMS-2026-1045' ? primaryApplication : undefined)
    );
  };

  const updateApplication = (id: string, updates: Partial<ApplicationRecord>) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id || app.refNumber === id) {
          return {
            ...app,
            ...updates,
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );
  };

  const addApplication = (newApp: ApplicationRecord) => {
    setApplications((prev) => [newApp, ...prev]);

    // Send notification to Officer
    const officerNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'officer',
      title: `New Application Submitted: ${newApp.applicantName}`,
      message: `Enrolment file ${newApp.refNumber} submitted. AI intake review queued.`,
      category: 'application_received',
      type: 'info',
      read: false,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      relatedApplicationId: newApp.id,
      relatedRefNumber: newApp.refNumber,
      actionUrl: `/officer/case/${newApp.id}`,
    };
    setNotifications((prev) => [officerNotif, ...prev]);
  };

  // Official raises a deficiency
  const raiseDeficiency = (
    appId: string,
    documentId: string,
    documentName: string,
    reason: string,
    observation: string,
    requiredCorrection: string
  ) => {
    const newDefId = `def-${Date.now()}`;
    const noticeDraft = aiDemoService.draftDeficiencyNotice(
      documentName,
      observation,
      applications.find((a) => a.id === appId) || applications[0]
    );

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedDocs = app.documents.map((d) =>
            d.id === documentId
              ? { ...d, status: 'correction_required' as const }
              : d
          );

          const newDeficiency = {
            id: newDefId,
            documentId,
            documentName,
            reason,
            officialObservation: observation,
            requiredCorrection,
            status: 'open' as const,
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            noticeDraft,
          };

          const newTimelineEvent = {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            stage: 'correction_requested' as ApplicationStage,
            actor: currentUser.name,
            role: currentUser.designation,
            title: `Deficiency Raised: ${documentName}`,
            description: reason,
            badgeColor: 'amber' as const,
          };

          return {
            ...app,
            stage: 'correction_requested' as ApplicationStage,
            statusLabel: 'Correction Required',
            documents: updatedDocs,
            deficiencies: [newDeficiency, ...app.deficiencies],
            timeline: [newTimelineEvent, ...app.timeline],
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );

    // Notify Applicant
    const appRecord = applications.find((a) => a.id === appId);
    const applicantNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'applicant',
      recipientId: appRecord?.applicantId,
      title: `Correction Notice: ${documentName}`,
      message: `The Scrutiny Officer flagged an issue: "${reason}". Please upload corrected document.`,
      category: 'correction_required',
      type: 'alert',
      read: false,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      relatedApplicationId: appId,
      relatedRefNumber: appRecord?.refNumber,
      actionUrl: '/applicant/documents',
    };

    setNotifications((prev) => [applicantNotif, ...prev]);
  };

  // Applicant uploads corrected document
  const submitCorrection = (
    appId: string,
    deficiencyId: string,
    fileData: { fileName: string; fileSize: string; notes?: string }
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const targetDef = app.deficiencies.find((d) => d.id === deficiencyId);
          const docId = targetDef?.documentId;

          const updatedDocs = app.documents.map((doc) => {
            if (doc.id === docId) {
              const nextVer = (doc.version || 1) + 1;
              const newVersionObj = {
                version: nextVer,
                uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                fileName: fileData.fileName,
                fileSize: fileData.fileSize,
                notes: fileData.notes || 'Corrected scan uploaded by applicant',
              };
              return {
                ...doc,
                version: nextVer,
                fileName: fileData.fileName,
                fileSize: fileData.fileSize,
                status: 'correction_submitted' as const,
                versions: [newVersionObj, ...doc.versions],
                validationNotes: [
                  ...(doc.validationNotes || []),
                  `Version ${nextVer} uploaded in response to deficiency. High resolution detected.`,
                ],
              };
            }
            return doc;
          });

          const updatedDeficiencies = app.deficiencies.map((d) =>
            d.id === deficiencyId
              ? { ...d, status: 'correction_submitted' as const }
              : d
          );

          const openDeficienciesRemain = updatedDeficiencies.some((d) => d.status === 'open');

          const newTimelineEvent = {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            stage: app.stage,
            actor: app.applicantName,
            role: 'Applicant',
            title: `Correction Uploaded: ${targetDef?.documentName || 'Document'}`,
            description: `Applicant uploaded corrected file: ${fileData.fileName}`,
            badgeColor: 'blue' as const,
          };

          return {
            ...app,
            stage: openDeficienciesRemain ? 'correction_requested' : 'officer_scrutiny',
            statusLabel: openDeficienciesRemain ? 'Correction Required' : 'Corrections Received',
            progressPercentage: Math.min(app.progressPercentage + 10, 80),
            documents: updatedDocs,
            deficiencies: updatedDeficiencies,
            timeline: [newTimelineEvent, ...app.timeline],
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );

    // Notify Officer
    const appRecord = applications.find((a) => a.id === appId);
    const officerNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'officer',
      recipientId: appRecord?.assignedOfficerId,
      title: `Correction Received: ${appRecord?.applicantName}`,
      message: `Applicant has uploaded a revised document version for reference ${appRecord?.refNumber}. Ready for re-scrutiny.`,
      category: 'correction_received',
      type: 'success',
      read: false,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      relatedApplicationId: appId,
      relatedRefNumber: appRecord?.refNumber,
      actionUrl: `/officer/case/${appId}`,
    };

    setNotifications((prev) => [officerNotif, ...prev]);
  };

  // Officer resolves a deficiency
  const resolveDeficiency = (appId: string, deficiencyId: string, remarks?: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const targetDef = app.deficiencies.find((d) => d.id === deficiencyId);
          const docId = targetDef?.documentId;

          const updatedDocs = app.documents.map((doc) =>
            doc.id === docId
              ? {
                  ...doc,
                  status: 'verified' as const,
                  verificationRemarks: remarks || 'Correction accepted and verified by officer.',
                }
              : doc
          );

          const updatedDeficiencies = app.deficiencies.map((d) =>
            d.id === deficiencyId
              ? {
                  ...d,
                  status: 'resolved' as const,
                  resolvedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                }
              : d
          );

          const allResolved = updatedDeficiencies.every((d) => d.status === 'resolved');

          const newTimelineEvent = {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            stage: app.stage,
            actor: currentUser.name,
            role: currentUser.designation,
            title: `Deficiency Resolved: ${targetDef?.documentName}`,
            description: remarks || 'Officer verified corrected document and closed defect.',
            badgeColor: 'green' as const,
          };

          return {
            ...app,
            stage: allResolved ? 'verification' : app.stage,
            statusLabel: allResolved ? 'Verification in Progress' : app.statusLabel,
            progressPercentage: allResolved ? 75 : app.progressPercentage,
            documents: updatedDocs,
            deficiencies: updatedDeficiencies,
            timeline: [newTimelineEvent, ...app.timeline],
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );
  };

  // Update a verification item checklist
  const updateVerificationItem = (
    appId: string,
    itemId: string,
    status: VerificationStatus,
    remarks?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedItems = app.verificationItems.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  status,
                  remarks: remarks ?? item.remarks,
                  verifiedBy: currentUser.name,
                  verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                }
              : item
          );

          const allVerified = updatedItems.every(
            (i) => i.status === 'verified' || i.status === 'not_applicable'
          );

          return {
            ...app,
            verificationItems: updatedItems,
            stage: allVerified ? 'committee_prep' : app.stage,
            statusLabel: allVerified ? 'Ready for Committee' : app.statusLabel,
            progressPercentage: allVerified ? 85 : app.progressPercentage,
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );
  };

  // Run AI review simulation
  const runAIReviewForApp = async (appId: string) => {
    const target = applications.find((a) => a.id === appId);
    if (!target) return;

    setIsAIProcessing(true);
    try {
      const result = await aiDemoService.simulateFullApplicationAIReview(target);

      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            const newTimelineEvent = {
              id: `tl-${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              stage: 'ai_review' as ApplicationStage,
              actor: 'AEMS AI Engine',
              role: 'System Assistance',
              title: 'AI Multi-Document Verification Run',
              description: `Classification & OCR cross-check: ${result.summary.output.overview}`,
              badgeColor: 'violet' as const,
            };

            return {
              ...app,
              aiReviewSummary: {
                reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                overallConfidence: result.summary.confidence,
                checklistPassed: 6,
                checklistTotal: 7,
                potentialDiscrepancies: [
                  'Initial abbreviation detected on UG Degree (Arjun K vs Arjun Kumar)',
                  'Low DPI scan on address document v1',
                ],
                summaryText: result.summary.output.overview,
              },
              timeline: [newTimelineEvent, ...app.timeline],
              lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
            };
          }
          return app;
        })
      );
    } finally {
      setIsAIProcessing(false);
    }
  };

  // Forward application stage
  const forwardStage = (appId: string, nextStage: ApplicationStage, statusLabel: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const newTimelineEvent = {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            stage: nextStage,
            actor: currentUser.name,
            role: currentUser.designation,
            title: `Stage Transition: ${statusLabel}`,
            description: `Application progressed to ${nextStage.replace('_', ' ').toUpperCase()} stage by ${currentUser.name}.`,
            badgeColor: 'blue' as const,
          };

          return {
            ...app,
            stage: nextStage,
            statusLabel,
            timeline: [newTimelineEvent, ...app.timeline],
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );
  };

  // Reassign application
  const reassignApplication = (appId: string, officerId: string, officerName: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            assignedOfficerId: officerId,
            assignedOfficerName: officerName,
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );
  };

  // Record committee decision
  const recordCommitteeDecision = (
    appId: string,
    decision: 'approved' | 'deferred' | 'rejected' | 'clarification_required',
    observation: string,
    meetingRef: string = 'EC-MINUTES-2026/19'
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const nextStage: ApplicationStage =
            decision === 'approved' ? 'completed' : decision === 'deferred' ? 'deferred' : 'officer_scrutiny';
          const statusLabel =
            decision === 'approved'
              ? 'Enrolment Approved'
              : decision === 'deferred'
              ? 'Deferred by Committee'
              : 'Clarification Required';

          const newTimelineEvent: {
            id: string;
            timestamp: string;
            stage: ApplicationStage;
            actor: string;
            role: string;
            title: string;
            description: string;
            badgeColor: 'blue' | 'green' | 'amber' | 'red' | 'violet';
          } = {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            stage: nextStage,
            actor: currentUser.name,
            role: 'Enrolment Committee',
            title: `Committee Decision: ${decision.toUpperCase()}`,
            description: observation,
            badgeColor: decision === 'approved' ? 'green' : 'amber',
          };

          return {
            ...app,
            stage: nextStage,
            statusLabel,
            progressPercentage: decision === 'approved' ? 100 : app.progressPercentage,
            committeeDecision: {
              decision,
              observation,
              meetingRef,
              memberName: currentUser.name,
              date: new Date().toISOString().replace('T', ' ').substring(0, 10),
            },
            timeline: [newTimelineEvent, ...app.timeline],
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return app;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetDemoScenario = () => {
    localStorage.removeItem(STORAGE_KEY_APPS);
    localStorage.removeItem(STORAGE_KEY_NOTIFS);
    localStorage.removeItem(STORAGE_KEY_ROLE);
    localStorage.removeItem(STORAGE_KEY_AUDIT);
    setApplications(initialMockApplications);
    setNotifications(initialMockNotifications);
    setAuditEvents(initialSeedAuditEvents);
    setCurrentRole('applicant');
  };

  return (
    <ApplicationStoreContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        applications,
        notifications,
        auditEvents,
        primaryApplication,
        getApplication,
        updateApplication,
        addApplication,
        raiseDeficiency,
        submitCorrection,
        resolveDeficiency,
        updateVerificationItem,
        runAIReviewForApp,
        recordCommitteeDecision,
        reassignApplication,
        forwardStage,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoScenario,
        isAIProcessing,
      }}
    >
      {children}
    </ApplicationStoreContext.Provider>
  );
};

export const useAEMS = () => {
  const context = useContext(ApplicationStoreContext);
  if (!context) {
    throw new Error('useAEMS must be used within an ApplicationStoreProvider');
  }
  return context;
};
