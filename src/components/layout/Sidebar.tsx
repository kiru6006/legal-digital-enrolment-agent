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
  PanelLeftClose,
  PanelLeftOpen,
  X,
  ChevronRight,
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

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { currentRole, primaryApplication } = useAEMS();
  const location = useLocation();

  const applicantLinks: NavItem[] = [
    { to: '/applicant/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { to: '/applicant/register', label: 'Candidate Registration (A01)', icon: Compass },
    { to: '/applicant/checklist', label: '11-Doc Checklist & Pass (A03)', icon: ListChecks },
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
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[var(--color-surface-white)] text-[var(--color-text-primary)] flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-[var(--color-border)] shadow-xs transition-all duration-300 ease-in-out md:static md:z-auto ${
          isMobileOpen
            ? 'translate-x-0 shadow-2xl w-64'
            : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'md:w-16' : 'md:w-64'}`}
      >
        {/* Header (Mobile View: with Close Button) */}
        <div className="px-4 py-4 border-b border-[var(--color-surface-muted)] flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2 overflow-hidden">
            <Compass className="w-4 h-4 text-[var(--google-blue-strong)] shrink-0" />
            <span className="text-sm font-bold text-[var(--color-text-primary)] truncate">
              {currentSection.title}
            </span>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header (Desktop View) */}
        <div className="border-b border-[var(--color-surface-muted)] hidden md:block">
          {!isCollapsed ? (
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block truncate">
                  Active Module
                </span>
                <h2 className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight truncate">
                  {currentSection.title}
                </h2>
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                title="Collapse sidebar (⌘B)"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-3 flex items-center justify-center">
              <button
                onClick={onToggleCollapse}
                className="p-2 rounded-xl text-slate-500 hover:text-[var(--google-blue-strong)] hover:bg-[var(--semantic-primary-soft)] transition-colors cursor-pointer group relative"
                title="Expand sidebar (⌘B)"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-5 h-5" />
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  Expand sidebar (⌘B)
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto">
          {currentSection.links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onCloseMobile}
                className={`flex items-center rounded-xl text-xs transition-all cursor-pointer group relative ${
                  isCollapsed
                    ? 'justify-center p-2.5 md:px-0'
                    : 'justify-between px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] font-bold shadow-2xs'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] font-medium'
                }`}
              >
                <div
                  className={`flex items-center ${
                    isCollapsed ? 'justify-center' : 'gap-3'
                  } min-w-0`}
                >
                  <div className="relative shrink-0 flex items-center justify-center">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-[var(--google-blue-strong)]'
                          : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]'
                      }`}
                    />
                    {/* Collapsed dot badge indicator */}
                    {isCollapsed && link.badge && (
                      <span
                        className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ring-2 ring-white ${
                          link.badgeColor === 'amber'
                            ? 'bg-amber-500'
                            : link.badgeColor === 'violet'
                            ? 'bg-purple-500'
                            : 'bg-blue-600'
                        }`}
                      />
                    )}
                  </div>
                  {/* Label text */}
                  <span className={`${isCollapsed ? 'md:hidden' : 'block'} truncate`}>
                    {link.label}
                  </span>
                </div>

                {/* Expanded Badge */}
                {link.badge && (
                  <span
                    className={`${
                      isCollapsed ? 'md:hidden' : 'inline-block'
                    } text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
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

                {/* Collapsed Tooltip on Desktop */}
                {isCollapsed && (
                  <div className="hidden md:flex absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity items-center gap-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          link.badgeColor === 'amber'
                            ? 'bg-amber-500 text-white'
                            : link.badgeColor === 'violet'
                            ? 'bg-purple-500 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Primary Demo Scenario Indicator Card */}
        {!isCollapsed ? (
          <div className="p-3.5 m-3 bg-[var(--vignxs-soft)] rounded-xl border border-[var(--vignxs-pink-light)]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[var(--vignxs-crimson)] animate-pulse" />
              <span className="text-[10px] font-bold text-[var(--vignxs-crimson)] uppercase tracking-wider">
                Primary Demo Case
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-primary)] font-bold truncate">
              {primaryApplication.applicantName}
            </p>
            <p className="text-[11px] text-[var(--color-text-secondary)] font-mono">
              Ref: {PRIMARY_DEMO_APP_ID}
            </p>
            <div className="mt-2 pt-2 border-t border-[var(--vignxs-pink-light)] flex items-center justify-between text-[11px]">
              <span className="text-[var(--color-text-secondary)]">Status:</span>
              <span className="text-[var(--vignxs-crimson)] font-bold">
                {primaryApplication.statusLabel}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-2 m-2 hidden md:flex justify-center">
            <div
              className="w-10 h-10 rounded-xl bg-[var(--vignxs-soft)] border border-[var(--vignxs-pink-light)] flex flex-col items-center justify-center relative group cursor-pointer"
              title={`Primary Demo: ${primaryApplication.applicantName} (${PRIMARY_DEMO_APP_ID}) - ${primaryApplication.statusLabel}`}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--vignxs-crimson)] animate-pulse" />
              <span className="text-[9px] font-bold text-[var(--vignxs-crimson)] mt-0.5">AK</span>
              <div className="absolute left-full ml-3 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-bold">{primaryApplication.applicantName}</p>
                <p className="text-[10px] text-slate-400 font-mono">Ref: {PRIMARY_DEMO_APP_ID}</p>
                <p className="text-[10px] text-amber-400 mt-1 font-semibold">
                  Status: {primaryApplication.statusLabel}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Expand / Collapse Toggle Bar (Desktop only) */}
        <div className="border-t border-[var(--color-surface-muted)] hidden md:block">
          {!isCollapsed ? (
            <div className="p-2.5">
              <button
                onClick={onToggleCollapse}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Collapse sidebar (⌘B)"
              >
                <span className="flex items-center gap-2">
                  <PanelLeftClose className="w-4 h-4 text-slate-400" />
                  <span>Collapse Menu</span>
                </span>
                <kbd className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                  ⌘B
                </kbd>
              </button>
            </div>
          ) : (
            <div className="p-2 flex justify-center">
              <button
                onClick={onToggleCollapse}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer group relative"
                title="Expand menu (⌘B)"
                aria-label="Expand menu"
              >
                <ChevronRight className="w-4 h-4 text-slate-500" />
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  Expand Menu (⌘B)
                </div>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
