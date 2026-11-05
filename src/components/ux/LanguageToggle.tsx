import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../../services/i18nService';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs text-xs font-semibold">
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
          currentLang === 'en'
            ? 'bg-blue-600 text-white font-bold shadow-2xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
        title="Switch to English"
        aria-label="Switch to English"
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange('ta')}
        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-sans ${
          currentLang === 'ta'
            ? 'bg-blue-600 text-white font-bold shadow-2xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
        title="தமிழுக்கு மாறுக (Switch to Tamil)"
        aria-label="Switch to Tamil"
      >
        தமிழ்
      </button>
    </div>
  );
};

