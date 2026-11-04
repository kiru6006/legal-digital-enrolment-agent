import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Bell, CheckCircle2, AlertTriangle, Info, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { currentRole, notifications, markNotificationRead, markAllNotificationsRead } = useAEMS();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const roleFilteredNotifs = notifications.filter(
    (n) => n.recipientRole === currentRole || n.recipientRole === 'all'
  );

  const handleActionClick = (notif: any) => {
    markNotificationRead(notif.id);
    onClose();
    if (notif.actionUrl) {
      navigate(notif.actionUrl);
    }
  };

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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-sm text-slate-900">Notification Centre</h3>
            <Badge variant="primary" size="sm">
              {roleFilteredNotifs.filter((n) => !n.read).length} Unread
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2.5 bg-slate-100/60 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Role view: <strong className="capitalize text-slate-700">{currentRole}</strong></span>
          <button
            onClick={markAllNotificationsRead}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Mark all read
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
          {roleFilteredNotifs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No notifications for this role at present.
            </div>
          ) : (
            roleFilteredNotifs.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  n.read
                    ? 'bg-white border-slate-100 text-slate-600'
                    : 'bg-blue-50/50 border-blue-100 text-slate-900'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold truncate">{n.title}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    {n.actionUrl && (
                      <button
                        onClick={() => handleActionClick(n)}
                        className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-500">
            Automated event triggers broadcast live across applicant and official channels.
          </p>
        </div>
      </div>
    </div>
  );
};
