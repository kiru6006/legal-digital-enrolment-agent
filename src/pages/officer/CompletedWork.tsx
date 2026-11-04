import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Search,
  Download,
  FolderOpen,
  Calendar,
  Filter,
  User,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { exportApplicationsToCSV } from '../../utils/exportCsv';

export const CompletedWork: React.FC = () => {
  const { applications } = useAEMS();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const completedApps = applications.filter(
    (app) => app.stage === 'completed' || app.stage === 'committee_prep' || app.stage === 'decision_recorded'
  );

  const filtered = completedApps.filter(
    (app) =>
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.refNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Completed &amp; Forwarded Cases</h1>
          <p className="text-xs text-slate-500">
            Dockets that have cleared scrutiny, completed document verification, or received statutory committee approval.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => exportApplicationsToCSV(filtered, 'AEMS_Completed_Cases_Report.csv')}
          icon={<Download className="w-4 h-4 text-slate-600" />}
        >
          Export CSV ({filtered.length})
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search completed files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Docket Ref</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Law Faculty</th>
                  <th className="py-3 px-4">Assigned Officer</th>
                  <th className="py-3 px-4">Statutory Outcome</th>
                  <th className="py-3 px-4">Completion Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No completed cases matching search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">
                        {app.refNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {app.applicantName}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {app.education.lawDegree} ({app.education.lawCollege})
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {app.assignedOfficerName}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          size="sm"
                          variant={app.stage === 'completed' ? 'success' : 'primary'}
                        >
                          {app.statusLabel}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                        {app.lastUpdated}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/officer/case/${app.id}`)}
                          className="text-xs"
                        >
                          View File
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

