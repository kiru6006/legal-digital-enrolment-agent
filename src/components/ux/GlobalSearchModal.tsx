import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, User, FileText, BadgeCheck, X } from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { applications } = useAEMS();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return applications.slice(0, 5);
    const q = query.toLowerCase();
    return applications.filter(
      (app) =>
        app.applicantName.toLowerCase().includes(q) ||
        app.refNumber.toLowerCase().includes(q) ||
        app.phone.includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.education.lawCollege.toLowerCase().includes(q) ||
        app.education.lawDegree.toLowerCase().includes(q)
    );
  }, [applications, query]);

  const handleSelect = (appId: string) => {
    onClose();
    navigate(`/officer/case/${appId}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Dossier &amp; Candidate Search">
      <div className="space-y-4 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search by candidate name, AEMS ref, mobile, college, degree..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1">
            <span>Matching Applications ({results.length})</span>
            <span>Jump to Dossier</span>
          </div>

          {results.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              No matching applicant or digital case file found.
            </div>
          ) : (
            results.map((app) => (
              <div
                key={app.id}
                onClick={() => handleSelect(app.id)}
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 group-hover:text-blue-700">
                      {app.applicantName}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold">
                      {app.refNumber}
                    </span>
                    <Badge variant="neutral" size="sm">
                      {app.statusLabel}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {app.education.lawCollege} &bull; {app.education.lawDegree} ({app.education.lawPassingYear})
                  </p>
                </div>

                <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-600">
                  <span className="text-[10px] font-semibold hidden sm:inline">Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
