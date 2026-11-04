import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GitBranch,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  FolderOpen,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';

export const ApplicationProgress: React.FC = () => {
  const { applications } = useAEMS();
  const navigate = useNavigate();

  const stagesList = [
    { key: 'submitted', label: '1. Online Intake Submitted', avgTime: '4 hrs', desc: 'Electronic file intake received from candidate' },
    { key: 'ai_review', label: '2. AI Scrutiny Pre-Check', avgTime: '15 mins', desc: 'Automated OCR field extraction & checklist matching' },
    { key: 'officer_scrutiny', label: '3. Official Officer Scrutiny', avgTime: '1.2 days', desc: 'Detailed physical and digital credential cross-verification' },
    { key: 'correction_requested', label: '4. Deficiency Rectification', avgTime: '2.5 days', desc: 'Awaiting candidate rectification for defective scans or name issues' },
    { key: 'verification', label: '5. Statutory Verification', avgTime: '3.0 days', desc: 'Identity confirmation, degree authenticity & Bar Rule 49' },
    { key: 'committee_prep', label: '6. Committee Agenda Compilation', avgTime: '1.0 day', desc: 'Verified docket placed on statutory meeting roll' },
    { key: 'committee_review', label: '7. Committee Consideration', avgTime: 'Sitting', desc: 'Statutory Enrolment Committee formal examination' },
    { key: 'completed', label: '8. Enrolment Approved & Robing', avgTime: 'Ceremony', desc: 'Roll signing, certificate issuance and formal admission to Bar' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900">Application Pipeline Velocity &amp; Stage Ageing</h1>
        <p className="text-xs text-slate-500">
          Stage-by-stage tracking of enrolment dockets from submission through ceremonial admission.
        </p>
      </div>

      {/* Stage-wise Breakdown */}
      <div className="space-y-4">
        {stagesList.map((st, idx) => {
          const matchingApps = applications.filter((a) => a.stage === st.key);
          const hasBlocked = matchingApps.some((a) => a.priority === 'critical' || a.deficiencies.some(d => d.status === 'open'));

          return (
            <Card key={st.key} className={hasBlocked ? 'border-amber-200 bg-amber-50/10' : ''}>
              <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{st.label}</h3>
                      <Badge variant="neutral" size="sm">
                        Avg: {st.avgTime}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{st.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-xl font-bold text-slate-900 block font-mono">
                      {matchingApps.length}
                    </span>
                    <span className="text-[10px] text-slate-400">Active Dockets</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/officer/work-queue?stage=${st.key}`)}
                    className="text-xs"
                  >
                    View Stage &rarr;
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
