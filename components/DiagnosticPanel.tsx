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
    // If clicking the already selected alert, just toggle analysis
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
    <div className="glass-panel rounded-xl h-full flex flex-col relative overflow-hidden border border-slate-800 bg-navy/40">
      
      {/* 1. TOP SECTION: COMMAND CENTER VISUALIZATION */}
      <div className="h-[45%] border-b border-slate-800 bg-slate-900/50 relative p-4 flex flex-col">
         <div className="flex justify-between items-center mb-4 z-10">
            <h3 className="text-white font-semibold text-sm flex items-center tracking-tight">
               <Activity className="w-4 h-4 mr-2 text-electric" />
               LIVE TELEMETRY: {selectedAlert ? 'FAULT DETECTED' : 'SYSTEM NOMINAL'}
            </h3>
            {selectedAlert && (
               <div className="flex space-x-3 text-xs font-mono">
                  <span className="flex items-center text-red-400">
                     <Zap className="w-3 h-3 mr-1" />
                     {MOCK_TELEMETRY[MOCK_TELEMETRY.length-1].motorAmps}A (High)
                  </span>
                  <span className="flex items-center text-slate-400">
                     <Gauge className="w-3 h-3 mr-1" />
                     {MOCK_TELEMETRY[MOCK_TELEMETRY.length-1].staticPressure} iwc
                  </span>
               </div>
            )}
         </div>

         <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_TELEMETRY}>
                  <defs>
                     <linearGradient id="colorAmps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorPress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                     dataKey="time" 
                     stroke="#64748b" 
                     fontSize={10} 
                     tickLine={false} 
                     axisLine={false} 
                     interval={4}
                  />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '12px' }}
                     itemStyle={{ color: '#e2e8f0' }}
                  />
                  <ReferenceLine y={6.0} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Limit', fill: '#94a3b8', fontSize: 10 }} />
                  <Area 
                     type="monotone" 
                     dataKey="motorAmps" 
                     stroke="#ef4444" 
                     strokeWidth={2}
                     fillOpacity={1} 
                     fill="url(#colorAmps)" 
                     name="Motor Amps"
                  />
                  <Area 
                     type="monotone" 
                     dataKey="staticPressure" 
                     stroke="#06b6d4" 
                     strokeWidth={2}
                     fillOpacity={1} 
                     fill="url(#colorPress)" 
                     name="Static Pressure"
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 2. BOTTOM SECTION: ALERTS & AI INSIGHTS */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
         
         <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-2">Active Incidents</span>
            <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20">
               {alerts.length} OPEN
            </span>
         </div>

         <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-2">
            {alerts.map(alert => (
               <div 
                  key={alert.id} 
                  onClick={() => setSelectedAlert(alert)}
                  className={`group relative border rounded-lg p-3 transition-all cursor-pointer ${
                     selectedAlert?.id === alert.id 
                     ? 'bg-slate-800/80 border-slate-600 shadow-lg shadow-black/20' 
                     : 'bg-slate-900/20 border-slate-800 hover:bg-slate-800/40'
                  }`}
               >
                  <div className="flex justify-between items-start mb-1">
                     <div className="flex items-center space-x-2">
                        <AlertOctagon className={`w-3.5 h-3.5 ${alert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${alert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`}>
                           {alert.severity}
                        </span>
                     </div>
                     <span className="text-[10px] font-mono text-slate-500">{alert.timestamp}</span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                     <div>
                        <h4 className="text-slate-200 font-medium text-sm">{alert.component} Anomaly</h4>
                        <p className="text-slate-500 text-[11px] font-mono mt-0.5 truncate max-w-[200px]">
                           Code: {alert.code}
                        </p>
                     </div>
                     <button 
                        onClick={(e) => { e.stopPropagation(); handleAnalyze(alert); }}
                        className={`text-[10px] px-2 py-1 rounded flex items-center transition-colors border ${
                           selectedAlert?.id === alert.id
                           ? 'bg-electric text-obsidian border-electric font-bold'
                           : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                     >
                        <BrainCircuit className="w-3 h-3 mr-1" />
                        ANALYZE
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* AI OVERLAY / DRAWER */}
         {aiReport && (
            <div className="absolute inset-x-0 bottom-0 top-0 bg-slate-950/95 backdrop-blur-md p-4 flex flex-col z-20 transition-transform duration-300 animate-in slide-in-from-bottom-10">
               <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center text-electric">
                     <Terminal className="w-4 h-4 mr-2" />
                     <span className="font-mono text-xs font-bold">AGENT_RESPONSE_V3.1</span>
                  </div>
                  <button onClick={closeReport} className="text-slate-500 hover:text-white">
                     <X className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-2">
                  <p className="text-emerald-500 mb-2">{'>'} Analysis Complete. Root cause identified.</p>
                  <div className="whitespace-pre-line opacity-90">{aiReport}</div>
               </div>

               <div className="mt-3 pt-3 border-t border-slate-800">
                  <button 
                     onClick={() => selectedAlert && onRemoteAdjust(selectedAlert.id)}
                     className="w-full bg-gradient-to-r from-electric to-blue-600 text-white font-medium py-2 rounded-lg text-xs hover:shadow-lg hover:shadow-cyan-900/20 flex items-center justify-center transition-all"
                  >
                     <Wrench className="w-3.5 h-3.5 mr-2" />
                     Execute Remediation Protocol
                  </button>
               </div>
            </div>
         )}
         
         {/* LOADING STATE */}
         {isGenerating && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
               <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin mb-3"></div>
               <span className="text-xs font-mono text-electric animate-pulse">Running Physics Simulation...</span>
            </div>
         )}
      </div>
    </div>
  );
};