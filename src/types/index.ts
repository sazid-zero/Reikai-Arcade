export type ProductCategory = 
  | 'top-up'
  | 'subscriptions'
  | 'console-games'
  | 'gift-cards'
  | 'accessories';

export type ProductType = 
  | 'Game Top-Up'
  | 'Gift Cards'
  | 'Subscriptions'
  | 'Console Games'
  | 'Digital Products'
  | 'Gaming Accessories & Gadgets';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  productType: ProductType;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  requiredFields?: Array<{
    id: string;
    label: string;
    placeholder: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
    required: boolean;
  }>;
  variants?: ProductVariant[];
  supplier?: string;
  instantDelivery: boolean;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  customerInputs?: Record<string, string>;
}

export interface TopUpGame {
  id: string;
  name: string;
  publisher: string;
  image: string;
  accentColor: string;
  currencyName: string;
  fields: Array<{
    id: string;
    label: string;
    placeholder: string;
    helperText?: string;
    required: boolean;
    options?: string[];
  }>;
  packages: Array<{
    id: string;
    amount: string;
    bonus?: string;
    price: number;
    originalPrice?: number;
    popular?: boolean;
  }>;
}
