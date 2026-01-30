import React, { useState } from 'react';
import { DiagnosticAlert } from '../types';
import { BrainCircuit, AlertOctagon, Wrench, ChevronRight, X } from 'lucide-react';
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
    
    // Call Gemini API
    const report = await generateDiagnosticReport(alert.message, "High Efficiency Furnace");
    setAiReport(report);
    setIsGenerating(false);
  };

  const closeDetail = () => {
    setSelectedAlert(null);
    setAiReport(null);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <BrainCircuit className="w-5 h-5 mr-2 text-electric" />
          Agentic Diagnostics
        </h3>
        <span className="text-xs bg-electric/20 text-electric px-2 py-0.5 rounded-full animate-pulse">
          AI Active
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
           <div className="text-slate-500 text-center py-8">No active system faults detected.</div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 hover:border-slate-600 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                   <AlertOctagon className={`w-4 h-4 ${alert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                   <span className={`text-xs font-bold uppercase tracking-wider ${alert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`}>
                     {alert.severity}
                   </span>
                </div>
                <span className="text-xs text-slate-500">{alert.timestamp}</span>
              </div>
              
              <h4 className="text-slate-200 font-medium mt-2">{alert.component} Issue</h4>
              <p className="text-slate-400 text-sm mt-1">{alert.message}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Confidence: <span className="text-white">{alert.confidence}%</span>
                </div>
                <button 
                  onClick={() => handleAnalyze(alert)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-electric px-3 py-1.5 rounded flex items-center transition-colors border border-slate-700"
                >
                  Analyze <ChevronRight className="w-3 h-3 ml-1" />
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
              <h4 className="text-electric font-semibold flex items-center">
                 <BrainCircuit className="w-4 h-4 mr-2" />
                 Analysis Protocol
              </h4>
              <button onClick={closeDetail} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto">
             {isGenerating ? (
               <div className="flex flex-col items-center justify-center h-48 space-y-4">
                 <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-sm text-slate-400 animate-pulse">Consulting Knowledge Base...</p>
               </div>
             ) : (
                <div className="prose prose-invert prose-sm">
                  <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                    {aiReport}
                  </p>
                </div>
             )}
           </div>

           <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
              <button 
                onClick={closeDetail}
                className="bg-slate-800 text-slate-300 py-2 rounded-lg text-sm hover:bg-slate-700"
              >
                Dismiss
              </button>
              <button 
                onClick={() => onRemoteAdjust(selectedAlert.id)}
                className="bg-electric/10 text-electric border border-electric/30 py-2 rounded-lg text-sm hover:bg-electric/20 flex items-center justify-center"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Remote Fix
              </button>
           </div>
        </div>
      )}
    </div>
  );
};