'use client';

import React from 'react';
import { Gamepad2, CreditCard, Rocket, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Gamepad2,
      title: 'Select Game & Denomination',
      description: 'Choose your preferred game top-up, console pre-order, or digital membership from our verified catalog.'
    },
    {
      number: '02',
      icon: CreditCard,
      title: 'Enter Gamer ID & Pay Securely',
      description: 'Input your Player ID/Region and checkout with SSLCOMMERZ using bKash, Nagad, or Cards. No sensitive PINs required.'
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Instant 10s Digital Delivery',
      description: 'Our automated supplier gateway verifies payment and dispatches your digital currency or game key in 5 to 30 seconds.'
    }
  ];

  return (
    <section className="relative py-20 bg-[#06060c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">
            Frictionless Ordering
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            How It <span className="text-gradient-neon">Works</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            From checkout to in-game glory in under a minute.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-[#0e0e1a] border border-white/10 hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black font-mono text-white/20 group-hover:text-cyan-400/40 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-400/40 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <span>Step {idx + 1} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
