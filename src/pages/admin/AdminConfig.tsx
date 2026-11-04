import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/common/Card';

export const AdminConfig: React.FC = () => {
  const [config, setConfig] = useState({
    slaDays: '7',
    aiConfidenceThreshold: '85',
    maxDeficiencyDays: '15',
    autoAssignAlgorithm: 'Round-Robin Scrutiny',
    ocrEngine: 'Tesseract-Gov Legal Model v4',
    enablePublicDigest: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('aems_admin_config', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900">System Parameters &amp; Engine Settings</h1>
        <p className="text-xs text-slate-500">
          Configure operational thresholds, AI scrutiny confidence gates, and statutory notice defaults.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
          System parameters saved successfully to local storage!
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">General Enrolment Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target Scrutiny Turnaround SLA (Days):
              </label>
              <input
                type="number"
                value={config.slaDays}
                onChange={(e) => setConfig({ ...config, slaDays: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                AI OCR Confidence Gating Threshold (%):
              </label>
              <input
                type="number"
                value={config.aiConfidenceThreshold}
                onChange={(e) => setConfig({ ...config, aiConfidenceThreshold: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Applicant Deficiency Cure Window (Days):
              </label>
              <input
                type="number"
                value={config.maxDeficiencyDays}
                onChange={(e) => setConfig({ ...config, maxDeficiencyDays: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Case Allocation Strategy:
              </label>
              <select
                value={config.autoAssignAlgorithm}
                onChange={(e) => setConfig({ ...config, autoAssignAlgorithm: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              >
                <option>Round-Robin Scrutiny</option>
                <option>Workload-Balanced Auto Dispatch</option>
                <option>District Law Faculty Specialized Queues</option>
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="primary" size="sm" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save Parameters
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
