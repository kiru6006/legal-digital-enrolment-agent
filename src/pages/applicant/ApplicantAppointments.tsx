import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  Shield,
  Download,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';

export const ApplicantAppointments: React.FC = () => {
  const { primaryApplication } = useAEMS();

  const appointment = primaryApplication.appointment;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900">Enrolment Ceremony &amp; Appointment Schedule</h1>
        <p className="text-xs text-slate-500">
          Official statutory roll signing, solemn declaration, and robing ceremony instructions.
        </p>
      </div>

      {appointment ? (
        <div className="space-y-6">
          {/* Main Appointment Pass */}
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/40 to-white shadow-xs">
            <CardHeader className="border-indigo-100">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <CardTitle className="text-base text-indigo-950">
                    Ceremonial Enrolment Roll Signing Pass
                  </CardTitle>
                </div>
                <Badge variant="violet" size="md">
                  SCHEDULED CONFIRMATION
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-white border border-indigo-100 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Ceremony Date</span>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>{appointment.date}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Allocated Time Slot</span>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>{appointment.timeSlot}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Reporting Venue</span>
                  <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="truncate">{appointment.location}</span>
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 space-y-1">
                <span className="font-bold">Reporting Instructions:</span>
                <p className="leading-relaxed">{appointment.instructions}</p>
              </div>
            </CardContent>
          </Card>

          {/* Bar Dress Code Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Statutory Bar Dress Code (Bar Council of India Rules, Part VI, Chapter IV)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">For Male Advocates:</h4>
                  <p>
                    Black open-breasted coat, white shirt, white collar (stiff or soft), black tie or advocate bands, and black or dark-grey trousers.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">For Female Advocates:</h4>
                  <p>
                    Black coat, white blouse with advocate bands, or white sari with black blouse, or white salwar kameez with black dupatta.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                <strong>Mandatory Verification Reminder:</strong> Candidate must present original certificates (10th, 12th, Qualifying Degree, Law Degree, Consolidated Marksheets) at the verification counter 30 minutes before the ceremony.
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center text-xs text-slate-500 space-y-2">
            <Clock className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800">No Appointment Scheduled Yet</h3>
            <p className="max-w-md mx-auto">
              Your appointment slot for the formal Roll Signing and Robing Ceremony will be generated once all document deficiencies are cleared and Enrolment Committee approval is granted.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
