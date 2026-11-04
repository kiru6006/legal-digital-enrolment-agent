import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';

export const DocumentCorrection: React.FC = () => {
  const { primaryApplication, submitCorrection } = useAEMS();
  const navigate = useNavigate();

  const [selectedDeficiency, setSelectedDeficiency] = useState<any | null>(null);
  const [uploadNotes, setUploadNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  const deficiencies = primaryApplication.deficiencies;

  const handleSimulatePresetUpload = (def: any, presetName: string, size: string) => {
    setIsUploading(true);
    setTimeout(() => {
      submitCorrection(PRIMARY_DEMO_APP_ID, def.id, {
        fileName: presetName,
        fileSize: size,
        notes: uploadNotes || `Rectification uploaded by ${primaryApplication.applicantName}`,
      });
      setIsUploading(false);
      setSelectedDeficiency(null);
      setUploadNotes('');
      setUploadSuccessMessage(
        `Successfully uploaded ${presetName}. Version updated & Scrutiny Officer notified!`
      );
      setTimeout(() => setUploadSuccessMessage(null), 5000);
    }, 600);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Deficiency Rectification Desk
          </span>
          <span className="text-xs text-slate-400 font-mono">Case: {primaryApplication.refNumber}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Document Correction Workspace</h1>
        <p className="text-xs text-slate-500">
          Upload certified rectifications in response to statutory scrutiny notices issued by the Bar Council Registry.
        </p>
      </div>

      {/* Success Notification Alert */}
      {uploadSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold">{uploadSuccessMessage}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/applicant/application/${PRIMARY_DEMO_APP_ID}`)}
            className="text-xs bg-white text-emerald-800 border-emerald-300"
          >
            View File Dossier
          </Button>
        </div>
      )}

      {/* Deficiency Cards */}
      <div className="space-y-4">
        {deficiencies.map((def) => {
          const doc = primaryApplication.documents.find((d) => d.id === def.documentId);
          const isOpen = def.status === 'open';
          const isSubmitted = def.status === 'correction_submitted';
          const isResolved = def.status === 'resolved';

          return (
            <Card
              key={def.id}
              className={
                isOpen
                  ? 'border-amber-300 bg-amber-50/20'
                  : isSubmitted
                  ? 'border-blue-200 bg-blue-50/20'
                  : 'border-slate-200 bg-white opacity-80'
              }
            >
              <CardHeader>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-bold text-slate-900">
                      {def.documentName}
                    </CardTitle>
                    <span className="text-xs text-slate-400 font-mono">
                      Current Version: v{doc?.version || 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{def.reason}</p>
                </div>

                <Badge
                  variant={isOpen ? 'warning' : isSubmitted ? 'primary' : 'success'}
                  size="md"
                >
                  {isOpen
                    ? 'ACTION REQUIRED'
                    : isSubmitted
                    ? 'CORRECTION UNDER REVIEW'
                    : 'DEFECT RESOLVED'}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3 text-xs">
                {/* Official Scrutiny Observation */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official Scrutiny Observation:</span>
                  </span>
                  <p className="text-slate-800 leading-relaxed">{def.officialObservation}</p>
                </div>

                {/* Required Correction */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-semibold text-slate-700">Required Rectification:</span>
                  <p className="text-slate-800 leading-relaxed">{def.requiredCorrection}</p>
                </div>

                {/* Upload History / Current Versions */}
                {doc && (
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Version Audit History ({doc.versions.length} uploaded):
                    </span>
                    <div className="mt-1 space-y-1.5">
                      {doc.versions.map((v) => (
                        <div
                          key={v.version}
                          className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-100 text-[11px]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-blue-600">v{v.version}</span>
                            <span className="text-slate-700 font-medium">{v.fileName}</span>
                            <span className="text-slate-400">({v.fileSize})</span>
                          </div>
                          <span className="text-slate-400 font-mono">{v.uploadedAt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <div className="text-xs text-slate-500">
                  {isOpen ? (
                    <span className="text-amber-800 font-semibold">
                      Please upload corrected document within 7 days.
                    </span>
                  ) : isSubmitted ? (
                    <span className="text-blue-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Correction submitted. Awaiting Enrolment Officer verification.
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified and closed on {def.resolvedAt}.
                    </span>
                  )}
                </div>

                {isOpen && (
                  <div className="flex items-center gap-2">
                    {/* Quick Demo Preset Upload Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      isLoading={isUploading}
                      onClick={() =>
                        handleSimulatePresetUpload(
                          def,
                          def.documentName.includes('Address')
                            ? 'TANGEDCO_eBill_300DPI_HighRes.pdf'
                            : 'Notary_Identity_Affidavit_ArjunKumar.pdf',
                          '1.4 MB'
                        )
                      }
                      icon={<Upload className="w-3.5 h-3.5" />}
                    >
                      <span>Simulate Corrected Upload (v2)</span>
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Guide Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
        <h4 className="font-bold text-slate-900">Official Scrutiny Guidelines for Applicants:</h4>
        <ul className="list-disc list-inside space-y-1 text-slate-500">
          <li>Ensure scans are in color and at minimum 200 DPI resolution.</li>
          <li>For name variations between degree certificates and official registers, an attested affidavit sworn before a Notary Public is statutory.</li>
          <li>Once submitted, your corrected document is automatically routed back to the designated Scrutiny Officer workstation.</li>
        </ul>
      </div>
    </div>
  );
};
