import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gavel,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';

export const CommitteeDashboard: React.FC = () => {
  const { applications, currentUser } = useAEMS();
  const navigate = useNavigate();

  const awaitingConsideration = applications.filter(
    (a) => a.stage === 'committee_prep' || a.stage === 'committee_review'
  );
  const deferredCases = applications.filter((a) => a.stage === 'deferred');
  const approvedToday = applications.filter((a) => a.stage === 'completed' && a.committeeDecision?.decision === 'approved');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Statutory Enrolment Committee
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Role: {currentUser.name} ({currentUser.designation})
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Committee Review Chamber
          </h1>
          <p className="text-xs text-slate-500">
            Official statutory decision desk under Section 26 of the Advocates Act, 1961.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/committee/meeting-pack')}
            icon={<Briefcase className="w-4 h-4 text-slate-600" />}
          >
            Open Meeting Pack
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/committee/case/${PRIMARY_DEMO_APP_ID}`)}
            icon={<Gavel className="w-4 h-4" />}
          >
            Review Arjun Kumar File
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border-indigo-200 bg-indigo-50/20">
          <CardContent className="p-5 space-y-1">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
              Awaiting Committee Consideration
            </span>
            <p className="text-3xl font-extrabold text-indigo-700">{awaitingConsideration.length}</p>
            <p className="text-xs text-indigo-600">Verified and tabled for current sitting</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/20">
          <CardContent className="p-5 space-y-1">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Deferred / Clarification Cases
            </span>
            <p className="text-3xl font-extrabold text-amber-700">{deferredCases.length}</p>
            <p className="text-xs text-amber-600">Pending employer/university clearance</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/20">
          <CardContent className="p-5 space-y-1">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Approved for Enrolment Roll
            </span>
            <p className="text-3xl font-extrabold text-emerald-700">{approvedToday.length}</p>
            <p className="text-xs text-emerald-600">Certificates of enrolment authorized</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabled Candidates Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-sm flex items-center gap-2">
              <Gavel className="w-4 h-4 text-indigo-600" />
              <span>Candidates Tabled for Statutory Sitting (EC/2026/SITTING-19)</span>
            </CardTitle>
            <Badge variant="violet" size="sm">
              Current Agenda
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Docket Ref</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Law Degree &amp; University</th>
                  <th className="py-3 px-4">Scrutiny Officer</th>
                  <th className="py-3 px-4">Clearance Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {awaitingConsideration.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      All tabled candidates have been considered for this sitting.
                    </td>
                  </tr>
                ) : (
                  awaitingConsideration.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">
                        {app.refNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {app.applicantName}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {app.education.lawDegree} ({app.education.lawUniversity})
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {app.assignedOfficerName}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="success" size="sm">
                          Scrutiny Complete
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/committee/case/${app.id}`)}
                          className="text-xs"
                        >
                          Review &amp; Record Decision &rarr;
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

