import React, { useState, useEffect } from 'react';
import { TrendingUp, Truck } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [truckRollCost, setTruckRollCost] = useState(250);
  const [hourlyRate, setHourlyRate] = useState(120);
  const [avoidedRolls, setAvoidedRolls] = useState(5); // Per month

  const [monthlySavings, setMonthlySavings] = useState(0);

  useEffect(() => {
    // Logic: (Truck Roll Cost + (Hourly Rate * 2hrs travel/labor)) * Avoided Rolls
    // Simplified model for demo
    const costPerRoll = truckRollCost + (hourlyRate * 1.5);
    setMonthlySavings(costPerRoll * avoidedRolls);
  }, [truckRollCost, hourlyRate, avoidedRolls]);

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center space-x-2 mb-6">
         <div className="bg-electric/20 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-electric" />
         </div>
         <h3 className="text-white font-semibold text-lg">Partner ROI</h3>
      </div>

      <div className="space-y-6">
        <div>
           <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400 flex items-center"><Truck className="w-3 h-3 mr-1"/> Truck Roll Cost</span>
              <span className="text-white font-mono">${truckRollCost}</span>
           </div>
           <input 
             type="range" min="150" max="500" step="10" 
             value={truckRollCost} onChange={(e) => setTruckRollCost(Number(e.target.value))}
             className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-electric"
           />
        </div>

        <div>
           <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Hourly Rate</span>
              <span className="text-white font-mono">${hourlyRate}/hr</span>
           </div>
           <input 
             type="range" min="60" max="250" step="5" 
             value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}
             className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-electric"
           />
        </div>

        <div>
           <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Remote Fixes / Mo</span>
              <span className="text-white font-mono">{avoidedRolls}</span>
           </div>
           <input 
             type="range" min="1" max="20" step="1" 
             value={avoidedRolls} onChange={(e) => setAvoidedRolls(Number(e.target.value))}
             className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
           />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
         <p className="text-xs text-slate-500 uppercase tracking-wider text-center mb-1">Estimated Monthly Savings</p>
         <p className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-electric to-emerald-400">
           ${monthlySavings.toLocaleString()}
         </p>
      </div>
    </div>
  );
};