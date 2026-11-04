import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  ArrowUpRight,
  Filter,
  Check,
} from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';

export const ApplicantNotifications: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAEMS();
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState<string>('all');

  const applicantNotifications = notifications.filter(
    (n) => n.recipientRole === 'applicant' || n.recipientRole === 'all'
  );

  const filtered = applicantNotifications.filter((n) => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'action_required') return n.type === 'alert' || n.type === 'warning';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Applicant Notification Centre</h1>
          <p className="text-xs text-slate-500">
            Real-time scrutiny status alerts, deficiency notices, and schedule updates from the Bar Council.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllNotificationsRead}
          icon={<Check className="w-3.5 h-3.5" />}
        >
          Mark all as read
        </Button>
      </div>

      {/* Daily Digest Summary Card */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wide">
            Daily Applicant Digest • Bar Council Enrolment Office
          </h3>
        </div>
        <p className="text-xs text-blue-900 leading-relaxed">
          You currently have <strong>{applicantNotifications.filter((n) => !n.read).length} unread updates</strong> and <strong>1 pending deficiency notice</strong> awaiting document re-upload. Your legal degree credentials have completed preliminary statutory OCR intake.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
        {[
          { id: 'all', label: `All Notices (${applicantNotifications.length})` },
          { id: 'unread', label: `Unread (${applicantNotifications.filter((n) => !n.read).length})` },
          { id: 'action_required', label: 'Action Required' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === tab.id
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No notifications matching selected filter.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                  item.read ? 'bg-white' : 'bg-blue-50/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{getIcon(item.type)}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>{item.date}</span>
                      {item.relatedRefNumber && (
                        <span className="font-mono text-blue-600">Ref: {item.relatedRefNumber}</span>
                      )}
                    </div>
                  </div>
                </div>

                {item.actionUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      markNotificationRead(item.id);
                      navigate(item.actionUrl!);
                    }}
                    className="shrink-0 text-xs"
                    icon={<ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />}
                  >
                    Open
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

