'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/mockData';
import { Product, ProductCategory } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { sfx } from '../../lib/sound';
import { 
  Gamepad2, 
  CreditCard, 
  Key, 
  Sparkles, 
  SlidersHorizontal, 
  Search, 
  Tag, 
  Check,
  Headphones
} from 'lucide-react';

export function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Catalog', icon: Sparkles },
    { id: 'console-games', label: 'Console Games', icon: Gamepad2 },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'gift-cards', label: 'Gift Cards', icon: Key },
    { id: 'accessories', label: 'Accessories & Gadgets', icon: Headphones }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="marketplace" className="relative py-20 sm:py-28 bg-[#06060c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs font-black uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Gaming Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Marketplace <span className="text-gradient-purple-blue">Catalog</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Licensed digital codes, pre-orders, subscriptions, and high-performance gaming hardware.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games, codes, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls & Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sfx.play('tab');
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-600/30 scale-105'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 uppercase font-bold text-[10px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                sfx.play('click');
                setSortBy(e.target.value as typeof sortBy);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="featured" className="bg-[#121222]">Featured First</option>
              <option value="price-asc" className="bg-[#121222]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#121222]">Price: High to Low</option>
              <option value="rating" className="bg-[#121222]">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-slate-400 text-sm">No products found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
