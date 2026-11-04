import React, { useState } from 'react';
import { Shield, ShieldAlert, History, Filter, Download, UserCheck, AlertCircle } from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';
import { User, UserRole } from '../../types/user';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { exportApplicationsToCSV } from '../../utils/exportCsv';

export const AdminUsers: React.FC = () => {
  const { currentRole, switchRole, auditEvents } = useAEMS();
  const [usersList] = useState<User[]>(mockUsers);
  const [activeTab, setActiveTab] = useState<'roles' | 'audit'>('roles');
  const [auditFilter, setAuditFilter] = useState('all');

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
  };

  const filteredAuditEvents = auditEvents.filter((ev) => {
    if (auditFilter === 'all') return true;
    return ev.action.toLowerCase().includes(auditFilter.toLowerCase()) ||
           ev.entityId.toLowerCase().includes(auditFilter.toLowerCase());
  });

  const handleExportAudit = () => {
    const csvContent =
      'EventID,Timestamp,Actor,Role,Action,EntityID,FromState,ToState,Reason\n' +
      auditEvents
        .map(
          (e) =>
            `"${e.id}","${e.timestamp}","${e.userName}","${e.userRole || ''}","${e.action}","${e.entityId}","${e.from || ''}","${e.to || ''}","${(e.reason || '').replace(/"/g, '""')}"`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AEMS_Append_Only_Audit_Log_${new Date().toISOString().substring(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Screen ADM-01 &bull; System Administration
            </span>
            <Badge variant="neutral">Illustrative Spec</Badge>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">User Governance &amp; Statutory Audit Trail</h1>
          <p className="text-xs text-slate-500">
            RBAC role designations from BRD Section 15 and immutable append-only state transition audit logs.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'roles' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Proposed Roles ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail ({auditEvents.length})</span>
          </button>
        </div>
      </div>

      {/* Statutory Constraint Callout (BRD Section 15 Compliance) */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-amber-950">Statutory Separation of Concerns (BRD Section 15):</p>
          <p className="text-amber-800 leading-relaxed">
            All 12 officer titles are marked with <strong className="font-semibold text-amber-950">PROPOSED ROLE</strong> pending formal Bar Council sanction.
            <strong className="font-semibold text-rose-900"> IT Administrator accounts possess strictly technical configuration privileges and are programmatically prohibited from making legal, scrutiny, or enrolment decisions.</strong>
          </p>
        </div>
      </div>

      {activeTab === 'roles' ? (
        /* Users Table */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-sm">Configured Statutory Role Identities ({usersList.length})</CardTitle>
              <Badge variant="warning">PROPOSED ROLES</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Officer Identity</th>
                    <th className="py-3 px-4">Proposed Statutory Role</th>
                    <th className="py-3 px-4">Assigned Department / Desk</th>
                    <th className="py-3 px-4">Decision Authority</th>
                    <th className="py-3 px-4 text-right">Switch Active Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList.map((u) => {
                    const isITAdmin = u.role === 'admin';
                    const isApplicant = u.role === 'applicant';
                    const isCommittee = u.role === 'committee';

                    return (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-slate-800">{u.proposedRole || u.designation}</span>
                            <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-1.5 py-0.5 rounded">
                              PROPOSED ROLE
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-500">{u.department || 'Enrolment Office'}</td>
                        <td className="py-3 px-4">
                          {isITAdmin ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              No Legal Authority (Admin Only)
                            </span>
                          ) : isCommittee ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              Statutory Committee (Vote)
                            </span>
                          ) : isApplicant ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-blue-700 font-medium">
                              Applicant Actions
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                              Scrutiny &amp; Verification
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant={currentRole === u.role ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => handleRoleSwitch(u.role)}
                            className="text-xs"
                          >
                            {currentRole === u.role ? 'Active Role' : 'Switch &rarr;'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Immutable Audit Log Viewer */
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <span>Append-Only Statutory Audit Trail</span>
                  <Badge variant="primary">{filteredAuditEvents.length} Events</Badge>
                </CardTitle>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Immutable chronological audit logs for all workflow state transitions and official actions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={auditFilter}
                  onChange={(e) => setAuditFilter(e.target.value)}
                  className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
                >
                  <option value="all">All Event Types</option>
                  <option value="APPLICATION">Applications</option>
                  <option value="DEFICIENCY">Deficiencies</option>
                  <option value="CORRECTION">Corrections</option>
                  <option value="VERIFICATION">Verifications</option>
                  <option value="COMMITTEE">Committee Decisions</option>
                  <option value="AEMS-2026-1045">Case AEMS-2026-1045</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportAudit}
                  icon={<Download className="w-3.5 h-3.5 text-slate-600" />}
                >
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Actor</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Target Entity</th>
                    <th className="py-3 px-4">Transition</th>
                    <th className="py-3 px-4">Reason / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuditEvents.map((ev) => (
                    <tr key={ev.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                        {ev.timestamp}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{ev.userName}</p>
                        <p className="text-[10px] text-slate-400">{ev.userRole || 'Official'}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-[10px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200">
                          {ev.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                        {ev.entityId}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {ev.from && ev.to ? (
                          <span className="text-[10px] font-mono text-slate-600">
                            {ev.from} &rarr; <span className="font-bold text-slate-900">{ev.to}</span>
                          </span>
                        ) : ev.to ? (
                          <span className="text-[10px] font-mono text-emerald-700 font-bold">{ev.to}</span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={ev.reason}>
                        {ev.reason || 'Routine official processing'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
