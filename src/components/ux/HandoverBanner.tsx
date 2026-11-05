import React, { useState } from 'react';
import { History, UserCheck, AlertCircle, FileCheck2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Badge } from '../common/Badge';

interface HandoverBannerProps {
  previousOfficer?: string;
  handoverNote?: string;
  newDocsCount?: number;
  newCorrectionsCount?: number;
  lastVisitDate?: string;
}

export const HandoverBanner: React.FC<HandoverBannerProps> = ({
  previousOfficer = 'R. Lakshmi (Senior Scrutiny Officer)',
  handoverNote = 'Initial demographic and law degree verification cleared. Awaiting sworn notary affidavit for B.Com name initial variation. Do not re-verify TNDALU law degree authenticity.',
  newDocsCount = 1,
  newCorrectionsCount = 1,
  lastVisitDate = 'Yesterday, 04:15 PM',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  if (isDismissed) return null;

  return (
    <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-xl p-3.5 shadow-2xs space-y-2 text-xs text-amber-950 dark:text-amber-200 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
          <span className="font-bold text-amber-900 dark:text-amber-200">
            What Changed Since Your Last Visit ({lastVisitDate}) &bull; Handover Context
          </span>
          <Badge variant="warning" size="sm">
            Work Handover Note
          </Badge>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-100 rounded cursor-pointer"
            aria-label="Toggle details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-100 rounded cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-2 pt-1">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-amber-900 dark:text-amber-300">
            <span className="font-semibold flex items-center gap-1">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              New Rectification Uploads: <strong>{newCorrectionsCount} file</strong>
            </span>
            <span>&bull;</span>
            <span className="font-semibold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              Prior Officer: <strong>{previousOfficer}</strong>
            </span>
          </div>

          <div className="p-2.5 bg-white/80 dark:bg-[var(--color-surface-white)] rounded-lg border border-amber-200 dark:border-amber-800/40 text-[11px] leading-relaxed text-slate-800 dark:text-[var(--color-text-primary)]">
            <strong>Previous Reviewer Note:</strong> &ldquo;{handoverNote}&rdquo;
          </div>
        </div>
      )}
    </div>
  );
};

