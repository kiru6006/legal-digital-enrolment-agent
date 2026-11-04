import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  AlertCircle,
  Bell,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Upload,
  ShieldCheck,
  User,
  Scale,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { exportApplicationsToCSV } from '../../utils/exportCsv';

export const ApplicantDashboard: React.FC = () => {
  const { primaryApplication, notifications } = useAEMS();
  const navigate = useNavigate();

  const openDeficiencies = primaryApplication.deficiencies.filter((d) => d.status === 'open');
  const recentNotifications = notifications
    .filter((n) => n.recipientRole === 'applicant' || n.recipientRole === 'all')
    .slice(0, 3);

  const handleDownloadSummary = () => {
    exportApplicationsToCSV([primaryApplication], `AEMS_Application_Summary_${primaryApplication.refNumber}.csv`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Applicant Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">Ref: {primaryApplication.refNumber}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {primaryApplication.applicantName}
          </h1>
          <p className="text-xs text-slate-500">
            Enrolment application submitted on {primaryApplication.submissionDate} to the Bar Council of Tamil Nadu &amp; Puducherry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSummary}
            icon={<Download className="w-4 h-4 text-slate-600" />}
          >
            Download Summary
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/applicant/application/${PRIMARY_DEMO_APP_ID}`)}
            icon={<FileText className="w-4 h-4" />}
          >
            View Application
          </Button>
        </div>
      </div>

      {/* Actionable Alert (If deficiencies open) */}
      {openDeficiencies.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-lg shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950">
                Action Required: {openDeficiencies.length} Document{openDeficiencies.length > 1 ? 's' : ''} Require Correction
              </h3>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                The Scrutiny Officer reviewed your files and noted defects in your residential proof and academic credentials. Review the observations and upload corrected files to resume processing.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/applicant/documents')}
            icon={<Upload className="w-4 h-4" />}
            className="shrink-0 bg-amber-700 hover:bg-amber-800 border-amber-800 text-white"
          >
            Upload Corrections
          </Button>
        </div>
      )}

      {/* Status & Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Application Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center justify-between w-full">
              <span>Current Status</span>
              <Badge
                variant={
                  primaryApplication.stage === 'completed'
                    ? 'success'
                    : primaryApplication.stage === 'correction_requested'
                    ? 'warning'
                    : 'primary'
                }
              >
                {primaryApplication.statusLabel}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Application Progress</span>
                <span>{primaryApplication.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${primaryApplication.progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Current Stage:</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {primaryApplication.stage.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Officer:</span>
                <span className="font-medium text-slate-700">{primaryApplication.assignedOfficerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Scrutiny Update:</span>
                <span className="font-medium text-slate-700">{primaryApplication.lastUpdated}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              to={`/applicant/application/${PRIMARY_DEMO_APP_ID}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Examine full case timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardFooter>
        </Card>

        {/* Card 2: Document Checklist Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center justify-between w-full">
              <span>Submitted Documents</span>
              <Badge variant="neutral">{primaryApplication.documents.length} Files</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs">
            {primaryApplication.documents.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
              >
                <div className="truncate max-w-[200px]">
                  <p className="font-medium text-slate-800 truncate">{doc.name}</p>
                  <p className="text-[10px] text-slate-400">v{doc.version} • {doc.fileSize}</p>
                </div>
                <Badge
                  size="sm"
                  variant={
                    doc.status === 'verified'
                      ? 'success'
                      : doc.status === 'correction_required'
                      ? 'danger'
                      : doc.status === 'correction_submitted'
                      ? 'primary'
                      : 'warning'
                  }
                >
                  {doc.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link
              to="/applicant/documents"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Manage all documents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardFooter>
        </Card>

        {/* Card 3: Enrolment Ceremony & Appointment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center justify-between w-full">
              <span>Next Expected Action</span>
              <Badge variant="violet">Schedule</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {primaryApplication.appointment ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Roll Signing Ceremony</span>
                </div>
                <div className="bg-indigo-50/60 p-3 rounded-lg border border-indigo-100 text-slate-700 space-y-1">
                  <p className="font-semibold text-indigo-950">
                    Date: {primaryApplication.appointment.date}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Slot: {primaryApplication.appointment.timeSlot}
                  </p>
                  <p className="text-[11px] text-slate-600 truncate">
                    Venue: High Court Campus Gate 4, Chennai
                  </p>
                </div>
                <p className="text-[11px] text-slate-500">
                  Note: Final ceremony confirmation subject to Enrolment Committee statutory approval.
                </p>
              </div>
            ) : (
              <div className="p-4 text-center text-slate-500">
                <Clock className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                <p>Appointment slot will be allocated once all statutory documents are verified.</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link
              to="/applicant/appointments"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View Appointment Instructions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Notifications & Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between w-full">
            <span>Recent Official Notifications</span>
            <Link to="/applicant/notifications" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100">
          {recentNotifications.map((notif) => (
            <div key={notif.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                  {!notif.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                <span className="text-[10px] text-slate-400 font-mono">{notif.date}</span>
              </div>
              {notif.actionUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(notif.actionUrl!)}
                  className="shrink-0 text-xs"
                >
                  View
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
