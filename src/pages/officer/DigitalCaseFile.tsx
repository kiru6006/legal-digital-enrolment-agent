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
  Building,
  GraduationCap,
  Scale,
  Shield,
  CreditCard,
  UserCheck,
  Check,
  ExternalLink,
  Lock,
  Unlock,
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
    updatePhysicalVerification,
    updateCriminalReview,
    resolveCrossDocValidation,
    runAIReviewForApp,
    forwardStage,
    isAIProcessing,
    currentUser,
  } = useAEMS();
  const navigate = useNavigate();

  const caseId = id || PRIMARY_DEMO_APP_ID;
  const application = getApplication(caseId) || primaryApplication;

  // Tabs state
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'details'
    | 'documents'
    | 'ai_review'
    | 'cross_doc'
    | 'academic_desk'
    | 'criminal_desk'
    | 'physical_desk'
    | 'payment_desk'
    | 'deficiencies'
    | 'history'
    | 'decision'
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

  // Restricted Criminal Scrutiny Unlock State
  const [criminalUnlocked, setCriminalUnlocked] = useState(false);
  const [officerCriminalRemarks, setOfficerCriminalRemarks] = useState(
    application.criminalAntecedents?.reviewerObservations ||
      'No adverse moral turpitude antecedents found. Disclosed case verified as compoundable minor traffic incident.'
  );
  const [criminalSavedMsg, setCriminalSavedMsg] = useState(false);

  // Template autofill helper
  const handleApplyTemplate = (type: 'address_scan' | 'name_disparity' | 'provisional_degree') => {
    if (type === 'address_scan') {
      const doc = application.documents.find((d) => d.category === 'address_proof') || application.documents[0];
      setSelectedDocId(doc.id);
      setDefReason('Residential address proof scan is blurred and authority seal is truncated.');
      setDefObservation(
        'Document image fails 200 DPI minimum clarity. Consumer receipt address line 2 is cut off at the right margin.'
      );
      setDefCorrection('Upload a crisp, high-resolution original PDF or 300 DPI color scan of recent utility proof.');
      setNoticePreview(aiDemoService.draftDeficiencyNotice(doc.name, 'Document image blurred and seal cropped out.', application));
    } else if (type === 'name_disparity') {
      const doc = application.documents.find((d) => d.category === 'degree_certificate') || application.documents[0];
      setSelectedDocId(doc.id);
      setDefReason('Name initial variation between undergraduate degree and Law enrolment application.');
      setDefObservation(
        'Qualifying degree displays "Arjun K." while statutory enrolment form and Aadhaar record "Arjun Kumar".'
      );
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
  };

  const handleSaveCriminalRemarks = () => {
    updateCriminalReview(application.id, officerCriminalRemarks, currentUser.name);
    setCriminalSavedMsg(true);
    setTimeout(() => setCriminalSavedMsg(false), 3000);
  };

  const openDeficiencies = application.deficiencies.filter((d) => d.status === 'open');
  const verifiedDocsCount = application.documents.filter((d) => d.status === 'verified').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue" className="text-xs uppercase tracking-wider">
              Digital Case File • Screen O05
            </Badge>
            <span className="text-xs font-mono text-slate-500 font-bold">{application.refNumber}</span>
            <Badge
              variant={
                application.stage === 'committee_review'
                  ? 'violet'
                  : application.stage === 'correction_requested'
                  ? 'amber'
                  : 'blue'
              }
            >
              {application.statusLabel}
            </Badge>
            <Badge variant={application.priority === 'critical' ? 'red' : 'gray'}>
              Priority: {application.priority.toUpperCase()}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{application.applicantName}</h1>
          <p className="text-xs text-slate-500">
            Assigned Scrutiny Officer: <strong>{application.assignedOfficerName || 'M. Srinivasan'}</strong> &bull; Submitted:{' '}
            {application.submissionDate} &bull; Stream: 3-Year LL.B (TNDALU)
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

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (3 cols): Tabs & Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Specialized Tabs Navigation */}
          <div className="bg-white rounded-xl border border-slate-200 p-1 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'details', label: 'Details', icon: User },
              { id: 'documents', label: `Docs (${application.documents.length})`, icon: Eye },
              { id: 'ai_review', label: 'AI Review', icon: Sparkles, badge: 'AI' },
              { id: 'cross_doc', label: 'Cross-Doc Matrix', icon: Scale },
              { id: 'academic_desk', label: 'College Check', icon: GraduationCap },
              { id: 'criminal_desk', label: 'Criminal Scrutiny', icon: Shield, badge: 'Restricted' },
              { id: 'physical_desk', label: 'Physical Robing', icon: UserCheck },
              { id: 'payment_desk', label: 'Treasury/Fee', icon: CreditCard },
              {
                id: 'deficiencies',
                label: `Defects (${application.deficiencies.length})`,
                icon: AlertCircle,
                badge: openDeficiencies.length > 0 ? `${openDeficiencies.length}` : undefined,
              },
              { id: 'history', label: 'History', icon: History },
              { id: 'decision', label: 'Decision', icon: Gavel },
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
                          : tab.badge === 'Restricted'
                          ? 'bg-rose-100 text-rose-700'
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
                  <CardTitle className="text-sm">Enrolment Application Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-slate-400 font-medium">Candidate Name:</span>
                      <p className="font-bold text-slate-900">{application.applicantName}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Date of Birth / Age:</span>
                      <p className="font-semibold text-slate-900">{application.dob} (27 Years)</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Contact Phone:</span>
                      <p className="font-semibold text-slate-900 font-mono">{application.phone}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Email ID:</span>
                      <p className="font-semibold text-slate-900 truncate">{application.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 font-medium">Residential Jurisdiction:</span>
                      <p className="text-slate-800 mt-0.5">
                        {application.address.doorNo}, {application.address.street}, {application.address.locality},{' '}
                        {application.address.city} - {application.address.pincode}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Qualifying Law Degree:</span>
                      <p className="text-slate-800 font-semibold mt-0.5">
                        {application.education.lawDegree} ({application.education.lawPassingYear})
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        {application.education.lawCollege} &bull; Roll: {application.education.lawRollNumber}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Brief Alert */}
              {application.aiReviewSummary && (
                <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      SIMULATED AI INTAKE SUMMARY &bull; CONFIDENCE: {Math.round(application.aiReviewSummary.overallConfidence * 100)}%
                    </span>
                    <Badge variant="purple" className="text-[10px]">
                      {(application.aiReviewSummary.recommendedAction || 'Scrutiny Recommended').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-purple-950 leading-relaxed">
                    {application.aiReviewSummary.summaryText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">4-Tier Academic Chain Verification</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100 text-xs">
                    {(application.education.historyEntries || []).map((entry) => (
                      <div key={entry.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{entry.level}</span>
                            <Badge variant="gray" className="text-[10px]">
                              {entry.regularOrPrivate}
                            </Badge>
                            <span className="text-slate-400 font-mono text-[10px]">Roll: {entry.rollNumber}</span>
                          </div>
                          <p className="text-slate-600">{entry.institution}</p>
                          <p className="text-slate-400 text-[11px]">{entry.boardOrUniversity}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-blue-700">{entry.percentageOrCgpa}</span>
                          <p className="text-slate-400 text-[11px]">Passed: {entry.passingYear}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Character Certificates */}
              {application.characterCertificates && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Form VI &amp; VII Character Certificates</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Form VI (Senior Advocate)</span>
                        <Badge variant="green" className="text-[10px]">Verified Roll</Badge>
                      </div>
                      <p className="text-slate-900 font-medium">
                        {application.characterCertificates.formVI.advocateName}
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Enrolment: {application.characterCertificates.formVI.enrolmentNumber} &bull; Practice:{' '}
                        {application.characterCertificates.formVI.yearsOfPractice} yrs
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Form VII (Practicing Advocate)</span>
                        <Badge variant="green" className="text-[10px]">Verified Roll</Badge>
                      </div>
                      <p className="text-slate-900 font-medium">
                        {application.characterCertificates.formVII.advocateName}
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Enrolment: {application.characterCertificates.formVII.enrolmentNumber} &bull; Practice:{' '}
                        {application.characterCertificates.formVII.yearsOfPractice} yrs
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {application.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{doc.name}</span>
                        <Badge variant="gray" className="text-[10px]">
                          v{doc.version}
                        </Badge>
                        <Badge
                          variant={
                            doc.status === 'verified'
                              ? 'green'
                              : doc.status === 'correction_required'
                              ? 'red'
                              : 'amber'
                          }
                          className="text-[10px]"
                        >
                          {doc.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-[11px] font-mono">
                        {doc.fileName} &bull; {doc.fileSize} &bull; Uploaded {doc.uploadedAt}
                      </p>
                      {doc.discrepancies && doc.discrepancies.length > 0 && (
                        <p className="text-amber-800 text-[11px] font-medium bg-amber-50 px-2 py-0.5 rounded inline-block">
                          Flag: {doc.discrepancies[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewDoc(doc)}
                        icon={<Eye className="w-3.5 h-3.5" />}
                      >
                        Inspect Scan
                      </Button>
                      {doc.status !== 'verified' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDocId(doc.id);
                            setDefReason(`Defect noticed on ${doc.name}`);
                            setDeficiencyModalOpen(true);
                          }}
                          className="text-amber-700 border-amber-300 hover:bg-amber-50"
                        >
                          Raise Defect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI REVIEW */}
          {activeTab === 'ai_review' && (
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Automated Intake Scrutiny (SIMULATED AI)
                  </CardTitle>
                  <Badge variant="purple" className="text-[10px]">
                    Non-Decisional Assistive Only
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                {application.aiReviewSummary ? (
                  <>
                    <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
                      <p className="font-semibold text-purple-950">Intake Assessment:</p>
                      <p className="text-purple-900 leading-relaxed">
                        {application.aiReviewSummary.summaryText}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800">Document Classification &amp; Extraction Confidence:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {application.documents.map((d) => (
                          <div key={d.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-slate-900">{d.name}</span>
                              <span className="text-purple-700 font-bold font-mono text-[11px]">
                                {Math.round((d.aiConfidence || 0.9) * 100)}%
                              </span>
                            </div>
                            <p className="text-slate-500 text-[11px]">{d.aiClassification || 'Classified Document'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <p>AI Review has not been executed yet for this dossier.</p>
                    <Button variant="ai" size="sm" onClick={handleRunAI} className="mt-3">
                      Run AI Intake Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* TAB 5: CROSS-DOC MATRIX (NEW SPECIALIZED DESK) */}
          {activeTab === 'cross_doc' && (
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-blue-600" />
                    Cross-Document Validation Matrix (Screens A15 &amp; O05)
                  </CardTitle>
                  <Badge variant="blue" className="text-[10px]">
                    Demographic &amp; Credential Cross-Check
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 p-0">
                <div className="divide-y divide-slate-100 text-xs">
                  {(application.crossDocumentValidations || []).map((cdv) => (
                    <div key={cdv.id} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{cdv.field}</span>
                            <Badge
                              variant={
                                cdv.matchStatus === 'MATCHED' || cdv.matchStatus === 'RESOLVED'
                                  ? 'green'
                                  : 'red'
                              }
                              className="text-[10px]"
                            >
                              {cdv.matchStatus}
                            </Badge>
                            <span className="text-purple-700 font-mono text-[10px]">
                              OCR Conf: {Math.round(cdv.ocrConfidence * 100)}%
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono">{cdv.ruleRef}</p>
                        </div>

                        {cdv.matchStatus === 'MISMATCH' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resolveCrossDocValidation(application.id, cdv.id)}
                            className="text-xs text-emerald-700 border-emerald-300 hover:bg-emerald-50 shrink-0"
                          >
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Resolve Discrepancy (Affidavit)
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px]">
                        <div>
                          <span className="text-slate-400 font-medium">Application Form Value:</span>
                          <p className="font-semibold text-slate-800">{cdv.appValue}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 font-medium">Document Source Value ({cdv.docName}):</span>
                          <p className="font-semibold text-slate-800">{cdv.documentValue}</p>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">{cdv.explanation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 6: LAW COLLEGE & UNIVERSITY RECOGNITION (O11) */}
          {activeTab === 'academic_desk' && (
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Law College &amp; University Recognition Desk (Screen O11)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Statutory University Recognition Confirmed
                    </span>
                    <Badge variant="green" className="text-[10px]">BCI Approved Centre</Badge>
                  </div>
                  <p className="text-emerald-950 text-[11px] leading-relaxed">
                    The Tamil Nadu Dr. Ambedkar Law University is recognized under Section 24(1)(c)(iii) of the Advocates Act 1961 and affiliated to the Bar Council of India master directory (Ref: BCI-LE-TN-2002).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-800">Mode of Education Verification</span>
                    <p className="text-slate-600 text-[11px]">
                      Regular, Full-time Classroom Instruction (Distance/Correspondence degrees strictly prohibited under BCI Rule 5).
                    </p>
                    <Badge variant="green" className="text-[10px] mt-1">Regular Compliant</Badge>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-800">Attendance Standard Verification</span>
                    <p className="text-slate-600 text-[11px]">
                      Principal certificate confirms candidate maintained &gt;70% minimum attendance across all 6 semesters.
                    </p>
                    <Badge variant="green" className="text-[10px] mt-1">75.4% Verified</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 7: CRIMINAL ANTECEDENTS (O12 - RESTRICTED) */}
          {activeTab === 'criminal_desk' && (
            <Card className="border-rose-200 bg-white shadow-xs">
              <CardHeader className="pb-3 border-b border-rose-100 bg-rose-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-rose-600" />
                    <div>
                      <CardTitle className="text-sm font-bold text-rose-950">
                        Restricted Criminal Antecedents Scrutiny Desk (Screen O12)
                      </CardTitle>
                      <p className="text-[10px] text-rose-700">
                        CONFIDENTIAL &bull; AUTHORIZED SCRUTINY OFFICER ACCESS ONLY
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCriminalUnlocked(!criminalUnlocked)}
                    className="text-xs text-rose-700 border-rose-300 hover:bg-rose-100"
                  >
                    {criminalUnlocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 mr-1" /> Lock Desk
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 mr-1" /> Unlock Desk
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                {!criminalUnlocked ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <Lock className="w-8 h-8 text-rose-400 mx-auto" />
                    <p className="font-semibold text-slate-800">Restricted Privacy Boundary</p>
                    <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                      Criminal background disclosure contains sensitive personal data. Click &quot;Unlock Desk&quot; above to log authorized scrutiny access.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                      <strong>Statutory Legal Safeguard:</strong> The presence of a pending police complaint or trial FIR must NEVER trigger automated rejection or presumption of guilt. Scrutiny must examine whether allegations involve moral turpitude under Section 24A.
                    </div>

                    {application.criminalAntecedents?.hasPendingCases ? (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-rose-900">Disclosed Pending Trial Case:</span>
                          <Badge variant="amber" className="text-[10px]">Non-Moral Turpitude</Badge>
                        </div>
                        {application.criminalAntecedents.pendingCases?.map((c, i) => (
                          <div key={i} className="text-[11px] space-y-1 text-rose-950">
                            <p><strong>Case Number:</strong> {c.caseNumber} &bull; {c.court}</p>
                            <p><strong>FIR:</strong> {c.firNumber} ({c.policeStation})</p>
                            <p><strong>Sections:</strong> {c.sections}</p>
                            <p><strong>Status:</strong> {c.status}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Candidate self-declaration: No criminal cases, arrests, or convictions on record. CCTNS Police Advisory clean.</span>
                      </div>
                    )}

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <label className="block font-bold text-slate-800">
                        Official Scrutiny Officer Observation (Section 24A Advocates Act 1961):
                      </label>
                      <textarea
                        rows={3}
                        value={officerCriminalRemarks}
                        onChange={(e) => setOfficerCriminalRemarks(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 bg-white"
                        placeholder="Record factual observation regarding moral turpitude or absence thereof for the Enrolment Committee..."
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          Recorded by: {currentUser.name} ({currentUser.designation})
                        </span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleSaveCriminalRemarks}
                          className="bg-rose-700 hover:bg-rose-800"
                        >
                          Save Official Antecedents Review
                        </Button>
                      </div>
                      {criminalSavedMsg && (
                        <p className="text-[11px] text-emerald-700 font-medium">
                          Antecedents review updated and logged to audit trail.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* TAB 8: PHYSICAL ROBING & VERIFICATION DESK (O14) */}
          {activeTab === 'physical_desk' && (
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  Physical Verification &amp; Robing Desk (Screen O14)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Candidate Desk Check-in:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={application.physicalVerification?.attended || false}
                        onChange={(e) =>
                          updatePhysicalVerification(application.id, { attended: e.target.checked })
                        }
                        className="text-blue-600 rounded"
                      />
                      <span className="text-slate-800">Candidate physically present at Desk 3</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={application.physicalVerification?.physicalIdentityVerified || false}
                        onChange={(e) =>
                          updatePhysicalVerification(application.id, {
                            physicalIdentityVerified: e.target.checked,
                          })
                        }
                        className="text-blue-600 rounded"
                      />
                      <span className="text-slate-800">Facial &amp; Aadhaar biometric identity confirmed</span>
                    </label>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Original Certificates &amp; Attire:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={application.physicalVerification?.originalDegreesChecked || false}
                        onChange={(e) =>
                          updatePhysicalVerification(application.id, {
                            originalDegreesChecked: e.target.checked,
                          })
                        }
                        className="text-blue-600 rounded"
                      />
                      <span className="text-slate-800">Original 10th, 12th, B.Com &amp; LL.B inspected</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={application.physicalVerification?.advocateRobingCompliant || false}
                        onChange={(e) =>
                          updatePhysicalVerification(application.id, {
                            advocateRobingCompliant: e.target.checked,
                          })
                        }
                        className="text-blue-600 rounded"
                      />
                      <span className="text-slate-800">Robing dress code compliant (Gown, Bands, Black Coat)</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">Desk Outcome:</span>
                    <p className="text-[11px] text-slate-500">
                      Current: {application.physicalVerification?.outcome || 'Pending'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePhysicalVerification(application.id, {
                          outcome: 'Deficient',
                          remarks: 'Certificate defect noticed during physical inspection.',
                        })
                      }
                      className="text-amber-700 border-amber-300"
                    >
                      Record Physical Defect
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        updatePhysicalVerification(application.id, {
                          attended: true,
                          originalDegreesChecked: true,
                          physicalIdentityVerified: true,
                          advocateRobingCompliant: true,
                          outcome: 'Cleared',
                          verifiedOfficerName: currentUser.name,
                          remarks: 'All original certificates verified in person. Candidate robed properly.',
                        })
                      }
                      className="bg-emerald-700 hover:bg-emerald-800"
                    >
                      Pass Physical Verification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 9: PAYMENT & TREASURY RECONCILIATION (O15) */}
          {activeTab === 'payment_desk' && (
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Payment &amp; Treasury Reconciliation Desk (Screen O15)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-950">SBI Treasury Reconciliation: COMPLETE</span>
                      <Badge variant="green" className="text-[10px]">Reconciled</Badge>
                    </div>
                    <p className="text-emerald-800 text-[11px] mt-0.5">
                      Challan #SBI-CHL-2026-99412 &bull; Amount: ₹18,500 &bull; Transacted: 01 Nov 2026 09:45 AM
                    </p>
                  </div>
                  <span className="text-sm font-bold text-emerald-800 font-mono">₹18,500.00</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-slate-400 font-medium">BCTNP Enrolment Fee</span>
                    <p className="font-bold text-slate-900 mt-0.5">₹10,500</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-slate-400 font-medium">Advocate Welfare Fund</span>
                    <p className="font-bold text-slate-900 mt-0.5">₹5,000</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-slate-400 font-medium">Library &amp; Identity Card</span>
                    <p className="font-bold text-slate-900 mt-0.5">₹3,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 10: DEFICIENCIES */}
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
                              ? 'green'
                              : def.status === 'correction_submitted'
                              ? 'blue'
                              : 'amber'
                          }
                        >
                          {def.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>
                        <strong>Observation:</strong> {def.officialObservation}
                      </p>
                      <p>
                        <strong>Correction:</strong> {def.requiredCorrection}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-2 pb-3 px-6 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono">Issued on {def.createdAt}</span>
                      {def.status !== 'resolved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => resolveDeficiency(application.id, def.id)}
                          className="text-xs text-emerald-700 border-emerald-300"
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* TAB 11: HISTORY */}
          {activeTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Append-Only Audit Trail</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                {application.timeline.map((evt) => (
                  <div key={evt.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{evt.title}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{evt.timestamp}</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{evt.description}</p>
                      <p className="text-slate-400 text-[10px]">
                        Actor: {evt.actor} ({evt.role})
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* TAB 12: DECISION */}
          {activeTab === 'decision' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Enrolment Committee Decision Record</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {application.committeeDecision ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-950 uppercase">
                        Outcome: {application.committeeDecision.decision}
                      </span>
                      <span className="font-mono text-emerald-700 text-[11px]">
                        {application.committeeDecision.meetingRef}
                      </span>
                    </div>
                    <p className="text-emerald-900">{application.committeeDecision.observation}</p>
                    {application.committeeDecision.legalBasis && (
                      <p className="text-[11px] text-emerald-800 font-mono">
                        Statutory Basis: {application.committeeDecision.legalBasis}
                      </p>
                    )}
                    <p className="text-[10px] text-emerald-700">
                      Signed: {application.committeeDecision.memberName} on {application.committeeDecision.date}
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <p>No formal committee decision has been recorded yet.</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/committee/review/${application.id}`)}
                      className="mt-3"
                    >
                      Open in Committee Chamber
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Workflow Action Panel */}
        <div className="space-y-4">
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Workflow Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <Button
                variant="primary"
                size="md"
                onClick={() => forwardStage(application.id, 'committee_review', 'Ready for Committee Review')}
                className="w-full justify-center bg-blue-600 hover:bg-blue-700"
              >
                Forward to Committee Chamber
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => setDeficiencyModalOpen(true)}
                className="w-full justify-center text-amber-700 border-amber-300 hover:bg-amber-50"
              >
                <AlertCircle className="w-4 h-4 mr-1.5" />
                Raise Deficiency Notice
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/officer/work-buckets')}
                className="w-full justify-center"
              >
                Return to Work Buckets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal: Raise Deficiency */}
      <Modal
        isOpen={deficiencyModalOpen}
        onClose={() => setDeficiencyModalOpen(false)}
        title="Raise Statutory Deficiency Notice"
      >
        <div className="space-y-4 text-xs">
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
            />
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

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setDeficiencyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleSendDeficiency}>
              Issue Statutory Notice
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Document Inspection */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={`Document Inspection: ${previewDoc?.name}`}
      >
        {previewDoc && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-center py-8 space-y-2">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-800">{previewDoc.name}</p>
              <p className="text-slate-500 text-[11px]">
                {previewDoc.fileName} &bull; {previewDoc.fileSize}
              </p>
              <Badge variant={previewDoc.status === 'verified' ? 'green' : 'amber'}>
                {previewDoc.status.replace('_', ' ').toUpperCase()}
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
