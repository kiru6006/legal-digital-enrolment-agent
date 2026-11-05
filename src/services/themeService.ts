export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'aems_theme';

/**
 * Returns stored user theme ('light' or 'dark'), defaulting to 'light' (white).
 */
export const getStoredTheme = (): ThemeMode => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'light';
};

/**
 * Applies the given theme to <html> and <body> and persists to localStorage.
 */
export const applyTheme = (theme: ThemeMode): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    document.body?.classList.add('dark');
  } else {
    root.classList.remove('dark');
    document.body?.classList.remove('dark');
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // fallback
  }
};

/**
 * Toggles theme between 'light' and 'dark'.
 */
export const toggleTheme = (currentTheme: ThemeMode): ThemeMode => {
  const nextTheme: ThemeMode = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  return nextTheme;
};
