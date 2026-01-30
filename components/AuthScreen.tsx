import React, { useState } from 'react';
import { UserRole, GridStatus } from '../types';
import { Zap, ShieldCheck, Home, Briefcase, Key, Activity, Thermometer } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (role: UserRole) => void;
  gridStatus: GridStatus;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, gridStatus }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('PARTNER');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin(selectedRole);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-electric/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald/10 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 p-6">
        
        {/* Left Column: Brand & Context */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Activity className="w-8 h-8 text-electric" />
              <h1 className="text-4xl font-bold text-white tracking-tight">Ambient Twin</h1>
            </div>
            <p className="text-slate-400 text-lg">HVAC Operating System v3.1</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-emerald-400 font-semibold flex items-center">
                <Zap className="w-4 h-4 mr-2" /> Live Grid Status
              </h3>
              <span className="text-xs text-slate-500 uppercase tracking-wider">IESO Verified</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Toronto Load</p>
                <p className="text-2xl font-mono text-white">{gridStatus.load.toLocaleString()} <span className="text-sm text-slate-500">MW</span></p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Ambient Temp</p>
                <p className="text-2xl font-mono text-white flex items-center">
                  {gridStatus.temp}°C <Thermometer className="w-4 h-4 ml-1 text-blue-400" />
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center text-slate-400 text-sm">
                <ShieldCheck className="w-4 h-4 mr-2 text-slate-500" /> 
                <span>End-to-End Encrypted (SOC2 Type II)</span>
             </div>
             <div className="flex items-center text-slate-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                <span>Seam API Connection: Stable</span>
             </div>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="glass-panel p-8 rounded-3xl shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric to-emerald rounded-t-3xl" />
            
            <h2 className="text-2xl font-semibold text-white mb-6">Secure Access</h2>

            {/* Role Selector */}
            <div className="bg-slate-900/50 p-1 rounded-xl flex mb-8">
              <button 
                onClick={() => setSelectedRole('HOMEOWNER')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${selectedRole === 'HOMEOWNER' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Home className="w-4 h-4 mr-2" /> Owner
              </button>
              <button 
                onClick={() => setSelectedRole('PARTNER')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${selectedRole === 'PARTNER' ? 'bg-slate-800 text-white shadow-lg ring-1 ring-electric/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Briefcase className="w-4 h-4 mr-2" /> Partner
              </button>
              <button 
                onClick={() => setSelectedRole('REALTOR')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${selectedRole === 'REALTOR' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Key className="w-4 h-4 mr-2" /> Realtor
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Badge ID / Email</label>
                <input type="text" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all" placeholder="Enter credentials..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Passkey</label>
                <input type="password" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all" placeholder="••••••••" />
              </div>
            </div>

            <button 
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full mt-8 bg-gradient-to-r from-electric to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 rounded-lg shadow-lg shadow-cyan-900/20 transition-all duration-300 transform hover:scale-[1.01] flex justify-center items-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Authenticate"}
            </button>
            
            <p className="mt-4 text-center text-xs text-slate-600">
              Access is logged and monitored. IP: 142.112.XX.XX (Toronto)
            </p>
        </div>
      </div>
    </div>
  );
};