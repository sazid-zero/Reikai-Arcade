'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { 
  X, 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Zap, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard,
  ArrowRight,
  Sparkles,
  Loader2
} from 'lucide-react';

export function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    total 
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'processing' | 'success'>('cart');
  const [selectedGateway, setSelectedGateway] = useState<'sslcommerz-bkash' | 'sslcommerz-nagad' | 'sslcommerz-card'>('sslcommerz-bkash');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) setInputCoupon('');
  };

  const handleCheckout = () => {
    sfx.play('chime');
    setCheckoutStep('processing');

    // Simulate SSLCOMMERZ gateway verification & supplier API fulfillment
    setTimeout(() => {
      sfx.play('success');
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d2ff', '#8b5cf6', '#00ff9d']
      });
      setCheckoutStep('success');
      clearCart();
    }, 2200);
  };

  const handleClose = () => {
    sfx.play('click');
    setIsCartOpen(false);
    setCheckoutStep('cart');
    setCouponFeedback(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0c1a] border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#121226]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Your Gaming Cart
                </h3>
                <span className="text-[11px] text-slate-400">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {checkoutStep === 'processing' ? (
              <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in">
                <div className="relative">
                  <Loader2 className="w-14 h-14 text-cyan-400 animate-spin" />
                  <Zap className="w-6 h-6 text-violet-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <h4 className="text-base font-black text-white uppercase tracking-wider">
                  Processing Payment & Supplier API
                </h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Connecting to SSLCOMMERZ gateway, verifying transaction authenticity, and auto-dispatching order...
                </p>
              </div>
            ) : checkoutStep === 'success' ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h4 className="text-xl font-black text-white">Order Confirmed!</h4>
                <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                  Payment verified via SSLCOMMERZ. Supplier API has fulfilled your digital items. Delivery info has been dispatched.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left w-full space-y-1.5 text-xs font-mono">
                  <div className="text-slate-400 flex justify-between">
                    <span>Order ID:</span>
                    <span className="text-white font-bold">#RK-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="text-slate-400 flex justify-between">
                    <span>Fulfillment Status:</span>
                    <span className="text-emerald-400 font-bold">SUCCESS (11.2s)</span>
                  </div>
                  <div className="text-slate-400 flex justify-between">
                    <span>Gateway:</span>
                    <span className="text-cyan-300">SSLCOMMERZ Bangladesh</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-300">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse game top-ups, subscriptions, or pre-order upcoming blockbusters.
                </p>
                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-3">
                {cart.map((item, idx) => {
                  const itemPrice = item.variant ? item.variant.price : item.product.price;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex gap-3 items-start"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        {item.variant && (
                          <div className="text-[10px] text-cyan-300 font-medium">
                            {item.variant.name}
                          </div>
                        )}

                        {/* Customer input badges */}
                        {item.customerInputs && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {Object.entries(item.customerInputs).map(([k, v]) => (
                              <span
                                key={k}
                                className="px-1.5 py-0.2 rounded bg-black/60 text-[9px] text-slate-400 border border-white/5 font-mono"
                              >
                                {k}: {v}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-xs font-black text-cyan-300">
                            ৳{(itemPrice * item.quantity).toLocaleString()}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg px-2 py-0.5 text-xs">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant?.id, -1)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-white text-[11px] w-3 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant?.id, 1)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}

                {/* Coupon Input */}
                <div className="pt-2">
                  {discountPercent > 0 ? (
                    <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-violet-300 font-bold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code &lsquo;{couponCode}&rsquo; ({discountPercent}% OFF)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[11px] text-rose-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon: REIKAI2026"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs uppercase placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <span
                      className={`text-[10px] mt-1.5 block ${
                        couponFeedback.success ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {couponFeedback.message}
                    </span>
                  )}
                </div>

                {/* SSLCOMMERZ Payment Channel Preview */}
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Automated Payment Method
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sslcommerz-bkash', label: 'bKash Auto' },
                      { id: 'sslcommerz-nagad', label: 'Nagad Auto' },
                      { id: 'sslcommerz-card', label: 'Visa / MC' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          sfx.play('tab');
                          setSelectedGateway(g.id as typeof selectedGateway);
                        }}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                          selectedGateway === g.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout Trigger */}
          {cart.length > 0 && checkoutStep === 'cart' && (
            <div className="p-5 border-t border-white/10 bg-[#101020] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-white">
                  <span className="text-xs font-bold uppercase">Estimated Total</span>
                  <span className="text-xl font-black text-cyan-300">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>256-Bit SSLCOMMERZ Security • 100% Instant Delivery</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Pay ৳{total.toLocaleString()} via SSLCOMMERZ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
