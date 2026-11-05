import React, { useState } from 'react';
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
  QrCode,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';

export const ApplicantAppointments: React.FC = () => {
  const { primaryApplication, rescheduleAppointment } = useAEMS();

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({
    date: '2026-11-10',
    timeSlot: '10:00 AM - 11:30 AM (Desk 3)',
  });
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const appointment = primaryApplication.appointment || {
    id: 'apt-001',
    date: '2026-11-10',
    timeSlot: '10:00 AM - 11:30 AM',
    location: 'Bar Council Auditorium, High Court Campus, Chennai - 600104',
    type: 'Physical Certificate Verification & Robing',
    status: 'scheduled' as const,
    instructions:
      'Report at Verification Desk 3 with original 10th, 12th, B.Com degree, and LL.B degree certificates in prescribed Advocate Robing attire.',
  };

  const availableSlots = [
    { date: '2026-11-10', timeSlot: '10:00 AM - 11:30 AM (Desk 3)', slotsLeft: 4 },
    { date: '2026-11-10', timeSlot: '02:00 PM - 03:30 PM (Desk 2)', slotsLeft: 8 },
    { date: '2026-11-12', timeSlot: '10:00 AM - 11:30 AM (Desk 1)', slotsLeft: 12 },
    { date: '2026-11-14', timeSlot: '11:00 AM - 12:30 PM (Desk 4)', slotsLeft: 6 },
    { date: '2026-11-17', timeSlot: '10:00 AM - 11:30 AM (Desk 2)', slotsLeft: 15 },
  ];

  const handleConfirmReschedule = () => {
    rescheduleAppointment(primaryApplication.id, selectedSlot.date, selectedSlot.timeSlot);
    setIsRescheduleOpen(false);
    setNotificationMsg(
      `Appointment successfully rescheduled to ${selectedSlot.date} (${selectedSlot.timeSlot}). Audit event recorded.`
    );
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Screen A21 • Appointment &amp; Robing Desk
            </span>
            <span className="text-xs text-slate-400 font-mono">Ref: {primaryApplication.refNumber}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Physical Verification &amp; Robing Ceremony</h1>
          <p className="text-xs text-slate-500">
            Statutory roll signing, original document authentication, and advocate robing appointment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRescheduleOpen(true)}
            className="text-xs"
          >
            <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Reschedule Slot
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.print()}
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Download Hall Ticket
          </Button>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Main Appointment Pass */}
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/40 to-white shadow-xs overflow-hidden">
        <CardHeader className="border-b border-indigo-100 bg-indigo-900 text-white p-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-300" />
              <div>
                <CardTitle className="text-sm font-bold text-white">
                  Bar Council of Tamil Nadu &amp; Puducherry
                </CardTitle>
                <p className="text-[11px] text-indigo-200">
                  Official Robing &amp; Statutory Verification Pass (Form XI)
                </p>
              </div>
            </div>
            <Badge variant="violet" size="md" className="bg-indigo-700 text-white border-indigo-500">
              CONFIRMED SLOT
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-indigo-100 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-medium">Candidate Name</span>
              <p className="text-sm font-bold text-slate-900">{primaryApplication.applicantName}</p>
              <p className="text-[10px] text-slate-500 font-mono">DOB: {primaryApplication.dob}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-medium">Reporting Date</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>{appointment.date}</span>
              </p>
              <p className="text-[10px] text-indigo-600 font-medium">Reporting Time: 09:30 AM</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-medium">Allocated Window</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>{appointment.timeSlot}</span>
              </p>
              <p className="text-[10px] text-slate-500">Duration: 45 Minutes</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-medium">Venue Location</span>
              <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>BCTNP Auditorium</span>
              </p>
              <p className="text-[10px] text-slate-500 truncate">High Court Campus, Chennai - 104</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl gap-4">
            <div className="space-y-1 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Verification Pass QR &amp; Security Token:</span>
              <p className="text-[11px] text-slate-500 max-w-md">
                Present this digital QR pass or printed docket at the Bar Council security gate and Verification Counter for biometric check-in.
              </p>
              <p className="text-[10px] font-mono text-slate-400">Security Token: BCTNP-SEC-9941-8812-OK</p>
            </div>
            <div className="shrink-0 p-3 bg-white border border-slate-300 rounded-lg shadow-2xs flex flex-col items-center gap-1">
              <QrCode className="w-16 h-16 text-slate-900" />
              <span className="text-[9px] font-mono font-bold text-slate-600">AEMS-2026-1045</span>
            </div>
          </div>

          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 space-y-1">
            <span className="font-bold">Desk Instructions:</span>
            <p className="leading-relaxed">{appointment.instructions}</p>
          </div>
        </CardContent>
      </Card>

      {/* Bar Dress Code Guidelines */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Statutory Advocate Robing Code (Bar Council of India Rules Part VI, Chapter IV)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-slate-700" />
                For Gentlemen Advocates:
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Black open-breasted coat, white shirt, stiff or soft collar, black tie or advocate bands, and black or dark-grey trousers. Advocate gown is mandatory for the formal ceremony.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-slate-700" />
                For Lady Advocates:
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Black coat, white blouse with advocate bands, or white sari with black blouse, or white salwar kameez with black dupatta. Advocate gown is mandatory for roll signing.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            <strong>Mandatory Checklist for Candidate:</strong> You must present all original degree certificates (Class 10, Class 12, Undergraduate B.Com, and LL.B Degree) along with 2 sets of self-attested copies at the verification counter 30 minutes prior to ceremony.
          </div>
        </CardContent>
      </Card>

      {/* Reschedule Modal */}
      <Modal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        title="Reschedule Physical Verification Slot"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Select an alternate available verification desk slot at the Bar Council Auditorium, High Court Campus:
          </p>

          <div className="space-y-2">
            {availableSlots.map((slot, index) => (
              <label
                key={index}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedSlot.date === slot.date && selectedSlot.timeSlot === slot.timeSlot
                    ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                onClick={() => setSelectedSlot({ date: slot.date, timeSlot: slot.timeSlot })}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="slotSelect"
                    checked={
                      selectedSlot.date === slot.date && selectedSlot.timeSlot === slot.timeSlot
                    }
                    onChange={() => setSelectedSlot({ date: slot.date, timeSlot: slot.timeSlot })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {slot.date}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {slot.timeSlot}
                    </p>
                  </div>
                </div>

                <Badge variant="blue" className="text-[10px]">
                  {slot.slotsLeft} slots open
                </Badge>
              </label>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsRescheduleOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmReschedule}>
              Confirm &amp; Update Pass
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
