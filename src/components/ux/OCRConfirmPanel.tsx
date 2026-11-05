import React, { useState } from 'react';
import { Sparkles, CheckCheck, Check, Lock, Edit3, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export interface ExtractedFieldItem {
  id: string;
  field: string;
  extractedValue: string;
  sourceDoc: string;
  page: number;
  confidence: number;
  confirmed: boolean;
}

interface OCRConfirmPanelProps {
  fields?: ExtractedFieldItem[];
  onConfirmAll?: () => void;
}

export const OCRConfirmPanel: React.FC<OCRConfirmPanelProps> = ({
  fields: initialFields,
  onConfirmAll,
}) => {
  const [items, setItems] = useState<ExtractedFieldItem[]>(
    initialFields || [
      {
        id: '1',
        field: 'Candidate Full Name',
        extractedValue: 'Arjun Kumar',
        sourceDoc: 'LL.B Degree Certificate',
        page: 1,
        confidence: 0.98,
        confirmed: true,
      },
      {
        id: '2',
        field: 'Law University',
        extractedValue: 'The Tamil Nadu Dr. Ambedkar Law University',
        sourceDoc: 'LL.B Degree Certificate',
        page: 1,
        confidence: 0.96,
        confirmed: true,
      },
      {
        id: '3',
        field: 'Passing Year',
        extractedValue: 'May 2024',
        sourceDoc: 'LL.B Degree Certificate',
        page: 1,
        confidence: 0.94,
        confirmed: true,
      },
      {
        id: '4',
        field: 'Marksheet Total Marks',
        extractedValue: '1980 / 3000 (66.00%)',
        sourceDoc: 'Consolidated Marksheet',
        page: 2,
        confidence: 0.96,
        confirmed: false,
      },
      {
        id: '5',
        field: 'Aadhaar / National ID',
        extractedValue: 'XXXX-XXXX-6712',
        sourceDoc: 'Masked Aadhaar Card',
        page: 1,
        confidence: 0.99,
        confirmed: true,
      },
      {
        id: '6',
        field: 'Date of Birth',
        extractedValue: '14/08/1999',
        sourceDoc: 'SSLC 10th Certificate',
        page: 1,
        confidence: 0.99,
        confirmed: true,
      },
    ]
  );

  const allConfirmed = items.every((i) => i.confirmed);

  const handleConfirmItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, confirmed: true } : item))
    );
  };

  const handleBulkConfirm = () => {
    setItems((prev) => prev.map((item) => ({ ...item, confirmed: true })));
    if (onConfirmAll) onConfirmAll();
  };

  return (
    <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4 space-y-3 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-purple-700 text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-purple-950">
              AI Administrative Extraction &bull; Confirm to Reuse Everywhere
            </h4>
            <p className="text-[11px] text-purple-800">
              Values extracted from uploaded certificates pre-fill your forms. Confirm once to lock them.
            </p>
          </div>
        </div>

        {!allConfirmed && (
          <Button
            variant="primary"
            size="sm"
            onClick={handleBulkConfirm}
            className="text-xs bg-purple-700 hover:bg-purple-800 shrink-0 font-bold"
          >
            <CheckCheck className="w-3.5 h-3.5 mr-1" />
            Confirm All 6 Extracted Values
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
              item.confirmed
                ? 'bg-white border-emerald-300'
                : 'bg-white border-amber-300 shadow-2xs'
            }`}
          >
            <div className="space-y-0.5 truncate pr-2">
              <span className="text-[10px] text-slate-400 font-semibold block truncate">
                {item.field}
              </span>
              <p className="font-bold text-slate-900 truncate">{item.extractedValue}</p>
              <div className="flex items-center gap-1 text-[10px] text-purple-700">
                <span className="truncate">From {item.sourceDoc}, p.{item.page}</span>
                <span>&bull;</span>
                <span className="font-mono font-bold">{Math.round(item.confidence * 100)}%</span>
              </div>
            </div>

            <div className="shrink-0">
              {item.confirmed ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  Locked
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleConfirmItem(item.id)}
                  className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold rounded text-[10px] cursor-pointer"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

