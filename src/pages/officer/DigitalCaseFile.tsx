import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  User,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  History,
  Gavel,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Plus,
  Send,
  Download,
  AlertTriangle,
  RotateCw,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { ApplicationStage, VerificationStatus } from '../../types/application';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { exportApplicationsToCSV } from '../../utils/exportCsv';
import { aiDemoService } from '../../services/aiDemoService';

export const DigitalCaseFile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    getApplication,
    primaryApplication,
    raiseDeficiency,
    resolveDeficiency,
    updateVerificationItem,
    runAIReviewForApp,
    forwardStage,
    isAIProcessing,
  } = useAEMS();
  const navigate = useNavigate();

  const caseId = id || PRIMARY_DEMO_APP_ID;
  const application = getApplication(caseId) || primaryApplication;

  // Tabs state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'details' | 'documents' | 'ai_review' | 'verification' | 'deficiencies' | 'history' | 'decision'
  >('overview');

  // Modal: Raise Deficiency
  const [deficiencyModalOpen, setDeficiencyModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(application.documents[0]?.id || '');
  const [defReason, setDefReason] = useState('');
  const [defObservation, setDefObservation] = useState('');
  const [defCorrection, setDefCorrection] = useState('');
  const [noticePreview, setNoticePreview] = useState('');

  // Modal: Document Preview
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);

  // Template autofill helper
  const handleApplyTemplate = (type: 'address_scan' | 'name_disparity' | 'provisional_degree') => {
    if (type === 'address_scan') {
      const doc = application.documents.find((d) => d.category === 'address_proof') || application.documents[0];
      setSelectedDocId(doc.id);
      setDefReason('Residential address proof scan is blurred and authority seal is truncated.');
      setDefObservation('Document image fails 200 DPI minimum clarity. Consumer receipt address line 2 is cut off at the right margin.');
      setDefCorrection('Upload a crisp, high-resolution original PDF or 300 DPI color scan of recent utility proof.');
      setNoticePreview(aiDemoService.draftDeficiencyNotice(doc.name, 'Document image blurred and seal cropped out.', application));
    } else if (type === 'name_disparity') {
      const doc = application.documents.find((d) => d.category === 'degree_certificate') || application.documents[0];
      setSelectedDocId(doc.id);
      setDefReason('Name initial variation between undergraduate degree and Law enrolment application.');
      setDefObservation('Qualifying degree displays "Arjun K." while statutory enrolment form and Aadhaar record "Arjun Kumar".');
      setDefCorrection('Furnish a sworn affirmation / one-and-the-same identity affidavit executed before a Notary Public.');
      setNoticePreview(aiDemoService.draftDeficiencyNotice(doc.name, 'Candidate name initial discrepancy detected.', application));
    } else {
      const doc = application.documents.find((d) => d.category === 'law_degree_certificate') || application.documents[0];
      setSelectedDocId(doc.id);
      setDefReason('Convocation permanent degree certificate required in place of provisional certificate.');
      setDefObservation('Applicant uploaded provisional certificate. University convocation has concluded.');
      setDefCorrection('Upload original convocation degree certificate issued under the seal of the Chancellor.');
      setNoticePreview(aiDemoService.draftDeficiencyNotice(doc.name, 'Permanent convocation certificate required.', application));
    }
  };

  const handleSendDeficiency = () => {
    const doc = application.documents.find((d) => d.id === selectedDocId);
    if (!doc || !defReason) return;

    raiseDeficiency(
      application.id,
      doc.id,
      doc.name,
      defReason,
      defObservation || defReason,
      defCorrection || 'Upload rectified document.'
    );

    setDeficiencyModalOpen(false);
    setDefReason('');
    setDefObservation('');
    setDefCorrection('');
    setNoticePreview('');
  };

  const handleRunAI = async () => {
    await runAIReviewForApp(application.id);
    setActiveTab('ai_review');
  };

  const openDeficiencies = application.deficiencies.filter((d) => d.status === 'open');
  const verifiedDocsCount = application.documents.filter((d) => d.status === 'verified').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Case Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {application.refNumber}
            </span>
            <Badge
              variant={
                application.stage === 'completed'
                  ? 'success'
                  : application.stage === 'correction_requested'
                  ? 'warning'
                  : 'primary'
              }
            >
              {application.statusLabel}
            </Badge>
            <span className="text-xs text-slate-400">
              Assigned: <strong>{application.assignedOfficerName}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>{application.applicantName}</span>
            <span className="text-sm font-normal text-slate-400">
              ({application.education.lawDegree})
            </span>
          </h1>
          <p className="text-xs text-slate-500">
            {application.education.lawCollege} &bull; Roll: {application.education.lawRollNumber} &bull; Submitted: {application.submissionDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportApplicationsToCSV([application])}
            icon={<Download className="w-4 h-4 text-slate-600" />}
          >
            Export Dossier
          </Button>

          <Button
            variant="ai"
            size="sm"
            isLoading={isAIProcessing}
            onClick={handleRunAI}
            icon={<Sparkles className="w-4 h-4" />}
          >
            {application.aiReviewSummary ? 'Re-Run AI Review' : 'Run AI Document Review'}
          </Button>
        </div>
      </div>

      {/* Main Two-Column Layout: Left (Tabs), Right (Action Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (3 cols): Tabs & Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl border border-slate-200 p-1 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'details', label: 'Applicant Details', icon: User },
              { id: 'documents', label: `Documents (${application.documents.length})`, icon: Eye },
              { id: 'ai_review', label: 'AI Review', icon: Sparkles, badge: 'AI' },
              { id: 'verification', label: 'Verification', icon: ShieldCheck },
              {
                id: 'deficiencies',
                label: `Deficiencies (${application.deficiencies.length})`,
                icon: AlertCircle,
                badge: openDeficiencies.length > 0 ? `${openDeficiencies.length} Open` : undefined,
              },
              { id: 'history', label: 'Activity History', icon: History },
              { id: 'decision', label: 'Decision Record', icon: Gavel },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-blue-800 text-white'
                          : tab.badge === 'AI'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Document Completeness
                    </span>
                    <p className="text-xl font-bold text-slate-900">
                      {verifiedDocsCount} / {application.documents.length} Verified
                    </p>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-emerald-600 h-1.5 rounded-full"
                        style={{
                          width: `${(verifiedDocsCount / (application.documents.length || 1)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Deficiency Status
                    </span>
                    <p className="text-xl font-bold text-amber-700">
                      {openDeficiencies.length} Open Defect{openDeficiencies.length === 1 ? '' : 's'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {application.deficiencies.length - openDeficiencies.length} resolved to date
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Statutory Clearance
                    </span>
                    <p className="text-xl font-bold text-blue-700">
                      {application.progressPercentage}% Complete
                    </p>
                    <p className="text-[11px] text-slate-400">Stage: {application.stage.replace('_', ' ')}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Case Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Application Summary &amp; Scrutiny Synopsis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-slate-500">Applicant Full Name:</p>
                      <p className="font-semibold text-slate-900">{application.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Qualifying Degree:</p>
                      <p className="font-semibold text-slate-900">
                        {application.education.qualifyingDegree} ({application.education.qualifyingPassingYear})
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Law Qualification:</p>
                      <p className="font-semibold text-slate-900">
                        {application.education.lawDegree} &bull; {application.education.lawUniversity}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Bar Rule 49 Declaration:</p>
                      <p className="font-semibold text-emerald-700">Confirmed (Not in commercial employment)</p>
                    </div>
                  </div>

                  {application.aiReviewSummary && (
                    <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-purple-950 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>AI Scrutiny Synopsis ({Math.round(application.aiReviewSummary.overallConfidence * 100)}% Confidence)</span>
                      </div>
                      <p className="text-purple-900 text-xs leading-relaxed">
                        {application.aiReviewSummary.summaryText}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: APPLICANT DETAILS */}
          {activeTab === 'details' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Complete Candidate Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 border-b pb-1">Demographics &amp; Contact</h4>
                    <p><strong>Name:</strong> {application.applicantName}</p>
                    <p><strong>Gender:</strong> {application.gender}</p>
                    <p><strong>DOB:</strong> {application.dob}</p>
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Phone:</strong> {application.phone}</p>
                    <p><strong>Aadhaar:</strong> {application.aadhaarMasked}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 border-b pb-1">Residential Address</h4>
                    <p><strong>Door No:</strong> {application.address.doorNo}</p>
                    <p><strong>Street:</strong> {application.address.street}</p>
                    <p><strong>City / Dist:</strong> {application.address.city}, {application.address.district}</p>
                    <p><strong>Pincode:</strong> {application.address.pincode}</p>
                    <p><strong>State:</strong> {application.address.state}</p>
                  </div>
                </div>

                <div className="pt-2 border-t space-y-2">
                  <h4 className="font-bold text-slate-900 border-b pb-1">Academic Credentials</h4>
                  <p><strong>Law Degree:</strong> {application.education.lawDegree}</p>
                  <p><strong>Law College:</strong> {application.education.lawCollege}</p>
                  <p><strong>University:</strong> {application.education.lawUniversity}</p>
                  <p><strong>Passing Year:</strong> {application.education.lawPassingYear}</p>
                  <p><strong>University Roll No:</strong> {application.education.lawRollNumber}</p>
                  <p><strong>Qualifying Degree:</strong> {application.education.qualifyingDegree} ({application.education.qualifyingUniversity})</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === 'documents' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-sm">Document Repository ({application.documents.length} Files)</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeficiencyModalOpen(true)}
                    icon={<AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                  >
                    Raise Deficiency on Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100 p-0 text-xs">
                {application.documents.map((doc) => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="space-y-1 max-w-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{doc.name}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          v{doc.version}
                        </span>
                        {doc.aiConfidence && (
                          <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-semibold">
                            AI: {Math.round(doc.aiConfidence * 100)}%
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{doc.fileName} &bull; {doc.fileSize}</p>
                      {doc.discrepancies && doc.discrepancies.length > 0 && (
                        <p className="text-[11px] text-rose-600 font-medium">Flag: {doc.discrepancies[0]}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        size="sm"
                        variant={
                          doc.status === 'verified'
                            ? 'success'
                            : doc.status === 'correction_required'
                            ? 'danger'
                            : doc.status === 'correction_submitted'
                            ? 'primary'
                            : 'warning'
                        }
                      >
                        {doc.status.replace('_', ' ')}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewDoc(doc)}
                        icon={<Eye className="w-3.5 h-3.5" />}
                      >
                        Inspect
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* TAB 4: AI REVIEW */}
          {activeTab === 'ai_review' && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-600 text-white shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-purple-950">
                      Simulated Legal Document Intake &amp; Classification Engine
                    </h3>
                    <p className="text-xs text-purple-900/80 mt-0.5 leading-relaxed">
                      AI classifies documents, extracts roll numbers and university names via OCR, and flags variations against the statutory checklist.
                    </p>
                  </div>
                </div>
                <Button
                  variant="ai"
                  size="sm"
                  isLoading={isAIProcessing}
                  onClick={handleRunAI}
                  icon={<RotateCw className="w-3.5 h-3.5" />}
                  className="shrink-0"
                >
                  Run Scrutiny Scan
                </Button>
              </div>

              {/* Cross Document Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Cross-Document Field Consistency Matrix</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Field Attribute</th>
                          <th className="py-2.5 px-4">Application Form Entry</th>
                          <th className="py-2.5 px-4">Extracted Credential Value</th>
                          <th className="py-2.5 px-4">Match Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {aiDemoService.crossDocumentComparison(application).map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-semibold text-slate-900">{item.attribute}</td>
                            <td className="py-2.5 px-4 text-slate-700">{item.formValue}</td>
                            <td className="py-2.5 px-4 text-slate-700 font-mono text-[11px]">{item.documentValue}</td>
                            <td className="py-2.5 px-4">
                              <Badge
                                size="sm"
                                variant={
                                  item.status === 'exact_match'
                                    ? 'success'
                                    : item.status === 'fuzzy_match'
                                    ? 'warning'
                                    : 'danger'
                                }
                              >
                                {item.status.replace('_', ' ')}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 5: VERIFICATION CHECKLIST */}
          {activeTab === 'verification' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Statutory Verification Checklist</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100 p-0 text-xs">
                {application.verificationItems.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">[{item.category}]</span>
                      </div>
                      {item.remarks && (
                        <p className="text-[11px] text-slate-600">{item.remarks}</p>
                      )}
                      {item.verifiedBy && (
                        <p className="text-[10px] text-slate-400">
                          Verified by {item.verifiedBy} on {item.verifiedAt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateVerificationItem(
                            application.id,
                            item.id,
                            e.target.value as VerificationStatus
                          )
                        }
                        className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                      >
                        <option value="pending">Pending</option>
                        <option value="verified">Verified (Compliant)</option>
                        <option value="requires_clarification">Requires Clarification</option>
                        <option value="not_applicable">Not Applicable</option>
                      </select>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* TAB 6: DEFICIENCIES */}
          {activeTab === 'deficiencies' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Deficiency Notices Issued ({application.deficiencies.length})
                </h3>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setDeficiencyModalOpen(true)}
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Raise New Deficiency
                </Button>
              </div>

              {application.deficiencies.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                  No active deficiencies on this application file.
                </div>
              ) : (
                application.deficiencies.map((def) => (
                  <Card key={def.id} className="text-xs">
                    <CardHeader>
                      <div className="flex items-center justify-between w-full">
                        <div className="space-y-0.5">
                          <CardTitle className="text-sm">{def.documentName}</CardTitle>
                          <p className="text-[11px] text-slate-500">{def.reason}</p>
                        </div>
                        <Badge
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
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Observation:</strong> {def.officialObservation}</p>
                      <p><strong>Correction:</strong> {def.requiredCorrection}</p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-[11px] text-slate-400 font-mono">Issued: {def.createdAt}</span>
                      {def.status !== 'resolved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => resolveDeficiency(application.id, def.id)}
                          icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        >
                          Mark Deficiency Resolved
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* TAB 7: HISTORY */}
          {activeTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Chronological Audit Log</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 py-2">
                  {application.timeline.map((event) => (
                    <div key={event.id} className="relative pl-6">
                      <div
                        className={`absolute -left-2 top-0.5 w-4 h-4 rounded-full border-2 border-white ${
                          event.badgeColor === 'green'
                            ? 'bg-emerald-600'
                            : event.badgeColor === 'amber'
                            ? 'bg-amber-500'
                            : event.badgeColor === 'violet'
                            ? 'bg-purple-600'
                            : 'bg-blue-600'
                        }`}
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{event.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{event.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{event.description}</p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Actor: {event.actor} ({event.role})
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 8: DECISION RECORD */}
          {activeTab === 'decision' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Enrolment Committee Statutory Decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                {application.committeeDecision ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-emerald-950">
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider text-xs">
                        Decision: {application.committeeDecision.decision.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs">{application.committeeDecision.meetingRef}</span>
                    </div>
                    <p className="leading-relaxed">{application.committeeDecision.observation}</p>
                    <div className="pt-2 border-t border-emerald-200 flex justify-between text-[11px] text-emerald-800">
                      <span>Recorded by: {application.committeeDecision.memberName}</span>
                      <span>Date: {application.committeeDecision.date}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <Gavel className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="font-semibold text-slate-800">No Committee Decision Recorded Yet</p>
                    <p>Case is progressing through scrutiny and verification before committee submission.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column (1 col): Action Panel */}
        <div className="space-y-4">
          <Card className="border-blue-200 bg-blue-50/20">
            <CardHeader className="border-blue-100">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Official Action Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => forwardStage(application.id, 'verification', 'Verification in Progress')}
                  className="w-full justify-start gap-2"
                  icon={<ShieldCheck className="w-4 h-4" />}
                >
                  Forward to Verification
                </Button>
                <span className="text-[10px] text-slate-500 block px-1 mt-0.5">
                  Consequence: Moves file to Education/Identity queue.
                </span>
              </div>

              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => forwardStage(application.id, 'committee_prep', 'Ready for Committee')}
                  className="w-full justify-start gap-2 text-slate-800"
                  icon={<Gavel className="w-4 h-4 text-indigo-600" />}
                >
                  Forward to Committee Prep
                </Button>
                <span className="text-[10px] text-slate-500 block px-1 mt-0.5">
                  Consequence: Adds case to Committee Sitting Agenda.
                </span>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeficiencyModalOpen(true)}
                  className="w-full justify-start gap-2 text-amber-800 border-amber-200 hover:bg-amber-50"
                  icon={<AlertCircle className="w-4 h-4 text-amber-600" />}
                >
                  Issue Deficiency Notice
                </Button>
                <span className="text-[10px] text-slate-500 block px-1 mt-0.5">
                  Consequence: Applicant will be notified via SMS/Email.
                </span>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/officer/time-savings')}
                  className="w-full justify-start gap-2 text-purple-800 border-purple-200 hover:bg-purple-50"
                  icon={<Clock className="w-4 h-4 text-purple-600" />}
                >
                  View AI Work Reduction
                </Button>
              </div>

              {/* Disabled Reject / Withdraw action per BRD Section 16.7 */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  disabled
                  title="Per BRD Section 16.7: Reject / Withdraw paths are unapproved and disabled in prototype"
                  className="w-full py-2 px-3 rounded-lg border text-xs font-semibold bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed text-center"
                >
                  Reject / Withdraw Application
                  <span className="block text-[9px] text-rose-500 font-bold">
                    [Disabled: Pending Bar Council Approval]
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info Box */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-slate-700">Audit Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Ref Number:</span>
                <span className="font-mono font-bold text-slate-800">{application.refNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Officer:</span>
                <span className="font-medium text-slate-800">{application.assignedOfficerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="font-mono text-slate-500">{application.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal: Raise Deficiency */}
      <Modal
        isOpen={deficiencyModalOpen}
        onClose={() => setDeficiencyModalOpen(false)}
        title="Raise Scrutiny Deficiency Notice"
        description="Select a document, observation, and issue statutory notice directly to applicant."
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-slate-500">Notice is dispatched instantly to applicant.</span>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setDeficiencyModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleSendDeficiency}
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Issue Statutory Notice
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          {/* Preset Buttons */}
          <div>
            <span className="font-semibold text-slate-700 block mb-1.5">Standard Defect Presets:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplyTemplate('address_scan')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
              >
                Address Scan Blurred
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('name_disparity')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
              >
                Degree Name Variation
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('provisional_degree')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
              >
                Convocation Degree Required
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Document:</label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
              {application.documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} (v{d.version})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reason for Deficiency:</label>
            <input
              type="text"
              placeholder="e.g. Unclear scan / name variation"
              value={defReason}
              onChange={(e) => setDefReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
            </input>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Official Scrutiny Observation:</label>
            <textarea
              rows={2}
              value={defObservation}
              onChange={(e) => setDefObservation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Required Rectification Instructions:</label>
            <textarea
              rows={2}
              value={defCorrection}
              onChange={(e) => setDefCorrection(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>
      </Modal>

      {/* Modal: Document Inspection */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={`Document Inspection: ${previewDoc?.name}`}
        description={`File: ${previewDoc?.fileName} &bull; v${previewDoc?.version}`}
        maxWidth="lg"
        footer={
          <Button variant="secondary" onClick={() => setPreviewDoc(null)}>
            Close Inspection
          </Button>
        }
      >
        {previewDoc && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-center py-10 space-y-2">
              <FileText className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-800">{previewDoc.name}</p>
              <p className="text-slate-500 text-[11px]">
                {previewDoc.fileName} &bull; {previewDoc.fileSize}
              </p>
              <Badge variant={previewDoc.status === 'verified' ? 'success' : 'warning'}>
                {previewDoc.status.replace('_', ' ')}
              </Badge>
            </div>

            {previewDoc.extractedFields && (
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 block">AI OCR Extracted Fields:</span>
                <div className="space-y-1 font-mono text-[11px] text-slate-700">
                  {Object.entries(previewDoc.extractedFields).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-50 py-1">
                      <span className="text-slate-500">{k}:</span>
                      <span className="font-semibold text-slate-900">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
