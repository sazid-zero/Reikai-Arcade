'use client';

import React, { useState, useRef, useEffect } from 'react';
import { sfx } from '../../lib/sound';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello gamer! I am ReiKai CyberBot, your 24/7 AI shopping & top-up assistant. How can I power up your experience today?',
      time: 'Just now'
    }
  ]);

  const quickPrompts = [
    '⚡ How fast is game top-up?',
    '💳 Payment methods supported?',
    '📦 Track my order (RK-9921)',
    '🎮 Pre-order GTA VI / FC 27 bonus'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    sfx.play('click');
    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate intelligent gaming response
    setTimeout(() => {
      sfx.play('cyber');
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('speed') || lower.includes('fast') || lower.includes('how long') || lower.includes('top-up')) {
        reply = 'Top-ups are 100% automated! As soon as your SSLCOMMERZ payment is confirmed, our direct supplier API dispatches diamonds/points straight to your Player ID in 5 to 30 seconds.';
      } else if (lower.includes('payment') || lower.includes('bkash') || lower.includes('nagad') || lower.includes('ssl')) {
        reply = 'We support real-time automated payments via SSLCOMMERZ: bKash, Nagad, Rocket, Upay, Visa, Mastercard, and Bangladesh Internet Banking. No manual screenshot verification required!';
      } else if (lower.includes('track') || lower.includes('rk-') || lower.includes('order')) {
        reply = '🔍 Order #RK-9921 Found:\nStatus: COMPLETED (Dispatched in 11.4s)\nProduct: Valorant 5,350 VP\nGateway: SSLCOMMERZ (bKash)\nDirect API Transaction Ref: TXN-8829471';
      } else if (lower.includes('gta') || lower.includes('pre-order') || lower.includes('fc 27') || lower.includes('preorder')) {
        reply = 'Pre-ordering GTA VI or EA FC 27 locks in your launch-day official key, bonus digital in-game currency, and our 100% price-match & money-back guarantee prior to release.';
      } else if (lower.includes('human') || lower.includes('support') || lower.includes('help') || lower.includes('discord')) {
        reply = 'You can escalate directly to our human gaming team via our 24/7 Discord Server (discord.gg/reikai-arcade) or WhatsApp support helpline: +880 1700-REIKAI.';
      } else {
        reply = `Thanks for asking! ReiKai Arcade offers 10s automated game top-ups, official gift cards, subscriptions, and console pre-orders. Would you like assistance selecting a top-up package or checking out?`;
      }

      const botMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Cyber Chat Box */}
      {isOpen ? (
        <div className="relative w-[340px] sm:w-[380px] h-[520px] bg-[#0c0c18] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/50 flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-violet-950 via-[#121226] to-cyan-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>ReiKai CyberBot</span>
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">AI 2.4</span>
                </h4>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Instant Response</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sfx.play('click');
                setIsOpen(false);
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-br-none shadow-md'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none shadow-inner'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs bg-white/5 px-3 py-2 rounded-xl w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-cyan-300 transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#080812] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about orders, top-up, games..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-md shadow-violet-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Minimized Floating Cyber Bot Trigger */
        <button
          onClick={() => {
            sfx.play('power');
            setIsOpen(true);
          }}
          className="group relative flex items-center gap-3 p-3.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transition-all hover:scale-105 active:scale-95"
          title="Open ReiKai AI Support Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
          </div>
          <span className="hidden sm:inline text-xs font-black uppercase tracking-wider pr-1">
            AI Support
          </span>
          <span className="absolute -inset-1 rounded-full bg-cyan-400 opacity-30 group-hover:opacity-60 blur-sm pointer-events-none -z-10 transition-opacity" />
        </button>
      )}
    </div>
  );
}
