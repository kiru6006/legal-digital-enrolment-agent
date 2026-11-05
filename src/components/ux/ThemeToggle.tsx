import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../../services/themeService';

interface ThemeToggleProps {
  currentTheme: ThemeMode;
  onToggleTheme: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onToggleTheme,
  className = '',
}) => {
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] text-xs font-semibold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--google-blue)]/30 ${className}`}
      title={isDark ? 'Switch to White (Light) Theme' : 'Switch to Dark Theme'}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-in spin-in-90 duration-200" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-indigo-500 shrink-0 animate-in spin-in-90 duration-200" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
};
