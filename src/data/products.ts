import productsData from './products.json';

export interface Product {
  id: string | number;
  name: string;
  form?: string;
  dosage?: string;
  category: string;
  price: number;
  manufacturer: string;
  description?: string;
  image?: string;
}

export type Products = Product[];

export const products: Products = productsData;
