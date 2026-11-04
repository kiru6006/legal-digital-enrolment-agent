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
  const [decisionType, setDecisionType] = useState<'approved' | 'deferred' | 'rejected' | 'clarification_required'>('approved');
  const [decisionObservation, setDecisionObservation] = useState(
    'Candidate satisfies all statutory prerequisites under Section 24 of the Advocates Act, 1961. Degree verified by statutory Law University. Fit for admission on the roll of Advocates.'
  );
  const [meetingRef, setMeetingRef] = useState('EC-MINUTES-2026/19');

  const handleRecordDecision = () => {
    recordCommitteeDecision(application.id, decisionType, decisionObservation, meetingRef);
    setDecisionModalOpen(false);
    navigate('/committee/dashboard');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Statutory Committee Hearing
            </span>
            <span className="text-xs font-mono text-slate-400">Ref: {application.refNumber}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Committee Review: {application.applicantName}
          </h1>
          <p className="text-xs text-slate-500">
            Sitting Date: <strong>20 November 2026</strong> &bull; Hearing Officer: {currentUser.name} ({currentUser.designation})
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
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs uppercase tracking-wide">
                Recorded Statutory Outcome: {application.committeeDecision.decision.toUpperCase()}
              </span>
              <span className="text-emerald-700 font-mono text-[11px]">
                {application.committeeDecision.meetingRef}
              </span>
            </div>
            <p className="text-xs leading-relaxed">{application.committeeDecision.observation}</p>
            <p className="text-[11px] text-emerald-800 font-mono">
              Signed by {application.committeeDecision.memberName} on {application.committeeDecision.date}
            </p>
          </div>
        </div>
      )}

      {/* Grid: Dossier Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="md:col-span-2 space-y-5">
          {/* AI Assistance Dossier Box */}
          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-purple-950 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Administrative Synthesis (Assistive Preparation)</span>
              <Badge variant="violet" size="sm">Non-Binding</Badge>
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
                  <Badge variant={item.status === 'verified' ? 'success' : 'warning'} size="sm">
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
                  <Badge variant="success" size="sm">
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

      {/* Modal: Record Decision */}
      <Modal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        title="Record Statutory Enrolment Decision"
        description={`Candidate: ${application.applicantName} (${application.refNumber})`}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-slate-500">Decision enters statutory roll minutes.</span>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setDecisionModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRecordDecision}
                icon={<CheckCircle2 className="w-3.5 h-3.5" />}
              >
                Confirm &amp; Record Decision
              </Button>
            </div>
          </div>
        }
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
                Defer Sitting
              </button>

              <button
                type="button"
                onClick={() => setDecisionType('clarification_required')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  decisionType === 'clarification_required'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Seek Clarification
              </button>

              <button
                type="button"
                disabled
                title="Per BRD Section 16.7: Reject / Withdraw paths are unapproved and disabled"
                className="py-2 px-3 rounded-lg border text-xs font-semibold bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed text-center"
              >
                Reject / Withdraw <span className="block text-[9px] text-rose-500 font-bold">[Disabled: Pending Approval]</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Statutory Observation &amp; Order:</label>
            <textarea
              rows={3}
              value={decisionObservation}
              onChange={(e) => setDecisionObservation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Meeting Minute Reference:</label>
              <input
                type="text"
                value={meetingRef}
                onChange={(e) => setMeetingRef(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Recording Member:</label>
              <input
                type="text"
                disabled
                value={currentUser.name}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

