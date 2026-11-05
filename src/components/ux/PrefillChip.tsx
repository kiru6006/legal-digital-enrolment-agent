import React, { useState } from 'react';
import { Check, Edit3, Link2, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface PrefillChipProps {
  label: string;
  value: string;
  origin: string; // e.g. "Registration Step" or "Class 10 Certificate"
  affectedFields?: string[];
  onUpdate?: (newValue: string) => void;
}

export const PrefillChip: React.FC<PrefillChipProps> = ({
  label,
  value,
  origin,
  affectedFields = ['Personal Particulars', 'Statutory Affidavit', 'Newspaper Publication Notice'],
  onUpdate,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);
  const [confirmPropagate, setConfirmPropagate] = useState(true);

  const handleSave = () => {
    if (onUpdate) onUpdate(currentVal);
    setModalOpen(false);
  };

  return (
    <>
      <div className="inline-flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
        <Link2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <span className="text-slate-500">{label}:</span>
        <span className="font-bold text-slate-800">{value}</span>
        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({origin})</span>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 ml-1 hover:underline cursor-pointer"
        >
          <Edit3 className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Update ${label} & Propagate Across Dossier`}
      >
        <div className="space-y-4 text-xs text-slate-700">
          <p className="text-slate-600">
            This information was verified from <strong>{origin}</strong>. Editing it here will propagate across all statutory enrolment forms:
          </p>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">New Value:</label>
            <input
              type="text"
              value={currentVal}
              onChange={(e) => setCurrentVal(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            />
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5">
            <span className="font-bold text-blue-900 block">Affected Fields Preview:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-blue-950">
              {affectedFields.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={confirmPropagate}
              onChange={(e) => setConfirmPropagate(e.target.checked)}
              className="text-blue-600 rounded"
            />
            <span className="text-slate-700 font-medium">
              Update this everywhere in my enrolment docket and log change to audit trail
            </span>
          </label>

          <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} disabled={!confirmPropagate}>
              Confirm &amp; Propagate
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

