import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  Download,
  Gavel,
  CheckCircle2,
  FileText,
  Scale,
  ArrowRight,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { exportApplicationsToCSV } from '../../utils/exportCsv';

export const MeetingPack: React.FC = () => {
  const { applications } = useAEMS();
  const navigate = useNavigate();

  const tabledApps = applications.filter(
    (a) => a.stage === 'committee_prep' || a.stage === 'committee_review' || a.progressPercentage >= 80
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Statutory Meeting Pack
            </span>
            <span className="text-xs text-slate-400 font-mono">Reference: EC/2026/SITTING-19</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Enrolment Committee Agenda &amp; Candidate Rolls
          </h1>
          <p className="text-xs text-slate-500">
            Convened at Bar Council Council Hall, High Court Campus, Chennai &bull; Quorum: 3 Members
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => exportApplicationsToCSV(tabledApps, 'EC_Agenda_Pack_Sitting19.csv')}
          icon={<Download className="w-4 h-4 text-slate-600" />}
        >
          Export Agenda CSV
        </Button>
      </div>

      {/* Agenda Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Official Sitting Agenda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <p><strong>Item 1:</strong> Confirmation of minutes of previous sitting EC/2026/SITTING-18.</p>
            <p><strong>Item 2:</strong> Consideration of {tabledApps.length} advocate enrolment dockets scrutinized and certified compliant by Secretariat Scrutiny Wing.</p>
            <p><strong>Item 3:</strong> Consideration of deferred candidates seeking clarification regarding dual employment under Rule 49.</p>
            <p><strong>Item 4:</strong> Fixation of date for the Ceremonial Roll Signing and Oath Robing Ceremony.</p>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Dossiers Tabled */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tabled Candidate Dossiers ({tabledApps.length})</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100 p-0 text-xs">
          {tabledApps.map((app, index) => (
            <div key={app.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-400 w-6">#{index + 1}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{app.applicantName}</span>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {app.refNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {app.education.lawDegree} &bull; {app.education.lawUniversity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={app.stage === 'completed' ? 'success' : 'primary'} size="sm">
                  {app.statusLabel}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/committee/case/${app.id}`)}
                  className="text-xs"
                >
                  Review Dossier &rarr;
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
