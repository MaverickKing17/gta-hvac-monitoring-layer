import React, { useState } from 'react';
import { UserRole, PartnerBranding, SecurityStatus } from '../types.ts';
import { FleetOverview } from './FleetOverview.tsx';
import { DiagnosticPanel } from './DiagnosticPanel.tsx';
import { RebateTracker } from './RebateTracker.tsx';
import { ROICalculator } from './ROICalculator.tsx';
import { BrandingSettings } from './BrandingSettings.tsx';
import { AIChatAssistant } from './AIChatAssistant.tsx';
import { MOCK_DEVICES, MOCK_ALERTS } from '../services/mockData.ts';
import { LayoutGrid, LogOut, User, CloudSnow, Wind, Shield, Users, Activity } from 'lucide-react';

interface DashboardProps {
  userRole: UserRole;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'settings'>('fleet');
  const [branding, setBranding] = useState<PartnerBranding>({
    companyName: 'Reliance Home Comfort (Toronto)',
    primaryColor: '#f97316',
    accentColor: '#10b981'
  });

  const securityStatus: SecurityStatus = {
    soc2Status: 'Compliant',
    dataResidency: 'Toronto (CA-CENTRAL-1)',
    encryptionStatus: 'AES-256-GCM',
    lastSecurityAudit: '2024-11-15'
  };

  return (
    <div className="flex-1 flex flex-col bg-obsidian text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      <style>{`
        :root { --primary-brand: ${branding.primaryColor}; }
        .text-brand { color: var(--primary-brand); }
        .bg-brand { background-color: var(--primary-brand); }
      `}</style>
      
      <div className="bg-black border-b border-orange-500/30 h-10 flex items-center px-4 overflow-hidden shrink-0 shadow-lg">
         <div className="flex space-x-12 animate-marquee whitespace-nowrap text-[11px] font-bold font-mono uppercase tracking-widest text-white">
            <span>IESO GRID STATUS: NORMAL (19,240 MW)</span>
            <span className="text-orange-400">SEAM API LATENCY: 42ms</span>
            <span>TORONTO HYDRO ALERT: PEAK PRICING ACTIVE</span>
            <span className="text-emerald-400">PRE-DISPATCH CONFIDENCE: 98.4%</span>
         </div>
      </div>

      <nav className="h-20 border-b border-white/10 glass-panel sticky top-0 z-50 px-8 flex items-center justify-between backdrop-blur-xl shrink-0">
         <div className="flex items-center space-x-6">
            <div className="bg-brand p-2.5 rounded-xl shadow-lg">
               <LayoutGrid className="w-6 h-6 text-black" />
            </div>
            <div>
               <h1 className="font-extrabold text-white tracking-tight text-xl uppercase">{branding.companyName}</h1>
               <div className="flex items-center space-x-3">
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Ambient Twin NOC</span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center bg-emerald-400/10 px-2 rounded border border-emerald-400/20">
                    <Shield className="w-3 h-3 mr-1" /> SOC2
                  </span>
               </div>
            </div>
         </div>

         <div className="flex items-center space-x-5">
            <div className="flex bg-black p-1 rounded-xl border border-slate-700">
               <button onClick={() => setActiveTab('fleet')} className={`p-2 rounded-lg ${activeTab === 'fleet' ? 'bg-brand text-black' : 'text-slate-400'}`}><Users className="w-5 h-5" /></button>
               <button onClick={() => setActiveTab('settings')} className={`p-2 rounded-lg ${activeTab === 'settings' ? 'bg-brand text-black' : 'text-slate-400'}`}><LogOut className="w-5 h-5" /></button>
            </div>
            <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
         </div>
      </nav>

      <main className="flex-1 p-6 w-full max-w-[1700px] mx-auto overflow-y-auto">
        {activeTab === 'fleet' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <div className="lg:col-span-3"><FleetOverview devices={MOCK_DEVICES} /></div>
             <div className="lg:col-span-6 h-[700px]"><DiagnosticPanel alerts={MOCK_ALERTS} onRemoteAdjust={() => {}} /></div>
             <div className="lg:col-span-3 space-y-8"><RebateTracker /><ROICalculator /></div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto py-12"><BrandingSettings branding={branding} onUpdate={setBranding} security={securityStatus} /></div>
        )}
      </main>

      <AIChatAssistant />
    </div>
  );
};