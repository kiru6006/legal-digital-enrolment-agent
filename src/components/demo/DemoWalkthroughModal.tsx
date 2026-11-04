import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useAEMS } from '../../store/applicationStore';
import { PRIMARY_DEMO_APP_ID } from '../../data/mockApplications';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  Briefcase,
  AlertCircle,
  FileCheck2,
  Layers,
  Gavel,
} from 'lucide-react';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({ isOpen, onClose }) => {
  const { switchRole } = useAEMS();
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      role: 'applicant' as const,
      title: 'Applicant Portal - Status & Deficiencies',
      desc: 'View Arjun Kumar\'s application (AEMS-2026-00125). Notice status "Correction Required" and 2 document notices.',
      route: '/applicant/dashboard',
      icon: UserCheck,
      badge: 'Applicant View',
    },
    {
      step: 2,
      role: 'officer' as const,
      title: 'Officer Workstation - Work Queue',
      desc: 'Switch to Enrolment Official. Inspect daily work queue, priority filtering, and open Arjun Kumar\'s case.',
      route: '/officer/work-queue',
      icon: Briefcase,
      badge: 'Official Queue',
    },
    {
      step: 3,
      role: 'officer' as const,
      title: 'Digital Case File & AI Review',
      desc: 'Examine single-pane digital case file. Click "Run AI Document Review" to simulate automatic classification, OCR extraction, and checklist match.',
      route: `/officer/ai-review/${PRIMARY_DEMO_APP_ID}`,
      icon: Sparkles,
      badge: 'AI Engine',
    },
    {
      step: 4,
      role: 'officer' as const,
      title: 'Deficiency Notice Drafting & Tracking',
      desc: 'Review AI-generated observations on address scan quality & name disparity. Issue or manage deficiencies with standard templates.',
      route: '/officer/deficiencies',
      icon: AlertCircle,
      badge: 'Statutory Notice',
    },
    {
      step: 5,
      role: 'applicant' as const,
      title: 'Applicant Self-Service Correction',
      desc: 'Switch back to Applicant. Upload a corrected 300-DPI e-bill PDF to resolve the open defect in real time.',
      route: '/applicant/documents',
      icon: FileCheck2,
      badge: 'Live Upload',
    },
    {
      step: 6,
      role: 'officer' as const,
      title: 'Official Re-Scrutiny & Verification',
      desc: 'Official reviews uploaded correction, inspects side-by-side version comparison, and marks deficiency as RESOLVED.',
      route: `/officer/case/${PRIMARY_DEMO_APP_ID}`,
      icon: CheckCircle2,
      badge: 'Verification',
    },
    {
      step: 7,
      role: 'management' as const,
      title: 'Senior Management Command Centre',
      desc: 'Registrar views live pipeline progress, officer workload balance, SLA ageing, and statutory reports.',
      route: '/management/dashboard',
      icon: Layers,
      badge: 'Executive Oversight',
    },
    {
      step: 8,
      role: 'committee' as const,
      title: 'Enrolment Committee Statutory Review',
      desc: 'Committee members review meeting pack and record statutory enrolment decision for the candidate.',
      route: `/committee/case/${PRIMARY_DEMO_APP_ID}`,
      icon: Gavel,
      badge: 'Bar Decision',
    },
  ];

  const handleJumpToStep = (role: any, route: string) => {
    switchRole(role);
    onClose();
    navigate(route);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AEMS 5-Minute Guided Demonstration Script"
      description="Follow this recommended 8-step sequence to showcase the full end-to-end digital enrolment workflow to Bar Council leadership."
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-slate-500">
            Click any step to instantly switch role and navigate.
          </span>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <Badge variant="neutral" size="sm">
                      {item.badge}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleJumpToStep(item.role, item.route)}
                icon={<ArrowRight className="w-3 h-3 text-blue-600" />}
                className="shrink-0 text-xs text-blue-700 hover:text-blue-800"
              >
                Go to Step {item.step}
              </Button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
