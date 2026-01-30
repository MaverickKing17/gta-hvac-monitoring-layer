import React, { useState } from 'react';
import { DiagnosticAlert, TelemetryPoint } from '../types';
import { BrainCircuit, AlertOctagon, Wrench, X, Activity, Terminal, Zap, Gauge } from 'lucide-react';
import { generateDiagnosticReport } from '../services/geminiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MOCK_TELEMETRY } from '../services/mockData';

interface DiagnosticPanelProps {
  alerts: DiagnosticAlert[];
  onRemoteAdjust: (alertId: string) => void;
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ alerts, onRemoteAdjust }) => {
  const [selectedAlert, setSelectedAlert] = useState<DiagnosticAlert | null>(alerts[0] || null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnalyze = async (alert: DiagnosticAlert) => {
    if (selectedAlert?.id !== alert.id) {
      setSelectedAlert(alert);
    }
    
    setIsGenerating(true);
    setAiReport(null);
    const report = await generateDiagnosticReport(alert.message, "High Efficiency Furnace");
    setAiReport(report);
    setIsGenerating(false);
  };

  const closeReport = () => {
    setAiReport(null);
  };

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col relative overflow-hidden border border-white/20 bg-black/40 shadow-2xl">
      
      {/* 1. TELEMETRY VISUALIZATION */}
      <div className="h-[45%] border-b border-white/10 bg-black relative p-6 flex flex-col shadow-inner">
         <div className="flex justify-between items-center mb-6 z-10">
            <h3 className="text-white font-extrabold text-base flex items-center tracking-tight uppercase">
               <Activity className="w-5 h-5 mr-3 text-orange-500" />
               Live System Health: {selectedAlert ? 'Alert Analysis' : 'Nominal'}
            </h3>
            {selectedAlert && (
               <div className="flex space-x-4">
                  <span className="flex items-center text-[12px] font-bold font-mono bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                     <Zap className="w-4 h-4 mr-2" />
                     {MOCK_TELEMETRY[MOCK_TELEMETRY.length-1].motorAmps}A PEAK
                  </span>
                  <span className="flex items-center text-[12px] font-bold font-mono bg-white/5 text-white px-3 py-1 rounded-lg border border-white/10">
                     <Gauge className="w-4 h-4 mr-2" />
                     {MOCK_TELEMETRY[MOCK_TELEMETRY.length-1].staticPressure} IWC
                  </span>
               </div>
            )}
         </div>

         <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_TELEMETRY}>
                  <defs>
                     <linearGradient id="colorAmps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                  <XAxis 
                     dataKey="time" 
                     stroke="#94a3b8" 
                     fontSize={10} 
                     fontWeight="bold"
                     tickLine={false} 
                     axisLine={false} 
                     interval={4}
                  />
                  <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#000000', borderColor: '#f97316', color: '#ffffff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <ReferenceLine y={6.0} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'CRITICAL LIMIT', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }} />
                  <Area 
                     type="monotone" 
                     dataKey="motorAmps" 
                     stroke="#f97316" 
                     strokeWidth={3}
                     fillOpacity={1} 
                     fill="url(#colorAmps)" 
                     name="Motor Load (A)"
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 2. ALERTS FEED */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-black/20">
         
         <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex justify-between items-center">
            <span className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Priority Diagnostics</span>
            <span className="text-[11px] font-bold bg-orange-500 text-black px-3 py-1 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)]">
               {alerts.length} UNRESOLVED
            </span>
         </div>

         <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
            {alerts.map(alert => (
               <div 
                  key={alert.id} 
                  onClick={() => setSelectedAlert(alert)}
                  className={`group relative border rounded-2xl p-5 transition-all cursor-pointer ${
                     selectedAlert?.id === alert.id 
                     ? 'bg-white/10 border-orange-500/50 shadow-2xl scale-[1.01]' 
                     : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
               >
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center space-x-2.5">
                        <AlertOctagon className={`w-4 h-4 ${alert.severity === 'critical' ? 'text-orange-500' : 'text-amber-500'}`} />
                        <span className={`text-[11px] font-black uppercase tracking-widest ${alert.severity === 'critical' ? 'text-orange-500' : 'text-amber-500'}`}>
                           {alert.severity} • {alert.code}
                        </span>
                     </div>
                     <span className="text-[11px] font-bold font-mono text-slate-400">{alert.timestamp.toUpperCase()}</span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                     <div className="flex-1 pr-4">
                        <h4 className="text-white font-bold text-base mb-1">{alert.component} Anomaly</h4>
                        <p className="text-slate-300 text-xs leading-relaxed opacity-90">
                           {alert.message}
                        </p>
                     </div>
                     <button 
                        onClick={(e) => { e.stopPropagation(); handleAnalyze(alert); }}
                        className={`text-[11px] font-black px-4 py-2.5 rounded-xl flex items-center transition-all border uppercase tracking-widest ${
                           selectedAlert?.id === alert.id
                           ? 'bg-orange-500 text-black border-orange-400 shadow-xl'
                           : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                        }`}
                     >
                        <BrainCircuit className="w-4 h-4 mr-2" />
                        AI DIAGNOSTIC
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* AI RESPONSE OVERLAY */}
         {aiReport && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl p-8 flex flex-col z-30 animate-in slide-in-from-bottom-20">
               <div className="flex justify-between items-center mb-6 border-b border-orange-500/20 pb-6">
                  <div className="flex items-center text-orange-500">
                     <Terminal className="w-6 h-6 mr-3" />
                     <span className="font-mono text-sm font-black uppercase tracking-widest">Technician Co-Pilot • {selectedAlert?.code}</span>
                  </div>
                  <button onClick={closeReport} className="bg-white/5 p-2 rounded-xl text-slate-400 hover:text-white border border-white/10">
                     <X className="w-6 h-6" />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto font-mono text-sm text-white leading-relaxed space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 custom-scrollbar shadow-inner">
                  <p className="text-emerald-400 font-bold mb-4 flex items-center">
                    <Zap className="w-4 h-4 mr-2" /> [SYSTEM] PRE-DISPATCH ANALYSIS COMPLETE
                  </p>
                  <div className="whitespace-pre-line text-slate-100 font-medium">{aiReport}</div>
               </div>

               <div className="mt-8">
                  <button 
                     onClick={() => selectedAlert && onRemoteAdjust(selectedAlert.id)}
                     className="w-full bg-orange-500 text-black font-black py-4 rounded-2xl text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:bg-orange-400 transition-all flex items-center justify-center"
                  >
                     <Wrench className="w-5 h-5 mr-3" />
                     Initiate Over-The-Air Patch
                  </button>
               </div>
            </div>
         )}
         
         {isGenerating && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center">
               <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]"></div>
               <span className="text-xs font-black font-mono text-orange-500 tracking-[0.3em] uppercase animate-pulse">Running Diagnostic Simulation</span>
            </div>
         )}
      </div>
    </div>
  );
};