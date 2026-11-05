import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../../services/i18nService';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onLanguageChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const languages = [
    {
      code: 'en' as const,
      label: 'English',
      subtitle: 'Official Statutory Standard',
      badge: 'EN',
    },
    {
      code: 'ta' as const,
      label: 'தமிழ்',
      subtitle: 'Approved Tamil Copy',
      badge: 'தமிழ்',
    },
  ];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-white)] hover:bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--google-blue)]/30"
        title="Switch Interface Language (English / தமிழ்)"
        aria-label="Language selection"
      >
        <Globe className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
        <span className="font-bold text-xs uppercase text-[var(--color-text-primary)]">
          {currentLang}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[var(--color-text-muted)] transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[var(--color-surface-white)] border border-[var(--color-border)] rounded-xl shadow-card-hover py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-[var(--color-surface-muted)] text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            Interface Language • மொழி
          </div>
          <div className="p-1 space-y-0.5">
            {languages.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] font-bold'
                      : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                      }`}
                    >
                      {lang.badge}
                    </span>
                    <div>
                      <p className="font-bold text-xs leading-none">{lang.label}</p>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-normal">
                        {lang.subtitle}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--google-blue-strong)] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
