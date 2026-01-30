import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Terminal, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Diagnostic Agent Online. How can I assist your fleet in the GTA today?' }
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are the Ambient Twin HVAC Assistant. User is an HVAC technician in Toronto. Question: ${userMsg}. Keep it technical and brief.`,
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I couldn't process that. Please check system logs." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Service link interrupted. Please verify Seam API connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-electric rounded-full shadow-2xl shadow-cyan-500/40 flex items-center justify-center hover:scale-110 transition-transform z-[100] border-4 border-obsidian"
      >
        <Bot className="text-obsidian w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-obsidian animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 lg:w-96 glass-panel rounded-2xl shadow-2xl z-[100] flex flex-col border border-slate-700 transition-all ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
      <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-electric" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">Ambient AI Agent</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-slate-400 hover:text-white">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-obsidian/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-electric text-obsidian font-medium rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-xl rounded-tl-none border border-slate-700 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-800 bg-slate-900/50">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about fault ERR-309..."
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-3 pr-10 py-2.5 text-xs text-white outline-none focus:ring-1 focus:ring-electric"
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-2 top-1.5 p-1 text-slate-500 hover:text-electric transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center space-x-2 text-[10px] text-slate-500 font-mono">
               <Terminal className="w-3 h-3" />
               <span>MODEL: GEMINI-3-FLASH-PREVIEW</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};