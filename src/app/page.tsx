'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/hero/HeroSection';
import { CinematicGameShowcase } from '../components/showcase/CinematicGameShowcase';
import { GameTopUpSection } from '../components/topup/GameTopUpSection';
import { ProductShowcase } from '../components/marketplace/ProductShowcase';
import { WhyReiKai } from '../components/features/WhyReiKai';
import { HowItWorks } from '../components/features/HowItWorks';
import { CustomerReviews } from '../components/testimonials/CustomerReviews';
import { FaqSection } from '../components/faq/FaqSection';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { AIAssistantWidget } from '../components/ai/AIAssistantWidget';
import { SearchModal } from '../components/modals/SearchModal';
import { WishlistModal } from '../components/modals/WishlistModal';
import { QuickViewModal } from '../components/marketplace/QuickViewModal';
import { Product } from '../types';

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#05050a] text-slate-100 selection:bg-violet-600 selection:text-white">
      {/* Top Floating Pill Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Hero Section with Interactive 3D WebGL Console Controller */}
      <HeroSection
        onExploreProducts={() => scrollToSection('marketplace')}
        onExploreTopUp={() => scrollToSection('top-up')}
      />

      {/* Cinematic Samurai Game Showcase (Ghost of Tsushima style) */}
      <CinematicGameShowcase />

      {/* Instant 10s Automated Game Top-Up Engine */}
      <GameTopUpSection />

      {/* Full Marketplace Catalog with 5 Categories */}
      <ProductShowcase />

      {/* Why ReiKai Arcade - 4 Core Pillars */}
      <WhyReiKai />

      {/* How It Works - 3 Step Flow */}
      <HowItWorks />

      {/* Verified Gamer Reviews & Testimonials */}
      <CustomerReviews />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Comprehensive Footer */}
      <Footer />

      {/* Slide-out Cart Drawer with SSLCOMMERZ checkout */}
      <CartDrawer />

      {/* 24/7 AI Support Assistant Widget */}
      <AIAssistantWidget />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setActiveModalProduct(p)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={(p) => setActiveModalProduct(p)}
      />

      {/* Quick View Modal for selected product */}
      {activeModalProduct && (
        <QuickViewModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </main>
  );
}
