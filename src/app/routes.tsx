import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

// Landing
import { LandingPage } from '../pages/landing/LandingPage';

// Applicant Pages
import { ApplicantDashboard } from '../pages/applicant/ApplicantDashboard';
import { NewApplication } from '../pages/applicant/NewApplication';
import { ApplicationDetails } from '../pages/applicant/ApplicationDetails';
import { DocumentCorrection } from '../pages/applicant/DocumentCorrection';
import { ApplicantNotifications } from '../pages/applicant/ApplicantNotifications';
import { ApplicantAppointments } from '../pages/applicant/ApplicantAppointments';

// Officer Pages
import { OfficerDashboard } from '../pages/officer/OfficerDashboard';
import { WorkQueue } from '../pages/officer/WorkQueue';
import { DigitalCaseFile } from '../pages/officer/DigitalCaseFile';
import { AIDocumentReview } from '../pages/officer/AIDocumentReview';
import { WorkReductionPanel } from '../pages/officer/WorkReductionPanel';
import { DeficiencyManagement } from '../pages/officer/DeficiencyManagement';
import { VerificationWorkspace } from '../pages/officer/VerificationWorkspace';
import { CompletedWork } from '../pages/officer/CompletedWork';

// Management Pages
import { ManagementDashboard } from '../pages/management/ManagementDashboard';
import { TeamWorkload } from '../pages/management/TeamWorkload';
import { ApplicationProgress } from '../pages/management/ApplicationProgress';
import { Reports } from '../pages/management/Reports';
import { CommitteePrep } from '../pages/management/CommitteePrep';

// Committee Pages
import { CommitteeDashboard } from '../pages/committee/CommitteeDashboard';
import { CommitteeCaseReview } from '../pages/committee/CommitteeCaseReview';
import { MeetingPack } from '../pages/committee/MeetingPack';

// Admin Pages
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminChecklists } from '../pages/admin/AdminChecklists';
import { AdminConfig } from '../pages/admin/AdminConfig';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Landing Page */}
        <Route index element={<LandingPage />} />

        {/* Applicant Module (APP-01..APP-05) */}
        <Route path="applicant">
          <Route path="dashboard" element={<ApplicantDashboard />} />
          <Route path="application" element={<NewApplication />} />
          <Route path="new-application" element={<NewApplication />} />
          <Route path="application/:id" element={<ApplicationDetails />} />
          <Route path="documents" element={<DocumentCorrection />} />
          <Route path="corrections" element={<DocumentCorrection />} />
          <Route path="notifications" element={<ApplicantNotifications />} />
          <Route path="appointments" element={<ApplicantAppointments />} />
          <Route index element={<ApplicantDashboard />} />
        </Route>

        {/* Officer Module (OFF-01..OFF-05) */}
        <Route path="officer">
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="work" element={<WorkQueue />} />
          <Route path="work-queue" element={<WorkQueue />} />
          <Route path="case/:id" element={<DigitalCaseFile />} />
          <Route path="case/:id/ai" element={<AIDocumentReview />} />
          <Route path="case/:id/deficiency" element={<DeficiencyManagement />} />
          <Route path="ai-review/:id" element={<AIDocumentReview />} />
          <Route path="time-savings" element={<WorkReductionPanel />} />
          <Route path="deficiencies" element={<DeficiencyManagement />} />
          <Route path="verification" element={<VerificationWorkspace />} />
          <Route path="completed" element={<CompletedWork />} />
          <Route index element={<OfficerDashboard />} />
        </Route>

        {/* Supervisor Module (OFF-06) */}
        <Route path="supervisor">
          <Route path="allocation" element={<TeamWorkload />} />
          <Route index element={<Navigate to="/supervisor/allocation" replace />} />
        </Route>

        {/* Management Module (MGT-01..MGT-03) */}
        <Route path="management">
          <Route path="dashboard" element={<ManagementDashboard />} />
          <Route path="teams" element={<TeamWorkload />} />
          <Route path="workload" element={<TeamWorkload />} />
          <Route path="progress" element={<ApplicationProgress />} />
          <Route path="reports" element={<Reports />} />
          <Route path="committee" element={<CommitteePrep />} />
          <Route index element={<ManagementDashboard />} />
        </Route>

        {/* Committee Module (COM-01..COM-02) */}
        <Route path="committee">
          <Route path="dashboard" element={<CommitteeDashboard />} />
          <Route path="case/:id" element={<CommitteeCaseReview />} />
          <Route path="meeting-pack" element={<MeetingPack />} />
          <Route index element={<CommitteeDashboard />} />
        </Route>

        {/* Admin Module (ADM-01) */}
        <Route path="admin">
          <Route path="users" element={<AdminUsers />} />
          <Route path="checklists" element={<AdminChecklists />} />
          <Route path="configuration" element={<AdminConfig />} />
          <Route index element={<AdminUsers />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
