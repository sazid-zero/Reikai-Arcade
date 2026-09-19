'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ConsoleCanvas3D } from './ConsoleCanvas3D';
import { PreOrderModal } from '../modals/PreOrderModal';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { sfx } from '../../lib/sound';
import { 
  ArrowUpRight, 
  Gamepad2, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Flame,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onExploreTopUp: () => void;
}

export function HeroSection({ onExploreProducts, onExploreTopUp }: HeroSectionProps) {
  const [selectedPreOrderProduct, setSelectedPreOrderProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'controller' | 'console'>('controller');

  const gtaProduct = PRODUCTS.find((p) => p.id === 'game-gta6') || PRODUCTS[0];
  const fcProduct = PRODUCTS.find((p) => p.id === 'game-fc27') || PRODUCTS[1];

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Cyber Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-violet-900/30 via-cyan-900/20 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-900/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-900/20 blur-[120px] pointer-events-none rounded-full" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Top Tagline from Screenshot 1 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em] text-cyan-300 drop-shadow-[0_0_12px_rgba(0,210,255,0.6)]">
            THE NEXT GENERATION OF PLAY
          </span>
          <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
        </div>

        {/* Main Display Headline from Screenshot 1 */}
        <div className="text-center relative">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-2xl">
            Feel the Game
          </h1>

          {/* Flanking Sub-headings: CONTROL / THE FUTURE */}
          <div className="flex items-center justify-between w-full max-w-2xl mx-auto px-4 sm:px-8 mt-1 text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
              CONTROL
            </span>
            <span className="text-cyan-400">THE FUTURE</span>
          </div>
        </div>

        {/* 3D Centerpiece Stage with Flanking Game Pre-order Cards */}
        <div className="relative w-full max-w-6xl mt-4 sm:mt-6 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          
          {/* Left Flanking Card: GTA VI (Matching Screenshot 1) */}
          <div className="w-full sm:w-80 lg:w-72 shrink-0 z-20 order-2 lg:order-1">
            <div 
              onClick={() => {
                sfx.play('click');
                setSelectedPreOrderProduct(gtaProduct);
              }}
              className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#16162a]/90 to-[#0b0b15]/95 border border-white/10 hover:border-violet-500/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
            >
              {/* Arrow Badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 group-hover:bg-violet-600/60 border border-white/10 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Game Thumbnail */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3.5 border border-white/5 shadow-inner">
                <Image
                  src="/images/gta6_card.jpg"
                  alt="GTA VI Pre-Order"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-black/70 text-violet-300 border border-violet-500/30">
                  Pre-Order
                </div>
              </div>

              {/* Card Meta */}
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-white group-hover:text-violet-300 transition-colors">
                  Grand Theft Auto VI
                </h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Vice City VIP Drop</span>
                  <span className="font-extrabold text-cyan-300">৳7,490</span>
                </div>
              </div>

              {/* Action Button Pill */}
              <div className="mt-3 py-2 px-3 rounded-xl bg-white/5 group-hover:bg-violet-600/30 border border-white/10 group-hover:border-violet-400/40 text-xs font-bold text-slate-200 group-hover:text-white flex items-center justify-between transition-colors">
                <span>Place a pre-order</span>
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                  ↗
                </span>
              </div>
            </div>
          </div>

          {/* Center 3D Console & Controller Stage */}
          <div className="w-full max-w-2xl z-10 order-1 lg:order-2">
            <ConsoleCanvas3D onExploreClick={onExploreProducts} />
          </div>

          {/* Right Flanking Card: EA FC 27 (Matching Screenshot 1) */}
          <div className="w-full sm:w-80 lg:w-72 shrink-0 z-20 order-3">
            <div 
              onClick={() => {
                sfx.play('click');
                setSelectedPreOrderProduct(fcProduct);
              }}
              className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#16162a]/90 to-[#0b0b15]/95 border border-white/10 hover:border-cyan-500/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
            >
              {/* Arrow Badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 group-hover:bg-cyan-500/60 border border-white/10 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Game Thumbnail */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3.5 border border-white/5 shadow-inner">
                <Image
                  src="/images/fc27_card.jpg"
                  alt="EA FC 27 Pre-Order"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-black/70 text-cyan-300 border border-cyan-500/30">
                  Next-Gen Drop
                </div>
              </div>

              {/* Card Meta */}
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  EA SPORTS FC 27
                </h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">HyperMotion V Pro</span>
                  <span className="font-extrabold text-cyan-300">৳6,890</span>
                </div>
              </div>

              {/* Action Button Pill */}
              <div className="mt-3 py-2 px-3 rounded-xl bg-white/5 group-hover:bg-cyan-500/30 border border-white/10 group-hover:border-cyan-400/40 text-xs font-bold text-slate-200 group-hover:text-white flex items-center justify-between transition-colors">
                <span>Place a pre-order</span>
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                  ↖
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Explore CTA Pill (Matching White Button in Screenshot 1) */}
        <div className="mt-8 z-20 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              sfx.play('power');
              onExploreProducts();
            }}
            className="group px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-black text-xs sm:text-sm uppercase tracking-widest shadow-2xl shadow-white/20 hover:shadow-cyan-400/40 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Gamepad2 className="w-4 h-4 fill-black" />
            <span>Explore ReiKai Console & Gear</span>
          </button>

          <button
            onClick={() => {
              sfx.play('click');
              onExploreTopUp();
            }}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Instant Top-Up (10s)</span>
          </button>
        </div>

        {/* Bottom Captions from Screenshot 1 */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-12 pt-6 border-t border-white/5 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 gap-2">
          <span>Play Without Limits</span>
          <span>A New Level of Speed, Immersion and Control</span>
        </div>

        {/* Sub-Section Inspired by Bottom Half of Screenshot 1 */}
        <div className="w-full mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  PlayStation 5 & Hardware Showcase
                </h2>
                <p className="text-xs text-slate-400">
                  A futuristic landing page concept inspired by next-generation visual design and tactile haptics.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
              01 / Project Architecture
            </span>
          </div>

          {/* Dual Big Concept Card with Quote and Controller Detail (Matching Screenshot 1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Big Text Card */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121c3b] via-[#0d1226] to-[#070914] border border-cyan-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[11px] font-extrabold text-cyan-300 uppercase tracking-widest">
                  Design Vision
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  The main goal was to make the interface feel <span className="text-cyan-400 underline decoration-cyan-500/50">cinematic</span> while keeping the navigation and key actions <span className="text-violet-400">simple and clear</span>.
                </h3>
              </div>

              {/* Controller Details Pills */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-black text-lg shadow-lg">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    DualSense Adaptive Triggers
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Dynamic resistance simulating real game physics & tension.
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            {/* Right Macro Hardware Closeup Visual */}
            <div className="lg:col-span-7 relative min-h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
              <Image
                src="/images/controller_3d.jpg"
                alt="Tactile Controller Macro"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1226]/80 via-transparent to-black/60 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Micro-textured Ergonomic Grip
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/30">
                  Precision Raytracing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Order Modal */}
      {selectedPreOrderProduct && (
        <PreOrderModal
          product={selectedPreOrderProduct}
          onClose={() => setSelectedPreOrderProduct(null)}
        />
      )}
    </section>
  );
}
