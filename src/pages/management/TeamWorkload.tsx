import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { mockUsers } from '../../data/mockUsers';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';

export const TeamWorkload: React.FC = () => {
  const { applications, reassignApplication } = useAEMS();
  const navigate = useNavigate();

  const officers = mockUsers.filter((u) => u.role === 'officer');

  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [sourceOfficerId, setSourceOfficerId] = useState(officers[0].id);
  const [targetOfficerId, setTargetOfficerId] = useState(officers[1].id);
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  // Compute stats per officer dynamically
  const workloadStats = officers.map((officer) => {
    const assigned = applications.filter((a) => a.assignedOfficerId === officer.id || a.assignedOfficerName === officer.name);
    const newCases = assigned.filter((a) => a.stage === 'submitted' || a.stage === 'ai_review').length;
    const pendingCases = assigned.filter((a) => a.stage === 'officer_scrutiny' || a.stage === 'verification' || a.stage === 'correction_requested').length;
    const completedCases = assigned.filter((a) => a.stage === 'completed' || a.stage === 'committee_prep').length;
    const externalPending = assigned.filter((a) => a.statusLabel.toLowerCase().includes('external')).length;

    let workloadStatus: 'Optimal' | 'Heavy' | 'Light' = 'Optimal';
    if (assigned.length > 5) workloadStatus = 'Heavy';
    if (assigned.length < 3) workloadStatus = 'Light';

    return {
      officer,
      total: assigned.length,
      newCases,
      pendingCases,
      completedCases,
      externalPending,
      workloadStatus,
    };
  });

  const handleExecuteReassignment = () => {
    const sourceApps = applications.filter((a) => a.assignedOfficerId === sourceOfficerId);
    if (sourceApps.length === 0) return;

    const targetOfficer = officers.find((o) => o.id === targetOfficerId);
    if (!targetOfficer) return;

    // Move first pending application
    const appToMove = sourceApps[0];
    reassignApplication(appToMove.id, targetOfficer.id, targetOfficer.name);

    setReassignModalOpen(false);
  };

  const handleSaveOperationalNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Enrolment Scrutiny Team Workload &amp; Capacity</h1>
          <p className="text-xs text-slate-500">
            Workforce capacity management designed to identify bottlenecks and balance scrutiny distribution.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setReassignModalOpen(true)}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Rebalance Caseload
        </Button>
      </div>

      {/* Purpose Banner */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
        <span className="font-bold text-slate-900">Institutional Governance Notice:</span>
        <p className="leading-relaxed">
          This dashboard assists leadership in detecting uneven caseload allocations and pending university liaison delays. It is not an employee ranking or punitive quota system.
        </p>
      </div>

      {/* Team Workload Table (Screen MGT-02) */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Officer Details</th>
                  <th className="py-3 px-4 text-center">Assigned Cases</th>
                  <th className="py-3 px-4 text-center">New Intake</th>
                  <th className="py-3 px-4 text-center">Pending Scrutiny</th>
                  <th className="py-3 px-4 text-center">Completed / Prepared</th>
                  <th className="py-3 px-4 text-center">External Delays</th>
                  <th className="py-3 px-4">Capacity Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workloadStats.map((item) => (
                  <tr key={item.officer.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                          {item.officer.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{item.officer.name}</p>
                          <p className="text-[10px] text-slate-400">{item.officer.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 text-sm">
                      {item.total}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-blue-700">
                      {item.newCases}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-amber-700">
                      {item.pendingCases}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-emerald-700">
                      {item.completedCases}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-slate-500">
                      {item.externalPending}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        size="sm"
                        variant={
                          item.workloadStatus === 'Optimal'
                            ? 'success'
                            : item.workloadStatus === 'Heavy'
                            ? 'danger'
                            : 'neutral'
                        }
                      >
                        {item.workloadStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/officer/work-queue?officer=${item.officer.id}`)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        View Cases &rarr;
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Operational Note Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Registrar's Operational Directives &amp; Section Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <textarea
            rows={2}
            placeholder="Enter administrative directive for the scrutiny section (e.g. Prioritize convocation certificates for next week's ceremony sitting)..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Directives are circulated to all senior scrutiny officers.
            </span>
            <div className="flex items-center gap-2">
              {noteSaved && <span className="text-emerald-600 font-semibold text-xs">Directive Circulated!</span>}
              <Button variant="primary" size="sm" onClick={handleSaveOperationalNote}>
                Circulate Directive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Rebalance Caseload */}
      <Modal
        isOpen={reassignModalOpen}
        onClose={() => setReassignModalOpen(false)}
        title="Rebalance Scrutiny Caseload"
        description="Redistribute pending dockets between officers to optimize processing turnaround."
        maxWidth="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setReassignModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleExecuteReassignment}>
              Execute Rebalance
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">From Officer (Transfer Source):</label>
            <select
              value={sourceOfficerId}
              onChange={(e) => setSourceOfficerId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
              {officers.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} ({applications.filter((a) => a.assignedOfficerId === o.id).length} cases)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">To Officer (Transfer Destination):</label>
            <select
              value={targetOfficerId}
              onChange={(e) => setTargetOfficerId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
              {officers.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} ({applications.filter((a) => a.assignedOfficerId === o.id).length} cases)
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

