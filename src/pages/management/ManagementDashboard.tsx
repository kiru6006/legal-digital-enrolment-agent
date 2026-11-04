import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Layers,
  ArrowRight,
  Gavel,
  FileSpreadsheet,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { exportApplicationsToCSV } from '../../utils/exportCsv';

export const ManagementDashboard: React.FC = () => {
  const { applications, currentUser } = useAEMS();
  const navigate = useNavigate();

  // Dynamic calculations
  const totalActive = applications.length;
  const receivedThisMonth = applications.length;
  const completed = applications.filter((a) => a.stage === 'completed').length;
  const awaitingScrutiny = applications.filter((a) => a.stage === 'officer_scrutiny' || a.stage === 'submitted' || a.stage === 'ai_review').length;
  const awaitingCommittee = applications.filter((a) => a.stage === 'committee_prep' || a.stage === 'committee_review').length;
  const requiringApplicantAction = applications.filter((a) => a.stage === 'correction_requested' || a.deficiencies.some(d => d.status === 'open')).length;

  // Chart data
  const stageDistributionData = [
    { name: 'Submitted / Intake', value: applications.filter((a) => a.stage === 'submitted' || a.stage === 'ai_review').length, color: '#3b82f6' },
    { name: 'Scrutiny', value: applications.filter((a) => a.stage === 'officer_scrutiny').length, color: '#6366f1' },
    { name: 'Correction Req.', value: requiringApplicantAction, color: '#f59e0b' },
    { name: 'Verification', value: applications.filter((a) => a.stage === 'verification').length, color: '#8b5cf6' },
    { name: 'Committee Ready', value: awaitingCommittee, color: '#ec4899' },
    { name: 'Completed', value: completed, color: '#10b981' },
  ];

  const weeklyIntakeData = [
    { week: 'Week 1', intake: 14, cleared: 11 },
    { week: 'Week 2', intake: 19, cleared: 16 },
    { week: 'Week 3', intake: 22, cleared: 18 },
    { week: 'Week 4', intake: 20, cleared: 19 },
  ];

  const ageingData = [
    { bracket: '< 3 Days', count: 11 },
    { bracket: '3 - 7 Days', count: 6 },
    { bracket: '8 - 14 Days', count: 2 },
    { bracket: '> 14 Days', count: 1 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Executive Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Executive Command Centre
            </span>
            <span className="text-xs text-slate-400">Institutional Oversight</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Enrolment Directorate: {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500">
            Real-time scrutiny velocity, officer capacity, and statutory compliance metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportApplicationsToCSV(applications, 'AEMS_Executive_Enrolment_Summary.csv')}
            icon={<FileSpreadsheet className="w-4 h-4 text-slate-600" />}
          >
            Export All Data
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/management/committee')}
            icon={<Gavel className="w-4 h-4" />}
          >
            Committee Prep ({awaitingCommittee})
          </Button>
        </div>
      </div>

      {/* KPI Cards (Screen MGT-01) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'Total Active Docket', val: totalActive, desc: 'Pipeline total', color: 'text-slate-900' },
          { label: 'Intake This Month', val: receivedThisMonth, desc: 'New submissions', color: 'text-blue-600' },
          { label: 'Awaiting Scrutiny', val: awaitingScrutiny, desc: 'Staff queues', color: 'text-indigo-600' },
          { label: 'Deficiencies Open', val: requiringApplicantAction, desc: 'Candidate action', color: 'text-amber-600' },
          { label: 'Ready for Committee', val: awaitingCommittee, desc: 'Prepared packs', color: 'text-purple-600' },
          { label: 'Approved Enrolments', val: completed, desc: 'Roll confirmed', color: 'text-emerald-600' },
        ].map((kpi, idx) => (
          <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 leading-tight block truncate">
              {kpi.label}
            </span>
            <p className={`text-2xl font-bold mt-1.5 ${kpi.color}`}>{kpi.val}</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">{kpi.desc}</span>
          </div>
        ))}
      </div>

      {/* Today's Operational Summary Panel */}
      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-950 font-bold">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Today's Operational Summary (Bar Council Secretariat)</span>
          </div>
          <span className="text-blue-700 font-mono text-[11px]">Date: 2026-11-04</span>
        </div>
        <p className="text-blue-900 leading-relaxed">
          <strong>25 new applications</strong> received across 8 district law faculties; <strong>19 cleared</strong> preliminary verification; <strong>14 corrections</strong> submitted by candidates; <strong>{awaitingCommittee} cases</strong> compiled and docketed for the upcoming Statutory Enrolment Committee meeting.
        </p>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Application Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-64 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stageDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stageDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Intake vs Cleared */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Weekly Processing Throughput</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-64 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyIntakeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="intake" name="Applications In" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="cleared" name="Files Cleared" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Application Ageing Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-sm">Statutory Processing Ageing (SLA Distribution)</CardTitle>
              <Badge variant="primary" size="sm">
                Target SLA: &lt; 7 Days
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-56 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="bracket" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Applications" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
