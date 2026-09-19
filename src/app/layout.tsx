import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ReiKai Arcade | Futuristic Digital Gaming Marketplace & Top-Up',
  description: 'Bangladesh\'s premier digital gaming marketplace. 10-second automated game top-up, PS5 consoles, GTA VI & FC 27 pre-orders, official gift cards, and subscriptions with SSLCOMMERZ.',
  keywords: ['game top up', 'valorant points', 'free fire diamonds', 'ps5 pre order', 'gta 6 pre order', 'reikai arcade', 'steam gift cards', 'bangladesh gaming marketplace'],
  authors: [{ name: 'ReiKai Arcade' }]
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#06060c'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} dark scroll-smooth`}>
      <body className="bg-[#05050a] text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-violet-600 selection:text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
