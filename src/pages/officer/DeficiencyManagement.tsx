import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Eye,
  Send,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { aiDemoService } from '../../services/aiDemoService';

export const DeficiencyManagement: React.FC = () => {
  const { applications, resolveDeficiency, raiseDeficiency } = useAEMS();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'correction_submitted' | 'resolved'>('all');
  const [selectedVersionDiff, setSelectedVersionDiff] = useState<any | null>(null);

  // Aggregate all deficiencies across applications
  const allDeficiencies = applications.flatMap((app) =>
    app.deficiencies.map((d) => ({
      ...d,
      applicationId: app.id,
      applicantName: app.applicantName,
      refNumber: app.refNumber,
    }))
  );

  const filteredDeficiencies = allDeficiencies.filter((d) => {
    if (activeTab === 'open') return d.status === 'open';
    if (activeTab === 'correction_submitted') return d.status === 'correction_submitted';
    if (activeTab === 'resolved') return d.status === 'resolved';
    return true;
  });

  const handleOpenVersionCompare = (def: any) => {
    const diff = aiDemoService.compareDocumentVersions(1, 2, def.documentName);
    setSelectedVersionDiff({ ...diff, def });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Deficiency &amp; Rectification Tracking</h1>
          <p className="text-xs text-slate-500">
            Monitor scrutiny notices, candidate re-uploads, and statutory compliance status.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'all' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-semibold text-slate-500">Total Deficiencies</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{allDeficiencies.length}</p>
        </button>

        <button
          onClick={() => setActiveTab('open')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'open' ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-semibold text-amber-800">Awaiting Candidate</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">
            {allDeficiencies.filter((d) => d.status === 'open').length}
          </p>
        </button>

        <button
          onClick={() => setActiveTab('correction_submitted')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'correction_submitted' ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-semibold text-indigo-800">Corrections Received</span>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {allDeficiencies.filter((d) => d.status === 'correction_submitted').length}
          </p>
        </button>

        <button
          onClick={() => setActiveTab('resolved')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'resolved' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-semibold text-emerald-800">Resolved &amp; Closed</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {allDeficiencies.filter((d) => d.status === 'resolved').length}
          </p>
        </button>
      </div>

      {/* Main List Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Case Ref</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Document Affected</th>
                  <th className="py-3 px-4">Official Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date Issued</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeficiencies.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No deficiencies in this category.
                    </td>
                  </tr>
                ) : (
                  filteredDeficiencies.map((def) => (
                    <tr key={def.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">
                        {def.refNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {def.applicantName}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {def.documentName}
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                        {def.reason}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          size="sm"
                          variant={
                            def.status === 'resolved'
                              ? 'success'
                              : def.status === 'correction_submitted'
                              ? 'primary'
                              : 'warning'
                          }
                        >
                          {def.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {def.createdAt}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {def.status === 'correction_submitted' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleOpenVersionCompare(def)}
                            className="text-xs"
                          >
                            Compare v1 vs v2
                          </Button>
                        )}

                        {def.status === 'open' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/officer/case/${def.applicationId}`)}
                            className="text-xs"
                          >
                            Open Case
                          </Button>
                        )}

                        {def.status !== 'resolved' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => resolveDeficiency(def.applicationId, def.id)}
                            className="text-xs text-emerald-700 hover:text-emerald-800"
                          >
                            Resolve
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Version Comparison (v1 vs v2) */}
      <Modal
        isOpen={!!selectedVersionDiff}
        onClose={() => setSelectedVersionDiff(null)}
        title="Document Version Comparison (v1 vs v2)"
        description={selectedVersionDiff?.def?.documentName}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-slate-500">
              Inspection of candidate's revised digital submission.
            </span>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setSelectedVersionDiff(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (selectedVersionDiff?.def) {
                    resolveDeficiency(
                      selectedVersionDiff.def.applicationId,
                      selectedVersionDiff.def.id,
                      'Correction verified and closed following version diff review.'
                    );
                    setSelectedVersionDiff(null);
                  }
                }}
                icon={<CheckCircle2 className="w-3.5 h-3.5" />}
              >
                Accept &amp; Resolve Deficiency
              </Button>
            </div>
          </div>
        }
      >
        {selectedVersionDiff && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/40 space-y-1">
                <span className="font-bold text-rose-900">Original Upload (v1):</span>
                <p className="text-slate-600 text-[11px]">Blurred 96-DPI image, right margin cut off, unreadable address line.</p>
              </div>

              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/40 space-y-1">
                <span className="font-bold text-emerald-900">Corrected Upload (v2):</span>
                <p className="text-slate-600 text-[11px]">Vector PDF 300-DPI, complete consumer address line &amp; seal verified.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900">AI Diff Improvements Detected:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {selectedVersionDiff.improvementsDetected.map((imp: string, i: number) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-medium">
              Recommendation: {selectedVersionDiff.recommendedAction}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
