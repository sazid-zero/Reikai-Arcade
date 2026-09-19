import { Product, TopUpGame } from '../types';

export const TOP_UP_GAMES: TopUpGame[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    publisher: 'Riot Games',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    accentColor: '#ff4655',
    currencyName: 'Valorant Points (VP)',
    fields: [
      { id: 'riotId', label: 'Riot ID & Tagline', placeholder: 'e.g. Phoenix#NA1', required: true, helperText: 'Found in your Riot Client profile' },
      { id: 'server', label: 'Server Region', placeholder: 'Select Region', required: true, options: ['Asia Pacific (AP)', 'North America (NA)', 'Europe (EU)'] }
    ],
    packages: [
      { id: 'vp-475', amount: '475 VP', price: 490, originalPrice: 550 },
      { id: 'vp-1000', amount: '1,000 VP', price: 980, originalPrice: 1100, popular: true, bonus: '+50 Bonus VP' },
      { id: 'vp-2050', amount: '2,050 VP', price: 1950, originalPrice: 2250, bonus: '+150 Bonus VP' },
      { id: 'vp-3650', amount: '3,650 VP', price: 3400, originalPrice: 3900, bonus: '+300 Bonus VP' },
      { id: 'vp-5350', amount: '5,350 VP', price: 4890, originalPrice: 5600, popular: true, bonus: '+650 Bonus VP' },
      { id: 'vp-11000', amount: '11,000 VP', price: 9750, originalPrice: 11200, bonus: '+1,500 Bonus VP' }
    ]
  },
  {
    id: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    accentColor: '#3b82f6',
    currencyName: 'Diamonds',
    fields: [
      { id: 'userId', label: 'User ID', placeholder: 'e.g. 123456789', required: true },
      { id: 'zoneId', label: 'Zone ID', placeholder: 'e.g. 1234', required: true, helperText: 'In brackets next to User ID' }
    ],
    packages: [
      { id: 'ml-86', amount: '86 Diamonds', price: 175, originalPrice: 200 },
      { id: 'ml-172', amount: '172 Diamonds', price: 345, originalPrice: 390 },
      { id: 'ml-257', amount: '257 Diamonds', price: 510, originalPrice: 580, popular: true, bonus: '+25 Bonus' },
      { id: 'ml-706', amount: '706 Diamonds', price: 1380, originalPrice: 1550, bonus: '+90 Bonus' },
      { id: 'ml-2195', amount: '2,195 Diamonds', price: 4100, originalPrice: 4600, popular: true, bonus: '+350 Bonus' },
      { id: 'ml-weekly', amount: 'Weekly Diamond Pass', price: 235, originalPrice: 290, popular: true, bonus: 'Best Value' }
    ]
  },
  {
    id: 'free-fire',
    name: 'Garena Free Fire MAX',
    publisher: 'Garena',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
    accentColor: '#f59e0b',
    currencyName: 'Diamonds',
    fields: [
      { id: 'playerUid', label: 'Player UID', placeholder: 'e.g. 9876543210', required: true, helperText: 'View profile in-game' }
    ],
    packages: [
      { id: 'ff-100', amount: '100 + 10 Diamonds', price: 85, originalPrice: 100 },
      { id: 'ff-310', amount: '310 + 31 Diamonds', price: 255, originalPrice: 300, popular: true },
      { id: 'ff-520', amount: '520 + 52 Diamonds', price: 420, originalPrice: 490 },
      { id: 'ff-1060', amount: '1,060 + 106 Diamonds', price: 840, originalPrice: 980, popular: true, bonus: '+106 Bonus' },
      { id: 'ff-2180', amount: '2,180 + 218 Diamonds', price: 1690, originalPrice: 1980, bonus: '+218 Bonus' }
    ]
  },
  {
    id: 'pubg-mobile',
    name: 'PUBG Mobile',
    publisher: 'Level Infinite',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600&auto=format&fit=crop',
    accentColor: '#10b981',
    currencyName: 'Unknown Cash (UC)',
    fields: [
      { id: 'characterId', label: 'Character ID', placeholder: 'e.g. 5123456789', required: true, helperText: 'Click on your avatar to view numeric ID' }
    ],
    packages: [
      { id: 'pubg-60', amount: '60 UC', price: 110, originalPrice: 125 },
      { id: 'pubg-325', amount: '300 + 25 UC', price: 540, originalPrice: 620, popular: true },
      { id: 'pubg-660', amount: '600 + 60 UC', price: 1070, originalPrice: 1200, popular: true, bonus: '+60 Bonus' },
      { id: 'pubg-1800', amount: '1,500 + 300 UC', price: 2650, originalPrice: 3000, bonus: '+300 Bonus' },
      { id: 'pubg-3850', amount: '3,000 + 850 UC', price: 5190, originalPrice: 5900, bonus: '+850 Bonus' }
    ]
  },
  {
    id: 'genshin-impact',
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
    accentColor: '#8b5cf6',
    currencyName: 'Genesis Crystals',
    fields: [
      { id: 'uid', label: 'Genshin UID', placeholder: 'e.g. 812345678', required: true },
      { id: 'server', label: 'Server', placeholder: 'Select Server', required: true, options: ['Asia', 'America', 'Europe', 'TW/HK/MO'] }
    ],
    packages: [
      { id: 'gi-welkin', amount: 'Blessing of the Welkin Moon', price: 520, originalPrice: 590, popular: true, bonus: '3000 Primogems Value' },
      { id: 'gi-60', amount: '60 Genesis Crystals', price: 125, originalPrice: 140 },
      { id: 'gi-300', amount: '300 + 30 Crystals', price: 590, originalPrice: 680 },
      { id: 'gi-980', amount: '980 + 110 Crystals', price: 1790, originalPrice: 2050, popular: true },
      { id: 'gi-1980', amount: '1,980 + 260 Crystals', price: 3490, originalPrice: 3950 }
    ]
  }
];

export const PRODUCTS: Product[] = [
  // Console Games
  {
    id: 'game-gta6',
    name: 'Grand Theft Auto VI (Pre-Order)',
    slug: 'gta-6-pre-order',
    category: 'console-games',
    productType: 'Console Games',
    description: 'Welcome to Leonida. GTA VI returns to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. Pre-order bonus includes exclusive digital in-game cash and weapon skins.',
    price: 7490,
    originalPrice: 8500,
    rating: 5.0,
    reviewCount: 384,
    image: '/images/gta6_card.jpg',
    badge: 'HOT PRE-ORDER',
    featured: true,
    trending: true,
    instantDelivery: false,
    requiredFields: [
      { id: 'platform', label: 'Platform Selection', placeholder: 'Select Console', type: 'select', options: ['PlayStation 5', 'Xbox Series X/S', 'PC'], required: true },
      { id: 'psnEmail', label: 'Delivery PSN/Xbox Email', placeholder: 'your-account@email.com', type: 'text', required: true }
    ],
    variants: [
      { id: 'gta6-std', name: 'Standard Edition', price: 7490, originalPrice: 8500, inStock: true },
      { id: 'gta6-deluxe', name: 'Deluxe Steelbook Edition', price: 9490, originalPrice: 10900, inStock: true },
      { id: 'gta6-collector', name: 'Vice City VIP Collector Pack', price: 14990, originalPrice: 16900, inStock: true }
    ]
  },
  {
    id: 'game-fc27',
    name: 'EA SPORTS FC 27 Next-Gen',
    slug: 'ea-sports-fc-27',
    category: 'console-games',
    productType: 'Console Games',
    description: 'The world\'s game powered by HyperMotion V Pro. Experience unmatched realism with modernized club dynamics, 19,000+ fully licensed players, and revolutionary tactical AI.',
    price: 6890,
    originalPrice: 7600,
    rating: 4.8,
    reviewCount: 215,
    image: '/images/fc27_card.jpg',
    badge: 'NEW DROP',
    featured: true,
    trending: true,
    instantDelivery: true,
    requiredFields: [
      { id: 'platform', label: 'Platform', placeholder: 'Select Platform', type: 'select', options: ['PS5', 'Xbox Series X', 'EA App PC'], required: true },
      { id: 'eaAccount', label: 'EA ID or Email', placeholder: 'gamer@domain.com', type: 'text', required: true }
    ],
    variants: [
      { id: 'fc27-std', name: 'Standard Edition', price: 6890, originalPrice: 7600, inStock: true },
      { id: 'fc27-ultimate', name: 'Ultimate Edition (4,600 FC Points)', price: 9990, originalPrice: 11500, inStock: true }
    ]
  },
  {
    id: 'game-ghost-tsushima',
    name: 'Ghost of Tsushima: Director\'s Cut',
    slug: 'ghost-of-tsushima-directors-cut',
    category: 'console-games',
    productType: 'Console Games',
    description: 'In the late 13th century, the Mongol empire has laid waste to entire nations. Jin Sakai must forge a new path—the path of the Ghost—and wage an unconventional war for the freedom of Tsushima. Includes Iki Island expansion and Legends cooperative multiplayer.',
    price: 4990,
    originalPrice: 6200,
    rating: 4.9,
    reviewCount: 420,
    image: '/images/samurai_banner.jpg',
    badge: 'PLAYSTATION EXCLUSIVE',
    featured: true,
    trending: true,
    instantDelivery: true,
    requiredFields: [
      { id: 'psnRegion', label: 'PSN Region', placeholder: 'Select Region', type: 'select', options: ['US Region', 'UK Region', 'Asia / Singapore'], required: true }
    ],
    variants: [
      { id: 'got-ps5', name: 'PS5 Enhanced Director\'s Cut', price: 4990, originalPrice: 6200, inStock: true },
      { id: 'got-pc', name: 'PC Steam Global Key', price: 4690, originalPrice: 5800, inStock: true }
    ]
  },
  // Subscriptions
  {
    id: 'sub-ps-plus',
    name: 'PlayStation Plus Deluxe 12-Month Membership',
    slug: 'ps-plus-deluxe-12-months',
    category: 'subscriptions',
    productType: 'Subscriptions',
    description: 'Access hundreds of games in the Game Catalog, classic PlayStation titles, cloud streaming, game trials, and online multiplayer. Immediate automated code redemption.',
    price: 11800,
    originalPrice: 13500,
    rating: 4.9,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    badge: 'BESTSELLER',
    featured: true,
    instantDelivery: true,
    requiredFields: [
      { id: 'psnRegion', label: 'PSN Account Region', placeholder: 'Select Account Region', type: 'select', options: ['USA (US Dollar)', 'Turkey (TR)', 'India (INR)', 'UK (GBP)'], required: true }
    ],
    variants: [
      { id: 'ps-1mo', name: '1 Month Deluxe', price: 1850, inStock: true },
      { id: 'ps-3mo', name: '3 Months Deluxe', price: 4400, inStock: true },
      { id: 'ps-12mo', name: '12 Months Deluxe', price: 11800, originalPrice: 13500, inStock: true }
    ]
  },
  {
    id: 'sub-game-pass',
    name: 'Xbox Game Pass Ultimate (3 Months)',
    slug: 'xbox-game-pass-ultimate',
    category: 'subscriptions',
    productType: 'Subscriptions',
    description: 'Play hundreds of high-quality games on PC, Console, and Cloud with friends, plus EA Play membership and exclusive Day One releases including Call of Duty and Bethesda titles.',
    price: 3650,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600&auto=format&fit=crop',
    badge: 'POPULAR',
    featured: true,
    instantDelivery: true,
    requiredFields: [
      { id: 'accountEmail', label: 'Microsoft Account Email', placeholder: 'user@outlook.com', type: 'text', required: true }
    ]
  },
  {
    id: 'sub-discord',
    name: 'Discord Nitro 1 Year + 2 Server Boosts',
    slug: 'discord-nitro-1-year',
    category: 'subscriptions',
    productType: 'Subscriptions',
    description: 'Unlock 500MB uploads, HD 4K 60fps streaming, custom emojis anywhere, special animated profile badges, and 2 free Server Boosts with 30% discount on extra boosts.',
    price: 4890,
    originalPrice: 5800,
    rating: 4.8,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    badge: '-15% OFF',
    instantDelivery: true,
    requiredFields: [
      { id: 'discordTag', label: 'Discord Username', placeholder: 'e.g. shadow_gamer', type: 'text', required: true }
    ]
  },
  // Gift Cards
  {
    id: 'gift-steam-50',
    name: 'Steam Wallet $50 USD Global Digital Code',
    slug: 'steam-wallet-card-50-usd',
    category: 'gift-cards',
    productType: 'Gift Cards',
    description: 'Instant automated delivery of official Steam Wallet Code. Redeem on any Steam account globally to buy games, downloadable content, microtransactions, and Steam Community Market items.',
    price: 5950,
    originalPrice: 6400,
    rating: 5.0,
    reviewCount: 980,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    badge: '10s INSTANT',
    featured: true,
    trending: true,
    instantDelivery: true,
    requiredFields: [
      { id: 'email', label: 'Delivery Email Address', placeholder: 'gamer@gmail.com', type: 'text', required: true }
    ],
    variants: [
      { id: 'steam-10', name: '$10 USD', price: 1250, inStock: true },
      { id: 'steam-20', name: '$20 USD', price: 2450, inStock: true },
      { id: 'steam-50', name: '$50 USD', price: 5950, originalPrice: 6400, inStock: true },
      { id: 'steam-100', name: '$100 USD', price: 11800, originalPrice: 12500, inStock: true }
    ]
  },
  {
    id: 'gift-razer-gold',
    name: 'Razer Gold PIN $100 Global',
    slug: 'razer-gold-pin-100',
    category: 'gift-cards',
    productType: 'Gift Cards',
    description: 'The unified virtual credits for gamers worldwide. Use Razer Gold to buy games and in-game items for over 42,000 games and entertainment titles while earning Razer Silver rewards.',
    price: 11900,
    originalPrice: 12600,
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=600&auto=format&fit=crop',
    instantDelivery: true,
    requiredFields: [
      { id: 'email', label: 'Delivery Email', placeholder: 'your-email@gmail.com', type: 'text', required: true }
    ]
  },
  // Accessories & Gadgets
  {
    id: 'acc-dualsense-edge',
    name: 'DualSense Edge Wireless Controller Pro',
    slug: 'dualsense-edge-wireless-controller',
    category: 'accessories',
    productType: 'Gaming Accessories & Gadgets',
    description: 'Get an edge in gameplay by creating your own custom controls to fit your playstyle. Built with high performance and personalization in mind, featuring mappable back buttons, replaceable stick modules, and adjustable trigger stops.',
    price: 26500,
    originalPrice: 29900,
    rating: 4.9,
    reviewCount: 95,
    image: '/images/controller_3d.jpg',
    badge: 'PREMIUM HARDWARE',
    featured: true,
    newArrival: true,
    instantDelivery: false,
    requiredFields: [
      { id: 'address', label: 'Delivery Address', placeholder: 'House, Road, City, Postcode', type: 'text', required: true },
      { id: 'phone', label: 'Contact Phone Number', placeholder: '+880 1XXXXXXXXX', type: 'text', required: true }
    ],
    variants: [
      { id: 'edge-white', name: 'Cyber Titanium White', price: 26500, inStock: true },
      { id: 'edge-midnight', name: 'Midnight Obsidian Black', price: 27500, inStock: true }
    ]
  },
  {
    id: 'acc-reikai-console-pro',
    name: 'ReiKai Arcade Cyber Console Special Edition',
    slug: 'reikai-arcade-console-special-edition',
    category: 'accessories',
    productType: 'Gaming Accessories & Gadgets',
    description: 'Custom liquid-cooled gaming architecture with custom RGB aura sync, 2TB high-speed PCIe Gen 5 NVMe SSD, Ray-Tracing 4K 120FPS output, and holographic front status LED indicators.',
    price: 78500,
    originalPrice: 89000,
    rating: 5.0,
    reviewCount: 32,
    image: '/images/console_pro.jpg',
    badge: 'LIMITED EDITION',
    featured: true,
    newArrival: true,
    instantDelivery: false,
    requiredFields: [
      { id: 'address', label: 'Shipping Address (Bangladesh)', placeholder: 'Full Address', type: 'text', required: true },
      { id: 'phone', label: 'Recipient Phone', placeholder: '+880 1XXXXXXXXX', type: 'text', required: true }
    ]
  },
  {
    id: 'acc-steelseries-arctis',
    name: 'SteelSeries Arctis Nova Pro Wireless Headset',
    slug: 'steelseries-arctis-nova-pro-wireless',
    category: 'accessories',
    productType: 'Gaming Accessories & Gadgets',
    description: 'Almighty Audio with high-fidelity drivers, active noise cancellation, and hot-swappable dual battery system for non-stop wireless gaming across PC and PS5 simultaneously.',
    price: 39500,
    originalPrice: 44000,
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
    badge: 'PRO AUDIO',
    instantDelivery: false,
    requiredFields: [
      { id: 'address', label: 'Courier Address', placeholder: 'Address Details', type: 'text', required: true }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Tanvir Hossain',
    gamerTag: 'ViperX_BD',
    game: 'Valorant AP',
    comment: 'ReiKai Arcade delivered my 5,350 VP in literally 8 seconds after bKash verification! No waiting, no manual screenshot nonsense like other pages. Total game changer.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop',
    verified: true
  },
  {
    id: '2',
    name: 'Samiur Rahman',
    gamerTag: 'GhostNinja_77',
    game: 'PlayStation 5',
    comment: 'Pre-ordered GTA VI and got my PS Plus Deluxe 1-year code instantly. The website design is out of this world, feels like a futuristic cyber arcade. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    verified: true
  },
  {
    id: '3',
    name: 'Nafis Ahmed',
    gamerTag: 'Kenshi_Ronin',
    game: 'MLBB Mythic',
    comment: 'Weekly Diamond Pass top-up is always so smooth here. Automated SSLCOMMERZ checkout worked flawlessly on mobile. Customer support AI answered my questions right away.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    verified: true
  }
];

export const FAQS = [
  {
    question: 'How fast is the digital game top-up delivery?',
    answer: 'Top-ups are 100% automated via direct supplier API connections. Once your payment is verified via SSLCOMMERZ (bKash, Nagad, Rocket, or Card), diamonds, points, or currency appear in your account within 5 to 30 seconds!'
  },
  {
    question: 'Are payments secure on ReiKai Arcade?',
    answer: 'Yes! We use bank-grade 256-bit SSL encryption integrated with Bangladesh\'s leading licensed payment gateway SSLCOMMERZ. We do not store any card numbers or PINs on our servers.'
  },
  {
    question: 'What happens if my Player ID or Server is entered incorrectly?',
    answer: 'Our system validates format patterns before dispatching orders. If an invalid ID is detected or an API timeout occurs, the order moves to our 24/7 manual review queue where our team will assist you immediately, or issue an instant refund.'
  },
  {
    question: 'Can I pre-order upcoming titles like GTA VI and FC 27?',
    answer: 'Absolutely! Our pre-order system guarantees launch day digital keys or physical collector packages with exclusive bonus in-game cosmetics and official launch discount rates.'
  },
  {
    question: 'Can I redeem codes on different regions?',
    answer: 'Each digital gift card and subscription displays the region tag (US, Global, Asia, etc.) prominently. Ensure you pick the region that matches your gaming account before checkout.'
  }
];
