import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale,
  UserCheck,
  Briefcase,
  Layers,
  Gavel,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileCheck2,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAEMS();
  const navigate = useNavigate();

  const handleSelectRole = (role: any, route: string) => {
    switchRole(role);
    navigate(route);
  };

  const roleCards = [
    {
      role: 'applicant' as const,
      title: 'Applicant Portal',
      subtitle: 'Candidate Self-Service',
      desc: 'Submit enrolment application, track verification progress in real-time, receive deficiency notices, and upload document rectifications.',
      route: '/applicant/dashboard',
      icon: UserCheck,
      badge: 'Candidate Flow',
      stats: '1 Active Demo File (Arjun Kumar)',
    },
    {
      role: 'officer' as const,
      title: 'Enrolment Official',
      subtitle: 'Scrutiny & Verification Workstation',
      desc: 'Inspect centralized work queue, review single-pane digital case files, leverage AI document extraction, and issue structured deficiency notices.',
      route: '/officer/dashboard',
      icon: Briefcase,
      badge: 'Core Workstation',
      stats: '20 Applications in Queue',
    },
    {
      role: 'management' as const,
      title: 'Senior Management',
      subtitle: 'Executive Command Centre',
      desc: 'Monitor institutional intake throughput, team workload balancing, bottleneck detection, and export statutory scrutiny reports.',
      route: '/management/dashboard',
      icon: Layers,
      badge: 'Executive Oversight',
      stats: 'Registrar & Secretary View',
    },
    {
      role: 'committee' as const,
      title: 'Committee Member',
      subtitle: 'Statutory Enrolment Committee',
      desc: 'Review verified candidate meeting packs, inspect legal eligibility clearances, and record formal statutory admission decisions.',
      route: '/committee/dashboard',
      icon: Gavel,
      badge: 'Statutory Body',
      stats: '8 Cases Ready for Sitting',
    },
  ];

  return (
    <div className="min-h-full bg-[var(--color-bg-main)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--semantic-primary-soft)] border border-[#C2E7FF] text-[var(--google-blue-strong)] text-xs font-semibold">
            <Scale className="w-4 h-4" />
            <span>Bar Council of Tamil Nadu &amp; Puducherry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight font-heading">
            Advocate Enrolment Management System (AEMS)
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] font-medium">
            Simplifying Advocate Enrolment. Empowering Officials. Improving Transparency.
          </p>

          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            A centralized digital workspace designed for applicants, enrolment officials, and authorized Bar Council leadership — transforming paper-intensive enrolment scrutiny into an accountable digital workflow.
          </p>

          {/* Core Principle Banner */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-bold bg-[var(--color-surface-white)] px-4 py-2.5 rounded-xl border border-[var(--color-border)] shadow-card text-[var(--color-text-primary)]">
              <span className="text-[var(--google-blue-strong)]">One Application</span> &bull;
              <span className="text-[var(--vignxs-crimson)]">One Digital Case File</span> &bull;
              <span className="text-[var(--google-blue-strong)]">One Document Checklist</span> &bull;
              <span className="text-[var(--vignxs-crimson)]">One Review History</span> &bull;
              <span className="text-[var(--google-blue-strong)]">One Accountable Decision</span>
            </div>
          </div>
        </div>

        {/* AI Safeguard Alert */}
        <div className="bg-[var(--semantic-ai-soft)] border border-[#E9D5FF] rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-card">
          <div className="p-2.5 rounded-xl bg-[var(--color-purple-dark)] text-white shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--color-purple-dark)]">
                AI-Assisted Administrative Scrutiny &amp; Verification
              </h3>
              <Badge variant="violet" size="sm">
                Strict Statutory Safeguard
              </Badge>
            </div>
            <p className="text-xs text-[var(--color-text-primary)]/80 leading-relaxed">
              In this system, AI operates strictly as an administrative preparation assistant — classifying uploaded credentials, performing OCR extraction, and checking against statutory checklists. <strong>AI does not independently approve, reject, or determine legal eligibility.</strong> All formal enrolment decisions are made exclusively by authorized Bar Council officials and the statutory Enrolment Committee.
            </p>
          </div>
        </div>

        {/* 4 Role Selection Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">Choose a Demo Role to Enter</h2>
            <span className="text-xs text-[var(--color-text-secondary)]">You can also switch roles anytime from the top bar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {roleCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.role}
                  className="bg-[var(--color-surface-white)] rounded-2xl border border-[var(--color-border)] p-5 shadow-card hover:shadow-card-hover hover:border-[var(--google-blue)] transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-muted)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:bg-[var(--google-blue-strong)] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="neutral" size="sm">
                        {card.badge}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-[var(--color-text-primary)] text-base">{card.title}</h3>
                      <p className="text-xs font-semibold text-[var(--google-blue-strong)] mt-0.5">{card.subtitle}</p>
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{card.desc}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[var(--color-surface-muted)] space-y-3">
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">{card.stats}</div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSelectRole(card.role, card.route)}
                      className="w-full justify-between"
                    >
                      <span>Enter Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High-Level Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[var(--color-surface-white)] p-5 rounded-xl border border-[var(--color-border)] shadow-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[var(--color-text-primary)]">Single Digital Case File</h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Consolidates identity documents, law degree verification, marks sheets, character certificates, and fee challans into one tamper-evident electronic docket.
            </p>
          </div>

          <div className="bg-[var(--color-surface-white)] p-5 rounded-xl border border-[var(--color-border)] shadow-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--semantic-ai-soft)] text-[var(--color-purple-dark)] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[var(--color-text-primary)]">70% Workload Reduction</h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Automated OCR extracts registration numbers and universities; cross-checks demographic consistency, saving ~28 minutes of manual scrutiny per application.
            </p>
          </div>

          <div className="bg-[var(--color-surface-white)] p-5 rounded-xl border border-[var(--color-border)] shadow-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--semantic-success-soft)] text-[var(--google-green-dark)] flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[var(--color-text-primary)]">Transparent Deficiency Rectification</h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Applicants receive instant specific notices for defective scans or name variations, allowing direct version-controlled re-uploads from mobile or desktop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
