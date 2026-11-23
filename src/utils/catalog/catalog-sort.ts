import type { Product } from '../../data/products.ts';

export type SortOrder = 'default' | 'price-asc' | 'price-desc';

export function sortProducts(products: readonly Product[], order: SortOrder): Product[] {
  const result = [...products];

  if (order === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (order === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}
