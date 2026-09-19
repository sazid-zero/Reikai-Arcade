'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { sfx } from '../../lib/sound';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/mockData';
import { 
  Play, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  X, 
  Flame, 
  CheckCircle2,
  Share2
} from 'lucide-react';

export function CinematicGameShowcase() {
  const { addToCart } = useCart();
  const ghostProduct = PRODUCTS.find((p) => p.id === 'game-ghost-tsushima') || PRODUCTS[2];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 10,
    seconds: 45
  });

  // Active showcase tab
  const [activeStoryCard, setActiveStoryCard] = useState<'rise' | 'blood' | 'island'>('blood');
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [preOrderSuccess, setPreOrderSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const storyDetails = {
    rise: {
      title: 'The Rise of the Ghost',
      subtitle: 'Forging an Unconventional Legend',
      description: 'Jin Sakai must sacrifice his samurai code of honor to wage an asymmetric guerilla war against the Mongol empire invading Tsushima.'
    },
    blood: {
      title: 'Blood and Steel',
      subtitle: 'Master the Katana & Stance Combat',
      description: 'Engage in intense cinematic melee duels where precise timing, parries, and lethal sword strikes reflect authentic Kurosawa samurai cinema.'
    },
    island: {
      title: 'Tsushima, The Island',
      subtitle: 'Living Wind & Untamed Wilderness',
      description: 'Roam through wind-swept pampas grass, tranquil bamboo groves, and burning village sanctuaries across a handcrafted Japanese archipelago.'
    }
  };

  const handlePreOrder = () => {
    sfx.play('chime');
    addToCart(ghostProduct, ghostProduct.variants?.[0], 1, {
      Edition: "Director's Cut PS5",
      Bonus: "Jin's Golden Armor + Soundtrack"
    });
    setPreOrderSuccess(true);
    setTimeout(() => setPreOrderSuccess(false), 3000);
  };

  return (
    <section id="cinematic-showcase" className="relative py-20 sm:py-28 overflow-hidden bg-black text-white">
      {/* Background Banner with Jin Sakai (Matching Screenshot 2) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/samurai_banner.jpg"
          alt="Ghost of Tsushima Cinematic Showcase"
          fill
          className="object-cover object-top opacity-50 sm:opacity-65"
          priority
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-black/40 to-[#06060a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Floating Glowing Embers / Crimson Leaves Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-rose-500 blur-[1px] opacity-70 animate-float-slow"
            style={{
              top: `${10 + (i * 7) % 80}%`,
              left: `${5 + (i * 11) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 5)}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Showcase Sub-Header Bar (Matching Screenshot 2) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-10 text-xs text-slate-300 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white tracking-widest">PLAYSTATION EXCLUSIVE</span>
            <span className="text-slate-600">|</span>
            <span className="text-rose-400">Cinematic Experience</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-[11px] text-slate-400">
            <span className="text-white hover:text-rose-400 cursor-pointer transition-colors">Ghost of Tsushima</span>
            <span className="hover:text-white cursor-pointer transition-colors">Editions</span>
            <span className="hover:text-white cursor-pointer transition-colors">Gameplay Showcase</span>
            <span className="hover:text-white cursor-pointer transition-colors">Wallpapers</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-cyan-300 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>4K 60FPS Dynamic Haptics</span>
          </div>
        </div>

        {/* Jin Sakai Character Story Feature (Matching Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            
            {/* Game Logo Title */}
            <div>
              <div className="text-xs font-black tracking-[0.4em] uppercase text-rose-500 flex items-center gap-2">
                <Flame className="w-4 h-4 fill-rose-500" /> SUCKER PUNCH PRODUCTIONS
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mt-1">
                GHOST <span className="text-rose-500">OF</span> TSUSHIMA
              </h2>
              <div className="text-sm uppercase tracking-widest text-slate-400 font-semibold mt-1">
                Director&apos;s Cut • Iki Island & Legends Expansion Included
              </div>
            </div>

            {/* Character Card Box (Jin Sakai) */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl max-w-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  JIN SAKAI
                </h3>
                <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400">
                  Clan Sakai Heir
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                While Jin starts the game as a noble samurai, he will learn skills and adopt tactics that are decidedly not samurai-like and begin to form his new identity: <strong className="text-white font-bold">The Ghost</strong>. As you play, you will master the katana, traverse the island with the guiding wind, and stand against the Mongol invasion.
              </p>
            </div>

            {/* Release Date Countdown Box (Matching Screenshot 2) */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="p-3.5 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-xl flex items-center gap-4">
                <div>
                  <div className="text-[9px] uppercase tracking-widest font-bold text-slate-400">
                    Release Drop
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mono tracking-widest text-cyan-300">
                    {String(timeLeft.days).padStart(2, '0')} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] text-slate-500 flex justify-between font-mono px-0.5">
                    <span>DAYS</span>
                    <span>HOURS</span>
                    <span>MINS</span>
                    <span>SECS</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="px-2.5 py-1 rounded bg-white/10 text-white font-bold text-[10px] tracking-wider uppercase">
                  Only On PlayStation
                </div>
                <div className="px-2 py-1 rounded bg-white/10 text-white font-bold text-[10px]">
                  PS5 PRO ENHANCED
                </div>
              </div>
            </div>

            {/* CTA Buttons (Matching Screenshot 2) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handlePreOrder}
                className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-rose-600/40 hover:shadow-rose-500/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                {preOrderSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 fill-white" />
                    <span>Pre-Order Now (৳4,990)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  sfx.play('power');
                  setShowTrailerModal(true);
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Feature Story Cards (Matching Screenshot 2) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Story Tabs Bar */}
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={() => {
                  sfx.play('tab');
                  setActiveStoryCard('rise');
                }}
                className={`py-1.5 px-3 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                  activeStoryCard === 'rise'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                The Rise of the Ghost
              </button>

              <button
                onClick={() => {
                  sfx.play('tab');
                  setActiveStoryCard('blood');
                }}
                className={`py-1.5 px-3 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                  activeStoryCard === 'blood'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                Blood & Steel
              </button>

              <button
                onClick={() => {
                  sfx.play('tab');
                  setActiveStoryCard('island');
                }}
                className={`py-1.5 px-3 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                  activeStoryCard === 'island'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                Tsushima Island
              </button>
            </div>

            {/* Active Story Highlight Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b0d14]/90 via-black/80 to-[#0c0d18]/90 border border-rose-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400">
                  {storyDetails[activeStoryCard].subtitle}
                </span>
                <h4 className="text-xl font-black text-white">
                  {storyDetails[activeStoryCard].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {storyDetails[activeStoryCard].description}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-white/10 text-xs">
                  <span className="text-slate-400">Haptic Feedback Support</span>
                  <span className="text-cyan-300 font-bold">PS5 DualSense 3D Audio</span>
                </div>
              </div>
            </div>

            {/* Mini Edition Selector Card */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Director&apos;s Cut Edition</div>
                <div className="text-[11px] text-slate-400">Includes Iki Island expansion + Legends Mode</div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-rose-400">৳4,990</span>
                <div className="text-[10px] text-slate-500 line-through">৳6,200</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Trailer Modal */}
      {showTrailerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-rose-500/40 shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-[#11080d] border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <Flame className="w-4 h-4 fill-rose-500" /> Ghost of Tsushima: Official Cinematic 4K Trailer
              </span>
              <button
                onClick={() => setShowTrailerModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/bZX3Pwb8v_M?autoplay=1"
                title="Ghost of Tsushima Official Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
