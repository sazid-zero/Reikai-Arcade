'use client';

import React from 'react';
import { Zap, ShieldCheck, Headphones, Award } from 'lucide-react';

export function WhyReiKai() {
  const features = [
    {
      icon: Zap,
      color: 'from-cyan-500 to-blue-600',
      title: 'Automated 10s Delivery',
      description: 'Zero manual delays. Once payment is confirmed, direct supplier APIs dispatch digital currency and unlock codes straight to your gamer profile in seconds.'
    },
    {
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      title: 'Bank-Grade SSLCOMMERZ',
      description: 'Fully integrated with Bangladesh\'s leading licensed payment gateway SSLCOMMERZ with 256-bit encryption. Safe checkout via bKash, Nagad, Cards, and Net Banking.'
    },
    {
      icon: Award,
      color: 'from-violet-500 to-purple-600',
      title: '100% Official Licensed Keys',
      description: 'We partner directly with authorized global game distributors and publishers. No revoked keys, no ban risk, and full developer support guaranteed.'
    },
    {
      icon: Headphones,
      color: 'from-rose-500 to-amber-600',
      title: '24/7 Gamer Support & AI',
      description: 'Need help with ID validation or order resolution? Our dedicated gamer specialists and intelligent cyber AI assistant are on standby around the clock.'
    }
  ];

  return (
    <section id="why-reikai" className="relative py-20 sm:py-24 bg-[#090914] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Engineered For Gamers
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            Why Choose <span className="text-gradient-purple-blue">ReiKai Arcade</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            We eliminated the frustrations of slow manual top-ups and shady sellers to deliver an enterprise-grade digital gaming marketplace.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-[#0e0e1c] border border-white/10 hover:border-violet-500/40 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} p-[1px] mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-[#0d0d1a] rounded-[15px] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-cyan-400 font-bold">Verified 99.9%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
