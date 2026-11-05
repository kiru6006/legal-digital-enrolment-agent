import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  KeyRound,
  FileText,
  UserCheck,
  Lock,
  Building,
  GraduationCap,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';
import { SaveStatus } from '../../components/ux/SaveStatus';

export const ApplicantRegistration: React.FC = () => {
  const navigate = useNavigate();

  const [stream, setStream] = useState<'fresh_3yr' | 'fresh_5yr' | 'transfer' | 'resumption'>('fresh_3yr');
  const [showIdentityWhy, setShowIdentityWhy] = useState(false);
  const [showRollWhy, setShowRollWhy] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Arjun Kumar',
    dob: '1999-08-14',
    mobile: '9840123456',
    email: 'arjun.kumar.demo@example.com',
    lawCollege: 'The Tamil Nadu Dr. Ambedkar Law University, Chennai',
    lawRollNumber: '51904211',
    aadhaarLast4: '6712',
  });

  const [step, setStep] = useState<'details' | 'otp_verification' | 'registered'>('details');
  const [mobileOtp, setMobileOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedRef] = useState('AEMS-2026-1045');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp_verification');
  };

  const handleFillDemoOtps = () => {
    setMobileOtp('842109');
    setEmailOtp('609214');
  };

  const handleVerifyAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('registered');
    }, 700);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 bg-blue-900/60 border border-blue-700/50 px-2.5 py-0.5 rounded-full">
              Screen A01 • New Candidate Intake
            </span>
            <Badge variant="outline" className="text-blue-200 border-blue-500/40 text-[10px]">
              Bar Council of Tamil Nadu &amp; Puducherry
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Advocate Online Enrolment Registration (2026)
          </h1>
          <p className="text-xs text-blue-200/90 max-w-2xl">
            Statutory onboarding under Section 24 of the Advocates Act 1961. Register your candidate profile, verify demographic credentials, and initiate your Digital Enrolment Dossier.
          </p>
        </div>
      </div>

      {step === 'details' && (
        <form onSubmit={handleSendOtp} className="space-y-6">
          {/* Enrolment Stream Selection */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                Select Your Enrolment Category / Stream
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  id: 'fresh_3yr',
                  title: 'Fresh Enrolment (3-Year LL.B)',
                  desc: 'Graduate in any discipline + 3-Year LL.B from recognized statutory university.',
                },
                {
                  id: 'fresh_5yr',
                  title: 'Fresh Enrolment (5-Year Integrated)',
                  desc: 'B.A./B.B.A./B.Com/B.Sc. LL.B (Hons) directly post Higher Secondary 10+2.',
                },
                {
                  id: 'transfer',
                  title: 'Transfer of Enrolment (Inter-State)',
                  desc: 'Existing enrolled advocate transferring from another State Bar Council under Section 18.',
                },
                {
                  id: 'resumption',
                  title: 'Resumption of Legal Practice',
                  desc: 'Voluntarily suspended or surrendered licence resumption under Bar Rule 49.',
                },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex flex-col p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    stream === item.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                  onClick={() => setStream(item.id as any)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <input
                      type="radio"
                      name="stream"
                      checked={stream === item.id}
                      onChange={() => setStream(item.id as any)}
                      className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Identity & Academic Particulars */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Candidate Identity &amp; Law Degree Details
              </CardTitle>
              <SaveStatus status="saved" lastSavedTime="Just now" />
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Candidate Full Name (as per Law Degree) <span className="text-red-500 font-normal">(required)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowIdentityWhy(!showIdentityWhy)}
                      className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>Why we ask this</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Example: Arjun Kumar. Reused across your statutory affidavit, Form VI &amp; VII, and gazette notice.
                  </p>
                  {showIdentityWhy && (
                    <div className="mt-1.5 p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px] text-blue-900 leading-relaxed">
                      <strong>Why we ask this:</strong> Required under Section 24 of the Advocates Act 1961 for biometric de-duplication, state roll indexing, and one-candidate-one-enrolment enforcement across State Bar Councils.
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth <span className="text-red-500 font-normal">(required, min 21 years)</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Example: 14 Aug 1999 (verified against Class 10 / SSLC birth register).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500 font-normal">(required, 10 digits)</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="9840123456"
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-r-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Example: 9840123456. Used for 2FA OTP security authentication and SMS notice dispatches.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500 font-normal">(required)</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="arjun.kumar.demo@example.com"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Example: arjun.kumar.demo@example.com. Used for statutory notices and digital credentials.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Law College / University Department <span className="text-red-500 font-normal">(required)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lawCollege}
                    onChange={(e) => setFormData({ ...formData, lawCollege: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Example: The Tamil Nadu Dr. Ambedkar Law University, Chennai.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Law Degree Final Roll Number <span className="text-red-500 font-normal">(required)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowRollWhy(!showRollWhy)}
                      className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>Why we ask this</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.lawRollNumber}
                    onChange={(e) => setFormData({ ...formData, lawRollNumber: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Example: 51904211 (printed on your final convocation degree marksheet).
                  </p>
                  {showRollWhy && (
                    <div className="mt-1.5 p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px] text-blue-900 leading-relaxed">
                      <strong>Why we ask this:</strong> Checked against BCI and TNDALU repository to prevent duplicate enrolments and verify academic recognition under Section 24(1)(c).
                    </div>
                  )}
                </div>
              </div>

              {/* Duplicate Prevention Check Result */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-xs text-emerald-900 space-y-0.5">
                  <p className="font-semibold">Automated Duplicate Prevention Check: Passed</p>
                  <p className="text-[11px] text-emerald-700">
                    No active or historical advocate enrolment record found for Roll No. 51904211 in the Bar Council of Tamil Nadu &amp; Puducherry Master Roll.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4 px-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Dual-channel OTP verification required to proceed
              </span>
              <Button type="submit" variant="primary" size="md">
                Proceed to Two-Factor Verification
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}

      {step === 'otp_verification' && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-blue-600" />
                Two-Factor Security Verification (Simulated)
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleFillDemoOtps}
                className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-500" />
                Auto-fill Demo OTPs
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-5 space-y-5">
            <p className="text-xs text-slate-600">
              For candidate authentication, 6-digit one-time passwords have been dispatched to your registered credentials:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">SMS OTP</span>
                  <span className="text-[10px] text-slate-400 font-mono">+91 {formData.mobile}</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 842109"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-sm font-mono px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Email OTP</span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{formData.email}</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 609214"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-sm font-mono px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Didn&apos;t receive code? Resend available in 30 seconds</span>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-blue-600 hover:underline font-medium"
              >
                Change mobile / email
              </button>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-4 px-6 border-t border-slate-100 flex items-center justify-between">
            <Button type="button" variant="ghost" size="sm" onClick={() => setStep('details')}>
              Back
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={!mobileOtp || !emailOtp || isVerifying}
              onClick={handleVerifyAndProceed}
            >
              {isVerifying ? 'Authenticating...' : 'Validate Credentials & Create Docket'}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'registered' && (
        <Card className="max-w-2xl mx-auto text-center border-emerald-200 bg-white shadow-md">
          <CardContent className="pt-8 pb-6 px-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Candidate Profile Initialized
              </span>
              <h2 className="text-xl font-bold text-slate-900 pt-1">
                Enrolment Dossier Created Successfully
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your permanent enrolment reference number has been reserved in the Bar Council system.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block text-left max-w-md w-full">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs text-slate-500">Docket Reference</span>
                <span className="text-sm font-bold text-blue-700 font-mono">{generatedRef}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="text-xs text-slate-500">Applicant Name</span>
                <span className="text-xs font-semibold text-slate-800">{formData.fullName}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Selected Category</span>
                <span className="text-xs font-semibold text-slate-800">
                  {stream === 'fresh_3yr'
                    ? '3-Year LL.B Regular'
                    : stream === 'fresh_5yr'
                    ? '5-Year Integrated'
                    : 'Other Category'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/applicant/checklist')}
                className="w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 mr-1.5 text-slate-600" />
                View 11-Category Checklist
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/applicant/new-application')}
                className="w-full sm:w-auto"
              >
                Complete Application Form
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

