'use client';

import React, { useState } from 'react';
import { FAQS } from '../../data/mockData';
import { sfx } from '../../lib/sound';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    sfx.play('click');
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-20 bg-[#06060c] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            Frequently Asked <span className="text-gradient-purple-blue">Questions</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Everything you need to know about top-ups, payment processing, refunds, and digital accounts.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#101024] border-violet-500/40 shadow-xl'
                    : 'bg-[#0a0a14] border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
