import { ApplicationRecord } from '../types/application';

export function exportApplicationsToCSV(
  applications: ApplicationRecord[],
  filename = 'AEMS_Enrolment_Applications_Report.csv'
) {
  const headers = [
    'Application ID',
    'Reference Number',
    'Applicant Name',
    'Email',
    'Phone',
    'Law Degree',
    'Law University',
    'Year of Passing',
    'Stage',
    'Status',
    'Priority',
    'Assigned Officer',
    'Submission Date',
    'Last Updated',
    'Deficiencies Count',
  ];

  const rows = applications.map((app) => [
    app.id,
    app.refNumber,
    `"${app.applicantName.replace(/"/g, '""')}"`,
    app.email,
    app.phone,
    `"${app.education.lawDegree.replace(/"/g, '""')}"`,
    `"${app.education.lawUniversity.replace(/"/g, '""')}"`,
    app.education.lawPassingYear,
    app.stage,
    `"${app.statusLabel.replace(/"/g, '""')}"`,
    app.priority,
    `"${app.assignedOfficerName.replace(/"/g, '""')}"`,
    app.submissionDate,
    app.lastUpdated,
    app.deficiencies.length,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

