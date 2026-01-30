import React, { useState } from 'react';
import { Device } from '../types';
import { Wifi, AlertTriangle, Droplets, Thermometer, Battery, Wind, Flame, Snowflake, Cpu, Signal, Truck } from 'lucide-react';

interface FleetOverviewProps {
  devices: Device[];
}

export const FleetOverview: React.FC<FleetOverviewProps> = ({ devices }) => {
  const [filter, setFilter] = useState<'All' | 'Warning' | 'Critical'>('All');

  const filteredDevices = devices.filter(d => {
    if (filter === 'All') return true;
    if (filter === 'Warning') return d.status === 'Warning';
    return d.status === 'Offline';
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-white font-extrabold text-xl uppercase tracking-tighter">
             Digital Twin Fleet
           </h3>
           <span className="text-[11px] font-bold font-mono text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 shadow-xl">
               {devices.length} NODES
           </span>
        </div>
        <div className="flex space-x-2">
           {['All', 'Warning'].map((f) => (
             <button 
               key={f}
               onClick={() => setFilter(f as any)}
               className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all border ${
                 filter === f 
                 ? 'bg-orange-500 text-black border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                 : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-600'
               }`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredDevices.map((device) => (
          <div 
            key={device.id} 
            className={`glass-card p-5 rounded-2xl border-l-4 transition-all hover:scale-[1.02] cursor-pointer group relative overflow-hidden shadow-xl ${
              device.status === 'Warning' ? 'border-l-orange-500 bg-orange-500/5' : 'border-l-emerald-500 bg-emerald-500/5'
            }`}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <div className="flex items-center space-x-3">
                   <h4 className="text-white font-bold text-base">{device.name}</h4>
                   {device.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-orange-500 animate-pulse" />}
                </div>
                <div className="flex items-center space-x-3 mt-1.5">
                   <p className="text-[11px] text-slate-200 font-semibold uppercase">{device.location}</p>
                   <span className="text-[10px] text-white bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono">{device.zone}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex items-center space-x-2 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                    <span className={`w-2 h-2 rounded-full ${device.status === 'Online' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-orange-500 shadow-[0_0_8px_#f97316]'}`} />
                    <span className={`text-[11px] font-bold uppercase ${device.status === 'Online' ? 'text-emerald-400' : 'text-orange-400'}`}>
                       {device.status}
                    </span>
                 </div>
                 <span className="text-[10px] text-slate-400 mt-1.5 font-bold font-mono">VER: {device.firmware}</span>
              </div>
            </div>

            {/* HIGH CONTRAST TELEMETRY */}
            <div className="grid grid-cols-4 gap-2.5 mt-4 relative z-10">
              <div className="bg-black/60 rounded-xl border border-white/10 p-3 flex flex-col items-center shadow-inner">
                <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Indoor</span>
                <div className="flex items-center">
                   <span className="text-xl font-bold text-white">{device.currentTemp}</span>
                   <span className="text-xs text-slate-400 ml-0.5 font-bold">°C</span>
                </div>
              </div>

              <div className="bg-black/60 rounded-xl border border-white/10 p-3 flex flex-col items-center shadow-inner">
                 <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Humidity</span>
                 <div className="flex items-center">
                    <Droplets className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                    <span className="text-xl font-bold text-white">{device.humidity}%</span>
                 </div>
              </div>

              <div className="bg-black/60 rounded-xl border border-white/10 p-3 flex flex-col items-center shadow-inner">
                <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Mode</span>
                <div className="flex items-center space-x-1.5">
                   {device.mode === 'Heat' && <Flame className="w-4 h-4 text-orange-500" />}
                   {device.mode === 'Cool' && <Snowflake className="w-4 h-4 text-blue-400" />}
                   <span className="text-[11px] text-white font-bold">{device.mode.toUpperCase()}</span>
                </div>
              </div>

              <div className="bg-black/60 rounded-xl border border-white/10 p-3 flex flex-col items-center shadow-inner">
                 <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Fan</span>
                 <div className="flex items-center space-x-1.5">
                    <Wind className={`w-4 h-4 text-emerald-400 ${device.fanState === 'On' ? 'animate-spin' : ''}`} />
                    <span className="text-[11px] text-white font-bold">{device.fanState.toUpperCase()}</span>
                 </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center border-t border-white/10 pt-3">
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-300 font-bold">
                     <Cpu className="w-3.5 h-3.5 text-orange-500" />
                     <span>SEAM IoT</span>
                  </div>
                  <div className={`flex items-center space-x-1.5 text-[10px] font-bold ${device.status === 'Warning' ? 'text-orange-400' : 'text-emerald-400'}`}>
                     <Truck className="w-3.5 h-3.5" />
                     <span>{device.status === 'Warning' ? 'TRUCK ROLL ADVISED' : 'PRE-DIAG NO FAULT'}</span>
                  </div>
               </div>
               <span className="text-[10px] text-slate-400 font-bold font-mono">SYNC {device.lastSync.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};