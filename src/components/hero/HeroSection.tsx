'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ConsoleCanvas3D } from './ConsoleCanvas3D';
import { PreOrderModal } from '../modals/PreOrderModal';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { sfx } from '../../lib/sound';
import { User, ArrowUpRight, ArrowUpLeft } from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onExploreTopUp: () => void;
}

// Crisp official PlayStation vector logo
function PlaystationLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 16 16" 
      fill="currentColor" 
      className={className}
      aria-label="PlayStation Logo"
    >
      <path d="M15.858 11.451c-.313.395-1.079.676-1.079.676l-5.696 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.161-.054s.807-.286 1.942-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356M9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072Zm-8.424 3.625C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.45 8.45 0 0 1-4.018-.323Z" />
    </svg>
  );
}

export function HeroSection({ onExploreProducts, onExploreTopUp }: HeroSectionProps) {
  const [selectedPreOrderProduct, setSelectedPreOrderProduct] = useState<Product | null>(null);

  const gtaProduct = PRODUCTS.find((p) => p.id === 'game-gta6') || PRODUCTS[0];
  const fcProduct = PRODUCTS.find((p) => p.id === 'game-fc27') || PRODUCTS[1];

  const handleNavClick = (targetId: string) => {
    sfx.play('click');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#070b16] text-white flex flex-col justify-between py-4 sm:py-5 lg:py-6 px-4 sm:px-8 lg:px-14 select-none"
    >
      {/* Background Ambience: Deep Radial Blue Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 1100px 760px at 50% 50%, rgba(20, 60, 150, 0.42) 0%, rgba(10, 26, 70, 0.65) 45%, rgba(6, 10, 20, 0.98) 80%, #040711 100%)'
        }}
      />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050812] to-transparent pointer-events-none" />

      {/* 1. TOP FLOATING WHITE PILL NAVBAR (Matches Screenshot) */}
      <div className="relative z-30 w-full flex justify-center shrink-0">
        <nav className="flex items-center gap-5 sm:gap-8 md:gap-10 px-6 sm:px-9 py-2.5 sm:py-3 rounded-full bg-white text-zinc-950 shadow-2xl shadow-black/40 text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300">
          <button 
            onClick={() => handleNavClick('hero')} 
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('marketplace')} 
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Games
          </button>
          <button 
            onClick={() => handleNavClick('marketplace')} 
            className="hover:text-blue-600 transition-colors cursor-pointer hidden sm:inline-block"
          >
            Accessories
          </button>

          {/* Center PlayStation Logo */}
          <div className="px-1 text-black flex items-center justify-center">
            <PlaystationLogo className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <button 
            onClick={() => handleNavClick('cinematic-showcase')} 
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Explore
          </button>
          <button 
            onClick={() => handleNavClick('faq')} 
            className="hover:text-blue-600 transition-colors cursor-pointer hidden sm:inline-block"
          >
            Support
          </button>

          {/* User Profile Avatar */}
          <button 
            onClick={() => {
              sfx.play('click');
              handleNavClick('marketplace');
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/20 flex items-center justify-center text-zinc-800 hover:bg-black/5 hover:border-black/40 transition-colors cursor-pointer ml-1"
            title="User Profile"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-900" />
          </button>
        </nav>
      </div>

      {/* 2. UPPER HEADLINE: Title Case 'Feel the Game' with Subtitle (Layered behind controller for 3D depth) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center shrink-0 pt-2 lg:pt-3">
        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.38em] uppercase text-slate-300 drop-shadow-md text-center mb-1">
          THE NEXT GENERATION OF PLAY
        </p>

        {/* Display Headline: Feel the Game */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.2rem] font-bold tracking-tight text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)] text-center leading-none">
          Feel the Game
        </h1>
      </div>

      {/* 3. CENTRAL STAGE: Left Card + Big 3D Controller Overlay + Right Card */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex items-center justify-between my-auto py-1">
        <div className="w-full flex items-center justify-between relative">

          {/* LEFT COLUMN: CONTROL label + GTA VI Card */}
          <div className="hidden lg:flex flex-col items-start justify-center z-10 shrink-0 w-64 xl:w-72">
            <div className="text-xs sm:text-sm font-extrabold tracking-[0.35em] uppercase text-slate-300 mb-3 pl-1">
              CONTROL
            </div>

            <div className="relative w-full">
              {/* Top Notch Indicator Arrow */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-cyan-400 text-xs leading-none z-10 pointer-events-none drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
                ▼
              </div>

              <div 
                onClick={() => {
                  sfx.play('click');
                  setSelectedPreOrderProduct(gtaProduct);
                }}
                className="group relative rounded-2xl border border-blue-500/40 bg-[#0e172e]/90 hover:border-cyan-400/70 p-3 shadow-2xl shadow-blue-950/60 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {/* Artwork Banner */}
                <div className="relative w-full h-24 xl:h-28 rounded-xl overflow-hidden mb-2.5 border border-white/10 shadow-inner">
                  <Image
                    src="/images/gta6_card.jpg"
                    alt="Grand Theft Auto VI"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Action Pill: Circle arrow + text */}
                <div className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl bg-white/5 group-hover:bg-blue-600/30 border border-white/10 group-hover:border-cyan-400/40 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-white tracking-wide">
                    Place a pre-order
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: BIG 3D DUALSENSE OVERLAYING TITLE AND INNER EDGES OF CARDS */}
          <div className="relative w-full lg:w-[740px] xl:w-[880px] flex flex-col items-center justify-center -mx-16 lg:-mx-28 xl:-mx-36 -mt-16 sm:-mt-20 lg:-mt-28 xl:-mt-36 z-30 pointer-events-none">
            {/* 3D Controller Canvas: Big, majestic, completely uncropped */}
            <div className="w-full">
              <ConsoleCanvas3D onExploreClick={onExploreProducts} />
            </div>

            {/* EXPLORE PS5 White Pill Button directly below controller */}
            <div className="mt-1 sm:mt-2 z-30 pointer-events-auto">
              <button
                onClick={() => {
                  sfx.play('power');
                  onExploreProducts();
                }}
                className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-100 text-zinc-950 font-extrabold text-xs sm:text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/25 hover:shadow-cyan-400/40 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <PlaystationLogo className="w-4 h-4 text-black" />
                <span>EXPLORE PS5</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: THE FUTURE label + EA FC 27 Card */}
          <div className="hidden lg:flex flex-col items-end justify-center z-10 shrink-0 w-64 xl:w-72">
            <div className="text-xs sm:text-sm font-extrabold tracking-[0.35em] uppercase text-slate-300 mb-3 pr-1">
              THE FUTURE
            </div>

            <div className="relative w-full">
              {/* Top Notch Indicator Arrow */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-cyan-400 text-xs leading-none z-10 pointer-events-none drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
                ▼
              </div>

              <div 
                onClick={() => {
                  sfx.play('click');
                  setSelectedPreOrderProduct(fcProduct);
                }}
                className="group relative rounded-2xl border border-blue-500/40 bg-[#0e172e]/90 hover:border-cyan-400/70 p-3 shadow-2xl shadow-blue-950/60 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {/* Artwork Banner */}
                <div className="relative w-full h-24 xl:h-28 rounded-xl overflow-hidden mb-2.5 border border-white/10 shadow-inner">
                  <Image
                    src="/images/fc27_card.jpg"
                    alt="EA SPORTS FC 27"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Action Pill: Text + Circle arrow */}
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-white/5 group-hover:bg-blue-600/30 border border-white/10 group-hover:border-cyan-400/40 transition-colors">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-white tracking-wide">
                    Place a pre-order
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowUpLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. BOTTOM FOOTER CAPTIONS (Matches Reference Image) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto shrink-0 flex items-center justify-between pt-2 pb-1 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
        <div className="leading-snug">
          PLAY WITHOUT<br />LIMITS
        </div>
        <div className="leading-snug text-right">
          A NEW LEVEL OF SPEED, IMMERSION<br />AND CONTROL.
        </div>
      </div>

      {/* Interactive Pre-Order Modal */}
      {selectedPreOrderProduct && (
        <PreOrderModal
          product={selectedPreOrderProduct}
          isOpen={true}
          onClose={() => setSelectedPreOrderProduct(null)}
        />
      )}
    </section>
  );
}
