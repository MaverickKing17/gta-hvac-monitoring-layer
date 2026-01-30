import React, { useState } from 'react';
import { UserRole, PartnerBranding, SecurityStatus } from '../types';
import { FleetOverview } from './FleetOverview';
import { DiagnosticPanel } from './DiagnosticPanel';
import { RebateTracker } from './RebateTracker';
import { ROICalculator } from './ROICalculator';
import { BrandingSettings } from './BrandingSettings';
import { AIChatAssistant } from './AIChatAssistant';
import { MOCK_DEVICES, MOCK_ALERTS } from '../services/mockData';
import { LayoutGrid, Bell, Settings, LogOut, User, CloudSnow, Wind, Shield, Users, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-obsidian text-white font-sans selection:bg-orange-500/30">
      <style>{`
        :root {
          --primary-brand: ${branding.primaryColor};
        }
        .text-brand { color: var(--primary-brand); }
        .bg-brand { background-color: var(--primary-brand); }
        .border-brand { border-color: var(--primary-brand); }
      `}</style>
      
      {/* 1. HIGH-IMPACT STATUS TICKER */}
      <div className="bg-black border-b border-orange-500/30 h-10 flex items-center px-4 overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.15)]">
         <div className="flex space-x-12 animate-marquee whitespace-nowrap text-[11px] font-bold font-mono uppercase tracking-widest text-white">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_#10b981]"></span>IESO GRID STATUS: NORMAL (19,240 MW)</span>
            <span className="flex items-center text-orange-400"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2 shadow-[0_0_8px_#f97316]"></span>SEAM API LATENCY: 42ms</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>TORONTO HYDRO ALERT: PEAK PRICING 4PM-9PM</span>
            <span className="flex items-center"><Activity className="w-3 h-3 mr-2" /> ENBRIDGE GAS SUPPLY: STABLE (GTA REGION)</span>
            <span className="flex items-center text-emerald-400">PRE-DISPATCH CONFIDENCE: 98.4%</span>
         </div>
      </div>

      {/* 2. ENTERPRISE HEADER */}
      <nav className="h-20 border-b border-white/20 glass-panel sticky top-0 z-50 px-8 flex items-center justify-between backdrop-blur-xl shadow-2xl">
         <div className="flex items-center space-x-6">
            <div className="bg-brand p-2.5 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)]">
               <LayoutGrid className="w-6 h-6 text-black font-bold" />
            </div>
            <div>
               <h1 className="font-extrabold text-white tracking-tight text-2xl uppercase">{branding.companyName}</h1>
               <div className="flex items-center mt-1 space-x-3">
                  <span className="text-[11px] text-orange-400 font-bold font-mono tracking-widest uppercase">Ambient Twin • TORONTO NOC</span>
                  <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                  <span className="text-[11px] text-emerald-400 font-bold font-mono flex items-center bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                    <Shield className="w-3 h-3 mr-1.5" /> SOC2 VERIFIED
                  </span>
               </div>
            </div>
         </div>

         <div className="hidden xl:flex items-center space-x-8 bg-black/40 px-6 py-2.5 rounded-2xl border border-white/10">
             <div className="flex items-center space-x-3 border-r border-white/10 pr-8">
                <CloudSnow className="w-5 h-5 text-white" />
                <div className="flex flex-col">
                   <span className="text-sm text-white font-bold">-8°C</span>
                   <span className="text-[11px] text-slate-300 font-semibold">Toronto Pearson</span>
                </div>
             </div>
             <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-white" />
                <div className="flex flex-col">
                   <span className="text-sm text-white font-bold">NW 24km/h</span>
                   <span className="text-[11px] text-slate-300 font-semibold">Wind Chill -15</span>
                </div>
             </div>
         </div>

         <div className="flex items-center space-x-5">
            <div className="flex bg-black p-1.5 rounded-xl border border-slate-700 shadow-inner">
               <button 
                onClick={() => setActiveTab('fleet')}
                className={`p-2.5 rounded-lg transition-all ${activeTab === 'fleet' ? 'bg-brand text-black font-bold shadow-lg' : 'text-slate-400 hover:text-white'}`}
               >
                 <Users className="w-5 h-5" />
               </button>
               <button 
                onClick={() => setActiveTab('settings')}
                className={`p-2.5 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-brand text-black font-bold shadow-lg' : 'text-slate-400 hover:text-white'}`}
               >
                 <Settings className="w-5 h-5" />
               </button>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex items-center space-x-4 group cursor-pointer">
               <div className="flex flex-col text-right hidden sm:block">
                  <span className="text-sm font-bold text-white uppercase">{userRole} ADMIN</span>
                  <span className="text-[10px] text-emerald-400 font-mono">ID: 08842-CA</span>
               </div>
               <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/20 shadow-xl group-hover:border-orange-500/50 transition-colors">
                  <User className="w-5 h-5 text-white" />
               </div>
               <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
               >
                  <LogOut className="w-5 h-5" />
               </button>
            </div>
         </div>
      </nav>

      <main className="p-6 md:p-8 max-w-[1700px] mx-auto">
        {activeTab === 'fleet' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <div className="lg:col-span-3 space-y-8">
                <FleetOverview devices={MOCK_DEVICES} />
             </div>
             <div className="lg:col-span-6 lg:h-[calc(100vh-12rem)]">
                <DiagnosticPanel 
                  alerts={MOCK_ALERTS} 
                  onRemoteAdjust={(id) => console.log(`Remote patch for ${id}`)} 
                />
             </div>
             <div className="lg:col-span-3 space-y-8">
                <RebateTracker />
                <ROICalculator />
                <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/10 bg-black/40">
                   <div className="flex items-center">
                      <div className="bg-emerald-500/20 p-2.5 rounded-xl mr-4 border border-emerald-500/30">
                         <Shield className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                         <span className="text-sm font-bold text-white block uppercase tracking-tighter">Security Posture</span>
                         <span className="text-[11px] text-slate-400 font-mono">Last Audit: {securityStatus.lastSecurityAudit}</span>
                      </div>
                   </div>
                   <button className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-lg border border-slate-600 uppercase tracking-widest font-mono">
                      LOGS
                   </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto py-12">
            <BrandingSettings 
              branding={branding} 
              onUpdate={setBranding} 
              security={securityStatus}
            />
          </div>
        )}
      </main>

      <AIChatAssistant />
    </div>
  );
};