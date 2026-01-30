import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Terminal, Sparkles, Minimize2, Maximize2, Radio, ShieldCheck, Activity, Cpu, Database } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'NOC Technical Advisor Online. I have synced with Toronto IESO Grid and Fleet Telemetry. How can I assist your operation?' }
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
          CONTEXT: You are the 'Ambient Twin' Fleet Intelligence Officer for a major Toronto HVAC firm. 
          KNOWLEDGE BASE: Ontario Building Code, IESO Grid Demand Response, Enbridge HER+ Rebates, and ASHRAE standards.
          TASK: Answer technical or business-related fleet questions. 
          TONE: Professional, brief, authoritative (Fortune 500 level). 
          USER QUERY: ${userMsg}
        `,
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Diagnostic link timed out. Re-establishing secure tunnel..." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Critical: AI Kernel connection interrupted. Verify Seam API status." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-[100] group">
        {/* Animated "Pulse" for the C-Suite WOW */}
        <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/40 transition-all duration-500 animate-pulse" />
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative flex items-center bg-black border-2 border-orange-500 px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 transition-all active:scale-95 overflow-hidden"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              <Bot className="text-white w-6 h-6 mt-1" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black font-mono text-orange-500 tracking-[0.2em] uppercase">Fleet AI</span>
              <span className="text-xs font-bold text-white uppercase tracking-tighter">NOC ADVISOR ONLINE</span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 w-[400px] glass-panel rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col border-2 border-white/20 transition-all duration-300 ${isMinimized ? 'h-20' : 'h-[650px]'}`}>
      
      {/* HEADER: Enterprise Command Style */}
      <div className="p-5 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-black to-slate-900 rounded-t-3xl">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-500 p-2 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            <Radio className="w-5 h-5 text-black font-bold animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Ambient Intelligence</h3>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex items-center text-[10px] font-bold text-slate-400 font-mono mt-0.5">
              <Activity className="w-3 h-3 mr-1.5 text-orange-500" />
              <span>SECURE TELEMETRY LINK ACTIVE</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded-lg border border-white/10">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors bg-white/5 p-1.5 rounded-lg border border-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* NOC Knowledge Base Indicator */}
          <div className="bg-black/80 px-5 py-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="flex items-center text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                <Database className="w-3 h-3 mr-1" /> IESO Grid Data
              </div>
              <div className="flex items-center text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                <Cpu className="w-3 h-3 mr-1" /> Seam SDK v4.1
              </div>
            </div>
            <span className="text-[9px] font-black text-emerald-500 animate-pulse">● LIVE SYNC</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-xs leading-relaxed shadow-xl ${
                  m.role === 'user' 
                  ? 'bg-orange-500 text-black font-black rounded-tr-none border-b-2 border-orange-600' 
                  : 'bg-slate-900/80 text-white font-semibold rounded-tl-none border border-white/10 backdrop-blur-md'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-white/10 flex space-x-1.5">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* INPUT BAR: High Precision Style */}
          <div className="p-5 border-t border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl opacity-20 group-focus-within:opacity-40 transition-opacity blur" />
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Query technical manuals or grid impact..."
                className="relative w-full bg-black border border-white/20 rounded-xl pl-5 pr-14 py-4 text-xs text-white font-bold outline-none focus:border-orange-500 transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="absolute right-3 top-2.5 p-2 bg-orange-500 text-black rounded-lg hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 font-bold font-mono tracking-widest uppercase">
               <span className="flex items-center"><Sparkles className="w-3 h-3 mr-1.5 text-orange-500" /> Gemini Ultra Compute</span>
               <span>v3.1.4_Stable</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};