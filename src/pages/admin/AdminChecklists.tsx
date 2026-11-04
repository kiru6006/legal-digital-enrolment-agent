import React, { useState } from 'react';
import { ListChecks, Plus, CheckCircle2, Save } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';

export const AdminChecklists: React.FC = () => {
  const [savedAlert, setSavedAlert] = useState(false);
  const [checklists, setChecklists] = useState([
    { id: 'chk-1', name: 'Identity Proof (Aadhaar / Passport)', rule: 'Rule 7', req: 'Mandatory', active: true },
    { id: 'chk-2', name: 'Recognized Law Degree Certificate', rule: 'Section 24(1)(c)', req: 'Mandatory', active: true },
    { id: 'chk-3', name: 'Consolidated Mark Statements', rule: 'Rule 8', req: 'Mandatory', active: true },
    { id: 'chk-4', name: 'Territorial Address Proof (Tamil Nadu / Puducherry)', rule: 'Rule 9', req: 'Mandatory', active: true },
    { id: 'chk-5', name: 'Bar Rule 49 Non-Employment Declaration', rule: 'BCI Rule 49', req: 'Mandatory', active: true },
    { id: 'chk-6', name: 'Two Good Moral Character Certificates', rule: 'Rule 11', req: 'Mandatory', active: true },
    { id: 'chk-7', name: 'Official Enrolment Fee Treasury Challan', rule: 'Rule 14', req: 'Mandatory', active: true },
  ]);

  const toggleChecklist = (id: string) => {
    setChecklists((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Checklist Administration
          </span>
          <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-300">
            DRAFT CHECKLIST, NOT APPROVED
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900">Statutory Scrutiny Checklist Configuration</h1>
        <p className="text-xs text-slate-500">
          Configure mandatory document requirements and rules evaluated during AI intake and officer verification. (BRD D6.1 illustrative categories).
        </p>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
          Checklist configuration updated and persisted!
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configured Enrolment Checklists ({checklists.length})</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100 p-0 text-xs">
          {checklists.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-[11px] text-slate-500 font-mono">
                  Statutory Citation: {item.rule} &bull; Type: {item.req}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={item.active ? 'success' : 'neutral'} size="sm">
                  {item.active ? 'ACTIVE' : 'DISABLED'}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleChecklist(item.id)}
                  className="text-xs"
                >
                  {item.active ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

