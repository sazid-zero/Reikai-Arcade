'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { sfx } from '../../lib/sound';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Zap, 
  Eye, 
  ArrowUpRight 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.play('chime');
    addToCart(product, product.variants?.[0]);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative rounded-3xl bg-[#0f0f1e]/80 hover:bg-[#151528] border border-white/10 hover:border-violet-500/50 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-950/40 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Media Showcase */}
      <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-black/40 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-violet-600/90 text-white shadow-md border border-violet-400/40">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
              : 'bg-black/50 text-slate-300 hover:text-rose-400 hover:bg-black/70'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Instant Delivery Tag */}
        {product.instantDelivery && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>10s Instant Delivery</span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="px-4 py-2 rounded-full bg-white/90 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Meta Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            {product.productType}
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-base sm:text-lg font-black text-white">
              ৳{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-[10px] text-slate-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-2xl bg-white/10 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-cyan-500 text-slate-300 group-hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
