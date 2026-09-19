'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Gamepad2, 
  Zap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenWishlist?: () => void;
  onOpenAuth?: () => void;
}

export function Navbar({ onOpenSearch, onOpenWishlist, onOpenAuth }: NavbarProps) {
  const { cart, wishlist, setIsCartOpen, isMuted, toggleMute } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:py-5 transition-all duration-300 pointer-events-none">
      {/* Floating Pill Nav Inspired by Screenshot 1 */}
      <nav 
        className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          scrolled 
            ? 'bg-[#090915]/90 border-violet-500/30 shadow-violet-950/40 w-full max-w-5xl' 
            : 'bg-white/[0.08] border-white/20 hover:border-white/30 shadow-black/50 w-full max-w-5xl'
        }`}
      >
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-slate-300">
          <a 
            href="#hero" 
            onClick={() => sfx.play('hover')}
            className="hover:text-white transition-colors duration-200 hover:scale-105"
          >
            Home
          </a>
          <a 
            href="#top-up" 
            onClick={() => sfx.play('hover')}
            className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors duration-200 hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Top-Up
          </a>
          <a 
            href="#marketplace" 
            onClick={() => sfx.play('hover')}
            className="hover:text-violet-400 transition-colors duration-200 hover:scale-105"
          >
            Shop
          </a>
          <a 
            href="#cinematic-showcase" 
            onClick={() => sfx.play('hover')}
            className="hover:text-rose-400 transition-colors duration-200 hover:scale-105"
          >
            Showcase
          </a>
        </div>

        {/* Center Brand Emblem (Inspired by PS Logo in Screenshot 1) */}
        <a 
          href="#hero" 
          onClick={() => sfx.play('power')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
            <div className="w-full h-full bg-[#080812] rounded-[11px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-sm sm:text-base text-white flex items-center gap-1">
              REIKAI<span className="text-cyan-400">ARCADE</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-violet-400 font-medium -mt-1 hidden sm:block">
              Next-Gen Marketplace
            </span>
          </div>
        </a>

        {/* Right Nav & Utilities */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-widest text-slate-300 mr-2">
            <a 
              href="#why-reikai" 
              onClick={() => sfx.play('hover')}
              className="hover:text-white transition-colors"
            >
              Why Us
            </a>
            <a 
              href="#faq" 
              onClick={() => sfx.play('hover')}
              className="hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Cyber SFX' : 'Mute Cyber SFX'}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              sfx.play('click');
              if (onOpenSearch) onOpenSearch();
            }}
            title="Search Games & Products"
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => {
              sfx.play('click');
              if (onOpenWishlist) onOpenWishlist();
            }}
            title="Wishlist"
            className="relative p-2 rounded-full text-slate-300 hover:text-rose-400 hover:bg-white/10 transition-colors"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => {
              sfx.play('chime');
              setIsCartOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-black/40 px-1.5 py-0.5 rounded-full text-[10px] ml-0.5 font-extrabold text-cyan-200">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => {
              sfx.play('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 md:hidden rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 left-4 right-4 bg-[#0d0d1a]/95 border border-violet-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl flex flex-col gap-4 text-sm font-medium z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <a 
            href="#hero" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-2 px-3 rounded-lg hover:bg-white/5 text-slate-200 flex items-center justify-between"
          >
            <span>Home</span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </a>
          <a 
            href="#top-up" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-2 px-3 rounded-lg hover:bg-white/5 text-slate-200 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Instant Game Top-Up
            </span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full uppercase font-bold">10s</span>
          </a>
          <a 
            href="#marketplace" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-2 px-3 rounded-lg hover:bg-white/5 text-slate-200"
          >
            Marketplace Catalog
          </a>
          <a 
            href="#cinematic-showcase" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-2 px-3 rounded-lg hover:bg-white/5 text-slate-200"
          >
            Samurai Cinematic Drop
          </a>
          <a 
            href="#why-reikai" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-2 px-3 rounded-lg hover:bg-white/5 text-slate-200"
          >
            Why ReiKai Arcade
          </a>
          <a 
            href="#faq" 
            onClick={() => setMobileMenuOpen(false)} 
            className="py-2 px-3 rounded-lg hover:bg-white/5 text-slate-200"
          >
            FAQ & Support
          </a>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> SSLCOMMERZ 256-Bit
            </span>
            <span>v2.4 Pro</span>
          </div>
        </div>
      )}
    </header>
  );
}
