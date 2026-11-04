import React from 'react';
import {
  Clock,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  FileText,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const WorkReductionPanel: React.FC = () => {
  const chartData = [
    { category: 'Document Intake & Sorting', manual: 8, ai: 2, saved: 6 },
    { category: 'OCR & Roll No Verification', manual: 12, ai: 3, saved: 9 },
    { category: 'Name & Demographic Match', manual: 7, ai: 2, saved: 5 },
    { category: 'Checklist Compliance', manual: 5, ai: 1, saved: 4 },
    { category: 'Deficiency Notice Drafting', manual: 8, ai: 4, saved: 4 },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Efficiency Analysis</span>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          AI Workload Reduction &amp; Time Savings Benchmark
        </h1>
        <p className="text-xs text-slate-500">
          Side-by-side comparative analysis of traditional manual scrutiny versus AI-assisted digital intake.
        </p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-blue-200 bg-blue-50/20">
          <CardContent className="p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Traditional Manual Scrutiny
            </span>
            <p className="text-3xl font-extrabold text-slate-800">40 mins</p>
            <p className="text-xs text-slate-500">Average handling time per file</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-5 space-y-1">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              AI-Assisted Digital Office
            </span>
            <p className="text-3xl font-extrabold text-purple-700">12 mins</p>
            <p className="text-xs text-purple-600">Average handling time per file</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/20">
          <CardContent className="p-5 space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Illustrative Time Saved
            </span>
            <p className="text-3xl font-extrabold text-emerald-700">28 mins</p>
            <p className="text-xs text-emerald-600">70% administrative workload reduction</p>
          </CardContent>
        </Card>
      </div>

      {/* Side-by-Side Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Workflow Step Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4 w-1/3">Manual Legacy Process</th>
                  <th className="py-3 px-4 w-1/3 bg-purple-50/40 text-purple-900">
                    AI-Assisted Workflow (AEMS)
                  </th>
                  <th className="py-3 px-4 w-1/3">Institutional Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    manual: 'Open documents individually from folders',
                    ai: 'Automatic document classification and sorting',
                    impact: 'Immediate categorization upon candidate submission',
                  },
                  {
                    manual: 'Read certificates manually for roll numbers & dates',
                    ai: 'Extract key fields via OCR directly into data schema',
                    impact: 'Eliminates repetitive data entry across screens',
                  },
                  {
                    manual: 'Manually cross-verify spellings on degree vs Aadhaar',
                    ai: 'Automated cross-document consistency matching',
                    impact: 'Fuzzy-match flags name abbreviations instantly',
                  },
                  {
                    manual: 'Check paper checklist item by item',
                    ai: 'Automated statutory checklist preparation',
                    impact: 'Pre-evaluates compliance against Bar Rules',
                  },
                  {
                    manual: 'Draft deficiency letters manually on typewriter/word',
                    ai: 'One-click AI-drafted deficiency notice with templates',
                    impact: 'Standardized legal notices sent within seconds',
                  },
                  {
                    manual: 'Prepare case summary manually for Committee',
                    ai: 'Structured digital case file summary generation',
                    impact: 'Ready-to-table dossiers for Committee sittings',
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.manual}</td>
                    <td className="py-3 px-4 bg-purple-50/20 text-purple-950 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{row.ai}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Visual Chart of Time Savings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Scrutiny Stage Duration Benchmark (Minutes per File)</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis unit=" min" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="manual" name="Manual Handling (mins)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ai" name="AI-Assisted Digital Office (mins)" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Illustrative Demo Benchmark:</strong> Figures shown represent modeled administrative assumptions for presentation purposes, based on standard legal scrutiny timings. Final throughput depends on document scan quality and statutory verification requirements.
        </p>
      </div>
    </div>
  );
};

