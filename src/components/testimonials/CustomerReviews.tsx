'use client';

import React from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export function CustomerReviews() {
  return (
    <section className="relative py-20 bg-[#080812] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Gamer Trust & Community
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            Verified <span className="text-gradient-purple-blue">Gamer Reviews</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Over 50,000+ orders fulfilled with 4.9★ gamer satisfaction across Bangladesh.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="relative p-7 rounded-3xl bg-[#0f0f1f] border border-white/10 hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-white flex items-center gap-1">
                    <span>{review.name}</span>
                      <span title="Verified Customer">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="text-cyan-400 font-bold">{review.gamerTag}</span>
                    <span>•</span>
                    <span>{review.game}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
