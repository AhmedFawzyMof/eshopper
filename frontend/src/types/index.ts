export interface Category {
  id: number;
  name: string;
}

export interface Offer {
  id: number;
  image: string;
  category: number;
  offer_description: string;
  title: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  offer: number;
  image: string;
  description: string;
}

export interface Sizes {
  id: number;
  size: string;
}

export interface PriceRange {
  price_range: string;
}

export interface ProductCart {
  product: number;
  quantity: number;
  size: number;
}
