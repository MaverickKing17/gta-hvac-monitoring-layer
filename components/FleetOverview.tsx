import React, { useState } from 'react';
import { Device } from '../types';
import { Wifi, AlertTriangle, Droplets, Thermometer, Battery, Wind, Flame, Snowflake, Cpu, Signal } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
           <h3 className="text-white font-semibold text-lg flex items-center">
             Digital Twin Fleet
             <span className="ml-3 text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
               {devices.length} NODE(S) ACTIVE
             </span>
           </h3>
        </div>
        <div className="flex space-x-2">
           {['All', 'Warning'].map((f) => (
             <button 
               key={f}
               onClick={() => setFilter(f as any)}
               className={`text-xs px-3 py-1.5 rounded transition-colors border ${
                 filter === f 
                 ? 'bg-electric/10 text-electric border-electric/30' 
                 : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
               }`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {filteredDevices.map((device) => (
          <div 
            key={device.id} 
            className={`glass-card p-4 rounded-lg border-l-[3px] transition-all hover:bg-slate-800/40 cursor-pointer group relative overflow-hidden ${
              device.status === 'Warning' ? 'border-l-red-500' : 'border-l-emerald-500'
            }`}
          >
            {/* Background Tech Pattern */}
            <div className="absolute right-0 top-0 w-32 h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] pointer-events-none" />

            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <div className="flex items-center space-x-2">
                   <h4 className="text-slate-200 font-semibold text-sm">{device.name}</h4>
                   {device.status === 'Warning' && <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />}
                   <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 rounded border border-slate-700 font-mono">{device.zone}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                   <p className="text-xs text-slate-500">{device.location}</p>
                   <span className="text-[10px] text-slate-600 font-mono">ID: {device.id.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex items-center space-x-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${device.status === 'Online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className={`text-xs font-medium ${device.status === 'Online' ? 'text-emerald-500' : 'text-red-500'}`}>
                       {device.status.toUpperCase()}
                    </span>
                 </div>
                 <span className="text-[10px] text-slate-600 mt-0.5 font-mono">FW: {device.firmware}</span>
              </div>
            </div>

            {/* Telemetry Grid */}
            <div className="grid grid-cols-4 gap-2 mt-3 relative z-10">
              
              {/* Temp */}
              <div className="bg-slate-950/50 rounded border border-slate-800 p-2 flex flex-col justify-center items-center">
                <span className="text-[10px] text-slate-500 uppercase mb-0.5">Indoor</span>
                <div className="flex items-center">
                   <span className="text-lg font-mono text-white font-medium">{device.currentTemp}</span>
                   <span className="text-xs text-slate-500 ml-0.5">°C</span>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-slate-950/50 rounded border border-slate-800 p-2 flex flex-col justify-center items-center">
                 <span className="text-[10px] text-slate-500 uppercase mb-0.5">Humidity</span>
                 <div className="flex items-center">
                    <Droplets className="w-3 h-3 text-blue-500 mr-1" />
                    <span className="text-lg font-mono text-white font-medium">{device.humidity}%</span>
                 </div>
              </div>

              {/* Mode Status */}
              <div className="bg-slate-950/50 rounded border border-slate-800 p-2 flex flex-col justify-center items-center">
                <span className="text-[10px] text-slate-500 uppercase mb-0.5">Mode</span>
                <div className="flex items-center space-x-1">
                   {device.mode === 'Heat' && <Flame className="w-4 h-4 text-orange-500" />}
                   {device.mode === 'Cool' && <Snowflake className="w-4 h-4 text-blue-400" />}
                   {device.mode === 'Idle' && <div className="w-4 h-4 rounded-full border-2 border-slate-600" />}
                   {device.mode === 'Aux' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                   <span className="text-xs text-slate-300 font-medium">{device.mode}</span>
                </div>
              </div>

              {/* Fan Status */}
              <div className="bg-slate-950/50 rounded border border-slate-800 p-2 flex flex-col justify-center items-center">
                 <span className="text-[10px] text-slate-500 uppercase mb-0.5">Fan</span>
                 <div className="flex items-center space-x-1">
                    <Wind className={`w-4 h-4 text-slate-400 ${device.fanState === 'On' ? 'animate-spin-slow' : ''}`} />
                    <span className="text-xs text-slate-300 font-medium">{device.fanState}</span>
                 </div>
              </div>

            </div>
            
            <div className="mt-3 flex justify-between items-center border-t border-slate-800/50 pt-2">
               <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-[10px] text-slate-500">
                     <Cpu className="w-3 h-3" />
                     <span>Seam IoT</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-slate-500">
                     <Signal className="w-3 h-3 text-emerald-500" />
                     <span>-42 dBm</span>
                  </div>
               </div>
               <span className="text-[10px] text-slate-600 font-mono">Synced {device.lastSync}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};