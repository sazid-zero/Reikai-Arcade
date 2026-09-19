'use client';

import React from 'react';
import { Gamepad2, ShieldCheck, Zap, Heart, Disc, Radio } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#040408] border-t border-white/10 text-slate-400 text-xs overflow-hidden">
      {/* Top Banner Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#080812] rounded-[11px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="font-extrabold tracking-wider text-base text-white">
                REIKAI<span className="text-cyan-400">ARCADE</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Bangladesh&apos;s premier production-ready digital gaming marketplace. Instant automated game top-ups, official game keys, PlayStation memberships, and console gear powered by direct supplier APIs and SSLCOMMERZ.
            </p>

            {/* Live System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Supplier API & SSLCOMMERZ: 100% Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Game Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#top-up" className="hover:text-cyan-300 transition-colors">Phone / PC Game Top-Up</a></li>
              <li><a href="#marketplace" className="hover:text-cyan-300 transition-colors">Game Subscriptions</a></li>
              <li><a href="#marketplace" className="hover:text-cyan-300 transition-colors">Console Games</a></li>
              <li><a href="#marketplace" className="hover:text-cyan-300 transition-colors">Digital Gift Cards</a></li>
              <li><a href="#marketplace" className="hover:text-cyan-300 transition-colors">Accessories & Gadgets</a></li>
            </ul>
          </div>

          {/* Customer & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Gamer Support
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#faq" className="hover:text-cyan-300 transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#faq" className="hover:text-cyan-300 transition-colors">Instant Delivery Policy</a></li>
              <li><a href="#faq" className="hover:text-cyan-300 transition-colors">Refund & Dispute Terms</a></li>
              <li><a href="#hero" className="hover:text-cyan-300 transition-colors">Pre-Order Guarantees</a></li>
              <li><a href="#why-reikai" className="hover:text-cyan-300 transition-colors">Security & Verification</a></li>
            </ul>
          </div>

          {/* Payment & Encryption Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Secured Payments
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Automated multi-channel checkout with SSLCOMMERZ:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['bKash', 'Nagad', 'Rocket', 'Upay', 'Visa', 'Mastercard'].map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300"
                >
                  {method}
                </span>
              ))}
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>256-Bit SSL Bank Encryption</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} ReiKai Arcade Inc. All trademarks, game logos and brand assets belong to their respective publishers.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">Hostinger Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
