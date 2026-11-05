import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { NotificationDrawer } from '../demo/NotificationDrawer';
import { DemoWalkthroughModal } from '../demo/DemoWalkthroughModal';

export const Layout: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  // Read initial collapse state from localStorage
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('aems_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('aems_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const toggleMobileOpen = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  // When clicking navbar menu toggle:
  // on desktop (>= 768px): collapse or expand the sidebar rail
  // on mobile (< 768px): open/close the mobile slide-in drawer
  const handleNavbarToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      toggleCollapse();
    } else {
      toggleMobileOpen();
    }
  };

  // Keyboard shortcut: Cmd+B (macOS) or Ctrl+B (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-close mobile drawer when navigating to a new route
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenWalkthrough={() => setWalkthroughOpen(true)}
        onToggleSidebar={!isLandingPage ? handleNavbarToggle : undefined}
        isSidebarCollapsed={isCollapsed}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Only show sidebar if not on landing page */}
        {!isLandingPage && (
          <Sidebar
            isCollapsed={isCollapsed}
            onToggleCollapse={toggleCollapse}
            isMobileOpen={isMobileOpen}
            onCloseMobile={closeMobile}
          />
        )}

        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {!isLandingPage && <Breadcrumbs />}
          <div className="flex-1">
            <Outlet />
          </div>

          {/* Institutional Footer */}
          <footer className="py-4 px-6 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
            <p>
              <strong>AEMS</strong> | Bar Council of Tamil Nadu and Puducherry — Statutory Digital Enrolment Office MVP.
            </p>
            <p className="text-[11px] text-slate-400">
              Interactive demonstration with simulated AI scrutiny &amp; mock state.
            </p>
          </footer>
        </main>
      </div>

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <DemoWalkthroughModal
        isOpen={walkthroughOpen}
        onClose={() => setWalkthroughOpen(false)}
      />
    </div>
  );
};
