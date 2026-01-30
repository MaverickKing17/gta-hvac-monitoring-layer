import React, { useState } from 'react';
import { PartnerBranding, SecurityStatus } from '../types';
import { Palette, Upload, ShieldCheck, Database, Globe, Lock } from 'lucide-react';

interface BrandingSettingsProps {
  branding: PartnerBranding;
  onUpdate: (branding: PartnerBranding) => void;
  security: SecurityStatus;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ branding, onUpdate, security }) => {
  const [form, setForm] = useState(branding);

  const colors = ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="w-5 h-5 text-electric" />
          <h3 className="text-white font-semibold">White-Label Branding</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Partner Entity Name</label>
            <input 
              value={form.companyName}
              onChange={(e) => setForm({...form, companyName: e.target.value})}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-electric"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Theme Identity Color</label>
            <div className="flex space-x-3">
              {colors.map(c => (
                <button 
                  key={c}
                  onClick={() => setForm({...form, primaryColor: c})}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${form.primaryColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => onUpdate(form)}
              className="w-full bg-electric text-obsidian font-bold py-2.5 rounded-lg text-sm transition-all hover:bg-cyan-400"
            >
              Deploy Brand Configuration
            </button>
          </div>
        </div>
      </div>

      {/* SOC2 & Security Layer */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-emerald-500/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-white font-semibold">Security & Compliance</h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
            SOC 2 TYPE II VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
             <div className="flex items-center text-slate-400">
               <Database className="w-4 h-4 mr-3" /> Data Residency
             </div>
             <span className="text-white font-mono">{security.dataResidency}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
             <div className="flex items-center text-slate-400">
               <Globe className="w-4 h-4 mr-3" /> PIPEDA/Compliance
             </div>
             <span className="text-emerald-500">Verified</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
             <div className="flex items-center text-slate-400">
               <Lock className="w-4 h-4 mr-3" /> Encryption
             </div>
             <span className="text-white font-mono">{security.encryptionStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};