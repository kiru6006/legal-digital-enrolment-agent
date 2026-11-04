import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ArrowRight,
  User,
  Sparkles,
  Info,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { VerificationStatus } from '../../types/application';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';

export const VerificationWorkspace: React.FC = () => {
  const { applications, updateVerificationItem, currentUser } = useAEMS();
  const navigate = useNavigate();

  const [selectedAppId, setSelectedAppId] = useState(PRIMARY_DEMO_APP_ID);

  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const handleStatusChange = (itemId: string, status: VerificationStatus, remarks?: string) => {
    updateVerificationItem(currentApp.id, itemId, status, remarks);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Statutory Verification Desk</h1>
          <p className="text-xs text-slate-500">
            Mandatory eligibility checklists under the Advocates Act, 1961 and Bar Council of Tamil Nadu &amp; Puducherry Rules.
          </p>
        </div>

        {/* Application Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Active Docket:</span>
          <select
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-blue-700 bg-white"
          >
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.refNumber} — {app.applicantName} ({app.statusLabel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Case Overview Banner */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900">{currentApp.applicantName}</span>
            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {currentApp.refNumber}
            </span>
            <Badge variant="primary" size="sm">
              {currentApp.statusLabel}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            {currentApp.education.lawDegree} &bull; {currentApp.education.lawUniversity} &bull; Roll: {currentApp.education.lawRollNumber}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/officer/case/${currentApp.id}`)}
          icon={<ArrowRight className="w-4 h-4 text-blue-600" />}
        >
          Open Digital Case File
        </Button>
      </div>

      {/* Checklist Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Statutory Verification Schedule (Rule 7 to Rule 14 Checklist)</span>
            </CardTitle>
            <span className="text-xs text-slate-500">
              Verified items require affirmative sign-off by officer
            </span>
          </div>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100 p-0 text-xs">
          {currentApp.verificationItems.map((item) => (
            <div key={item.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.name}</span>
                  <Badge variant="neutral" size="sm">
                    {item.category}
                  </Badge>
                </div>
                {item.remarks && (
                  <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                    {item.remarks}
                  </p>
                )}
                {item.verifiedBy && (
                  <p className="text-[10px] text-slate-400 font-mono">
                    Signed off by {item.verifiedBy} &bull; {item.verifiedAt}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(item.id, e.target.value as VerificationStatus)
                  }
                  className={`px-3 py-1.5 border rounded-lg text-xs font-semibold ${
                    item.status === 'verified'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : item.status === 'requires_clarification'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <option value="pending">Pending Verification</option>
                  <option value="verified">Verified &amp; Compliant</option>
                  <option value="requires_clarification">Requires Clarification</option>
                  <option value="not_applicable">Not Applicable</option>
                </select>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
