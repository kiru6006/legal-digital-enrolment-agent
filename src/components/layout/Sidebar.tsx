import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  AlertCircle,
  Bell,
  Calendar,
  Inbox,
  FolderOpen,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle,
  BarChart3,
  Users,
  GitBranch,
  FileSpreadsheet,
  Gavel,
  Briefcase,
  Settings,
  ListChecks,
  Compass,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';

interface NavItem {
  to: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { currentRole, primaryApplication } = useAEMS();
  const location = useLocation();

  const applicantLinks: NavItem[] = [
    { to: '/applicant/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { to: '/applicant/new-application', label: 'New Application', icon: FilePlus },
    {
      to: `/applicant/application/${PRIMARY_DEMO_APP_ID}`,
      label: 'My Application File',
      icon: FileText,
      badge: 'Demo File',
    },
    {
      to: '/applicant/documents',
      label: 'Correction Desk',
      icon: AlertCircle,
      badge:
        primaryApplication.deficiencies.filter((d) => d.status === 'open').length > 0
          ? `${primaryApplication.deficiencies.filter((d) => d.status === 'open').length} Action`
          : undefined,
      badgeColor: 'amber',
    },
    { to: '/applicant/notifications', label: 'Notifications', icon: Bell },
    { to: '/applicant/appointments', label: 'Appointments & Ceremony', icon: Calendar },
  ];

  const officerLinks: NavItem[] = [
    { to: '/officer/dashboard', label: 'Daily Workstation', icon: LayoutDashboard },
    { to: '/officer/work-queue', label: 'Live Work Queue', icon: Inbox },
    {
      to: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      label: 'Digital Case File',
      icon: FolderOpen,
      badge: 'Arjun Kumar',
    },
    {
      to: `/officer/ai-review/${PRIMARY_DEMO_APP_ID}`,
      label: 'AI Document Review',
      icon: Sparkles,
      badge: 'AI Engine',
      badgeColor: 'violet',
    },
    { to: '/officer/time-savings', label: 'AI Time Reduction', icon: Clock },
    { to: '/officer/deficiencies', label: 'Deficiency Tracking', icon: AlertCircle },
    { to: '/officer/verification', label: 'Verification Desk', icon: ShieldCheck },
    { to: '/officer/completed', label: 'Completed Cases', icon: CheckCircle },
  ];

  const managementLinks: NavItem[] = [
    { to: '/management/dashboard', label: 'Command Centre', icon: BarChart3 },
    { to: '/management/workload', label: 'Team Workload & Capacity', icon: Users },
    { to: '/management/progress', label: 'Application Pipeline', icon: GitBranch },
    { to: '/management/reports', label: 'Statutory Reports', icon: FileSpreadsheet },
    { to: '/management/committee', label: 'Committee Prep', icon: Gavel },
  ];

  const committeeLinks: NavItem[] = [
    { to: '/committee/dashboard', label: 'Committee Desk', icon: Gavel },
    {
      to: `/committee/case/${PRIMARY_DEMO_APP_ID}`,
      label: 'Statutory Case Review',
      icon: FolderOpen,
      badge: 'Arjun Kumar',
    },
    { to: '/committee/meeting-pack', label: 'Meeting Pack & Agenda', icon: Briefcase },
  ];

  const adminLinks: NavItem[] = [
    { to: '/admin/users', label: 'Users & Roles', icon: Users },
    { to: '/admin/checklists', label: 'Statutory Checklists', icon: ListChecks },
    { to: '/admin/configuration', label: 'System Parameters', icon: Settings },
  ];

  const roleSections: Record<string, { title: string; links: NavItem[] }> = {
    applicant: { title: 'Applicant Portal', links: applicantLinks },
    officer: { title: 'Official Workspace', links: officerLinks },
    management: { title: 'Senior Management', links: managementLinks },
    committee: { title: 'Enrolment Committee', links: committeeLinks },
    admin: { title: 'Administration', links: adminLinks },
  };

  const currentSection = roleSections[currentRole] || roleSections.applicant;

  return (
    <aside className="w-64 bg-[var(--color-surface-white)] text-[var(--color-text-primary)] flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-[var(--color-border)] shadow-xs">
      {/* Module Title */}
      <div className="px-5 py-4 border-b border-[var(--color-surface-muted)] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Active Module
          </span>
          <h2 className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight">{currentSection.title}</h2>
        </div>
        <Compass className="w-4 h-4 text-[var(--google-blue-strong)]" />
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {currentSection.links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer group ${
                isActive
                  ? 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] font-bold shadow-2xs'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[var(--google-blue-strong)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]'
                  }`}
                />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    link.badgeColor === 'amber'
                      ? 'bg-[var(--semantic-warning-soft)] text-[#B06000] border border-[#FEEFC3]'
                      : link.badgeColor === 'violet'
                      ? 'bg-[var(--semantic-ai-soft)] text-[var(--color-purple-dark)] border border-[#E9D5FF]'
                      : 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)]'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Primary Demo Scenario Indicator Card */}
      <div className="p-3.5 m-3 bg-[var(--vignxs-soft)] rounded-xl border border-[var(--vignxs-pink-light)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[var(--vignxs-crimson)] animate-pulse"></span>
          <span className="text-[10px] font-bold text-[var(--vignxs-crimson)] uppercase tracking-wider">
            Primary Demo Case
          </span>
        </div>
        <p className="text-xs text-[var(--color-text-primary)] font-bold truncate">Arjun Kumar</p>
        <p className="text-[11px] text-[var(--color-text-secondary)] font-mono">Ref: {PRIMARY_DEMO_APP_ID}</p>
        <div className="mt-2 pt-2 border-t border-[var(--vignxs-pink-light)] flex items-center justify-between text-[11px]">
          <span className="text-[var(--color-text-secondary)]">Status:</span>
          <span className="text-[var(--vignxs-crimson)] font-bold">{primaryApplication.statusLabel}</span>
        </div>
      </div>
    </aside>
  );
};
