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
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { UserRole } from '../../types/user';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenWalkthrough: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, onOpenWalkthrough }) => {
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-100">Bar Council of Tamil Nadu &amp; Puducherry</span>
          <span className="text-slate-400">| Statutory Enrolment Platform MVP</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-amber-300 font-mono text-[11px]">
            DEMO ENVIRONMENT • SYNTHETIC DATA
          </span>
          <button
            onClick={onOpenWalkthrough}
            className="text-blue-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Demo Script</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-800 transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">AEMS</span>
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.5 rounded">
                  OFFICE MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Digital Enrolment Office</p>
            </div>
          </Link>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex items-center gap-2.5">
          {/* Active Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium transition-all shadow-2xs focus:ring-2 focus:ring-blue-500/20"
              title="Switch demo user role"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Role:</span>
                <Badge
                  variant={
                    currentRole === 'officer'
                      ? 'primary'
                      : currentRole === 'management'
                      ? 'warning'
                      : currentRole === 'committee'
                      ? 'danger'
                      : currentRole === 'admin'
                      ? 'neutral'
                      : 'violet'
                  }
                  size="sm"
                >
                  {rolesList.find((r) => r.role === currentRole)?.label}
                </Badge>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Demo Role
                </div>
                {rolesList.map((item) => {
                  const Icon = item.icon;
                  const isSelected = currentRole === item.role;
                  return (
                    <button
                      key={item.role}
                      onClick={() => handleRoleChange(item.role, item.route)}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
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
            icon={<RotateCcw className="w-3.5 h-3.5 text-slate-500" />}
            title="Reset scenario state back to fresh demo baseline"
          >
            <span className="hidden sm:inline">Reset Demo</span>
          </Button>
          {resetSuccess && (
            <span className="text-xs text-emerald-600 font-medium">Scenario Reset!</span>
          )}

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-blue-500/20"
            title="Notification Centre"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Current User Pill */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-medium text-xs flex items-center justify-center">
              {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[140px]">
                {currentUser.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
