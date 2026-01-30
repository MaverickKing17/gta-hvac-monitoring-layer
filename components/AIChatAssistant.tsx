import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Terminal, Sparkles, Minimize2, Maximize2, Radio, ShieldCheck, Activity, Cpu, Database, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'NOC Technical Advisor Online. Systems synchronized with Toronto IESO Grid & Fleet Telemetry. How can I optimize your dispatch operations today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await aiClient.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          CONTEXT: You are the 'Ambient Twin' Fleet Intelligence Officer for a premier Toronto HVAC enterprise.
          KNOWLEDGE: Toronto IESO Grid Data, ASHRAE Standards, Enbridge HER+ Rebates, Ontario Building Code.
          GOAL: Support VPs/CTOs in optimizing fleet dispatch and minimizing truck-roll costs through remote diagnostics.
          TONE: Authoritative, Technical, Premium, Direct.
          USER QUERY: ${userMsg}
        `,
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Diagnostic uplink timeout. Please retry secure query." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Critical Kernel Error: Seam API handshake failed. Reverting to manual NOC protocol." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-10 right-10 z-[100] group">
        {/* Double Pulse Effect for WOW Factor */}
        <div className="absolute -inset-6 bg-orange-500/10 rounded-full blur-2xl animate-pulse-slow group-hover:bg-orange-500/30 transition-all duration-700" />
        <div className="absolute -inset-2 bg-orange-500/30 rounded-full animate-ping opacity-20" />
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative flex items-center bg-black border-[3px] border-orange-500 px-8 py-4 rounded-3xl shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:scale-105 transition-all active:scale-95 overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_#10b981] absolute -top-1 -left-1 z-10" />
              <div className="p-2 bg-slate-900 rounded-xl border border-white/10">
                <Bot className="text-white w-7 h-7" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-black font-mono text-orange-500 tracking-[0.3em] uppercase">NOC Advisor</span>
              <span className="text-sm font-black text-white uppercase tracking-tighter">Fleet Intelligence Active</span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-10 right-10 w-[450px] glass-panel rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] z-[100] flex flex-col border-2 border-white/30 transition-all duration-500 ${isMinimized ? 'h-24' : 'h-[750px] animate-in zoom-in-95 duration-300'}`}>
      
      {/* ENTERPRISE COMMAND HEADER */}
      <div className="p-6 border-b border-white/20 flex justify-between items-center bg-gradient-to-b from-slate-900 to-black rounded-t-[2rem]">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-500 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.6)]">
            <Radio className="w-6 h-6 text-black font-black animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-black text-white uppercase tracking-widest">Ambient Command</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center text-[10px] font-black text-slate-100 font-mono mt-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              <Zap className="w-3 h-3 mr-2 text-orange-500 animate-pulse" />
              <span>IESO TORONTO LINK: NOMINAL (98.4%)</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-slate-300 hover:text-white transition-colors bg-white/10 p-2 rounded-xl border border-white/10">
            {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-red-500 transition-colors bg-white/10 p-2 rounded-xl border border-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* NOC Knowledge Layer */}
          <div className="bg-orange-500/5 px-6 py-2.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex space-x-6">
              <div className="flex items-center text-[10px] font-black text-white uppercase tracking-tighter opacity-80">
                <Database className="w-3.5 h-3.5 mr-2 text-orange-500" /> Asset DB v4
              </div>
              <div className="flex items-center text-[10px] font-black text-white uppercase tracking-tighter opacity-80">
                <Cpu className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Seam Neural
              </div>
            </div>
            <span className="text-[10px] font-black text-emerald-400 animate-pulse flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2" /> ENCRYPTED
            </span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gradient-to-b from-black/40 to-obsidian">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-2xl ${
                  m.role === 'user' 
                  ? 'bg-orange-500 text-black font-black rounded-tr-none border-b-[4px] border-orange-700' 
                  : 'bg-slate-900 border border-white/20 text-white font-bold rounded-tl-none backdrop-blur-xl'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900/90 p-5 rounded-3xl rounded-tl-none border border-white/20 flex space-x-2 shadow-2xl">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* INPUT: NOC Terminal Style */}
          <div className="p-6 border-t border-white/20 bg-black">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl opacity-30 group-focus-within:opacity-60 transition-opacity blur-md" />
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Query Technical Manuals / Regional Grid Impact..."
                className="relative w-full bg-slate-950 border-2 border-white/10 rounded-2xl pl-6 pr-16 py-5 text-sm text-white font-black outline-none focus:border-orange-500 transition-all placeholder:text-slate-500"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="absolute right-3.5 top-2.5 p-3.5 bg-orange-500 text-black rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.6)] active:scale-90"
              >
                <Send className="w-5 h-5 font-black" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-300 font-black font-mono tracking-widest uppercase">
               <span className="flex items-center"><Sparkles className="w-3.5 h-3.5 mr-2 text-orange-500" /> Gemini Enterprise Engine</span>
               <span className="text-emerald-500">ISO-27001 SECURED</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};