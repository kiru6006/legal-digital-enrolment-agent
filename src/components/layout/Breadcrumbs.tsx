import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  const routeNameMap: Record<string, string> = {
    applicant: 'Applicant',
    officer: 'Official Workspace',
    management: 'Management',
    committee: 'Committee',
    admin: 'Admin',
    dashboard: 'Dashboard',
    'work-queue': 'Work Queue',
    case: 'Digital Case File',
    'ai-review': 'AI Document Review',
    'time-savings': 'AI Time Reduction',
    deficiencies: 'Deficiencies',
    verification: 'Verification Desk',
    completed: 'Completed Work',
    workload: 'Team Workload',
    progress: 'Application Pipeline',
    reports: 'Statutory Reports',
    'meeting-pack': 'Meeting Pack',
    users: 'Users & Roles',
    checklists: 'Checklists',
    configuration: 'Configuration',
    'new-application': 'New Application',
    documents: 'Correction Desk',
    notifications: 'Notifications',
    appointments: 'Appointments',
  };

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-3 px-6 bg-white border-b border-slate-200">
      <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {pathnames.map((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNameMap[segment] || segment;

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-800">{displayName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-blue-600 transition-colors">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

