'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0e0e1a] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#131326]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search game top-up, PS5 titles, gift cards, consoles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
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

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Recommendations'}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching products found. Try searching for &ldquo;GTA&rdquo;, &ldquo;FC 27&rdquo;, &ldquo;Steam&rdquo;, or &ldquo;Valorant&rdquo;.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  sfx.play('click');
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 uppercase">
                      {product.productType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-cyan-300">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
