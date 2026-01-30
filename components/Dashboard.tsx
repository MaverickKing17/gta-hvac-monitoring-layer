import React from 'react';
import { UserRole } from '../types';
import { FleetOverview } from './FleetOverview';
import { DiagnosticPanel } from './DiagnosticPanel';
import { RebateTracker } from './RebateTracker';
import { ROICalculator } from './ROICalculator';
import { MOCK_DEVICES, MOCK_ALERTS } from '../services/mockData';
import { LayoutGrid, Bell, Settings, LogOut, User } from 'lucide-react';

interface DashboardProps {
  userRole: UserRole;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole, onLogout }) => {
  return (
    <div className="min-h-screen bg-obsidian text-slate-200 font-sans selection:bg-electric/30">
      
      {/* Top Navigation */}
      <nav className="h-16 border-b border-white/10 glass-panel sticky top-0 z-50 px-6 flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div className="bg-electric/10 p-1.5 rounded-lg border border-electric/20">
               <LayoutGrid className="w-5 h-5 text-electric" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">Ambient Twin</span>
            <span className="hidden md:block text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
               {userRole === 'PARTNER' ? 'Partner Portal' : 'Homeowner View'}
            </span>
         </div>

         <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600">
                  <User className="w-4 h-4 text-slate-300" />
               </div>
               <button 
                  onClick={onLogout}
                  className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center"
               >
                  <LogOut className="w-3 h-3 mr-1" /> Sign Out
               </button>
            </div>
         </div>
      </nav>

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Left Column: Fleet & Devices */}
           <div className="space-y-6">
              <FleetOverview devices={MOCK_DEVICES} />
           </div>

           {/* Middle Column: Critical Diagnostics */}
           <div className="lg:h-[calc(100vh-8rem)]">
              <DiagnosticPanel 
                alerts={MOCK_ALERTS} 
                onRemoteAdjust={(id) => console.log(`Attempting remote fix for ${id}`)} 
              />
           </div>

           {/* Right Column: Financials & Tools */}
           <div className="space-y-6">
              <RebateTracker />
              <ROICalculator />
              
              {/* Mini Quick Actions */}
              <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                 <span className="text-sm font-medium text-slate-300">System Config</span>
                 <button className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" />
                 </button>
              </div>
           </div>

        </div>
      </main>

    </div>
  );
};