import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  FileText,
  CreditCard,
  ShieldAlert,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Language, t } from '../../services/i18nService';

interface NextActionCardProps {
  currentLang?: Language;
}

export const NextActionCard: React.FC<NextActionCardProps> = ({ currentLang = 'en' }) => {
  const { primaryApplication } = useAEMS();
  const navigate = useNavigate();

  const openDeficiencies = primaryApplication.deficiencies.filter((d) => d.status === 'open');

  // Determine single highest priority action
  let actionTitle = '';
  let actionDesc = '';
  let actionButtonText = '';
  let actionRoute = '';
  let badgeVariant: 'warning' | 'primary' | 'success' | 'violet' = 'primary';
  let badgeText = '';

  if (openDeficiencies.length > 0) {
    actionTitle =
      currentLang === 'ta'
        ? `${openDeficiencies.length} ஆவணக் குறைபாடுகளை சரிசெய்க`
        : `Action Required: Resolve ${openDeficiencies.length} Open Deficiencies`;
    actionDesc =
      currentLang === 'ta'
        ? `மின் கட்டண ரசீதில் முத்திரை தெளிவாக இல்லை மற்றும் இளங்கலை சான்றிதழில் உள்ள பெயரில் மாறுபாடு உள்ளது. திருத்தப்பட்ட ஆவணங்களை பதிவேற்றவும்.`
        : `Official Scrutiny Officer flagged ${openDeficiencies.length} items (EB Address proof blurred bottom seal & B.Com name initial variation). Re-upload documents to proceed.`;
    actionButtonText = currentLang === 'ta' ? 'குறைபாட்டை சரிசெய்க' : 'Resolve Deficiencies Now';
    actionRoute = '/applicant/documents';
    badgeVariant = 'warning';
    badgeText = currentLang === 'ta' ? 'உடனடி நடவடிக்கை' : 'Immediate Action Required';
  } else if (primaryApplication.stage === 'committee_review' || primaryApplication.stage === 'completed') {
    actionTitle =
      currentLang === 'ta'
        ? 'நேரடி சான்றிதழ் சரிபார்ப்பு மற்றும் கவுன் அணிவிப்பு'
        : 'Attend Ceremonial Robing & Roll Signing';
    actionDesc =
      currentLang === 'ta'
        ? 'செவ்வாய், 10 நவம்பர் 2026 அன்று காலை 10:00 மணிக்கு உயர் நீதிமன்ற வளாகத்தில் அசல் சான்றிதழ்களுடன் ஆஜராகவும்.'
        : 'Slot confirmed for Tuesday, 10 Nov 2026 at 10:00 AM (Desk 3, BCTNP Auditorium). Report in prescribed advocate robing attire.';
    actionButtonText = currentLang === 'ta' ? 'அனுமதிச் சீட்டைப் பார்க்க' : 'View Robing Pass & Instructions';
    actionRoute = '/applicant/appointments';
    badgeVariant = 'success';
    badgeText = currentLang === 'ta' ? 'உறுதி செய்யப்பட்டது' : 'Slot Confirmed';
  } else {
    actionTitle =
      currentLang === 'ta'
        ? 'அதிகாரப்பூர்வ ஆய்வு செயல்பாட்டில் உள்ளது'
        : 'Statutory Verification in Progress';
    actionDesc =
      currentLang === 'ta'
        ? 'உங்கள் ஆவணங்கள் முதன்மை ஆய்வு அதிகாரி M. ஸ்ரீனிவாசன் அவர்களால் சரிபார்க்கப்பட்டு வருகின்றன.'
        : `Your application is assigned to Senior Scrutiny Officer ${
            primaryApplication.assignedOfficerName || 'M. Srinivasan'
          } for university degree authentication.`;
    actionButtonText = currentLang === 'ta' ? 'விண்ணப்பத்தைப் பார்க்க' : 'Examine Case File';
    actionRoute = `/applicant/application/${primaryApplication.id}`;
    badgeVariant = 'primary';
    badgeText = currentLang === 'ta' ? 'ஆய்வில் உள்ளது' : 'In Progress (SLA: 2 Days)';
  }

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-white to-blue-50/40 border-2 border-amber-300/80 rounded-2xl p-4 shadow-xs relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 border border-amber-300 px-2 py-0.5 rounded-md">
              {t('nextActionTitle', currentLang)}
            </span>
            <Badge variant={badgeVariant} size="sm">
              {badgeText}
            </Badge>
          </div>

          <h3 className="text-base font-bold text-slate-900 tracking-tight">{actionTitle}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{actionDesc}</p>
        </div>

        <div className="shrink-0 flex items-center gap-2 w-full md:w-auto">
          <Button
            variant={badgeVariant === 'warning' ? 'danger' : 'primary'}
            size="md"
            onClick={() => navigate(actionRoute)}
            className="w-full md:w-auto text-xs justify-center font-bold shadow-xs"
          >
            <span>{actionButtonText}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
