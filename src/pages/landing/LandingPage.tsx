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
  const { switchRole, applications } = useAEMS();
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
      color: 'blue',
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
      color: 'indigo',
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
      color: 'amber',
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
      color: 'rose',
      badge: 'Statutory Body',
      stats: '8 Cases Ready for Sitting',
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Scale className="w-4 h-4" />
            <span>Bar Council of Tamil Nadu &amp; Puducherry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Advocate Enrolment Management System (AEMS)
          </h1>

          <p className="text-lg text-slate-600 font-medium">
            Simplifying Advocate Enrolment. Empowering Officials. Improving Transparency.
          </p>

          <p className="text-sm text-slate-500 leading-relaxed">
            A centralized digital workspace designed for applicants, enrolment officials, and authorized Bar Council leadership — transforming paper-intensive enrolment scrutiny into an accountable digital workflow.
          </p>

          {/* Core Principle Banner */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs text-slate-700">
              <span className="text-blue-600">One Application</span> •
              <span className="text-blue-600">One Digital Case File</span> •
              <span className="text-blue-600">One Document Checklist</span> •
              <span className="text-blue-600">One Review History</span> •
              <span className="text-blue-600">One Accountable Decision</span>
            </div>
          </div>
        </div>

        {/* AI Safeguard Alert */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-purple-950">
                AI-Assisted Administrative Scrutiny &amp; Verification
              </h3>
              <Badge variant="violet" size="sm">
                Strict Statutory Safeguard
              </Badge>
            </div>
            <p className="text-xs text-purple-900/80 leading-relaxed">
              In this system, AI operates strictly as an administrative preparation assistant — classifying uploaded credentials, performing OCR extraction, and checking against statutory checklists. <strong>AI does not independently approve, reject, or determine legal eligibility.</strong> All formal enrolment decisions are made exclusively by authorized Bar Council officials and the statutory Enrolment Committee.
            </p>
          </div>
        </div>

        {/* 4 Role Selection Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Choose a Demo Role to Enter</h2>
            <span className="text-xs text-slate-500">You can also switch roles anytime from the top bar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {roleCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.role}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="neutral" size="sm">
                        {card.badge}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{card.title}</h3>
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">{card.subtitle}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-[11px] text-slate-400 font-mono">{card.stats}</div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSelectRole(card.role, card.route)}
                      className="w-full justify-between group-hover:bg-blue-700"
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
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">Single Digital Case File</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Consolidates identity documents, law degree verification, marks sheets, character certificates, and fee challans into one tamper-evident electronic docket.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">70% Workload Reduction</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated OCR extracts registration numbers and universities; cross-checks demographic consistency, saving ~28 minutes of manual scrutiny per application.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">Transparent Deficiency Rectification</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Applicants receive instant specific notices for defective scans or name variations, allowing direct version-controlled re-uploads from mobile or desktop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
