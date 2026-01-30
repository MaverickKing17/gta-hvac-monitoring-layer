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
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald/10 rounded-full blur-[140px]" />
      </div>

      <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 p-8">
        
        {/* Left Column: Brand & Context */}
        <div className="flex flex-col justify-center space-y-12">
          <div>
            <div className="flex items-center space-x-5 mb-4">
              <div className="bg-orange-500 p-3 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                 <Activity className="w-10 h-10 text-black font-black" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Ambient Twin</h1>
            </div>
            <p className="text-white text-xl font-bold opacity-90 tracking-tight">Enterprise HVAC Operating System v3.1</p>
          </div>

          <div className="glass-panel rounded-[2rem] p-8 border-l-[6px] border-l-emerald-500 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-emerald-400 font-black text-sm uppercase tracking-widest flex items-center">
                <Zap className="w-5 h-5 mr-3" /> Live Toronto Grid Data
              </h3>
              <span className="text-[10px] text-white/50 font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">IESO Verified</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">Regional Load</p>
                <p className="text-3xl font-black text-white">{gridStatus.load.toLocaleString()} <span className="text-sm text-slate-400">MW</span></p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">GTA Ambient</p>
                <p className="text-3xl font-black text-white flex items-center">
                  {gridStatus.temp}°C <Thermometer className="w-6 h-6 ml-2 text-blue-400" />
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center text-white text-sm font-bold">
                <ShieldCheck className="w-5 h-5 mr-3 text-emerald-400" /> 
                <span className="uppercase tracking-tight">Multi-Layer Encryption (SOC2 Type II Compliant)</span>
             </div>
             <div className="flex items-center text-white text-sm font-bold">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-4 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <span className="uppercase tracking-tight">Active Seam IOT Gateway Link: Stable</span>
             </div>
          </div>
        </div>

        {/* Right Column: Secure Terminal */}
        <div className="glass-panel p-10 rounded-[2.5rem] shadow-2xl relative border-2 border-white/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-blue-600 rounded-t-[2.5rem]" />
            
            <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">Secure Access</h2>

            {/* Role Selector: High Contrast */}
            <div className="bg-black/80 p-1.5 rounded-2xl flex mb-10 border border-white/10 shadow-inner">
              <button 
                onClick={() => setSelectedRole('HOMEOWNER')}
                className={`flex-1 flex items-center justify-center py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedRole === 'HOMEOWNER' ? 'bg-white text-black shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                <Home className="w-4 h-4 mr-2" /> Owner
              </button>
              <button 
                onClick={() => setSelectedRole('PARTNER')}
                className={`flex-1 flex items-center justify-center py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedRole === 'PARTNER' ? 'bg-orange-500 text-black shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                <Briefcase className="w-4 h-4 mr-2" /> Partner
              </button>
              <button 
                onClick={() => setSelectedRole('REALTOR')}
                className={`flex-1 flex items-center justify-center py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedRole === 'REALTOR' ? 'bg-white text-black shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                <Key className="w-4 h-4 mr-2" /> Realtor
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-black text-white/60 uppercase tracking-widest mb-2">Technician Badge ID / Email</label>
                <input type="text" className="w-full bg-black/60 border-2 border-white/10 rounded-xl px-5 py-4 text-white font-bold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-slate-700" placeholder="DEMO_ADMIN_08" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-white/60 uppercase tracking-widest mb-2">Biometric Passkey</label>
                <input type="password" value="••••••••" readOnly className="w-full bg-black/60 border-2 border-white/10 rounded-xl px-5 py-4 text-white font-bold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <button 
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full mt-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-black font-black py-5 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 transform active:scale-95 flex justify-center items-center uppercase tracking-[0.2em] text-sm"
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Initialize System Link"}
            </button>
            
            <p className="mt-6 text-center text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
              Authorized Use Only • Toronto NOC Tunnel v4.2
            </p>
        </div>
      </div>
    </div>
  );
};