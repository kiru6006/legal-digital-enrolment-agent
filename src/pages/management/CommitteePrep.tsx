import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gavel,
  CheckCircle2,
  Calendar,
  Clock,
  Eye,
  FileCheck2,
  ShieldCheck,
  Download,
  ArrowRight,
  Briefcase,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { exportApplicationsToCSV } from '../../utils/exportCsv';
import { Modal } from '../../components/common/Modal';

export const CommitteePrep: React.FC = () => {
  const { applications, switchRole } = useAEMS();
  const navigate = useNavigate();

  const [previewApp, setPreviewApp] = useState<any | null>(null);

  // Applications ready for committee
  const committeeReadyApps = applications.filter(
    (a) => a.stage === 'committee_prep' || a.stage === 'committee_review' || a.progressPercentage >= 80
  );

  const handleSwitchToCommittee = (appId: string) => {
    switchRole('committee');
    navigate(`/committee/case/${appId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Statutory Committee Preparation
            </span>
            <span className="text-xs text-slate-400 font-mono">Sitting Date: November 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Enrolment Committee Agenda &amp; Meeting Pack Preparation
          </h1>
          <p className="text-xs text-slate-500">
            Dockets that have cleared all statutory scrutiny checks and are compiled for committee consideration.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportApplicationsToCSV(committeeReadyApps, 'AEMS_Committee_Meeting_Pack.csv')}
            icon={<Download className="w-4 h-4 text-slate-600" />}
          >
            Export Meeting Pack ({committeeReadyApps.length})
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              switchRole('committee');
              navigate('/committee/dashboard');
            }}
            icon={<Gavel className="w-4 h-4" />}
          >
            Switch to Committee Role
          </Button>
        </div>
      </div>

      {/* Meeting Details Card */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <span className="font-bold text-indigo-950 uppercase tracking-wide">
            Statutory Enrolment Committee Meeting: EC/2026/SITTING-19
          </span>
          <p className="text-indigo-900 leading-relaxed">
            Chairman: Hon. Justice (Retd.) K. Ramamoorthy &bull; Venue: Bar Council Council Hall, High Court Campus, Chennai.
          </p>
        </div>
        <Badge variant="violet" size="md">
          {committeeReadyApps.length} Candidates Tabled
        </Badge>
      </div>

      {/* Tabled Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {committeeReadyApps.map((app) => (
          <Card key={app.id} className="flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <CardHeader>
                <div className="space-y-0.5 max-w-[210px]">
                  <CardTitle className="text-sm font-bold truncate">{app.applicantName}</CardTitle>
                  <p className="text-xs font-mono text-blue-700">{app.refNumber}</p>
                </div>
                <Badge variant={app.stage === 'completed' ? 'success' : 'primary'} size="sm">
                  {app.statusLabel}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2.5 text-xs text-slate-600">
                <p><strong>Law Degree:</strong> {app.education.lawDegree}</p>
                <p><strong>Faculty:</strong> {app.education.lawCollege}</p>
                <p><strong>University:</strong> {app.education.lawUniversity}</p>
                <p><strong>Passing Division:</strong> First Class ({app.education.lawPassingYear})</p>
                <div className="pt-2 border-t flex items-center justify-between text-[11px] text-slate-500">
                  <span>Scrutiny Clearance:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified
                  </span>
                </div>
              </CardContent>
            </div>

            <CardFooter className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewApp(app)}
                icon={<Eye className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Inspect Pack
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSwitchToCommittee(app.id)}
                icon={<Gavel className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Record Decision
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal: Pack Preview */}
      <Modal
        isOpen={!!previewApp}
        onClose={() => setPreviewApp(null)}
        title={`Committee Meeting Pack: ${previewApp?.applicantName}`}
        description={`Docket Ref: ${previewApp?.refNumber}`}
        maxWidth="lg"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setPreviewApp(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (previewApp) {
                  handleSwitchToCommittee(previewApp.id);
                }
              }}
              icon={<Gavel className="w-3.5 h-3.5" />}
            >
              Enter Committee Review Desk
            </Button>
          </div>
        }
      >
        {previewApp && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900 border-b pb-1">Statutory Scrutiny Sign-Off</h4>
              <p><strong>Senior Scrutiny Officer:</strong> {previewApp.assignedOfficerName}</p>
              <p><strong>Law Degree Verification:</strong> Authenticated by University Liaison Wing</p>
              <p><strong>Bar Rule 49 Declaration:</strong> Free from gainful commercial employment</p>
              <p><strong>Fee Reconciliation:</strong> Enrolment fee received &amp; reconciled in treasury</p>
            </div>

            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 space-y-1">
              <span className="font-bold text-purple-950">AI Executive Briefing:</span>
              <p className="text-purple-900 text-xs leading-relaxed">
                Candidate possesses recognized statutory qualification under Advocates Act Section 24(1)(c). All uploaded credentials verified with 92% confidence. Eligible for statutory admission.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
