import React from 'react';
import { UserRole } from '../types';
import { FleetOverview } from './FleetOverview';
import { DiagnosticPanel } from './DiagnosticPanel';
import { RebateTracker } from './RebateTracker';
import { ROICalculator } from './ROICalculator';
import { MOCK_DEVICES, MOCK_ALERTS } from '../services/mockData';
import { LayoutGrid, Bell, Settings, LogOut, User, CloudSnow, Wind } from 'lucide-react';

interface DashboardProps {
  userRole: UserRole;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole, onLogout }) => {
  return (
    <div className="min-h-screen bg-obsidian text-slate-200 font-sans selection:bg-electric/30">
      
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
            <div className="bg-gradient-to-br from-electric to-blue-600 p-1.5 rounded-lg shadow-lg shadow-cyan-900/30">
               <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <div>
               <h1 className="font-bold text-white tracking-tight text-lg leading-none">Ambient Twin</h1>
               <span className="text-[10px] text-slate-400 font-mono tracking-wider">TORONTO NOC • {userRole} VIEW</span>
            </div>
         </div>

         {/* Weather Widget (Toronto Context) */}
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
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-obsidian"></span>
            </button>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="flex items-center space-x-3 cursor-pointer group">
               <div className="text-right hidden sm:block">
                  <p className="text-xs text-white font-medium group-hover:text-electric transition-colors">HVAC Partners Ltd.</p>
                  <p className="text-[10px] text-slate-500">Admin Access</p>
               </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Left Column: Fleet & Devices (3 cols) */}
           <div className="lg:col-span-3 space-y-6">
              <FleetOverview devices={MOCK_DEVICES} />
           </div>

           {/* Middle Column: Critical Diagnostics (5 cols) */}
           <div className="lg:col-span-6 lg:h-[calc(100vh-10rem)]">
              <DiagnosticPanel 
                alerts={MOCK_ALERTS} 
                onRemoteAdjust={(id) => console.log(`Attempting remote fix for ${id}`)} 
              />
           </div>

           {/* Right Column: Financials & Tools (4 cols) */}
           <div className="lg:col-span-3 space-y-6">
              <RebateTracker />
              <ROICalculator />
              
              {/* Mini Quick Actions */}
              <div className="glass-panel p-4 rounded-xl flex items-center justify-between border border-slate-800 bg-navy/40">
                 <div className="flex items-center">
                    <div className="bg-slate-800 p-2 rounded-lg mr-3">
                       <Settings className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                       <span className="text-sm font-medium text-slate-300 block">Global Config</span>
                       <span className="text-[10px] text-slate-500">v3.1.4 Stable</span>
                    </div>
                 </div>
                 <button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded border border-slate-700 transition-colors">
                    Manage
                 </button>
              </div>
           </div>

        </div>
      </main>

    </div>
  );
};