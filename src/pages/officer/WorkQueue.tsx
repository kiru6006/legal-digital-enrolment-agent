import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Users,
  FolderOpen,
  ArrowUpDown,
  CheckSquare,
  Square,
  Sparkles,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { ApplicationRecord } from '../../types/application';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { exportApplicationsToCSV } from '../../utils/exportCsv';
import { mockUsers } from '../../data/mockUsers';

export const WorkQueue: React.FC = () => {
  const { applications, reassignApplication } = useAEMS();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState(searchParams.get('stage') || 'all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [officerFilter, setOfficerFilter] = useState('all');

  // Selection & Bulk modal
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkAssignModalOpen, setBulkAssignModalOpen] = useState(false);
  const [targetOfficerId, setTargetOfficerId] = useState(mockUsers[1].id);

  // Sorting
  const [sortField, setSortField] = useState<'submissionDate' | 'applicantName' | 'priority'>('submissionDate');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter logic
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.education.lawDegree.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStage = stageFilter === 'all' || app.stage === stageFilter;
      const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
      const matchesOfficer = officerFilter === 'all' || app.assignedOfficerId === officerFilter;

      return matchesSearch && matchesStage && matchesPriority && matchesOfficer;
    }).sort((a, b) => {
      if (sortField === 'applicantName') {
        return sortAsc
          ? a.applicantName.localeCompare(b.applicantName)
          : b.applicantName.localeCompare(a.applicantName);
      }
      return sortAsc
        ? a.submissionDate.localeCompare(b.submissionDate)
        : b.submissionDate.localeCompare(a.submissionDate);
    });
  }, [applications, searchTerm, stageFilter, priorityFilter, officerFilter, sortField, sortAsc]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApps.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApps.map((a) => a.id));
    }
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkReassign = () => {
    const officer = mockUsers.find((u) => u.id === targetOfficerId);
    if (!officer) return;

    selectedIds.forEach((id) => {
      reassignApplication(id, officer.id, officer.name);
    });

    setBulkAssignModalOpen(false);
    setSelectedIds([]);
  };

  const officersList = mockUsers.filter((u) => u.role === 'officer');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Official Work Queue</h1>
          <p className="text-xs text-slate-500">
            Real-time digital docket of advocate enrolment applications across Tamil Nadu &amp; Puducherry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedIds.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setBulkAssignModalOpen(true)}
              icon={<Users className="w-4 h-4 text-blue-600" />}
            >
              Bulk Assign ({selectedIds.length})
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => exportApplicationsToCSV(filteredApps)}
            icon={<Download className="w-4 h-4 text-slate-600" />}
          >
            Export CSV ({filteredApps.length})
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, ID (e.g. 00125)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            {/* Stage filter */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="all">All Stages ({applications.length})</option>
              <option value="submitted">New / Submitted</option>
              <option value="ai_review">AI Intake Scrutiny</option>
              <option value="officer_scrutiny">Officer Scrutiny</option>
              <option value="correction_requested">Correction Required</option>
              <option value="verification">Verification in Progress</option>
              <option value="committee_prep">Ready for Committee</option>
              <option value="committee_review">Before Committee</option>
              <option value="completed">Enrolment Approved</option>
            </select>

            {/* Priority filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Officer filter */}
            <select
              value={officerFilter}
              onChange={(e) => setOfficerFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="all">All Assigned Officers</option>
              {officersList.map((off) => (
                <option key={off.id} value={off.id}>
                  {off.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Main Applications Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold select-none">
                <tr>
                  <th className="py-3 px-3 w-8">
                    <button
                      onClick={toggleSelectAll}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      {selectedIds.length === filteredApps.length && filteredApps.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-3">Application Ref</th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:text-slate-900"
                    onClick={() => {
                      setSortField('applicantName');
                      setSortAsc(!sortAsc);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>Applicant Name</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3">Degree &amp; Law Faculty</th>
                  <th className="py-3 px-3">Stage / Status</th>
                  <th className="py-3 px-3">AI Scrutiny</th>
                  <th className="py-3 px-3">Assigned Officer</th>
                  <th className="py-3 px-3">Priority</th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:text-slate-900"
                    onClick={() => {
                      setSortField('submissionDate');
                      setSortAsc(!sortAsc);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>Submitted</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-slate-400">
                      No applications found matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => {
                    const isSelected = selectedIds.includes(app.id);

                    return (
                      <tr
                        key={app.id}
                        onClick={() => navigate(`/officer/case/${app.id}`)}
                        className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${
                          isSelected ? 'bg-blue-50/70' : ''
                        }`}
                      >
                        <td className="py-3 px-3" onClick={(e) => toggleSelect(app.id, e)}>
                          <button className="text-slate-400 hover:text-slate-700">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-blue-700">
                          {app.refNumber}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-slate-900">{app.applicantName}</p>
                          <p className="text-[11px] text-slate-400">{app.address.city}, TN</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-medium text-slate-800">{app.education.lawDegree}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[160px]">
                            {app.education.lawCollege}
                          </p>
                        </td>
                        <td className="py-3 px-3">
                          <Badge
                            size="sm"
                            variant={
                              app.stage === 'completed'
                                ? 'success'
                                : app.stage === 'correction_requested'
                                ? 'warning'
                                : app.stage === 'deferred'
                                ? 'danger'
                                : 'primary'
                            }
                          >
                            {app.statusLabel}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span className="text-[11px] font-medium text-slate-700">
                              {app.aiReviewSummary ? 'Analyzed (92%)' : 'Intake Ready'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-medium">
                          {app.assignedOfficerName}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                              app.priority === 'critical'
                                ? 'bg-rose-100 text-rose-800'
                                : app.priority === 'high'
                                ? 'bg-amber-100 text-amber-800'
                                : app.priority === 'medium'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {app.priority}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                          {app.submissionDate}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/officer/case/${app.id}`);
                            }}
                            className="text-xs"
                          >
                            Open Case
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Assign Modal */}
      <Modal
        isOpen={bulkAssignModalOpen}
        onClose={() => setBulkAssignModalOpen(false)}
        title={`Bulk Reassign ${selectedIds.length} Application(s)`}
        description="Select designated Enrolment Officer to receive responsibility for selected cases."
        maxWidth="md"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setBulkAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleBulkReassign}>
              Confirm Reassignment
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-xs">
          <label className="block font-semibold text-slate-700">Target Scrutiny Officer:</label>
          <select
            value={targetOfficerId}
            onChange={(e) => setTargetOfficerId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
          >
            {officersList.map((off) => (
              <option key={off.id} value={off.id}>
                {off.name} — {off.designation}
              </option>
            ))}
          </select>
          <p className="text-slate-500 text-[11px]">
            *Simulated administrative workload redistribution. Updates application assigned state.
          </p>
        </div>
      </Modal>
    </div>
  );
};
