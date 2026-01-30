import React, { useState } from 'react';
import { UserRole, PartnerBranding, SecurityStatus } from '../types';
import { FleetOverview } from './FleetOverview';
import { DiagnosticPanel } from './DiagnosticPanel';
import { RebateTracker } from './RebateTracker';
import { ROICalculator } from './ROICalculator';
import { BrandingSettings } from './BrandingSettings';
import { AIChatAssistant } from './AIChatAssistant';
import { MOCK_DEVICES, MOCK_ALERTS } from '../services/mockData';
import { LayoutGrid, Bell, Settings, LogOut, User, CloudSnow, Wind, Shield, Users } from 'lucide-react';

interface DashboardProps {
  userRole: UserRole;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'settings'>('fleet');
  const [branding, setBranding] = useState<PartnerBranding>({
    companyName: 'HVAC Partners Ltd.',
    primaryColor: '#06b6d4',
    accentColor: '#10b981'
  });

  const securityStatus: SecurityStatus = {
    soc2Status: 'Compliant',
    dataResidency: 'Toronto (CA-CENTRAL-1)',
    encryptionStatus: 'AES-256-GCM',
    lastSecurityAudit: '2024-11-15'
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-200 font-sans selection:bg-electric/30">
      <style>{`
        :root {
          --primary-brand: ${branding.primaryColor};
        }
        .text-brand { color: var(--primary-brand); }
        .bg-brand { background-color: var(--primary-brand); }
        .border-brand { border-color: var(--primary-brand); }
      `}</style>
      
      {/* Enterprise Status Ticker */}
      <div className="bg-slate-950 border-b border-white/5 h-8 flex items-center px-4 overflow-hidden">
         <div className="flex space-x-8 animate-marquee whitespace-nowrap text-[10px] font-mono text-slate-500">
            <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>IESO GRID STATUS: NORMAL (19,240 MW)</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-electric mr-2"></span>SEAM API LATENCY: 42ms</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>TORONTO HYDRO ALERT: PEAK PRICING 4PM-9PM</span>
            <span>ENBRIDGE GAS SUPPLY: STABLE</span>
         </div>
      </div>

      {/* Top Navigation */}
      <nav className="h-16 border-b border-white/10 glass-panel sticky top-0 z-50 px-6 flex items-center justify-between backdrop-blur-md">
         <div className="flex items-center space-x-4">
            <div className="bg-brand p-1.5 rounded-lg shadow-lg shadow-cyan-900/30">
               <LayoutGrid className="w-5 h-5 text-obsidian" />
            </div>
            <div>
               <h1 className="font-bold text-white tracking-tight text-lg leading-none">{branding.companyName}</h1>
               <div className="flex items-center mt-1 space-x-2">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">TORONTO NOC • {userRole} VIEW</span>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span className="text-[10px] text-emerald-500 font-mono flex items-center">
                    <Shield className="w-2.5 h-2.5 mr-1" /> SOC2 PROTECTED
                  </span>
               </div>
            </div>
         </div>

         <div className="hidden md:flex items-center space-x-6 bg-slate-900/50 px-4 py-1.5 rounded-full border border-white/5">
             <div className="flex items-center space-x-2 border-r border-white/10 pr-6">
                <CloudSnow className="w-4 h-4 text-slate-400" />
                <div className="flex flex-col">
                   <span className="text-xs text-white font-medium">-8°C</span>
                   <span className="text-[10px] text-slate-500">Toronto YYZ</span>
                </div>
             </div>
             <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-slate-400" />
                <div className="flex flex-col">
                   <span className="text-xs text-white font-medium">NW 24km/h</span>
                   <span className="text-[10px] text-slate-500">Wind Chill -15</span>
                </div>
             </div>
         </div>

         <div className="flex items-center space-x-4">
            <div className="flex bg-slate-950/50 rounded-lg p-1 border border-slate-800">
               <button 
                onClick={() => setActiveTab('fleet')}
                className={`p-1.5 rounded-md transition-all ${activeTab === 'fleet' ? 'bg-brand text-obsidian shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 <Users className="w-4 h-4" />
               </button>
               <button 
                onClick={() => setActiveTab('settings')}
                className={`p-1.5 rounded-md transition-all ${activeTab === 'settings' ? 'bg-brand text-obsidian shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 <Settings className="w-4 h-4" />
               </button>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="flex items-center space-x-3 cursor-pointer group">
               <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600 shadow-inner">
                  <User className="w-4 h-4 text-slate-300" />
               </div>
               <button 
                  onClick={onLogout}
                  className="text-slate-500 hover:text-red-400 transition-colors"
               >
                  <LogOut className="w-4 h-4" />
               </button>
            </div>
         </div>
      </nav>

      <main className="p-4 md:p-6 max-w-[1600px] mx-auto">
        {activeTab === 'fleet' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
             <div className="lg:col-span-3 space-y-6">
                <FleetOverview devices={MOCK_DEVICES} />
             </div>
             <div className="lg:col-span-6 lg:h-[calc(100vh-10rem)]">
                <DiagnosticPanel 
                  alerts={MOCK_ALERTS} 
                  onRemoteAdjust={(id) => console.log(`Remote patch for ${id}`)} 
                />
             </div>
             <div className="lg:col-span-3 space-y-6">
                <RebateTracker />
                <ROICalculator />
                <div className="glass-panel p-4 rounded-xl flex items-center justify-between border border-slate-800 bg-navy/40">
                   <div className="flex items-center">
                      <div className="bg-slate-800 p-2 rounded-lg mr-3">
                         <Shield className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                         <span className="text-sm font-medium text-slate-300 block">Security Audit</span>
                         <span className="text-[10px] text-slate-500">Verified: {securityStatus.lastSecurityAudit}</span>
                      </div>
                   </div>
                   <button className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700 uppercase font-mono tracking-tighter">
                      Log
                   </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-10">
            <BrandingSettings 
              branding={branding} 
              onUpdate={setBranding} 
              security={securityStatus}
            />
          </div>
        )}
      </main>

      {/* Persistence AI Assistant */}
      <AIChatAssistant />
    </div>
  );
};