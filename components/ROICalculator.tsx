import React, { useState, useEffect } from 'react';
import { TrendingUp, Truck, DollarSign } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [truckRollCost, setTruckRollCost] = useState(250);
  const [hourlyRate, setHourlyRate] = useState(120);
  const [avoidedRolls, setAvoidedRolls] = useState(5); 

  const [monthlySavings, setMonthlySavings] = useState(0);

  useEffect(() => {
    const costPerRoll = truckRollCost + (hourlyRate * 1.5);
    setMonthlySavings(costPerRoll * avoidedRolls);
  }, [truckRollCost, hourlyRate, avoidedRolls]);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/20 bg-black/40 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.3)]">
               <TrendingUp className="w-5 h-5 text-black font-bold" />
            </div>
            <h3 className="text-white font-extrabold text-lg uppercase tracking-tighter">Business Impact</h3>
         </div>
         <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">LIVE ROI</span>
      </div>

      <div className="space-y-8">
        <div>
           <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-widest text-slate-300">
              <span className="flex items-center"><Truck className="w-3.5 h-3.5 mr-2 text-orange-500"/> Average Truck Roll Cost</span>
              <span className="text-white font-mono text-sm">${truckRollCost}</span>
           </div>
           <input 
             type="range" min="150" max="500" step="10" 
             value={truckRollCost} onChange={(e) => setTruckRollCost(Number(e.target.value))}
             className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
           />
        </div>

        <div>
           <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-widest text-slate-300">
              <span className="flex items-center"><DollarSign className="w-3.5 h-3.5 mr-1 text-orange-500"/> Tech Hourly Rate (CAD)</span>
              <span className="text-white font-mono text-sm">${hourlyRate}/HR</span>
           </div>
           <input 
             type="range" min="60" max="250" step="5" 
             value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}
             className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
           />
        </div>

        <div>
           <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-widest text-slate-300">
              <span className="flex items-center text-emerald-400">Remote Fixes / Monthly</span>
              <span className="text-emerald-400 font-mono text-sm">{avoidedRolls} UNITS</span>
           </div>
           <input 
             type="range" min="1" max="20" step="1" 
             value={avoidedRolls} onChange={(e) => setAvoidedRolls(Number(e.target.value))}
             className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
           />
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center">
         <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Projected Monthly OPEX Savings</p>
         <p className="text-5xl font-black text-white tracking-tighter shadow-orange-500/20 drop-shadow-lg">
           ${monthlySavings.toLocaleString()}
         </p>
         <div className="mt-4 flex items-center text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_#10b981]"></span>
            Based on current Toronto labor rates
         </div>
      </div>
    </div>
  );
};