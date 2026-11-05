import React, { useState } from 'react';
import {
  PhoneCall,
  MapPin,
  HelpCircle,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  X,
  FileQuestion,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Language, t } from '../../services/i18nService';

interface HelpFooterProps {
  currentLang?: Language;
}

export const HelpFooter: React.FC<HelpFooterProps> = ({ currentLang = 'en' }) => {
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [assistedModalOpen, setAssistedModalOpen] = useState(false);
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [assistedConsentGiven, setAssistedConsentGiven] = useState(false);

  const [issueText, setIssueText] = useState('');
  const [attachScreenshot, setAttachScreenshot] = useState(true);

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setIssueSubmitted(true);
    setTimeout(() => {
      setIssueSubmitted(false);
      setReportModalOpen(false);
      setIssueText('');
    }, 2500);
  };

  return (
    <aside aria-label="Help and Support Bar" className="border-t border-slate-200 bg-slate-50 py-3 px-4 sm:px-6 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Helpline & Assisted Desks */}
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <PhoneCall className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>044-2534 2525 / 2534 2526 (09:30 AM - 05:30 PM)</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Assisted Helpdesks: High Court Campus, Chennai &amp; Puducherry</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setAssistedModalOpen(true)}
            className="text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>{currentLang === 'ta' ? 'அதிகாரி உதவிப் பயன்முறை' : 'Assisted Mode'}</span>
          </button>

          <button
            type="button"
            onClick={() => setFaqModalOpen(true)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{currentLang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Enrolment FAQ'}</span>
          </button>

          <button
            type="button"
            onClick={() => setReportModalOpen(true)}
            className="text-slate-600 hover:text-rose-600 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>{currentLang === 'ta' ? 'சிக்கலைப் புகாரளிக்க' : 'Report a Problem'}</span>
          </button>
        </div>
      </div>

      {/* FAQ Modal */}
      <Modal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        title="Bar Council Statutory Enrolment Guide &amp; FAQ"
      >
        <div className="space-y-4 text-xs text-slate-700 max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900">What is the statutory age limit for enrolment?</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Under Section 24(1)(a) of the Advocates Act 1961, an applicant must have completed 21 years of age on the date of application.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900">What should I do if my name initials differ on my certificates?</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Under Bar Council Resolution 14/2021, if initials expand (e.g., &quot;Arjun K&quot; vs &quot;Arjun Kumar&quot;), submit a sworn One-and-the-Same Identity Affidavit attested by a Notary Public. Gazette notification is not mandated.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900">Is distance education / online Law Degree recognized?</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              No. Under Bar Council of India Education Rules 2008 (Rule 5), only regular classroom legal education with a minimum 70% attendance certificate is eligible for enrolment.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h4 className="font-bold text-slate-900">Can I enroll while continuing salaried employment?</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              No. Under Bar Council of India Rules Chapter II, Rule 49, an advocate cannot be a full-time salaried employee of any government, firm, or corporation. Relieving proof must be uploaded.
            </p>
          </div>
        </div>
      </Modal>

      {/* Report a Problem Modal */}
      <Modal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="Report an Issue or Glitch"
      >
        {issueSubmitted ? (
          <div className="p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Issue Recorded Successfully</h4>
            <p className="text-xs text-slate-500">
              Ticket #AEMS-TIC-8821 generated. Our technical support desk will review page telemetry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReportIssue} className="space-y-3 text-xs">
            <p className="text-slate-600">
              Report unexpected errors or usability issues directly to the Bar Council IT Helpdesk.
            </p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Describe the problem:</label>
              <textarea
                required
                rows={3}
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="e.g. Upload button did not accept file, or name mismatch flag needs review..."
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <label className="flex items-center gap-2 text-slate-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={attachScreenshot}
                onChange={(e) => setAttachScreenshot(e.target.checked)}
                className="text-blue-600 rounded"
              />
              <span className="text-[11px]">
                Include diagnostic page URL and viewport resolution (no sensitive personal data is sent).
              </span>
            </label>

            <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setReportModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={!issueText}>
                Submit Issue Ticket
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Assisted Desk Consent Mode Modal */}
      <Modal
        isOpen={assistedModalOpen}
        onClose={() => setAssistedModalOpen(false)}
        title="Assisted Helpdesk View (BCTNP Sub-Centre)"
      >
        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-purple-900 font-bold">
              <UserCheck className="w-4 h-4 text-purple-600" />
              <span>Applicant In-Person Assistance Desk</span>
            </div>
            <p className="text-[11px] text-purple-950 leading-relaxed">
              For candidates without high-speed internet or smartphones, an authorized Bar Council official at the High Court Helpdesk can mirror this session with your in-person consent.
            </p>
          </div>

          <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={assistedConsentGiven}
              onChange={(e) => setAssistedConsentGiven(e.target.checked)}
              className="text-purple-600 rounded mt-0.5"
            />
            <span className="text-[11px] text-slate-700 leading-relaxed">
              I consent to the Bar Council Helpdesk Officer viewing and assisting with my document uploads and application review. Every action is logged to the statutory audit ledger.
            </span>
          </label>

          <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setAssistedModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!assistedConsentGiven}
              onClick={() => {
                setAssistedModalOpen(false);
                alert('Assisted Mode active: Helpdesk Officer session linked with audit token.');
              }}
              className="bg-purple-700 hover:bg-purple-800"
            >
              Authorize Helpdesk Mirroring
            </Button>
          </div>
        </div>
      </Modal>
    </aside>
  );
};

