import React from 'react';
import { Keyboard, Check, AlertCircle, FileText, Search, PanelLeft, HelpCircle, Moon } from 'lucide-react';
import { Modal } from '../common/Modal';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const shortcuts = [
    { key: '/', desc: 'Open Global Search from any screen', icon: Search },
    { key: '?', desc: 'Open this Keyboard Shortcuts cheat sheet', icon: HelpCircle },
    { key: '⌘D / Ctrl+D', desc: 'Toggle Dark / White Theme', icon: Moon },
    { key: '⌘B / Ctrl+B', desc: 'Toggle Sidebar Collapse & Expand', icon: PanelLeft },
    { key: 'J / K', desc: 'Navigate to Next / Previous case or document item', icon: Keyboard },
    { key: 'V', desc: 'Quick-Verify current document check (in Scrutiny)', icon: Check },
    { key: 'D', desc: 'Quick-Raise Deficiency Notice on active document', icon: AlertCircle },
    { key: 'N', desc: 'Add internal reviewer observation / handover note', icon: FileText },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Officer &amp; System Keyboard Shortcuts">
      <div className="space-y-4 text-xs">
        <p className="text-slate-600">
          AEMS is engineered for high-velocity, keyboard-first review under Section 5 standards:
        </p>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
          {shortcuts.map((sc, i) => {
            const Icon = sc.icon;
            return (
              <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-800">{sc.desc}</span>
                </div>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 text-slate-700 font-mono font-bold rounded-md shadow-2xs text-[11px]">
                  {sc.key}
                </kbd>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed">
          <strong>Productivity Tip:</strong> While in the Digital Case File, press <kbd className="font-mono font-bold">V</kbd> to rapidly mark compliant checks and <kbd className="font-mono font-bold">D</kbd> to trigger the preset deficiency modal.
        </div>
      </div>
    </Modal>
  );
};

