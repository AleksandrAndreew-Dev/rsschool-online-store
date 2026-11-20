import rawProducts from './products.json' with { type: 'json' };

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  form?: string;
  dosage?: string;
  manufacturer?: string;
};

export const products: Product[] = rawProducts;
