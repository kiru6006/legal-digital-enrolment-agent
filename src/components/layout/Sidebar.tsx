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
  const { currentRole, primaryApplication, notifications } = useAEMS();
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
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800">
      {/* Module Title */}
      <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Current Module
          </span>
          <h2 className="text-sm font-semibold text-white tracking-wide">{currentSection.title}</h2>
        </div>
        <Compass className="w-4 h-4 text-blue-400" />
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
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    link.badgeColor === 'amber'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : link.badgeColor === 'violet'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-blue-800/60 text-blue-200'
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
      <div className="p-3 m-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
            Primary Demo Case
          </span>
        </div>
        <p className="text-xs text-slate-300 font-semibold truncate">Arjun Kumar</p>
        <p className="text-[11px] text-slate-400 font-mono">Ref: {PRIMARY_DEMO_APP_ID}</p>
        <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Current Status:</span>
          <span className="text-amber-300 font-medium">{primaryApplication.statusLabel}</span>
        </div>
      </div>
    </aside>
  );
};
