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
      className={`w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] flex items-center justify-center transition-all shadow-2xs cursor-pointer shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[var(--google-blue)]/30 ${className}`}
      title={isDark ? 'Switch to White (Light) Theme (⌘D)' : 'Switch to Dark Theme (⌘D)'}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 shrink-0 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};
