import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { NotificationDrawer } from '../demo/NotificationDrawer';
import { DemoWalkthroughModal } from '../demo/DemoWalkthroughModal';

export const Layout: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenWalkthrough={() => setWalkthroughOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Only show sidebar if not on landing page */}
        {!isLandingPage && <Sidebar />}

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

