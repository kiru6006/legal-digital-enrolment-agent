import React, { useState, useRef, useEffect } from 'react';
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
  Compass,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { UserRole } from '../../types/user';
import { Badge } from '../common/Badge';
import { LanguageToggle } from '../ux/LanguageToggle';
import { SaveStatus } from '../ux/SaveStatus';
import { ThemeToggle } from '../ux/ThemeToggle';
import { Language } from '../../services/i18nService';
import { ThemeMode } from '../../services/themeService';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenWalkthrough: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  currentTheme?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenSearch?: () => void;
  onOpenShortcuts?: () => void;
}

interface RoleConfig {
  role: UserRole;
  label: string;
  persona: string;
  desc: string;
  icon: any;
  route: string;
  badgeColor: 'violet' | 'primary' | 'warning' | 'brand' | 'neutral';
  category: 'Applicant' | 'Scrutiny Officials' | 'Statutory Committee';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
  onOpenWalkthrough,
  onToggleSidebar,
  isSidebarCollapsed,
  currentLang = 'en',
  onLanguageChange,
  currentTheme = 'light',
  onToggleTheme,
  onOpenSearch,
  onOpenShortcuts,
}) => {
  const { currentRole, currentUser, switchRole, notifications, resetDemoScenario } = useAEMS();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Close role dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };
    if (roleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [roleDropdownOpen]);

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.recipientRole === currentRole || n.recipientRole === 'all')
  ).length;

  const rolesConfig: RoleConfig[] = [
    {
      role: 'applicant',
      label: 'Applicant Portal',
      persona: 'Thiru. Arjun Kumar',
      desc: 'Self-service dossier, 11-category document checklist, defect correction & robing appointment pass.',
      icon: UserCheck,
      route: '/applicant/dashboard',
      badgeColor: 'violet',
      category: 'Applicant',
    },
    {
      role: 'officer',
      label: 'Enrolment Official',
      persona: 'M. Srinivasan (Senior Scrutiny)',
      desc: '11 scrutiny desks, Cross-Doc validation matrix, Rule 49 employment check, and defect notices.',
      icon: Briefcase,
      route: '/officer/dashboard',
      badgeColor: 'primary',
      category: 'Scrutiny Officials',
    },
    {
      role: 'committee',
      label: 'Committee Member',
      persona: 'Senior Counsel P. Wilson',
      desc: 'Statutory sitting docket, Section 24 eligibility pre-read, precedent lookup & digital voting.',
      icon: Gavel,
      route: '/committee/dashboard',
      badgeColor: 'brand',
      category: 'Statutory Committee',
    },
    {
      role: 'management',
      label: 'Executive Secretary',
      persona: 'K. Balasubramanian (Secretary)',
      desc: 'Registry intake velocity, statutory SLA tracking, officer capacity balancing & BCI reports.',
      icon: Layers,
      route: '/management/dashboard',
      badgeColor: 'warning',
      category: 'Statutory Committee',
    },
    {
      role: 'admin',
      label: 'Council Admin',
      persona: 'Bar Council Registry Admin',
      desc: 'Master university roll configurations, Rule 49 commercial registers & security audit logs.',
      icon: ShieldCheck,
      route: '/admin/users',
      badgeColor: 'neutral',
      category: 'Scrutiny Officials',
    },
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
      setTimeout(() => setResetSuccess(false), 2500);
      navigate('/');
    }
  };

  const currentRoleConfig = rolesConfig.find((r) => r.role === currentRole) || rolesConfig[0];

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
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand with Toggle Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer flex items-center justify-center shrink-0"
              title={isSidebarCollapsed ? 'Expand sidebar (⌘B)' : 'Collapse sidebar (⌘B)'}
              aria-label="Toggle navigation sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--vignxs-crimson)] flex items-center justify-center text-white shadow-xs group-hover:bg-[var(--vignxs-crimson-deep)] transition-colors shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-extrabold text-base text-[var(--color-text-primary)] tracking-tight font-heading">
                  AEMS
                </span>
                <span className="text-[9px] bg-[var(--vignxs-soft)] text-[var(--vignxs-crimson)] font-bold px-1.5 py-0.2 rounded border border-[var(--vignxs-pink-light)] uppercase tracking-wider">
                  OFFICE MVP
                </span>
              </div>
              <p className="text-[10px] text-[var(--color-text-secondary)] font-medium leading-tight whitespace-nowrap">
                Digital Enrolment Office
              </p>
            </div>
          </Link>
        </div>

        {/* Center / Right: Interactive Controls (All Non-Wrapping & Compact) */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-visible">
          {/* Global Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] text-xs font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0"
              title="Global Dossier Search (Press /)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
              <span className="hidden lg:inline whitespace-nowrap">Search Dossiers...</span>
              <kbd className="text-[10px] bg-[var(--color-surface-muted)] border border-[var(--color-border)] px-1.5 py-0.2 rounded font-mono font-bold text-[var(--color-text-muted)] shrink-0">
                /
              </kbd>
            </button>
          )}

          {/* Persistent Save Status Indicator */}
          <div className="hidden xl:flex items-center shrink-0">
            <SaveStatus currentLang={currentLang} />
          </div>

          {/* Functional Divider */}
          <div className="hidden sm:block h-5 w-px bg-[var(--color-border)] shrink-0" />

          {/* Bilingual Language Dropdown (Icon-first, Never Wraps) */}
          {onLanguageChange && (
            <div className="shrink-0">
              <LanguageToggle currentLang={currentLang} onLanguageChange={onLanguageChange} />
            </div>
          )}

          {/* Dark / White Theme Switcher (36x36 Icon Button, Never Wraps) */}
          {onToggleTheme && (
            <div className="shrink-0">
              <ThemeToggle currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
            </div>
          )}

          {/* Reset Demo State Button (36x36 Icon Button, Never Wraps) */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center justify-center transition-all shadow-2xs cursor-pointer shrink-0"
              title="Reset Scenario State to Fresh Demo Baseline"
              aria-label="Reset Demo State"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
            </button>
            {resetSuccess && (
              <span className="absolute -bottom-7 right-0 text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-50">
                Reset Successful!
              </span>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 relative rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center justify-center transition-all shadow-2xs cursor-pointer shrink-0 focus:ring-2 focus:ring-[var(--google-blue)]/20"
            title="Notification Centre"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 shrink-0" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--google-red)] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Keyboard Shortcuts Button */}
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center justify-center transition-all shadow-2xs cursor-pointer shrink-0"
              title="Keyboard Shortcuts Cheat Sheet (Press ?)"
              aria-label="Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4 shrink-0" />
            </button>
          )}

          {/* Functional Divider */}
          <div className="h-5 w-px bg-[var(--color-border)] shrink-0" />

          {/* Active Role Selector Dropdown (Premium Visual Popover, Never Wraps) */}
          <div className="relative shrink-0" ref={roleDropdownRef}>
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="h-9 px-2.5 sm:px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all shadow-2xs cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--google-blue)]/30"
              title="Switch demo user role"
              aria-label="Switch active role"
            >
              <span className="text-[var(--color-text-muted)] text-[10px] uppercase font-bold tracking-wider hidden sm:inline">
                ROLE:
              </span>
              <Badge variant={currentRoleConfig.badgeColor} size="sm" className="whitespace-nowrap shrink-0">
                {currentRoleConfig.label}
              </Badge>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[var(--color-text-secondary)] transition-transform duration-150 shrink-0 ${
                  roleDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[var(--color-surface-white)] border border-[var(--color-border)] rounded-xl shadow-card-hover py-2 z-50 animate-in fade-in zoom-in-95 duration-100 divide-y divide-[var(--color-border)]">
                {/* Header */}
                <div className="px-4 py-2 bg-[var(--color-surface-muted)]/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                      Switch Operating Perspective
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400">
                      5 Profiles
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                    Select an operating role to test end-to-end statutory transitions.
                  </p>
                </div>

                {/* Role Options */}
                <div className="p-1.5 max-h-[70vh] overflow-y-auto space-y-1">
                  {rolesConfig.map((item) => {
                    const Icon = item.icon;
                    const isSelected = currentRole === item.role;
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => handleRoleChange(item.role, item.route)}
                        className={`w-full p-2.5 rounded-lg text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-[var(--semantic-primary-soft)] border border-blue-300 dark:border-blue-800'
                            : 'hover:bg-[var(--color-surface-muted)] border border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-[var(--color-text-primary)]">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                                ({item.category})
                              </span>
                            </div>
                            <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 mt-0.5">
                              {item.persona}
                            </p>
                            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="shrink-0 mt-1">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Current User Pill (Compact, Never Wraps) */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-[var(--color-border)] shrink-0">
            <div className="w-8 h-8 rounded-full bg-[var(--vignxs-crimson)] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left shrink-0">
              <p className="text-xs font-bold text-[var(--color-text-primary)] leading-tight whitespace-nowrap">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight truncate max-w-[120px] whitespace-nowrap">
                {currentUser.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
