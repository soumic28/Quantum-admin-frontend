export interface Product2 {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  discountPercent: number;
  stock: number;
  info?: string[];
  brand: string;
  images: string[];
  category: string;
}

export interface ProductInfo {
  key: string;
  value: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  info: ProductInfo[];
  createdAt: string;
  rating: any[];
  discountPrice: number;
}
