'use client';

import React from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { Heart, X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function WishlistModal({ isOpen, onClose, onSelectProduct }: WishlistModalProps) {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0e0e1a] border border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#131326]">
          <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>Saved Wishlist ({wishlistedProducts.length})</span>
          </div>
          <button
            onClick={() => {
              sfx.play('click');
              onClose();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {wishlistedProducts.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <Heart className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-xs">No items saved in your wishlist yet.</p>
              <p className="text-slate-500 text-[11px]">Click the heart icon on any game or gear to save it for later.</p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
              >
                <div 
                  onClick={() => {
                    sfx.play('click');
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate hover:text-cyan-300">
                      {product.name}
                    </h4>
                    <span className="text-xs font-black text-cyan-300 block">
                      ৳{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sfx.play('chime');
                      addToCart(product, product.variants?.[0]);
                    }}
                    className="p-2 rounded-xl bg-violet-600/30 hover:bg-violet-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
