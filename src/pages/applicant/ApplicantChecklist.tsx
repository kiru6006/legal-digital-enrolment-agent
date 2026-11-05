import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Calendar,
  ShieldCheck,
  Building,
  Sparkles,
  ExternalLink,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';

interface ChecklistItem {
  id: string;
  categoryNumber: number;
  title: string;
  subTitle: string;
  ruleRef: string;
  mandatory: boolean;
  physicalRequirement: 'Original + 2 Attested Copies' | 'Original for Inspection Only' | 'Self-Attested Copy';
  status: 'verified' | 'flagged' | 'uploaded' | 'pending';
  docId?: string;
  uploadedFileName?: string;
  aiClassification?: string;
  aiConfidence?: number;
}

export const ApplicantChecklist: React.FC = () => {
  const { primaryApplication } = useAEMS();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'mandatory' | 'academic' | 'declarations'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // 11 statutory categories of documents
  const checklistData: ChecklistItem[] = [
    {
      id: 'chk-1',
      categoryNumber: 1,
      title: 'Class 10 / SSLC Secondary School Certificate',
      subTitle: 'Statutory proof of date of birth and parentage names.',
      ruleRef: 'Advocates Act 1961 Sec 24(1)(a)',
      mandatory: true,
      physicalRequirement: 'Original + 2 Attested Copies',
      status: 'verified',
      uploadedFileName: 'SSLC_10th_Certificate.pdf',
      aiClassification: 'Secondary School Leaving Certificate (10th)',
      aiConfidence: 0.99,
    },
    {
      id: 'chk-2',
      categoryNumber: 2,
      title: 'Class 12 / Higher Secondary (HSC) Certificate',
      subTitle: 'Proof of continuous 10+2 academic schooling pattern.',
      ruleRef: 'BCI Education Rules 2008 Rule 5',
      mandatory: true,
      physicalRequirement: 'Original + 2 Attested Copies',
      status: 'verified',
      uploadedFileName: 'HSC_12th_Certificate.pdf',
      aiClassification: 'Higher Secondary School Certificate (12th)',
      aiConfidence: 0.98,
    },
    {
      id: 'chk-3',
      categoryNumber: 3,
      title: 'Qualifying Basic Undergraduate Degree (B.Com)',
      subTitle: 'Required for 3-Year LL.B stream to confirm qualifying degree.',
      ruleRef: 'BCI Enrolment Rules Rule 4',
      mandatory: true,
      physicalRequirement: 'Original + 2 Attested Copies',
      status: 'flagged',
      docId: 'doc-002',
      uploadedFileName: 'BCom_Degree_MadrasUniv.pdf',
      aiClassification: 'Undergraduate Degree Certificate',
      aiConfidence: 0.89,
    },
    {
      id: 'chk-4',
      categoryNumber: 4,
      title: 'Law Degree Certificate / Provisional Certificate',
      subTitle: 'From recognized university accredited by the Bar Council of India.',
      ruleRef: 'Advocates Act 1961 Sec 24(1)(c)',
      mandatory: true,
      physicalRequirement: 'Original + 2 Attested Copies',
      status: 'verified',
      docId: 'doc-001',
      uploadedFileName: 'LLB_Degree_Final_ArjunKumar.pdf',
      aiClassification: 'Statutory Law Degree Certificate (LL.B)',
      aiConfidence: 0.94,
    },
    {
      id: 'chk-5',
      categoryNumber: 5,
      title: 'Consolidated Statement of Marks (All Semesters)',
      subTitle: 'Verifies zero backlogs and regular passing percentage.',
      ruleRef: 'BCI Education Rules Schedule II',
      mandatory: true,
      physicalRequirement: 'Original + 2 Attested Copies',
      status: 'verified',
      docId: 'doc-003',
      uploadedFileName: 'TNDALU_Consolidated_Marksheet.pdf',
      aiClassification: 'Consolidated Law Marksheet (Sem I-VI)',
      aiConfidence: 0.96,
    },
    {
      id: 'chk-6',
      categoryNumber: 6,
      title: 'Character & Moral Fitness Certificate (Form VI)',
      subTitle: 'Signed by a Senior Advocate of at least 10 years standing at Bar.',
      ruleRef: 'BCTNP Enrolment Rules Form VI',
      mandatory: true,
      physicalRequirement: 'Original for Inspection Only',
      status: 'verified',
      uploadedFileName: 'Form_VI_Soundararajan.pdf',
      aiClassification: 'Bar Council Form VI Character Attestation',
      aiConfidence: 0.95,
    },
    {
      id: 'chk-7',
      categoryNumber: 7,
      title: 'Character & Moral Fitness Certificate (Form VII)',
      subTitle: 'Signed by a second practicing Advocate of at least 10 years standing.',
      ruleRef: 'BCTNP Enrolment Rules Form VII',
      mandatory: true,
      physicalRequirement: 'Original for Inspection Only',
      status: 'verified',
      uploadedFileName: 'Form_VII_Meenakshi.pdf',
      aiClassification: 'Bar Council Form VII Character Attestation',
      aiConfidence: 0.95,
    },
    {
      id: 'chk-8',
      categoryNumber: 8,
      title: 'Territorial Residence Proof (Tamil Nadu / Puducherry)',
      subTitle: 'Electricity bill / Passport / Gas connection within jurisdiction.',
      ruleRef: 'Advocates Act Sec 24(1)(e)',
      mandatory: true,
      physicalRequirement: 'Self-Attested Copy',
      status: 'flagged',
      docId: 'doc-005',
      uploadedFileName: 'Electricity_Bill_July2026.pdf',
      aiClassification: 'TANGEDCO Utility Receipt (Address)',
      aiConfidence: 0.72,
    },
    {
      id: 'chk-9',
      categoryNumber: 9,
      title: 'Solemn Undertaking & Bar Rule 49 Non-Employment Affidavit',
      subTitle: 'Notarized on ₹100 non-judicial stamp paper affirming no commercial trade.',
      ruleRef: 'BCI Bar Rules Chapter II Rule 49',
      mandatory: true,
      physicalRequirement: 'Original for Inspection Only',
      status: 'verified',
      uploadedFileName: 'Affidavit_Undertaking_Rule49.pdf',
      aiClassification: 'Notarized Sworn Affidavit (Rule 49)',
      aiConfidence: 0.97,
    },
    {
      id: 'chk-10',
      categoryNumber: 10,
      title: 'Newspaper Publication Notice (Tamil & English Dailies)',
      subTitle: 'Publication cutting announcing intention to enroll under BCTNP.',
      ruleRef: 'BCTNP Gazette Notification Procedure',
      mandatory: true,
      physicalRequirement: 'Original for Inspection Only',
      status: 'verified',
      uploadedFileName: 'DinaThanthi_Notice_Clipping.pdf',
      aiClassification: 'Public Notice Press Clipping',
      aiConfidence: 0.93,
    },
    {
      id: 'chk-11',
      categoryNumber: 11,
      title: 'Regular Attendance & Non-Distance Study Certificate',
      subTitle: 'Issued by Law College Principal certifying 70%+ regular classroom lecture attendance.',
      ruleRef: 'BCI Resolution No. 12/2010',
      mandatory: true,
      physicalRequirement: 'Original + 2 Attested Copies',
      status: 'verified',
      uploadedFileName: 'TNDALU_Attendance_Certificate.pdf',
      aiClassification: 'Institutional Study Mode Certificate',
      aiConfidence: 0.96,
    },
  ];

  const filteredChecklist = checklistData.filter((item) => {
    if (activeTab === 'mandatory') return item.mandatory;
    if (activeTab === 'academic') return item.categoryNumber <= 5 || item.categoryNumber === 11;
    if (activeTab === 'declarations') return item.categoryNumber >= 6 && item.categoryNumber <= 10;
    return true;
  });

  const handleDownloadPass = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Screens A03 &amp; A22 • Statutory Checklist
            </span>
            <span className="text-xs text-slate-400 font-mono">Ref: {primaryApplication.refNumber}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            11-Category Dynamic Document Checklist &amp; Physical Pass
          </h1>
          <p className="text-xs text-slate-500">
            Statutory submission dossier for {primaryApplication.applicantName} under Bar Council of Tamil Nadu and Puducherry Enrolment Rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            Print Checklist
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadPass}
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Download Robing Pass (PDF)
          </Button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Robing &amp; Physical Verification Pass generated successfully for {primaryApplication.refNumber}!</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">BCTNP-PASS-2026-1045.pdf</span>
        </div>
      )}

      {/* Physical Robing & Verification Schedule Card */}
      <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-white to-blue-50/40">
        <CardContent className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="blue" className="text-[10px]">
                Physical Verification Desk
              </Badge>
              <span className="text-xs text-slate-500 font-medium">Slot Confirmed</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Tuesday, 10 Nov 2026 at 10:00 AM — Desk 3
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl">
              Venue: <span className="font-semibold text-slate-800">Bar Council Auditorium, High Court Campus, Chennai - 600104</span>. Candidates must appear in prescribed Advocate Robing attire (White shirt, black tie/bands, black trousers, and Advocate gown).
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/applicant/appointments')}
              className="text-xs bg-white"
            >
              Reschedule Slot
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadPass}
              className="text-xs bg-indigo-700 hover:bg-indigo-800 text-white"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Get Verification Pass
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All 11 Statutory Documents' },
            { id: 'mandatory', label: 'Mandatory Originals' },
            { id: 'academic', label: 'Academic & Degree (1-5, 11)' },
            { id: 'declarations', label: 'Affidavits & Conduct (6-10)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Showing {filteredChecklist.length} requirements
        </span>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredChecklist.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border transition-all bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              item.status === 'flagged'
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  item.status === 'verified'
                    ? 'bg-emerald-100 text-emerald-700'
                    : item.status === 'flagged'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.categoryNumber}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <Badge variant={item.mandatory ? 'red' : 'gray'} className="text-[10px]">
                    {item.mandatory ? 'Mandatory' : 'Conditional'}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono">{item.ruleRef}</span>
                </div>
                <p className="text-[11px] text-slate-500">{item.subTitle}</p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                  <span className="text-slate-600 font-medium">
                    Physical Desk: <span className="text-slate-800">{item.physicalRequirement}</span>
                  </span>

                  {item.uploadedFileName && (
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono text-[10px]">
                      File: {item.uploadedFileName}
                    </span>
                  )}

                  {item.aiClassification && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
                      <Sparkles className="w-3 h-3 text-violet-500" />
                      SIMULATED AI: {item.aiClassification} ({Math.round((item.aiConfidence || 0) * 100)}%)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
              {item.status === 'verified' && (
                <Badge variant="green" className="text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </Badge>
              )}
              {item.status === 'flagged' && (
                <div className="flex items-center gap-2">
                  <Badge variant="amber" className="text-xs flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Correction Required
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/applicant/correction')}
                    className="text-xs text-amber-800 border-amber-300 hover:bg-amber-50"
                  >
                    Fix Discrepancy
                  </Button>
                </div>
              )}
              {item.status === 'uploaded' && (
                <Badge variant="blue" className="text-xs">
                  Under Intake
                </Badge>
              )}
              {item.status === 'pending' && (
                <Button variant="outline" size="sm" className="text-xs">
                  Upload Scan
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
