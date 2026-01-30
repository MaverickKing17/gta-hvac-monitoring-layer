import React, { useState } from 'react';
import { DiagnosticAlert } from '../types';
import { BrainCircuit, AlertOctagon, Wrench, ChevronRight, X, Activity, Terminal } from 'lucide-react';
import { generateDiagnosticReport } from '../services/geminiService';

interface DiagnosticPanelProps {
  alerts: DiagnosticAlert[];
  onRemoteAdjust: (alertId: string) => void;
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ alerts, onRemoteAdjust }) => {
  const [selectedAlert, setSelectedAlert] = useState<DiagnosticAlert | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnalyze = async (alert: DiagnosticAlert) => {
    setSelectedAlert(alert);
    setIsGenerating(true);
    setAiReport(null);
    const report = await generateDiagnosticReport(alert.message, "High Efficiency Furnace");
    setAiReport(report);
    setIsGenerating(false);
  };

  const closeDetail = () => {
    setSelectedAlert(null);
    setAiReport(null);
  };

  return (
    <div className="glass-panel rounded-xl p-0 h-full flex flex-col relative overflow-hidden border border-slate-800 bg-navy/40">
      
      {/* Header with Heartbeat */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/30">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold text-lg flex items-center tracking-tight">
            <BrainCircuit className="w-5 h-5 mr-2 text-electric" />
            Agentic Diagnostics
            </h3>
            <span className="text-[10px] font-mono text-electric bg-electric/10 px-2 py-0.5 rounded border border-electric/20 flex items-center">
               <span className="w-1.5 h-1.5 rounded-full bg-electric mr-1.5 animate-pulse" />
               LIVE MONITOR
            </span>
        </div>
        
        {/* Fake Sparkline / Heartbeat */}
        <div className="h-8 w-full flex items-end space-x-0.5 opacity-50">
             {[...Array(40)].map((_, i) => (
                <div 
                   key={i} 
                   className="w-full bg-emerald-500/20 rounded-t-sm transition-all duration-700" 
                   style={{ height: `${20 + Math.random() * 60}%` }}
                />
             ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {alerts.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
              <Activity className="w-12 h-12 text-slate-700" />
              <p>System Nominal. No Faults.</p>
           </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className="group relative bg-slate-900/40 border border-slate-800 rounded-lg p-4 hover:border-slate-600 transition-all hover:bg-slate-800/60">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                   <AlertOctagon className={`w-4 h-4 ${alert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                   <span className={`text-xs font-bold uppercase tracking-wider ${alert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`}>
                     {alert.severity}
                   </span>
                   <span className="text-[10px] font-mono text-slate-600 bg-slate-900 px-1.5 rounded border border-slate-800">
                      {alert.code}
                   </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{alert.timestamp}</span>
              </div>
              
              <h4 className="text-slate-200 font-medium mt-2 text-sm">{alert.component} Anomaly</h4>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed font-mono opacity-80 border-l-2 border-slate-700 pl-2">
                 {'>'} {alert.message}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                   Predictive Confidence: <span className="text-white font-mono">{alert.confidence}%</span>
                </div>
                <button 
                  onClick={() => handleAnalyze(alert)}
                  className="text-xs bg-electric/10 hover:bg-electric/20 text-electric px-3 py-1.5 rounded flex items-center transition-colors border border-electric/20"
                >
                  <Terminal className="w-3 h-3 mr-1.5" />
                  Run Diagnostics
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slide-over Detail View for AI Report */}
      {selectedAlert && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl z-20 p-6 flex flex-col transition-all duration-300">
           <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
              <h4 className="text-electric font-semibold flex items-center text-sm">
                 <Terminal className="w-4 h-4 mr-2" />
                 ROOT_CAUSE_ANALYSIS_V3
              </h4>
              <button onClick={closeDetail} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto">
             {isGenerating ? (
               <div className="flex flex-col items-center justify-center h-48 space-y-4">
                 <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-xs font-mono text-slate-400 animate-pulse">
                    > Querying Knowledge Base...<br/>
                    > Correlating Sensor Data...
                 </p>
               </div>
             ) : (
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 font-mono text-xs leading-6 text-slate-300 shadow-inner">
                   <div className="flex items-center text-emerald-500 mb-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      ANALYSIS COMPLETE
                   </div>
                   <p className="whitespace-pre-line">
                    {aiReport}
                  </p>
                </div>
             )}
           </div>

           <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
              <button 
                onClick={closeDetail}
                className="bg-slate-800 text-slate-300 py-2.5 rounded-lg text-sm hover:bg-slate-700 border border-slate-700 transition-all"
              >
                Close Log
              </button>
              <button 
                onClick={() => onRemoteAdjust(selectedAlert.id)}
                className="bg-gradient-to-r from-electric to-blue-600 text-white font-medium py-2.5 rounded-lg text-sm hover:shadow-lg hover:shadow-cyan-900/20 flex items-center justify-center transition-all"
              >
                <Wrench className="w-3.5 h-3.5 mr-2" />
                Push Config Patch
              </button>
           </div>
        </div>
      )}
    </div>
  );
};