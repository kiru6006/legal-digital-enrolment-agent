import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  Bell,
  RotateCcw,
  Sparkles,
  ChevronDown,
  UserCheck,
  Briefcase,
  Layers,
  Gavel,
  ShieldCheck,
  CheckCircle2,
  Menu,
  Search,
  Keyboard,
  HelpCircle,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { UserRole } from '../../types/user';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { LanguageToggle } from '../ux/LanguageToggle';
import { SaveStatus } from '../ux/SaveStatus';
import { Language } from '../../services/i18nService';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenWalkthrough: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  onOpenSearch?: () => void;
  onOpenShortcuts?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
  onOpenWalkthrough,
  onToggleSidebar,
  isSidebarCollapsed,
  currentLang = 'en',
  onLanguageChange,
  onOpenSearch,
  onOpenShortcuts,
}) => {
  const { currentRole, currentUser, switchRole, notifications, resetDemoScenario } = useAEMS();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.recipientRole === currentRole || n.recipientRole === 'all')
  ).length;

  const rolesList: Array<{ role: UserRole; label: string; icon: any; route: string }> = [
    { role: 'applicant', label: 'Applicant Portal', icon: UserCheck, route: '/applicant/dashboard' },
    { role: 'officer', label: 'Enrolment Official', icon: Briefcase, route: '/officer/dashboard' },
    { role: 'management', label: 'Senior Management', icon: Layers, route: '/management/dashboard' },
    { role: 'committee', label: 'Committee Member', icon: Gavel, route: '/committee/dashboard' },
    { role: 'admin', label: 'System Admin', icon: ShieldCheck, route: '/admin/users' },
  ];

  const handleRoleChange = (role: UserRole, route: string) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    navigate(route);
  };

  const handleReset = () => {
    if (window.confirm('Reset demo environment to the initial scenario state?')) {
      resetDemoScenario();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2000);
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface-white)] border-b border-[var(--color-border)] shadow-xs">
      {/* Top Banner Notice with Google colors indicator */}
      <div className="bg-[var(--color-surface-dark)] text-[#E8EAED] text-xs py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Google colors 4-dot pill */}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
            <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
            <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
            <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
          </div>
          <span className="font-semibold text-white">Bar Council of Tamil Nadu &amp; Puducherry</span>
          <span className="text-[#9AA0A6] hidden sm:inline">| Statutory Enrolment Platform MVP</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[var(--google-yellow)] font-mono text-[11px] font-semibold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            DEMO • Illustrative data • No real applicant information
          </span>
          <button
            onClick={onOpenWalkthrough}
            className="text-[#8AB4F8] hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C58AF9]" />
            <span>Scenario Walkthrough (BRD B7)</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand with Toggle Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 -ml-1 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center"
              title={isSidebarCollapsed ? 'Expand sidebar (⌘B)' : 'Collapse sidebar (⌘B)'}
              aria-label="Toggle navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[var(--vignxs-crimson)] flex items-center justify-center text-white shadow-xs group-hover:bg-[var(--vignxs-crimson-deep)] transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-[var(--color-text-primary)] tracking-tight font-heading">
                  AEMS
                </span>
                <span className="text-[10px] bg-[var(--vignxs-soft)] text-[var(--vignxs-crimson)] font-bold px-1.5 py-0.5 rounded border border-[var(--vignxs-pink-light)]">
                  OFFICE MVP
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] font-medium">Digital Enrolment Office</p>
            </div>
          </Link>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium cursor-pointer transition-colors"
              title="Global Dossier Search (Press /)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Search Dossiers...</span>
              <kbd className="text-[10px] bg-white border border-slate-300 px-1.5 py-0.2 rounded font-mono font-bold text-slate-500">
                /
              </kbd>
            </button>
          )}

          {/* Persistent Save Status Indicator */}
          <div className="hidden lg:block">
            <SaveStatus currentLang={currentLang} />
          </div>

          {/* Bilingual Language Switcher */}
          {onLanguageChange && (
            <div className="hidden sm:block">
              <LanguageToggle currentLang={currentLang} onLanguageChange={onLanguageChange} />
            </div>
          )}

          {/* Officer Live Queue Count Badge */}
          {currentRole === 'officer' && (
            <div
              onClick={() => navigate('/officer/work-queue')}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold cursor-pointer hover:bg-blue-100/70 transition-colors"
              title="Open My Active Work Queue"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Queue: 20</span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            </div>
          )}

          {/* Active Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] text-xs font-semibold transition-all shadow-xs cursor-pointer focus:ring-2 focus:ring-[var(--google-blue)]/20"
              title="Switch demo user role"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[var(--color-text-muted)] text-[11px] uppercase tracking-wider font-semibold">
                  Role:
                </span>
                <Badge
                  variant={
                    currentRole === 'officer'
                      ? 'primary'
                      : currentRole === 'management'
                      ? 'warning'
                      : currentRole === 'committee'
                      ? 'brand'
                      : currentRole === 'admin'
                      ? 'neutral'
                      : 'violet'
                  }
                  size="sm"
                >
                  {rolesList.find((r) => r.role === currentRole)?.label}
                </Badge>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[var(--color-surface-white)] border border-[var(--color-border)] rounded-xl shadow-card-hover py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-[var(--color-surface-muted)] text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Switch Active Demo Role
                </div>
                {rolesList.map((item) => {
                  const Icon = item.icon;
                  const isSelected = currentRole === item.role;
                  return (
                    <button
                      key={item.role}
                      onClick={() => handleRoleChange(item.role, item.route)}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] font-bold'
                          : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[var(--google-blue-strong)]' : 'text-[var(--color-text-secondary)]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--google-blue-strong)]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reset Demo State Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />}
            title="Reset scenario state back to fresh demo baseline"
          >
            <span className="hidden sm:inline">Reset Demo</span>
          </Button>
          {resetSuccess && (
            <span className="text-xs text-[var(--google-green-dark)] font-semibold">Scenario Reset!</span>
          )}

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] transition-colors cursor-pointer focus:ring-2 focus:ring-[var(--google-blue)]/20"
            title="Notification Centre"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[var(--google-red)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Keyboard Shortcuts Button */}
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Keyboard Shortcuts Cheat Sheet (Press ?)"
              aria-label="Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </button>
          )}

          {/* Current User Pill */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-full bg-[var(--vignxs-crimson)] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight truncate max-w-[140px]">
                {currentUser.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
