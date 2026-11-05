// AEMS Bilingual Localization Service (English & Tamil)
// Per BRD Section 3.3: Approved copy for applicant instructions, statutory rules, and deficiencies.

export type Language = 'en' | 'ta';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Branding
    barCouncilTitle: 'Bar Council of Tamil Nadu & Puducherry',
    statutoryPlatform: 'Statutory Advocate Enrolment Office',
    activeRole: 'Role',
    switchRole: 'Switch Demo Role',
    scenarioWalkthrough: 'Scenario Walkthrough (BRD B7)',
    demoNotice: 'DEMO • Illustrative data • No real applicant information',
    saveStatusSaved: 'Saved at',
    saveStatusAutosaving: 'Autosaving...',
    searchPlaceholder: 'Search by Ref, Name, Mobile, College... (Press /)',
    keyboardHelp: 'Keyboard Shortcuts (Press ?)',

    // Applicant Portal
    applicantPortal: 'Applicant Portal',
    nextActionTitle: 'Next Action Required',
    nextActionFixDefects: 'Resolve Open Deficiencies (Address Proof & Identity Affidavit)',
    nextActionPayFee: 'Pay Statutory Enrolment Fee (₹18,500)',
    nextActionAttendCeremony: 'Attend Physical Robing & Verification Ceremony',
    pendingItemsTitle: 'Pending Action Items',
    missingDocsCount: 'Missing Documents',
    openDefectsCount: 'Open Deficiencies',
    unverifiedStepsCount: 'Unfinished Steps',
    fiveStageTracker: '5-Stage Statutory Enrolment Progress',
    stage1: 'Online Submission',
    stage2: 'AI Intake Check',
    stage3: 'Official Scrutiny',
    stage4: 'Committee Review',
    stage5: 'Roll Admission',

    // Status Vocabulary
    statusSubmitted: 'Submitted',
    statusActionNeeded: 'Action Needed',
    statusUnderReview: 'Under Scrutiny',
    statusVerified: 'Verified',
    statusDeficiencyOpen: 'Deficiency Open',
    statusCorrectionReceived: 'Correction Received',
    statusAwaitingOriginal: 'Awaiting Original',
    statusScheduled: 'Ceremony Scheduled',
    statusCommitteeReady: 'Committee Ready',
    statusDecided: 'Admission Granted',

    // Desks & Actions
    dossierSummary: 'Enrolment Dossier Summary',
    downloadPass: 'Download Robing Pass',
    checklistTitle: '11-Category Statutory Document Checklist',
    correctionDesk: 'Correction Desk',
    viewCaseFile: 'View Digital Case File',

    // Help & Support
    helpTitle: 'Need Assistance?',
    helplinePhone: 'Helpline: 044-2534 2525 / 044-2534 2526',
    assistedDeskLocations: 'Assisted Helpdesks: High Court Campus (Chennai) & Puducherry Sub-Centre',
    reportProblem: 'Report a System Issue',
    assistedMode: 'Assisted Desk Mode (Helpdesk Officer View)',
    whyWeAskThis: 'Why is this required by law?',
  },
  ta: {
    // Top Bar & Branding
    barCouncilTitle: 'தமிழ்நாடு மற்றும் புதுச்சேரி பார் கவுன்சில்',
    statutoryPlatform: 'வழக்கறிஞர் சேர்க்கை மேலாண்மை தளம்',
    activeRole: 'பங்கு',
    switchRole: 'பயனர் பங்கை மாற்றுக',
    scenarioWalkthrough: 'செயல்முறை வழிகாட்டி (BRD B7)',
    demoNotice: 'மாதிரி செயல்விளக்கம் • எந்தவொரு தனிநபர் தரவும் இல்லை',
    saveStatusSaved: 'சேமிக்கப்பட்டது:',
    saveStatusAutosaving: 'தானாக சேமிக்கப்படுகிறது...',
    searchPlaceholder: 'எண், பெயர், கல்லூரி மூலம் தேடுக... (அழுத்து /)',
    keyboardHelp: 'விசைப்பலகை குறுக்குவழிகள் (அழுத்து ?)',

    // Applicant Portal
    applicantPortal: 'விண்ணப்பதாரர் தளம்',
    nextActionTitle: 'அடுத்த கட்ட நடவடிக்கை',
    nextActionFixDefects: 'ஆவணக் குறைபாடுகளை சரிசெய்க (முகவரி சான்று மற்றும் உறுதிமொழி ஆவணம்)',
    nextActionPayFee: 'சட்டரீதியான சேர்க்கைக் கட்டணம் செலுத்துக (₹18,500)',
    nextActionAttendCeremony: 'நேரடி சான்றிதழ் சரிபார்ப்பு மற்றும் கவுன் அணிவிப்பு நிகழ்வில் பங்கேற்க',
    pendingItemsTitle: 'நிலுவையிலுள்ள விவரங்கள்',
    missingDocsCount: 'நிலுவை ஆவணங்கள்',
    openDefectsCount: 'சரிசெய்ய வேண்டிய குறைபாடுகள்',
    unverifiedStepsCount: 'முடிக்கப்படாத படிகள்',
    fiveStageTracker: '5-படி வழக்கறிஞர் சேர்க்கை முன்னேற்றப் பாதை',
    stage1: 'விண்ணப்ப சமர்ப்பிப்பு',
    stage2: 'AI மாதிரி சரிபார்ப்பு',
    stage3: 'அதிகாரப்பூர்வ ஆய்வு',
    stage4: 'சேர்க்கைக் குழு பரிசீலனை',
    stage5: 'வழக்கறிஞர் பட்டியலில் பதிவு',

    // Status Vocabulary
    statusSubmitted: 'சமர்ப்பிக்கப்பட்டது',
    statusActionNeeded: 'நடவடிக்கை தேவை',
    statusUnderReview: 'ஆய்வில் உள்ளது',
    statusVerified: 'சரிபார்க்கப்பட்டது',
    statusDeficiencyOpen: 'குறைபாடு நிலுவையில் உள்ளது',
    statusCorrectionReceived: 'திருத்தம் பெறப்பட்டது',
    statusAwaitingOriginal: 'அசல் சான்றிதழ் தேவை',
    statusScheduled: 'தேதி குறிக்கப்பட்டுள்ளது',
    statusCommitteeReady: 'குழுவிற்கு பரிந்துரைக்கப்பட்டது',
    statusDecided: 'சேர்க்கை அனுமதிக்கப்பட்டது',

    // Desks & Actions
    dossierSummary: 'விண்ணப்ப ஆவணச் சுருக்கம்',
    downloadPass: 'அனுமதிச் சீட்டைப் பதிவிறக்குக',
    checklistTitle: '11-வகையான சட்டரீதியான ஆவணங்களின் சரிபார்ப்புப் பட்டியல்',
    correctionDesk: 'குறைபாடு திருத்தப் பிரிவு',
    viewCaseFile: 'முழு ஆவணக் கோப்பைப் பார்க்க',

    // Help & Support
    helpTitle: 'உதவி தேவையா?',
    helplinePhone: 'உதவி எண்: 044-2534 2525 / 044-2534 2526',
    assistedDeskLocations: 'உதவி மையங்கள்: உயர் நீதிமன்ற வளாகம் (சென்னை) மற்றும் புதுச்சேரி கிளை',
    reportProblem: 'சிக்கலைப் பதிவு செய்க',
    assistedMode: 'உதவி மைய நேரடிப் பார்வை (அதிகாரி உதவிப் பயன்முறை)',
    whyWeAskThis: 'சட்டப்படி இது ஏன் தேவைப்படுகிறது?',
  },
};

export const getStoredLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('aems_lang') as Language;
    if (saved === 'ta' || saved === 'en') return saved;
  } catch {}
  return 'en';
};

export const setStoredLanguage = (lang: Language): void => {
  try {
    localStorage.setItem('aems_lang', lang);
  } catch {}
};

export const t = (key: string, lang: Language = getStoredLanguage()): string => {
  return translations[lang]?.[key] || translations.en[key] || key;
};
