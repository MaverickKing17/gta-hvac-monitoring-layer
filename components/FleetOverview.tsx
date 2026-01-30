import React from 'react';
import { Device } from '../types';
import { Wifi, AlertTriangle, Droplets, Thermometer, Battery } from 'lucide-react';

interface FleetOverviewProps {
  devices: Device[];
}

export const FleetOverview: React.FC<FleetOverviewProps> = ({ devices }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold text-lg">Digital Twin Fleet</h3>
        <span className="text-xs text-electric bg-electric/10 px-2 py-1 rounded border border-electric/20">
          Live Polling: 30s
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {devices.map((device) => (
          <div 
            key={device.id} 
            className={`glass-card p-4 rounded-xl border-l-4 transition-all hover:bg-slate-800/50 cursor-pointer group ${
              device.status === 'Warning' ? 'border-l-red-500' : 'border-l-emerald-500'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2">
                   <h4 className="text-slate-200 font-medium">{device.name}</h4>
                   {device.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{device.location} • {device.type}</p>
              </div>
              <div className="flex items-center space-x-1">
                 <div className={`w-2 h-2 rounded-full ${device.status === 'Online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                 <span className="text-xs text-slate-400">{device.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="bg-slate-950/40 rounded p-2 flex flex-col items-center">
                <Thermometer className="w-4 h-4 text-slate-500 mb-1" />
                <span className="text-lg font-mono text-white">{device.currentTemp}°</span>
                <span className="text-[10px] text-slate-500">Indoor</span>
              </div>
              <div className="bg-slate-950/40 rounded p-2 flex flex-col items-center">
                 <Droplets className="w-4 h-4 text-blue-500 mb-1" />
                 <span className="text-lg font-mono text-white">{device.humidity}%</span>
                 <span className="text-[10px] text-slate-500">RH</span>
              </div>
              <div className="bg-slate-950/40 rounded p-2 flex flex-col items-center relative overflow-hidden">
                {/* Health Score Bar Background */}
                <div 
                    className="absolute bottom-0 left-0 w-full bg-emerald-500/20" 
                    style={{ height: `${device.healthScore}%` }} 
                />
                <Battery className={`w-4 h-4 mb-1 ${device.healthScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className="text-lg font-mono text-white">{device.healthScore}</span>
                <span className="text-[10px] text-slate-500">Health</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
               <span>Last Sync: {device.lastSync}</span>
               <Wifi className="w-3 h-3 text-slate-600 group-hover:text-electric transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};