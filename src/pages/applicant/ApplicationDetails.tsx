import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  AlertCircle,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Upload,
  User,
  GraduationCap,
  MapPin,
  Scale,
  Briefcase,
  History,
  Info,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { exportApplicationsToCSV } from '../../utils/exportCsv';

export const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getApplication, primaryApplication } = useAEMS();
  const navigate = useNavigate();

  const application = (id ? getApplication(id) : primaryApplication) || primaryApplication;
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'deficiencies'>('overview');

  const openDeficiencies = application.deficiencies.filter((d) => d.status === 'open');

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {application.refNumber}
            </span>
            <Badge
              variant={
                application.stage === 'completed'
                  ? 'success'
                  : application.stage === 'correction_requested'
                  ? 'warning'
                  : 'primary'
              }
            >
              {application.statusLabel}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{application.applicantName}</h1>
          <p className="text-xs text-slate-500">
            Law Degree: {application.education.lawDegree} • {application.education.lawUniversity}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportApplicationsToCSV([application])}
            icon={<Download className="w-4 h-4 text-slate-600" />}
          >
            Export Dossier
          </Button>
          {openDeficiencies.length > 0 && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/applicant/documents')}
              icon={<Upload className="w-4 h-4" />}
            >
              Rectify Deficiencies
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        {[
          { id: 'overview', label: 'File Overview', icon: User },
          { id: 'documents', label: `Documents (${application.documents.length})`, icon: FileText },
          {
            id: 'deficiencies',
            label: `Deficiencies (${application.deficiencies.length})`,
            icon: AlertCircle,
            badge: openDeficiencies.length > 0 ? `${openDeficiencies.length} Open` : undefined,
          },
          { id: 'timeline', label: 'Processing Timeline', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                isActive
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Personal &amp; Contact Particulars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-y-2 text-slate-700">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold">{application.applicantName}</span>

                <span className="text-slate-500">Gender / DOB:</span>
                <span>{application.gender} • {application.dob}</span>

                <span className="text-slate-500">Email:</span>
                <span className="font-mono">{application.email}</span>

                <span className="text-slate-500">Phone:</span>
                <span>{application.phone}</span>

                <span className="text-slate-500">Aadhaar (Masked):</span>
                <span className="font-mono">{application.aadhaarMasked || 'XXXX-XXXX-6712'}</span>

                <span className="text-slate-500">Permanent Address:</span>
                <span>
                  {application.address.doorNo}, {application.address.street}, {application.address.city} - {application.address.pincode}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Statutory Academic Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-y-2 text-slate-700">
                <span className="text-slate-500">Law Qualification:</span>
                <span className="font-semibold">{application.education.lawDegree}</span>

                <span className="text-slate-500">Law College:</span>
                <span>{application.education.lawCollege}</span>

                <span className="text-slate-500">University:</span>
                <span>{application.education.lawUniversity}</span>

                <span className="text-slate-500">Year of Passing:</span>
                <span>{application.education.lawPassingYear}</span>

                <span className="text-slate-500">Roll / Registration No:</span>
                <span className="font-mono">{application.education.lawRollNumber}</span>

                <span className="text-slate-500">Qualifying Graduation:</span>
                <span>{application.education.qualifyingDegree} ({application.education.qualifyingUniversity})</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Documents */}
      {activeTab === 'documents' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Submitted Statutory Documents</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100 p-0">
            {application.documents.map((doc) => (
              <div key={doc.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{doc.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">v{doc.version}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{doc.fileName} • {doc.fileSize}</p>
                  {doc.discrepancies && doc.discrepancies.length > 0 && (
                    <p className="text-[11px] text-rose-600 font-medium">Flag: {doc.discrepancies[0]}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    size="sm"
                    variant={
                      doc.status === 'verified'
                        ? 'success'
                        : doc.status === 'correction_required'
                        ? 'danger'
                        : doc.status === 'correction_submitted'
                        ? 'primary'
                        : 'warning'
                    }
                  >
                    {doc.status.replace('_', ' ')}
                  </Badge>
                  {doc.status === 'correction_required' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/applicant/documents')}
                      icon={<Upload className="w-3.5 h-3.5 text-blue-600" />}
                    >
                      Re-upload
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Deficiencies */}
      {activeTab === 'deficiencies' && (
        <div className="space-y-4">
          {application.deficiencies.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold text-slate-800">No Deficiencies Raised</p>
                <p>All uploaded documents satisfy current scrutiny requirements.</p>
              </CardContent>
            </Card>
          ) : (
            application.deficiencies.map((def) => (
              <Card key={def.id} className={def.status === 'open' ? 'border-amber-300 bg-amber-50/20' : ''}>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between w-full">
                    <span>{def.documentName}</span>
                    <Badge variant={def.status === 'resolved' ? 'success' : def.status === 'correction_submitted' ? 'primary' : 'warning'}>
                      {def.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Official Scrutiny Observation:</span>
                    <p className="mt-0.5 text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                      {def.officialObservation}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Action Required by Candidate:</span>
                    <p className="mt-0.5 text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                      {def.requiredCorrection}
                    </p>
                  </div>
                  {def.status === 'open' && (
                    <div className="pt-2 flex justify-end">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/applicant/documents')}
                        icon={<Upload className="w-4 h-4" />}
                      >
                        Upload Rectification Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Processing Timeline */}
      {activeTab === 'timeline' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Enrolment Audit Trail &amp; Scrutiny Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 py-2">
              {application.timeline.map((event) => (
                <div key={event.id} className="relative pl-6">
                  <div
                    className={`absolute -left-2 top-0.5 w-4 h-4 rounded-full border-2 border-white ${
                      event.badgeColor === 'green'
                        ? 'bg-emerald-600'
                        : event.badgeColor === 'amber'
                        ? 'bg-amber-500'
                        : event.badgeColor === 'violet'
                        ? 'bg-purple-600'
                        : 'bg-blue-600'
                    }`}
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{event.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{event.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{event.description}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Actor: {event.actor} ({event.role})
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
