'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Product, ProductVariant } from '../../types';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { X, CheckCircle2, ShieldCheck, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface PreOrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export function PreOrderModal({ product, onClose }: PreOrderModalProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [platform, setPlatform] = useState('PlayStation 5');
  const [accountEmail, setAccountEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.play('chime');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#00d2ff', '#00ff9d']
    });

    addToCart(product, selectedVariant, 1, {
      Platform: platform,
      AccountEmail: accountEmail
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0d0d1b] border border-violet-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-violet-950/50 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image cover */}
        <div className="relative h-44 w-full overflow-hidden bg-black">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1b] via-[#0d0d1b]/40 to-transparent" />
          
          <button
            onClick={() => {
              sfx.play('click');
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-violet-600/80 text-violet-200 border border-violet-400/30">
              {product.badge || 'VIP PRE-ORDER'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 line-clamp-1">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center text-center space-y-3 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
              <h4 className="text-xl font-black text-white">Pre-Order Secured!</h4>
              <p className="text-sm text-slate-300 max-w-xs">
                Your reservation has been added to your cart with exclusive launch bonuses.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['PlayStation 5', 'Xbox Series X/S', 'PC'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        sfx.play('tab');
                        setPlatform(p);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        platform === p
                          ? 'bg-violet-600/30 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Edition Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Select Edition
                  </label>
                  <div className="space-y-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <div
                          key={v.id}
                          onClick={() => {
                            sfx.play('tab');
                            setSelectedVariant(v);
                          }}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-violet-600/20 border-violet-500 shadow-lg shadow-violet-950/40'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              {v.name}
                              {isSelected && <Sparkles className="w-3.5 h-3.5 text-violet-400" />}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Official License Key & Launch Day Delivery
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-extrabold text-cyan-300">
                              ৳{v.price.toLocaleString()}
                            </span>
                            {v.originalPrice && (
                              <div className="text-[10px] text-slate-500 line-through">
                                ৳{v.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Delivery Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Delivery Gamer Tag / Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. gamer@reikai.gg"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Your official digital unlock code and credentials will be dispatched here.
                </span>
              </div>

              {/* Guarantee Pill */}
              <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 flex items-center gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Price Match & Launch Day Pre-load Guarantee. 100% Refundable prior to launch.</span>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Due</div>
                  <div className="text-xl font-black text-white">
                    ৳{currentPrice.toLocaleString()}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-violet-600/40 hover:shadow-cyan-500/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Reserve Pre-Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
