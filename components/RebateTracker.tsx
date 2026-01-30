import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import { DollarSign, CheckCircle, FileText } from 'lucide-react';

export const RebateTracker: React.FC = () => {
  const data = [
    { name: 'Insulation', current: 1200, max: 2500 },
    { name: 'Heat Pump', current: 6500, max: 6500 },
    { name: 'Windows', current: 325, max: 2000 },
    { name: 'Solar', current: 0, max: 5000 },
  ];

  const totalSecured = 8025; // CAD

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-lg">Rebate Engine</h3>
          <p className="text-xs text-slate-400">Enbridge HER+ & Greener Homes</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Total Secured</p>
          <p className="text-2xl font-bold text-emerald-400">${totalSecured.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" hide />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
            />
            <Bar dataKey="current" barSize={16} radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.current === entry.max ? '#10b981' : '#06b6d4'} />
              ))}
            </Bar>
            <Bar dataKey="max" barSize={16} radius={[0, 4, 4, 0]} fill="#1e293b" /> 
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend / Status */}
      <div className="mt-4 grid grid-cols-2 gap-3">
         {data.map(item => (
            <div key={item.name} className="flex justify-between items-center text-sm border-b border-slate-800 pb-1">
               <span className="text-slate-400">{item.name}</span>
               <span className={`font-mono ${item.current === item.max ? 'text-emerald-500' : 'text-slate-200'}`}>
                 ${item.current}
               </span>
            </div>
         ))}
      </div>

      <div className="mt-6 flex space-x-3">
         <button className="flex-1 bg-emerald-500/10 text-emerald-400 text-xs py-2 rounded border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/20 transition">
            <CheckCircle className="w-3 h-3 mr-1.5" /> Compliance Verified
         </button>
         <button className="flex-1 bg-slate-800 text-slate-300 text-xs py-2 rounded border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition">
            <FileText className="w-3 h-3 mr-1.5" /> Audit Report
         </button>
      </div>
    </div>
  );
};