import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { NotificationDrawer } from '../demo/NotificationDrawer';
import { DemoWalkthroughModal } from '../demo/DemoWalkthroughModal';
import { HelpFooter } from '../ux/HelpFooter';
import { GlobalSearchModal } from '../ux/GlobalSearchModal';
import { KeyboardShortcutsModal } from '../ux/KeyboardShortcutsModal';
import { Language, getStoredLanguage, setStoredLanguage } from '../../services/i18nService';
import { ThemeMode, getStoredTheme, applyTheme, toggleTheme } from '../../services/themeService';

export const Layout: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Read initial theme and language state
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(getStoredTheme);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    setStoredLanguage(lang);
  };

  const handleToggleTheme = () => {
    setCurrentTheme((prev) => toggleTheme(prev));
  };

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

  const handleNavbarToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      toggleCollapse();
    } else {
      toggleMobileOpen();
    }
  };

  // Global Keyboard shortcuts:
  // Cmd+B / Ctrl+B: toggle sidebar
  // /: open global search
  // ?: open keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when actively typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapse();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleToggleTheme();
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === '?' && !isInput) {
        e.preventDefault();
        setShortcutsOpen(true);
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
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] flex flex-col font-sans transition-colors duration-150">
      <Navbar
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenWalkthrough={() => setWalkthroughOpen(true)}
        onToggleSidebar={!isLandingPage ? handleNavbarToggle : undefined}
        isSidebarCollapsed={isCollapsed}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        currentTheme={currentTheme}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
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

          {/* Section 1.1: Persistent Help & Support Footer on Every Page */}
          <HelpFooter currentLang={currentLang} />

          {/* Institutional Copyright Footer */}
          <footer className="py-3 px-6 border-t border-[var(--color-border)] bg-[var(--color-surface-white)] text-xs text-[var(--color-text-secondary)] flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
            <p>
              <strong>AEMS</strong> | Bar Council of Tamil Nadu and Puducherry — Statutory Digital Enrolment Office.
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)]">
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

      {/* Global Dossier Search Modal (Section 5) */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Keyboard Shortcuts Cheat Sheet (Section 5) */}
      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
};

