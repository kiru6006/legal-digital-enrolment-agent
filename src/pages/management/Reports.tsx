import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  FileText,
  BarChart3,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { exportApplicationsToCSV } from '../../utils/exportCsv';

export const Reports: React.FC = () => {
  const { applications } = useAEMS();

  const [selectedReport, setSelectedReport] = useState('daily');
  const [dateRange, setDateRange] = useState('Current Month (November 2026)');

  const reportsList = [
    { id: 'daily', name: 'Daily Enrolment Intake Report', desc: 'Summary of all electronic submissions filed today with payment status', records: applications.length },
    { id: 'weekly', name: 'Weekly Scrutiny Throughput Report', desc: 'Weekly comparison of files received versus files cleared by scrutiny section', records: applications.length },
    { id: 'officer_workload', name: 'Scrutiny Officer Workload Distribution', desc: 'Case allocation breakdown across senior scrutiny officers and clearance rates', records: 5 },
    { id: 'deficiency', name: 'Statutory Deficiency & Re-upload Log', desc: 'Detailed log of all open and resolved defects with citation of relevant Bar Rules', records: applications.flatMap(a => a.deficiencies).length },
    { id: 'ageing', name: 'Enrolment Dossier Ageing & SLA Analysis', desc: 'Listing of all applications pending over 7 days with identified bottleneck stages', records: 3 },
    { id: 'committee_prep', name: 'Committee Agenda Dossier Pack', desc: 'Full verified dossiers prepared for table consideration at the next statutory meeting', records: applications.filter(a => a.stage === 'committee_prep').length },
    { id: 'ai_summary', name: 'AI Intake Scrutiny Accuracy & OCR Log', desc: 'Benchmark metrics of OCR field recognition confidence and false disparity flags', records: applications.length },
  ];

  const handleExport = (reportId: string) => {
    exportApplicationsToCSV(applications, `AEMS_${reportId.toUpperCase()}_STATUTORY_REPORT.csv`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Statutory Scrutiny Reports &amp; Exports</h1>
          <p className="text-xs text-slate-500">
            Generate and export official administrative dockets for the Bar Council Secretariat.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-700">{dateRange}</span>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportsList.map((rep) => (
          <Card key={rep.id} className="flex flex-col justify-between hover:shadow-md transition-all">
            <CardHeader>
              <div className="space-y-1">
                <CardTitle className="text-sm font-bold text-slate-900">{rep.name}</CardTitle>
                <Badge variant="neutral" size="sm">
                  {rep.records} Records Available
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 leading-relaxed">{rep.desc}</p>
            </CardContent>
            <CardFooter className="pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport(rep.id)}
                icon={<Download className="w-3.5 h-3.5 text-blue-600" />}
                className="w-full text-xs"
              >
                Download CSV Export
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
