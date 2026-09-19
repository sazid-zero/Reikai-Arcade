'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Product, ProductVariant } from '../../types';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { 
  X, 
  ShoppingBag, 
  Star, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Heart,
  Sparkles,
  Minus,
  Plus
} from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [customerInputs, setCustomerInputs] = useState<Record<string, string>>({});
  const [validationError, setValidationError] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;

  const handleInputChange = (fieldId: string, val: string) => {
    setCustomerInputs((prev) => ({ ...prev, [fieldId]: val }));
    setValidationError('');
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();

    if (product.requiredFields) {
      for (const field of product.requiredFields) {
        if (field.required && !customerInputs[field.id]) {
          sfx.play('cyber');
          setValidationError(`Please provide: ${field.label}`);
          return;
        }
      }
    }

    sfx.play('chime');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#00d2ff']
    });

    addToCart(product, selectedVariant, quantity, customerInputs);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0d0d1b] border border-violet-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-violet-950/50 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sfx.play('click');
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-slate-400 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image & Gallery Showcase */}
        <div className="md:w-1/2 relative min-h-[260px] md:min-h-[460px] bg-black">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1b] via-transparent to-black/40" />

          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-600 text-white border border-violet-400/40 shadow-lg">
              {product.badge}
            </span>
          )}

          {product.instantDelivery && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>Automated Instant Delivery</span>
            </div>
          )}
        </div>

        {/* Right: Info, Variant Selector & Customer Inputs */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                <span>{product.productType}</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {product.name}
              </h3>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-cyan-300">
                ৳{currentPrice.toLocaleString()}
              </span>
              {currentOriginalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  ৳{currentOriginalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select Option / Edition
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
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-violet-600/20 border-violet-400 text-white font-bold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span>{v.name}</span>
                        <span className="text-cyan-300 font-extrabold">৳{v.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Configurable Customer Input Fields */}
            {product.requiredFields && product.requiredFields.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Required Order Details
                </div>
                {product.requiredFields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                      {field.label} {field.required && <span className="text-rose-400">*</span>}
                    </label>
                    {field.options ? (
                      <select
                        value={customerInputs[field.id] || field.options[0]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#121222] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={customerInputs[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {validationError && (
              <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                {validationError}
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quantity
              </span>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-1">
                <button
                  type="button"
                  onClick={() => {
                    sfx.play('hover');
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-white w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sfx.play('hover');
                    setQuantity(quantity + 1);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  sfx.play('cyber');
                  toggleWishlist(product.id);
                }}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-rose-500/20 border-rose-400 text-rose-400'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-rose-400'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-95"
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (৳{(currentPrice * quantity).toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
