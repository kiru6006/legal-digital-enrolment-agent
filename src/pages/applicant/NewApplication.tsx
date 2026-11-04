import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  Scale,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { ApplicationRecord } from '../../types/application';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';

export const NewApplication: React.FC = () => {
  const { addApplication } = useAEMS();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    gender: 'Male',
    dob: '1999-05-15',
    email: '',
    phone: '',
    aadhaarMasked: 'XXXX-XXXX-4589',
    fatherName: '',

    // Step 2: Education
    qualifyingDegree: 'Bachelor of Arts (B.A. English)',
    qualifyingUniversity: 'University of Madras',
    qualifyingPassingYear: '2021',

    // Step 3: Employment
    currentlyEmployed: false,
    previousDesignation: '',
    organization: '',
    relievingLetterAvailable: true,

    // Step 4: Address
    doorNo: 'Flat 4A, Green Garden',
    street: 'Kamarajar Salai',
    locality: 'Mylapore',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600004',

    // Step 5: Law Qualification
    lawDegree: '3-Year LL.B',
    lawCollege: 'Dr. Ambedkar Government Law College, Chennai',
    lawUniversity: 'The Tamil Nadu Dr. Ambedkar Law University',
    lawPassingYear: '2024',
    lawRollNumber: '52009841',
    percentageOrCgpa: '67.50%',

    // Step 6: Documents
    lawDegreeUploaded: true,
    marksheetUploaded: true,
    identityUploaded: true,
    addressUploaded: true,
    photoUploaded: true,
  });

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Undergraduate', icon: GraduationCap },
    { id: 3, title: 'Employment Bar', icon: Briefcase },
    { id: 4, title: 'Residence', icon: MapPin },
    { id: 5, title: 'Law Degree', icon: Scale },
    { id: 6, title: 'Documents', icon: Upload },
    { id: 7, title: 'Preview & Submit', icon: CheckCircle2 },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const newRef = `AEMS-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAppRecord: ApplicationRecord = {
      id: newRef,
      refNumber: newRef,
      applicantId: `user-app-${Date.now()}`,
      applicantName: formData.fullName || 'Thiru. K. Vignesh',
      email: formData.email || 'vignesh.k@example.com',
      phone: formData.phone || '+91 98401 99887',
      gender: formData.gender,
      dob: formData.dob,
      aadhaarMasked: formData.aadhaarMasked,
      address: {
        doorNo: formData.doorNo,
        street: formData.street,
        locality: formData.locality,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
      },
      education: {
        qualifyingDegree: formData.qualifyingDegree,
        qualifyingUniversity: formData.qualifyingUniversity,
        qualifyingPassingYear: formData.qualifyingPassingYear,
        lawDegree: formData.lawDegree,
        lawCollege: formData.lawCollege,
        lawUniversity: formData.lawUniversity,
        lawPassingYear: formData.lawPassingYear,
        lawRollNumber: formData.lawRollNumber,
        percentageOrCgpa: formData.percentageOrCgpa,
      },
      employment: {
        currentlyEmployed: formData.currentlyEmployed,
        previousDesignation: formData.previousDesignation,
        organization: formData.organization,
        relievingLetterAvailable: formData.relievingLetterAvailable,
      },
      stage: 'submitted',
      statusLabel: 'New Application',
      priority: 'medium',
      progressPercentage: 20,
      assignedOfficerId: 'user-off-001',
      assignedOfficerName: 'M. Srinivasan',
      submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 10),
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          applicationId: newRef,
          name: 'Law Degree Certificate',
          category: 'law_degree_certificate',
          fileName: 'Law_Degree_Certificate.pdf',
          fileSize: '1.9 MB',
          uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          version: 1,
          versions: [
            {
              version: 1,
              uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
              fileName: 'Law_Degree_Certificate.pdf',
              fileSize: '1.9 MB',
            },
          ],
          status: 'pending',
          aiClassification: 'Statutory Law Degree Certificate',
          aiConfidence: 0.94,
        },
        {
          id: `doc-${Date.now()}-2`,
          applicationId: newRef,
          name: 'Consolidated Marksheet',
          category: 'marksheets',
          fileName: 'Consolidated_Marksheet.pdf',
          fileSize: '2.1 MB',
          uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          version: 1,
          versions: [
            {
              version: 1,
              uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
              fileName: 'Consolidated_Marksheet.pdf',
              fileSize: '2.1 MB',
            },
          ],
          status: 'pending',
        },
      ],
      deficiencies: [],
      verificationItems: [
        {
          id: 'ver-n1',
          category: 'Identity',
          name: 'Demographic Aadhaar Check',
          status: 'pending',
        },
        {
          id: 'ver-n2',
          category: 'Statutory Degree',
          name: 'Bar Council Recognized University Law Degree',
          status: 'pending',
        },
      ],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          stage: 'submitted',
          actor: formData.fullName || 'Thiru. K. Vignesh',
          role: 'Applicant',
          title: 'Application Submitted Online',
          description: 'Electronic enrolment application received by the Bar Council Registry.',
          badgeColor: 'blue',
        },
      ],
    };

    setTimeout(() => {
      addApplication(newAppRecord);
      setIsSubmitting(false);
      navigate(`/applicant/application/${newRef}`);
    }, 600);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">New Advocate Enrolment Application</h1>
          <p className="text-xs text-slate-500">
            Official statutory enrolment application under Section 24 of the Advocates Act, 1961.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            icon={<Save className="w-4 h-4 text-slate-500" />}
          >
            Save Draft
          </Button>
          {draftSaved && <span className="text-xs text-emerald-600 font-medium">Draft Saved!</span>}
        </div>
      </div>

      {/* Illustrative MVP Disclaimer */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-blue-900">
        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          <strong>Illustrative MVP Demo Form:</strong> Fields demonstrate representative Bar Council enrolment data and simulated document attachments.
        </span>
      </div>

      {/* Steps Indicator Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 overflow-x-auto shadow-2xs">
        <div className="flex items-center justify-between min-w-[550px]">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;

            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setCurrentStep(s.id)}
                  className="flex flex-col items-center gap-1 group text-center"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-[10px] font-semibold whitespace-nowrap ${
                      isCurrent ? 'text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      currentStep > idx + 1 ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* STEP 1: Personal Info */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (as per Law Degree) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. K. Vignesh"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Father / Guardian's Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. R. Krishnan"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Third Gender</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="vignesh.k@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98401 23456"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Undergraduate Qualification */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Qualifying Graduation Degree *
                </label>
                <input
                  type="text"
                  value={formData.qualifyingDegree}
                  onChange={(e) => handleInputChange('qualifyingDegree', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Graduating University *
                </label>
                <input
                  type="text"
                  value={formData.qualifyingUniversity}
                  onChange={(e) => handleInputChange('qualifyingUniversity', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Year of Passing *
                </label>
                <input
                  type="text"
                  value={formData.qualifyingPassingYear}
                  onChange={(e) => handleInputChange('qualifyingPassingYear', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Employment Details (Bar Rule 49) */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <strong>Statutory Declaration (Bar Council of India Rule 49):</strong> An advocate shall not be a full-time salaried employee of any person, government, or corporation so long as he/she continues to practice.
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="employedCheck"
                  checked={formData.currentlyEmployed}
                  onChange={(e) => handleInputChange('currentlyEmployed', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="employedCheck" className="text-xs font-semibold text-slate-800">
                  Are you currently gainfully employed or engaged in any salaried commercial enterprise?
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="relievingCheck"
                  checked={formData.relievingLetterAvailable}
                  onChange={(e) => handleInputChange('relievingLetterAvailable', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="relievingCheck" className="text-xs text-slate-700">
                  I have resigned from any prior employment and possess an official Relieving / Resignation acceptance letter.
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Communication Address */}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Door / Flat No *</label>
                <input
                  type="text"
                  value={formData.doorNo}
                  onChange={(e) => handleInputChange('doorNo', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District *</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Postal Pincode *</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Law Degree Details */}
          {currentStep === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Law Degree Stream *</label>
                <select
                  value={formData.lawDegree}
                  onChange={(e) => handleInputChange('lawDegree', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  <option>3-Year LL.B</option>
                  <option>5-Year B.A. LL.B (Hons)</option>
                  <option>5-Year B.B.A. LL.B (Hons)</option>
                  <option>5-Year B.Com LL.B (Hons)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Law College Attended *</label>
                <input
                  type="text"
                  value={formData.lawCollege}
                  onChange={(e) => handleInputChange('lawCollege', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">University *</label>
                <input
                  type="text"
                  value={formData.lawUniversity}
                  onChange={(e) => handleInputChange('lawUniversity', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">University Roll / Register No *</label>
                <input
                  type="text"
                  value={formData.lawRollNumber}
                  onChange={(e) => handleInputChange('lawRollNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Year of Passing *</label>
                <input
                  type="text"
                  value={formData.lawPassingYear}
                  onChange={(e) => handleInputChange('lawPassingYear', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Percentage / CGPA *</label>
                <input
                  type="text"
                  value={formData.percentageOrCgpa}
                  onChange={(e) => handleInputChange('percentageOrCgpa', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 6: Supporting Documents */}
          {currentStep === 6 && (
            <div className="space-y-3">
              {[
                { title: 'Law Degree Convocation Certificate', req: 'Mandatory', status: 'Attached (PDF)' },
                { title: 'Consolidated Statement of Law Marks', req: 'Mandatory', status: 'Attached (PDF)' },
                { title: 'Identity Proof (Aadhaar Masked)', req: 'Mandatory', status: 'Attached (PDF)' },
                { title: 'Residential Address Proof (Electricity / Gas Bill)', req: 'Mandatory', status: 'Attached (PDF)' },
                { title: 'Passport Size Photograph & Signature Specimen', req: 'Mandatory', status: 'Attached (JPEG/PDF)' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{item.req}</span>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* STEP 7: Preview & Submit */}
          {currentStep === 7 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="font-bold text-slate-900 border-b pb-2">Application Summary Preview</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong>Applicant:</strong> {formData.fullName || 'Thiru. K. Vignesh'}</div>
                  <div><strong>DOB:</strong> {formData.dob}</div>
                  <div><strong>Law Degree:</strong> {formData.lawDegree} ({formData.lawPassingYear})</div>
                  <div><strong>Law Faculty:</strong> {formData.lawCollege}</div>
                  <div><strong>University:</strong> {formData.lawUniversity}</div>
                  <div><strong>Roll No:</strong> {formData.lawRollNumber}</div>
                  <div><strong>Address:</strong> {formData.city}, {formData.pincode}</div>
                  <div><strong>Bar Rule 49 Status:</strong> Cleared (Not employed)</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  I solemnly affirm that the particulars furnished above are true and correct to the best of my knowledge and that I do not suffer from any disqualification set out under Section 24A of the Advocates Act, 1961.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          {currentStep < 7 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 7))}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              onClick={handleSubmit}
              icon={<CheckCircle2 className="w-4 h-4" />}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Submit Application
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

