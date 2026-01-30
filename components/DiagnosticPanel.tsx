import React, { useState } from 'react';
import { DiagnosticAlert } from '../types.ts';
import { BrainCircuit, AlertOctagon, Wrench, X, Activity, Terminal, Zap, Gauge } from 'lucide-react';
import { generateDiagnosticReport } from '../services/geminiService.ts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MOCK_TELEMETRY } from '../services/mockData.ts';

interface DiagnosticPanelProps {
  alerts: DiagnosticAlert[];
  onRemoteAdjust: (alertId: string) => void;
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ alerts, onRemoteAdjust }) => {
  const [selectedAlert, setSelectedAlert] = useState<DiagnosticAlert | null>(alerts[0] || null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnalyze = async (alert: DiagnosticAlert) => {
    setIsGenerating(true);
    setAiReport(null);
    const report = await generateDiagnosticReport(alert.message, "High Efficiency Furnace");
    setAiReport(report);
    setIsGenerating(false);
  };

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden border border-white/10 bg-black/20 shadow-2xl">
      <div className="h-[40%] border-b border-white/10 p-6 flex flex-col">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-extrabold text-sm flex items-center uppercase tracking-widest">
               <Activity className="w-4 h-4 mr-2 text-orange-500" /> Health Telemetry
            </h3>
         </div>
         <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_TELEMETRY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#000', border: '1px solid #334155', color: '#fff' }} />
                  <Area type="monotone" dataKey="motorAmps" stroke="#f97316" fill="#f97316" fillOpacity={0.1} strokeWidth={2} />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
         <div className="px-6 py-3 bg-white/5 border-b border-white/5 text-[10px] font-black tracking-widest text-slate-400">ACTIVE ALERTS</div>
         <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {alerts.map(alert => (
               <div key={alert.id} onClick={() => setSelectedAlert(alert)} className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedAlert?.id === alert.id ? 'bg-white/10 border-orange-500/50' : 'bg-black/40 border-white/5'}`}>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-bold text-orange-500 uppercase">{alert.severity} • {alert.code}</span>
                     <button onClick={(e) => { e.stopPropagation(); handleAnalyze(alert); }} className="text-[9px] bg-orange-500 text-black px-2 py-1 rounded font-black">AI ANALYZE</button>
                  </div>
                  <h4 className="text-white text-sm font-bold">{alert.component}</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-tight">{alert.message}</p>
               </div>
            ))}
         </div>

         {aiReport && (
            <div className="absolute inset-0 bg-black/95 p-6 flex flex-col z-30 animate-in slide-in-from-bottom-5">
               <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                  <span className="text-xs font-bold text-orange-500 flex items-center"><Zap className="w-3 h-3 mr-2" /> AI CO-PILOT</span>
                  <button onClick={() => setAiReport(null)}><X className="w-5 h-5" /></button>
               </div>
               <div className="flex-1 text-sm font-mono text-slate-200 overflow-y-auto whitespace-pre-line">{aiReport}</div>
               <button className="mt-4 bg-orange-500 text-black font-black py-3 rounded-xl text-xs uppercase tracking-widest">Initiate Remote Fix</button>
            </div>
         )}
         
         {isGenerating && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-40">
               <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
               <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Analyzing Waveforms...</span>
            </div>
         )}
      </div>
    </div>
  );
};