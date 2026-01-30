import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import { CheckCircle, FileText, ExternalLink, Shield } from 'lucide-react';

export const RebateTracker: React.FC = () => {
  const data = [
    { name: 'Attic Insulation', current: 1200, max: 2500, code: 'R-60' },
    { name: 'ASHP (Heat Pump)', current: 6500, max: 6500, code: 'H-HER+' },
    { name: 'Air Sealing', current: 325, max: 2000, code: 'A-SEAL' },
    { name: 'Solar PV', current: 0, max: 5000, code: 'S-RES' },
  ];

  const totalSecured = 8025; // CAD

  return (
    <div className="glass-panel rounded-xl p-6 flex flex-col border border-slate-800 bg-navy/40">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-lg flex items-center">
             Rebate Engine
             <Shield className="w-4 h-4 ml-2 text-emerald-500" />
          </h3>
          <div className="flex items-center mt-1 space-x-2">
             <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Enbridge HER+</span>
             <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Greener Homes</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Total Verified</p>
          <p className="text-2xl font-bold text-emerald-400 font-mono tracking-tight">${totalSecured.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 0 }} barGap={2}>
            <XAxis type="number" hide />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.03)'}}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '8px', fontSize: '12px' }}
            />
            <Bar dataKey="current" barSize={12} radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.current === entry.max ? '#10b981' : '#06b6d4'} />
              ))}
            </Bar>
            <Bar dataKey="max" barSize={12} radius={[0, 4, 4, 0]} fill="#1e293b" /> 
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Detailed Ledger */}
      <div className="mt-4 space-y-2">
         {data.slice(0,3).map(item => (
            <div key={item.name} className="flex justify-between items-center text-xs border-b border-slate-800/50 pb-2 last:border-0">
               <div>
                  <span className="text-slate-300 font-medium block">{item.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Code: {item.code}</span>
               </div>
               <div className="flex items-center space-x-3">
                  <span className={`font-mono ${item.current === item.max ? 'text-emerald-500' : 'text-slate-400'}`}>
                    ${item.current.toLocaleString()}
                  </span>
                  {item.current === item.max ? (
                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                     <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />
                  )}
               </div>
            </div>
         ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
         <button className="bg-emerald-500/10 text-emerald-400 text-xs py-2.5 rounded-lg border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/20 transition font-medium">
            <CheckCircle className="w-3 h-3 mr-1.5" /> Submit to EnerGuide
         </button>
         <button className="bg-slate-800 text-slate-300 text-xs py-2.5 rounded-lg border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition font-medium group">
            <FileText className="w-3 h-3 mr-1.5" /> 
            Export Audit
            <ExternalLink className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
         </button>
      </div>
    </div>
  );
};