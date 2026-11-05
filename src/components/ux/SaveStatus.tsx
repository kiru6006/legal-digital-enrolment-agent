import React from 'react';
import { CheckCircle2, RotateCw, AlertTriangle } from 'lucide-react';
import { Language, t } from '../../services/i18nService';

interface SaveStatusProps {
  status?: 'saved' | 'saving' | 'error';
  lastSavedTime?: string;
  onRetry?: () => void;
  currentLang?: Language;
}

export const SaveStatus: React.FC<SaveStatusProps> = ({
  status = 'saved',
  lastSavedTime = '12:20 PM',
  onRetry,
  currentLang = 'en',
}) => {
  if (status === 'saving') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-medium">
        <RotateCw className="w-3 h-3 animate-spin text-blue-600" />
        <span>{t('saveStatusAutosaving', currentLang)}</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium">
        <AlertTriangle className="w-3 h-3 text-rose-600" />
        <span>Save failed</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="underline font-bold text-rose-800 hover:text-rose-950 ml-1"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium"
      title="All changes are automatically saved to your draft session"
    >
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      <span>
        {t('saveStatusSaved', currentLang)} {lastSavedTime}
      </span>
    </div>
  );
};

