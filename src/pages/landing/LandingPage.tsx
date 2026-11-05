import React, { useState } from 'react';
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
  Compass,
  ListChecks,
  Calendar,
  AlertCircle,
  FolderOpen,
  GraduationCap,
  CreditCard,
  Shield,
  Activity,
  FileText,
  Lock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const LandingPage: React.FC = () => {
  const { switchRole, primaryApplication } = useAEMS();
  const navigate = useNavigate();

  const [activeFeatureTab, setActiveFeatureTab] = useState<
    'applicant' | 'official' | 'committee' | 'management'
  >('applicant');

  const handleSelectRole = (role: any, route: string) => {
    switchRole(role);
    navigate(route);
  };

  const roleCards = [
    {
      role: 'applicant' as const,
      title: 'Applicant Portal',
      subtitle: 'Candidate Self-Service',
      desc: 'Register profile, complete statutory application, upload 11-category documents, resolve deficiencies, and book robing appointment.',
      route: '/applicant/dashboard',
      icon: UserCheck,
      badge: 'Candidate Flow',
      accent: 'border-blue-200 hover:border-blue-500 bg-blue-50/20',
      iconColor: 'text-blue-600 bg-blue-100/70',
      quickLinks: [
        { label: 'Candidate Registration (A01)', to: '/applicant/register' },
        { label: '11-Doc Checklist & Pass (A03)', to: '/applicant/checklist' },
        { label: '5-Stage Progress Tracker (A02)', to: '/applicant/dashboard' },
        { label: 'Ceremonial Robing Slot (A21)', to: '/applicant/appointments' },
      ],
    },
    {
      role: 'officer' as const,
      title: 'Enrolment Official',
      subtitle: 'Scrutiny & Verification Desk',
      desc: 'Centralized queue, Digital Case File (O05), Cross-Doc Matrix, Law College Desk (O11), Restricted Criminal Antecedents (O12), and Treasury.',
      route: '/officer/dashboard',
      icon: Briefcase,
      badge: 'Core Scrutiny',
      accent: 'border-emerald-200 hover:border-emerald-500 bg-emerald-50/20',
      iconColor: 'text-emerald-700 bg-emerald-100/70',
      quickLinks: [
        { label: 'Digital Case File (O05)', to: `/officer/case/${PRIMARY_DEMO_APP_ID}` },
        { label: 'Live Work Queue (O03)', to: '/officer/work-queue' },
        { label: 'Verification Desk (O14)', to: '/officer/verification' },
        { label: 'AI Time Reduction (O07)', to: '/officer/time-savings' },
      ],
    },
    {
      role: 'committee' as const,
      title: 'Enrolment Committee',
      subtitle: 'Statutory Admission Chamber',
      desc: 'Inspect candidate dockets, retrieve legal precedents and prior directions (C04), and record formal decisions under Advocates Act Section 24.',
      route: '/committee/dashboard',
      icon: Gavel,
      badge: 'Statutory Bench',
      accent: 'border-purple-200 hover:border-purple-500 bg-purple-50/20',
      iconColor: 'text-purple-700 bg-purple-100/70',
      quickLinks: [
        { label: 'Statutory Case Review (C03)', to: `/committee/case/${PRIMARY_DEMO_APP_ID}` },
        { label: 'Committee Docket List (C01)', to: '/committee/dashboard' },
        { label: 'Meeting Pack & Agenda (C02)', to: '/committee/meeting-pack' },
      ],
    },
    {
      role: 'management' as const,
      title: 'Senior Management',
      subtitle: 'Executive Command Centre',
      desc: 'Live throughput analytics, bottleneck SLA tracking, team capacity balancing, appointment capacity, and statutory register exports.',
      route: '/management/dashboard',
      icon: Layers,
      badge: 'Executive View',
      accent: 'border-amber-200 hover:border-amber-500 bg-amber-50/20',
      iconColor: 'text-amber-700 bg-amber-100/70',
      quickLinks: [
        { label: 'Executive Dashboard (M01)', to: '/management/dashboard' },
        { label: 'Team Workload & Capacity (M04)', to: '/management/workload' },
        { label: 'Application Pipeline (M03)', to: '/management/progress' },
        { label: 'Statutory Reports (M08)', to: '/management/reports' },
      ],
    },
  ];

  const featurePillars = {
    applicant: [
      {
        id: 'A01',
        title: 'Online Candidate Registration & Duplicate Check',
        desc: 'Select 3-Yr / 5-Yr stream, live check against Bar Council roll to prevent duplicate enrolments, and dual OTP validation.',
        badge: 'Screen A01',
        icon: Compass,
        to: '/applicant/register',
      },
      {
        id: 'A03',
        title: '11-Category Dynamic Document Checklist & Pass',
        desc: 'Tailored checklist distinguishing mandatory originals, attested copies, and downloadable Physical Robing Hall Ticket.',
        badge: 'Screens A03 & A22',
        icon: ListChecks,
        to: '/applicant/checklist',
      },
      {
        id: 'A02',
        title: '5-Stage Milestone Progress Tracker',
        desc: 'Real-time visibility from Online Submission &rarr; AI Intake Check &rarr; Official Scrutiny &rarr; Committee Review &rarr; Roll Admission.',
        badge: 'Screen A02',
        icon: Activity,
        to: '/applicant/dashboard',
      },
      {
        id: 'A20',
        title: 'Document Correction & Versioning Desk',
        desc: 'Respond to officer defect notices with immutable version-controlled re-uploads (v1 to v2) and notary affidavit attachments.',
        badge: 'Screen A20',
        icon: AlertCircle,
        to: '/applicant/documents',
      },
      {
        id: 'A21',
        title: 'Ceremonial Robing & Verification Desk Pass',
        desc: 'Book or reschedule physical inspection slots with BCI dress code instructions, QR security token, and hall ticket.',
        badge: 'Screen A21',
        icon: Calendar,
        to: '/applicant/appointments',
      },
    ],
    official: [
      {
        id: 'O05',
        title: 'Single-Pane Digital Case File',
        desc: 'All applicant demographics, academic credentials, affidavits, fee status, and versioned scans in one unified officer workstation.',
        badge: 'Screen O05',
        icon: FolderOpen,
        to: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'A15',
        title: 'Cross-Document Validation Matrix',
        desc: 'Automated side-by-side comparison (SSC vs Aadhaar vs B.Com vs LL.B) flagging initial expansion disparities with 1-click resolution.',
        badge: 'Desk A15 / O05',
        icon: Scale,
        to: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'O11',
        title: 'Law College & University Recognition Desk',
        desc: 'Real-time accreditation lookup against BCI Approved College directory, non-distance validation, and 70%+ attendance certification.',
        badge: 'Desk O11',
        icon: GraduationCap,
        to: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'O12',
        title: 'Restricted Criminal Antecedents Scrutiny Desk',
        desc: 'Strictly restricted scrutiny workspace for reviewing CCTNS police advisories and FIR disclosures without presumptive bias.',
        badge: 'Desk O12 • Restricted',
        icon: Shield,
        to: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'O14',
        title: 'Physical Robing & Original Certificate Desk',
        desc: 'In-person verification checklist for 10th, 12th, B.Com, LL.B originals, advocate bands, and formal ceremony compliance.',
        badge: 'Desk O14',
        icon: UserCheck,
        to: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'O15',
        title: 'Treasury & SBI Challan Reconciliation Desk',
        desc: 'Instant audit of ₹18,500 statutory fee distribution across BCTNP Enrolment Fund, Welfare Fund, and Library dues.',
        badge: 'Desk O15',
        icon: CreditCard,
        to: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      },
    ],
    committee: [
      {
        id: 'C03',
        title: 'Statutory Candidate Docket Inspection',
        desc: 'Comprehensive candidate summary table with scrutiny officer clearance certificates, verified degrees, and character references.',
        badge: 'Screen C03',
        icon: Gavel,
        to: `/committee/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'C04',
        title: 'Prior Directions & Legal Precedents Retrieval (RAG)',
        desc: 'Search historical Bar Council resolutions (e.g. Resolution 14/2021 on degree initial expansion) and attach citations directly.',
        badge: 'Screen C04 • Precedents',
        icon: FileText,
        to: `/committee/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'C05',
        title: 'Structured Statutory Decision Recording',
        desc: 'Capture formal reasoned findings under Advocates Act 1961 Section 24 with conditions, follow-up desks, and minute references.',
        badge: 'Screen C05',
        icon: CheckCircle2,
        to: `/committee/case/${PRIMARY_DEMO_APP_ID}`,
      },
      {
        id: 'C02',
        title: 'Digital Meeting Pack & Batch Sitting Agenda',
        desc: 'Curated dossier bundles for scheduled committee hearings with exportable PDF meeting records and roll signatures.',
        badge: 'Screen C02',
        icon: Briefcase,
        to: '/committee/meeting-pack',
      },
    ],
    management: [
      {
        id: 'M01',
        title: 'Executive Intake & Throughput Dashboard',
        desc: 'High-level monitoring of daily candidate submissions, scrutiny velocity, deficiency turnaround rates, and sitting readiness.',
        badge: 'Screen M01',
        icon: Layers,
        to: '/management/dashboard',
      },
      {
        id: 'M04',
        title: 'Team Workload & Capacity Balancing Desk',
        desc: 'Real-time allocation across scrutiny officers, load balancing, re-assignment tools, and bottleneck diagnostics.',
        badge: 'Screen M04',
        icon: Activity,
        to: '/management/workload',
      },
      {
        id: 'M03',
        title: 'End-to-End Pipeline & SLA Monitoring',
        desc: 'Visual bottleneck analysis isolating processing queues exceeding statutory 7-day or 14-day turnaround limits.',
        badge: 'Screen M03',
        icon: Clock,
        to: '/management/progress',
      },
      {
        id: 'M08',
        title: 'Statutory Registers & Audit Trail Exports',
        desc: 'One-click generation of Bar Roll entry registers, audit event logs, and compliance dockets for BCI reporting.',
        badge: 'Screen M08',
        icon: FileCheck2,
        to: '/management/reports',
      },
    ],
  };

  return (
    <div className="min-h-full bg-[var(--color-bg-main)] py-5 px-3 sm:px-6 max-w-7xl mx-auto space-y-5">
      {/* Compact Hero Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold">
              <Scale className="w-3.5 h-3.5" />
              Bar Council of Tamil Nadu &amp; Puducherry
            </span>
            <Badge variant="brand" className="text-[10px]">
              Statutory Platform MVP
            </Badge>
            <span className="text-slate-400 text-xs font-mono hidden sm:inline">
              Advocates Act 1961 Section 24
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Advocate Enrolment Management System (AEMS)
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            A single, tamper-evident digital case file powering transparent candidate onboarding, accelerated scrutiny, verified university authentication, and formal committee roll admission.
          </p>
        </div>

        {/* Quick Demo Jump Strip */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600 uppercase">Primary Candidate</span>
            </div>
            <p className="text-xs font-bold text-slate-900">Arjun Kumar ({PRIMARY_DEMO_APP_ID})</p>
            <p className="text-[10px] text-amber-700 font-semibold">{primaryApplication.statusLabel}</p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              switchRole('officer');
              navigate(`/officer/case/${PRIMARY_DEMO_APP_ID}`);
            }}
            className="text-xs justify-center"
          >
            Launch Case Dossier
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* 4 Compact Institutional Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Annual Enrolment Intake', val: '5,000+', desc: 'Fresh & Transfer Advocates', color: 'text-blue-700' },
          { label: 'Scrutiny Time Reduction', val: '70%', desc: 'From 40 mins to ~12 mins', color: 'text-emerald-700' },
          { label: 'Statutory Verification Desks', val: '11 Desks', desc: 'Cross-Doc, Law College, Robing', color: 'text-purple-700' },
          { label: 'Audit & Roll Traceability', val: '100%', desc: 'Append-Only Event Ledger', color: 'text-rose-700' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
              {stat.label}
            </span>
            <p className={`text-xl font-extrabold ${stat.color} font-mono`}>{stat.val}</p>
            <p className="text-[11px] text-slate-500 truncate">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Compact AI Safeguard Strip */}
      <div className="bg-purple-50/70 border border-purple-200 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-purple-700 text-white shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-purple-950">
            SIMULATED AI SAFEGUARD &bull; NON-DECISIONAL ASSISTANCE:
          </span>
          <span className="text-xs text-purple-900 hidden md:inline">
            AI extracts fields and highlights potential mismatches; statutory decisions remain 100% human-controlled.
          </span>
        </div>
        <Badge variant="purple" size="sm" className="shrink-0 text-[10px]">
          Section 24 Compliant
        </Badge>
      </div>

      {/* 4 Interactive Portal Launchpads (Compact Grid) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Select User Portal Workspace
          </h2>
          <span className="text-xs text-slate-400">Switch anytime using top role bar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {roleCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.role}
                className={`bg-white rounded-xl border p-4 shadow-2xs flex flex-col justify-between transition-all group ${card.accent}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${card.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {card.badge}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{card.title}</h3>
                    <p className="text-[11px] font-semibold text-blue-600">{card.subtitle}</p>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">{card.desc}</p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
                  {/* Quick Action Chips */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Quick Access:
                    </span>
                    <div className="flex flex-col gap-1">
                      {card.quickLinks.slice(0, 2).map((ql, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            switchRole(card.role);
                            navigate(ql.to);
                          }}
                          className="text-left text-[11px] font-medium text-slate-700 hover:text-blue-700 hover:underline truncate flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{ql.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSelectRole(card.role, card.route)}
                    className="w-full text-xs justify-between"
                  >
                    <span>Open Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Showcase & Spotlight Desk (Directly Addressing Feature Highlight Requirement) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Interactive System Capabilities &amp; Feature Directory
            </h2>
            <p className="text-xs text-slate-500">
              Explore the end-to-end statutory features built across all 4 operational perspectives.
            </p>
          </div>

          {/* Module Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto max-w-full">
            {[
              { id: 'applicant', label: 'Applicant Flow (A01-A22)' },
              { id: 'official', label: 'Official Desks (O03-O17)' },
              { id: 'committee', label: 'Committee Chamber (C03-C05)' },
              { id: 'management', label: 'Executive Governance (M01-M10)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeFeatureTab === tab.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {featurePillars[activeFeatureTab].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigate(item.to)}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 bg-slate-50/50 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <Badge variant="blue" className="text-[10px]">
                      {item.badge}
                    </Badge>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-blue-600 font-semibold group-hover:text-blue-800">
                  <span>Launch Screen</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
