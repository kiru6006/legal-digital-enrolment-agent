import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Gavel,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Send,
  User,
  Scale,
  Calendar,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';

export const CommitteeCaseReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getApplication, primaryApplication, recordCommitteeDecision, currentUser } = useAEMS();
  const navigate = useNavigate();

  const caseId = id || PRIMARY_DEMO_APP_ID;
  const application = getApplication(caseId) || primaryApplication;

  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionType, setDecisionType] = useState<
    'approved' | 'deferred' | 'rejected' | 'clarification_required'
  >('approved');
  const [decisionObservation, setDecisionObservation] = useState(
    'Candidate satisfies all statutory prerequisites under Section 24 of the Advocates Act, 1961. Degree verified by statutory Law University. Fit for admission on the roll of Advocates.'
  );
  const [meetingRef, setMeetingRef] = useState('EC-MINUTES-2026/19');
  const [legalBasis, setLegalBasis] = useState(
    'Advocates Act 1961 Section 24(1)(a)-(e) read with Bar Council of India Rules Part IV'
  );
  const [conditions, setConditions] = useState(
    'Subject to production and surrender of original notary identity affidavit at ceremonial verification counter.'
  );
  const [followUpOwner, setFollowUpOwner] = useState('Enrolment Scrutiny Desk 3');

  // Precedents Accordion
  const [precedentsOpen, setPrecedentsOpen] = useState(true);
  const [selectedPrecedent, setSelectedPrecedent] = useState<string | null>(null);

  const precedentCases = [
    {
      id: 'prec-1',
      title: 'BCTNP Resolution 14/2021: Name Initial Expansion Disparity in Bachelor Degrees',
      summary:
        'Where an applicant’s qualifying degree contains initials (e.g. "Arjun K") while the law degree records full expanded name ("Arjun Kumar"), a notarized one-and-the-same person affidavit accompanied by secondary school certificate shall be accepted as conclusive proof of identity without requiring Gazette notification.',
      applicability: 'Directly applicable to current candidate (B.Com Madras Univ name variation).',
    },
    {
      id: 'prec-2',
      title: 'Advocates Act Section 24(1)(c) Precedent: Regular Classroom Study Verification',
      summary:
        'Mandatory requirement of 70% attendance in physical lectures for 3-Year LL.B. Distance, correspondence, or online-only legal degrees are non-cognizable under Bar Council of India Education Rules 2008.',
      applicability: 'Candidate TNDALU regular attendance certificate (75.4%) complies.',
    },
    {
      id: 'prec-3',
      title: 'Twinkle Rahul Mangaonkar (Hon’ble Supreme Court 2021): Bar Rule 49 Employment Prohibition',
      summary:
        'Candidates who were previously engaged in commercial service or internship must provide unconditional relieving order prior to enrolment date.',
      applicability: 'Relieving letter from chamber practice verified on record.',
    },
  ];

  const handleRecordDecision = () => {
    recordCommitteeDecision(
      application.id,
      decisionType,
      decisionObservation,
      meetingRef,
      legalBasis,
      conditions,
      followUpOwner
    );
    setDecisionModalOpen(false);
    navigate('/committee/dashboard');
  };

  const handleApplyPrecedent = (prec: typeof precedentCases[0]) => {
    setSelectedPrecedent(prec.id);
    setDecisionObservation(
      (prev) => `${prev}\n\n[Applied Precedent: ${prec.title}] - ${prec.summary}`
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Screens C03-C05 • Statutory Committee Chamber
            </span>
            <span className="text-xs font-mono text-slate-400">Ref: {application.refNumber}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Committee Review: {application.applicantName}
          </h1>
          <p className="text-xs text-slate-500">
            Sitting Date: <strong>20 November 2026</strong> &bull; Member: {currentUser.name} ({currentUser.designation})
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/committee/dashboard')}
          >
            &larr; Back to Committee Chamber
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setDecisionModalOpen(true)}
            icon={<Gavel className="w-4 h-4" />}
            className="bg-indigo-700 hover:bg-indigo-800"
          >
            Record Statutory Decision
          </Button>
        </div>
      </div>

      {/* Decision Status Banner (If already decided) */}
      {application.committeeDecision && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wide">
                Recorded Statutory Outcome: {application.committeeDecision.decision.toUpperCase()}
              </span>
              <span className="text-emerald-700 font-mono text-[11px]">
                {application.committeeDecision.meetingRef}
              </span>
            </div>
            <p className="text-xs leading-relaxed">{application.committeeDecision.observation}</p>
            {application.committeeDecision.legalBasis && (
              <p className="text-[11px] text-emerald-800 font-mono">
                Statutory Basis: {application.committeeDecision.legalBasis}
              </p>
            )}
            {application.committeeDecision.conditions && (
              <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                <strong>Conditions:</strong> {application.committeeDecision.conditions} (Follow-up:{' '}
                {application.committeeDecision.followUpOwner})
              </p>
            )}
            <p className="text-[11px] text-emerald-800 font-mono">
              Signed by {application.committeeDecision.memberName} on {application.committeeDecision.date}
            </p>
          </div>
        </div>
      )}

      {/* Precedents Retrieval & Assistance (Screen C04) */}
      <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/30 to-white">
        <CardHeader className="pb-3 border-b border-indigo-100 flex flex-row items-center justify-between cursor-pointer" onClick={() => setPrecedentsOpen(!precedentsOpen)}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-700" />
            <CardTitle className="text-sm font-bold text-indigo-950">
              Prior Directions &amp; Statutory Precedents Retrieval (Screen C04)
            </CardTitle>
          </div>
          <button type="button" className="text-slate-400 hover:text-slate-600">
            {precedentsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </CardHeader>
        {precedentsOpen && (
          <CardContent className="pt-4 space-y-3 text-xs">
            <p className="text-slate-600 text-[11px]">
              The following Bar Council resolutions and precedents have been retrieved for this case profile (e.g. initial expansion &amp; study regularity):
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {precedentCases.map((prec) => (
                <div
                  key={prec.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    selectedPrecedent === prec.id
                      ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-xs">{prec.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{prec.summary}</p>
                      <p className="text-[10px] text-indigo-700 font-medium">Relevance: {prec.applicability}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApplyPrecedent(prec)}
                      className="text-[10px] shrink-0 text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                    >
                      Cite in Decision
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Grid: Dossier Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="md:col-span-2 space-y-5">
          {/* AI Assistance Dossier Box */}
          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-purple-950 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Administrative Synthesis (SIMULATED AI &bull; Assistive Preparation)</span>
              <Badge variant="purple" size="sm">Non-Binding</Badge>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              Automated intake verification confirms candidate completed statutory 3-Year LL.B from The Tamil Nadu Dr. Ambedkar Law University in May 2024 with First Class marks. Pre-enrolment background checks disclose no pending criminal prosecutions or Bar Rule 49 commercial disqualifications.
            </p>
          </div>

          {/* Scrutiny Clearance Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Official Scrutiny Clearance Certificates</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 p-0 text-xs">
              {application.verificationItems.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-[11px] text-slate-500">{item.remarks || 'Standard statutory check completed'}</p>
                  </div>
                  <Badge variant={item.status === 'verified' ? 'green' : 'amber'} size="sm">
                    {item.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Verified Document Credentials */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Verified Credentials Tabled</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 p-0 text-xs">
              {application.documents.map((doc) => (
                <div key={doc.id} className="p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800">{doc.name}</span>
                    <p className="text-[10px] text-slate-400 font-mono">v{doc.version} &bull; {doc.fileName}</p>
                  </div>
                  <Badge variant="green" size="sm">
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Candidate Profile & Decision Action */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Candidate Bio &amp; Legal Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px]">Applicant:</span>
                <span className="font-bold text-slate-900">{application.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Degree:</span>
                <span className="font-semibold text-slate-800">{application.education.lawDegree}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">College:</span>
                <span className="text-slate-800">{application.education.lawCollege}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">University:</span>
                <span className="text-slate-800">{application.education.lawUniversity}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Roll No:</span>
                <span className="font-mono text-slate-800">{application.education.lawRollNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Passing Year:</span>
                <span className="text-slate-800">{application.education.lawPassingYear}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setDecisionModalOpen(true)}
                icon={<Gavel className="w-3.5 h-3.5" />}
                className="w-full text-xs"
              >
                Record Statutory Decision
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Modal: Record Decision (Screen C05) */}
      <Modal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        title="Record Statutory Enrolment Decision (Screen C05)"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Decision Outcome:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setDecisionType('approved')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  decisionType === 'approved'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Grant Enrolment (Approved)
              </button>
              <button
                type="button"
                onClick={() => setDecisionType('deferred')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  decisionType === 'deferred'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Defer for Hearing
              </button>
              <button
                type="button"
                onClick={() => setDecisionType('clarification_required')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  decisionType === 'clarification_required'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Clarification Required
              </button>
              <button
                type="button"
                onClick={() => setDecisionType('rejected')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  decisionType === 'rejected'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Refuse Enrolment (Rejected)
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Statutory Legal Basis (Advocates Act 1961 Section 24):
            </label>
            <input
              type="text"
              value={legalBasis}
              onChange={(e) => setLegalBasis(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Reasoned Decision Observation &amp; Minutes:
            </label>
            <textarea
              rows={4}
              value={decisionObservation}
              onChange={(e) => setDecisionObservation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Statutory Conditions (if any):</label>
              <input
                type="text"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Follow-up Officer / Desk:</label>
              <input
                type="text"
                value={followUpOwner}
                onChange={(e) => setFollowUpOwner(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Meeting Minute Reference:</label>
            <input
              type="text"
              value={meetingRef}
              onChange={(e) => setMeetingRef(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white font-mono"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setDecisionModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleRecordDecision}>
              Confirm &amp; Record Decision
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
