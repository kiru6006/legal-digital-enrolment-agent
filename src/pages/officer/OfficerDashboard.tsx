import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Users,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Filter,
  BarChart2,
  FileText,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';

export const OfficerDashboard: React.FC = () => {
  const { applications, currentUser } = useAEMS();
  const navigate = useNavigate();

  // Dynamic counts derived from real mock state
  const myAssigned = applications.filter((a) => a.assignedOfficerName === currentUser.name || a.assignedOfficerId === currentUser.id);
  const newApplicationsToday = applications.filter((a) => a.stage === 'submitted');
  const readyForReview = applications.filter((a) => a.stage === 'officer_scrutiny' || a.stage === 'ai_review');
  const correctionsReceived = applications.filter((a) => a.statusLabel === 'Corrections Received' || a.deficiencies.some(d => d.status === 'correction_submitted'));
  const verificationPending = applications.filter((a) => a.stage === 'verification');
  const externalDependency = applications.filter((a) => a.statusLabel.toLowerCase().includes('external') || a.stage === 'deferred');
  const completedToday = applications.filter((a) => a.stage === 'completed');

  // Priority counts
  const criticalCount = applications.filter((a) => a.priority === 'critical').length;
  const highCount = applications.filter((a) => a.priority === 'high').length;
  const mediumCount = applications.filter((a) => a.priority === 'medium').length;
  const lowCount = applications.filter((a) => a.priority === 'low').length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Officer Welcome & Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Official Scrutiny Desk
            </span>
            <span className="text-xs text-slate-400">
              Department: {currentUser.department || 'Enrolment Scrutiny Section A'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Official Workstation: {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500">
            Designation: {currentUser.designation} • Bar Council of Tamil Nadu &amp; Puducherry
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/officer/time-savings')}
            icon={<Sparkles className="w-4 h-4 text-purple-600" />}
          >
            AI Time Savings
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/officer/work-queue')}
            icon={<Inbox className="w-4 h-4" />}
          >
            Open Work Queue ({applications.length})
          </Button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'New Today', count: newApplicationsToday.length, color: 'blue', action: () => navigate('/officer/work-queue?stage=submitted') },
          { label: 'Ready for Review', count: readyForReview.length, color: 'indigo', action: () => navigate('/officer/work-queue?stage=officer_scrutiny') },
          { label: 'Corrections In', count: correctionsReceived.length, color: 'amber', action: () => navigate('/officer/deficiencies') },
          { label: 'Verification', count: verificationPending.length, color: 'purple', action: () => navigate('/officer/verification') },
          { label: 'External Pending', count: externalDependency.length, color: 'slate', action: () => navigate('/officer/work-queue') },
          { label: 'Completed', count: completedToday.length, color: 'emerald', action: () => navigate('/officer/completed') },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col justify-between group"
          >
            <span className="text-[11px] font-semibold text-slate-500 truncate">{item.label}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {item.count}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>
        ))}
      </div>

      {/* Main Grid: My Daily Work Breakdown & Work Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Work Buckets Table (Screen OFF-01 core spec) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>My Daily Work Buckets</span>
              </CardTitle>
              <Badge variant="primary" size="sm">
                Live State Sync
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Work Bucket</th>
                    <th className="py-2.5 px-4 text-right">Active Count</th>
                    <th className="py-2.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { bucket: 'New Applications Submitted', count: newApplicationsToday.length, desc: 'Awaiting initial classification', route: '/officer/work-queue?stage=submitted' },
                    { bucket: 'Ready for Official Scrutiny', count: readyForReview.length, desc: 'AI intake finished; requires officer review', route: '/officer/work-queue?stage=officer_scrutiny' },
                    { bucket: 'Corrections Received from Applicants', count: correctionsReceived.length, desc: 'Re-uploaded documents ready for re-review', route: '/officer/deficiencies' },
                    { bucket: 'Statutory Verification Pending', count: verificationPending.length, desc: 'Identity, degree & Bar Rule 49 clearance', route: '/officer/verification' },
                    { bucket: 'Awaiting External Dependency', count: externalDependency.length, desc: 'Inter-university or employer confirmation', route: '/officer/work-queue' },
                    { bucket: 'Completed Today', count: completedToday.length, desc: 'Forwarded to Committee / Enrolment approved', route: '/officer/completed' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{row.bucket}</p>
                        <p className="text-[10px] text-slate-400">{row.desc}</p>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
                        {row.count}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(row.route)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Review &rarr;
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-[11px] text-slate-400">
              *Counts reflect mock database records updated in real time.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/officer/work-queue')}
            >
              Full Work Queue
            </Button>
          </CardFooter>
        </Card>

        {/* Priority & Flagged Cases */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between w-full">
                <span>Queue by Priority SLA</span>
                <Clock className="w-4 h-4 text-slate-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                <span className="font-bold text-rose-900">Critical Priority</span>
                <span className="font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                  {criticalCount} Cases
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900">High Priority</span>
                <span className="font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {highCount} Cases
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900">Medium Priority</span>
                <span className="font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {mediumCount} Cases
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-700">Routine / Low</span>
                <span className="font-mono font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                  {lowCount} Cases
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Spotlight on Primary Demo Case */}
          <Card className="border-indigo-200 bg-indigo-50/20">
            <CardHeader className="border-indigo-100">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-xs text-indigo-950 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Primary Demo Spotlight</span>
                </CardTitle>
                <Badge variant="violet" size="sm">
                  Active Demo
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <p className="font-bold text-slate-900">Arjun Kumar ({PRIMARY_DEMO_APP_ID})</p>
              <p className="text-slate-600 text-[11px]">
                Stage: Scrutiny &bull; 2 Deficiencies (Address Proof blur + Name initial disparity).
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/officer/case/${PRIMARY_DEMO_APP_ID}`)}
                  className="w-full text-xs"
                >
                  Open Case File &rarr;
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
