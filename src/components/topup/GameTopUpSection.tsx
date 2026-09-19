'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { TOP_UP_GAMES } from '../../data/mockData';
import { TopUpGame, Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Flame,
  AlertCircle
} from 'lucide-react';

export function GameTopUpSection() {
  const { addToCart } = useCart();
  const [selectedGame, setSelectedGame] = useState<TopUpGame>(TOP_UP_GAMES[0]);
  const [selectedPackage, setSelectedPackage] = useState(TOP_UP_GAMES[0].packages[1]);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    server: 'Asia Pacific (AP)'
  });
  const [validationError, setValidationError] = useState('');
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  const handleGameSelect = (game: TopUpGame) => {
    sfx.play('tab');
    setSelectedGame(game);
    setSelectedPackage(game.packages[0]);
    setFormValues({});
    setValidationError('');
  };

  const handlePackageSelect = (pkg: typeof selectedGame.packages[0]) => {
    sfx.play('click');
    setSelectedPackage(pkg);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    setValidationError('');
  };

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check required fields
    for (const field of selectedGame.fields) {
      if (field.required && !formValues[field.id]) {
        sfx.play('cyber');
        setValidationError(`Please enter your ${field.label}`);
        return;
      }
    }

    sfx.play('chime');
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00d2ff', '#8b5cf6', '#00ff9d']
    });

    // Create synthesized top-up product
    const topUpProduct: Product = {
      id: `topup-${selectedGame.id}-${selectedPackage.id}`,
      name: `${selectedGame.name} - ${selectedPackage.amount}`,
      slug: `topup-${selectedGame.id}`,
      category: 'top-up',
      productType: 'Game Top-Up',
      description: `Automated instant top-up for ${selectedGame.name}. Currency: ${selectedGame.currencyName}.`,
      price: selectedPackage.price,
      originalPrice: selectedPackage.originalPrice,
      rating: 5.0,
      reviewCount: 340,
      image: selectedGame.image,
      instantDelivery: true
    };

    addToCart(topUpProduct, undefined, 1, {
      Game: selectedGame.name,
      Package: selectedPackage.amount,
      ...formValues
    });

    setTopUpSuccess(true);
    setTimeout(() => setTopUpSuccess(false), 3000);
  };

  return (
    <section id="top-up" className="relative py-20 sm:py-24 bg-[#070710] border-t border-b border-white/5">
      {/* Cyber Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
            <span>Direct Supplier API Integration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Instant Game <span className="text-gradient-neon">Top-Up Engine</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Recharge diamonds, points & game coins in 5-30 seconds with 100% automated API dispatch. Zero delays.
          </p>
        </div>

        {/* Step 1: Game Selector Grid */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] font-black">1</span>
            <span>Choose Your Game</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {TOP_UP_GAMES.map((game) => {
              const isSelected = selectedGame.id === game.id;
              return (
                <div
                  key={game.id}
                  onClick={() => handleGameSelect(game)}
                  className={`group relative p-3 sm:p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                    isSelected
                      ? 'bg-[#15152a] border-cyan-400 shadow-xl shadow-cyan-500/20 scale-105'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden mb-2.5 shadow-md">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                    {game.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {game.publisher}
                  </span>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Top-Up Form & Denomination Selector Grid */}
        <form onSubmit={handleTopUpSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Packages & Denominations (Step 2) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e1a] border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px] font-black">2</span>
                  <span>Select {selectedGame.currencyName} Package</span>
                </div>
                <span className="text-[11px] font-bold text-cyan-400">
                  Instant Automated Delivery
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {selectedGame.packages.map((pkg) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-102'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {pkg.bonus && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-cyan-500 text-black shadow-md">
                          {pkg.bonus}
                        </span>
                      )}

                      {pkg.popular && !pkg.bonus && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-violet-600 text-white shadow-md">
                          POPULAR
                        </span>
                      )}

                      <div className="mb-2">
                        <span className="text-sm sm:text-base font-black text-white block">
                          {pkg.amount}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {selectedGame.currencyName}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                        <span className="text-sm font-extrabold text-cyan-300">
                          ৳{pkg.price.toLocaleString()}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-[10px] text-slate-500 line-through">
                            ৳{pkg.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Customer Inputs & Checkout Preview (Step 3) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#141426] to-[#0d0d1b] border border-violet-500/30 shadow-2xl space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-400 text-black flex items-center justify-center text-[10px] font-black">3</span>
                <span>Account Credentials</span>
              </div>

              {/* Dynamic Game Required Fields */}
              <div className="space-y-3">
                {selectedGame.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      {field.label} {field.required && <span className="text-rose-400">*</span>}
                    </label>

                    {field.options ? (
                      <select
                        value={formValues[field.id] || field.options[0]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#121222] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        required={field.required}
                        placeholder={field.placeholder}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    )}

                    {field.helperText && (
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        {field.helperText}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {validationError && (
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Order Summary Pill */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Selected Game:</span>
                  <span className="text-white font-bold">{selectedGame.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Package:</span>
                  <span className="text-white font-bold">{selectedPackage.amount}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Speed:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 5 - 30 Seconds
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-bold text-white uppercase text-[11px]">Total Price:</span>
                  <span className="text-xl font-black text-cyan-300">৳{selectedPackage.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Pill */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SSLCOMMERZ 256-Bit Encrypted Instant Gateway</span>
              </div>

              {/* Submit Top-Up Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                {topUpSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Instant Top-Up (৳{selectedPackage.price.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
