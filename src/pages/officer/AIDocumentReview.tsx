import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RotateCw,
  Eye,
  Check,
  Edit2,
  Flag,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { aiDemoService } from '../../services/aiDemoService';
import { Modal } from '../../components/common/Modal';

export const AIDocumentReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getApplication, primaryApplication, runAIReviewForApp, isAIProcessing } = useAEMS();
  const navigate = useNavigate();

  const caseId = id || PRIMARY_DEMO_APP_ID;
  const application = getApplication(caseId) || primaryApplication;

  const [acceptedDocs, setAcceptedDocs] = useState<string[]>([]);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);
  const [editedFields, setEditedFields] = useState<Record<string, string>>({});
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);

  const handleRunScan = async () => {
    await runAIReviewForApp(application.id);
  };

  const handleAcceptExtraction = (docId: string) => {
    setAcceptedDocs((prev) => (prev.includes(docId) ? prev : [...prev, docId]));
  };

  const handleSaveEdit = () => {
    if (editingDoc) {
      editingDoc.extractedFields = { ...editingDoc.extractedFields, ...editedFields };
      setEditingDoc(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Document Review Workspace</span>
            </span>
            <span className="text-xs font-mono text-slate-400">Ref: {application.refNumber}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Intake Extraction &amp; OCR Analysis: {application.applicantName}
          </h1>
          <p className="text-xs text-slate-500">
            Simulated OCR recognition, statutory checklist match, and automated inconsistency detection.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/officer/case/${application.id}`)}
          >
            &larr; Back to Case File
          </Button>

          <Button
            variant="ai"
            size="sm"
            isLoading={isAIProcessing}
            onClick={handleRunScan}
            icon={<RotateCw className="w-4 h-4" />}
          >
            {isAIProcessing ? 'Analyzing Documents...' : 'Run AI Document Review'}
          </Button>
        </div>
      </div>

      {/* AI Safeguard Banner */}
      <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 flex items-start gap-3.5 text-xs text-purple-950">
        <ShieldAlert className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Assistive Scrutiny Mode (Simulated AI Engine):</span>
          <p className="mt-0.5 text-purple-900/80 leading-relaxed">
            All OCR confidence scores and field extractions are assistive suggestions designed to accelerate officer scrutiny. Official verification must be accepted or amended by an authorized Enrolment Officer before submission to the Committee.
          </p>
        </div>
      </div>

      {/* Structured Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {application.documents.map((doc) => {
          const isAccepted = acceptedDocs.includes(doc.id);
          const hasFlags = doc.discrepancies && doc.discrepancies.length > 0;

          return (
            <Card
              key={doc.id}
              className={`flex flex-col justify-between transition-all ${
                hasFlags ? 'border-amber-300 bg-amber-50/10' : ''
              }`}
            >
              <div>
                <CardHeader>
                  <div className="space-y-0.5 max-w-[210px]">
                    <CardTitle className="text-sm font-bold truncate">{doc.name}</CardTitle>
                    <p className="text-[11px] text-slate-400 font-mono">v{doc.version} &bull; {doc.fileSize}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] bg-purple-100 text-purple-800 font-mono font-bold px-1.5 py-0.5 rounded border border-purple-200">
                      SIMULATED AI
                    </span>
                    <Badge
                      size="sm"
                      variant={
                        doc.aiConfidence && doc.aiConfidence >= 0.8
                          ? 'violet'
                          : 'warning'
                      }
                    >
                      Confidence: {doc.aiConfidence ? `${Math.round(doc.aiConfidence * 100)}%` : '92%'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-xs">
                  {/* Category */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Detected Classification
                    </span>
                    <p className="font-semibold text-slate-800">
                      {doc.aiClassification || doc.name}
                    </p>
                  </div>

                  {/* Extracted Fields */}
                  {doc.extractedFields && Object.keys(doc.extractedFields).length > 0 && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1 font-mono text-[11px]">
                      {Object.entries(doc.extractedFields).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-slate-500 truncate max-w-[110px]">{k}:</span>
                          <span className="font-semibold text-slate-800 truncate max-w-[140px] text-right">
                            {String(v)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Discrepancy Warnings */}
                  {hasFlags && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Potential Disparity Detected:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{doc.discrepancies![0]}</p>
                    </div>
                  )}

                  {/* Validation Notes */}
                  {doc.validationNotes && doc.validationNotes.length > 0 && (
                    <p className="text-[11px] text-slate-500 italic">
                      &bull; {doc.validationNotes[0]}
                    </p>
                  )}
                </CardContent>
              </div>

              <CardFooter className="flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewDoc(doc)}
                  icon={<Eye className="w-3 h-3" />}
                  className="text-xs"
                >
                  View
                </Button>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingDoc(doc);
                      setEditedFields(doc.extractedFields || {});
                    }}
                    icon={<Edit2 className="w-3 h-3 text-slate-500" />}
                    className="text-xs"
                    title="Edit extracted values"
                  >
                    Edit
                  </Button>

                  <Button
                    variant={isAccepted ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleAcceptExtraction(doc.id)}
                    icon={<Check className="w-3 h-3" />}
                    className="text-xs"
                  >
                    {isAccepted ? 'Accepted' : 'Accept'}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Modal: Edit Extracted Information */}
      <Modal
        isOpen={!!editingDoc}
        onClose={() => setEditingDoc(null)}
        title={`Edit Extracted Values: ${editingDoc?.name}`}
        description="Amend OCR recognition fields to match verified physical document."
        maxWidth="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditingDoc(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Amendments
            </Button>
          </div>
        }
      >
        {editingDoc && editingDoc.extractedFields && (
          <div className="space-y-3 text-xs">
            {Object.entries(editingDoc.extractedFields).map(([key, val]) => (
              <div key={key}>
                <label className="block font-semibold text-slate-700 mb-1">{key}:</label>
                <input
                  type="text"
                  value={editedFields[key] ?? String(val)}
                  onChange={(e) =>
                    setEditedFields((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Modal: Document Preview */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.name || 'Document'}
        description={`File: ${previewDoc?.fileName}`}
        maxWidth="md"
        footer={
          <Button variant="secondary" onClick={() => setPreviewDoc(null)}>
            Close
          </Button>
        }
      >
        {previewDoc && (
          <div className="p-8 bg-slate-100 rounded-xl text-center space-y-2 text-xs">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-900">{previewDoc.name}</p>
            <p className="text-slate-500 font-mono text-[11px]">{previewDoc.fileName}</p>
            <Badge variant="violet" size="sm">
              Status: {previewDoc.status}
            </Badge>
          </div>
        )}
      </Modal>
    </div>
  );
};

