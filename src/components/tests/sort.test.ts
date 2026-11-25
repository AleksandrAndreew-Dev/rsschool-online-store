import { describe, it, expect } from 'vitest';
import { sortProducts } from '../../utils/catalog/catalog-sort.ts';
import type { Product } from '../../data/products.ts';

const makeProduct = (id: string, price: number): Product => {
  return {
    id,
    name: `Product: ${id}`,
    category: 'Лексредства',
    price,
  };
};

describe('sortProducts', () => {
  const products = [makeProduct('1', 100), makeProduct('2', 5), makeProduct('3', 50)];
  it('prise-asc sorts ascending', () => {
    const sorted = sortProducts(products, 'price-asc');
    expect(sorted.map((p) => p.price)).toEqual([5, 50, 100]);
  });
  it('prise-desc sorts descending', () => {
    const sorted = sortProducts(products, 'price-desc');
    expect(sorted.map((p) => p.price)).toEqual([100, 50, 5]);
  });
  it('default does not change order', () => {
    const sorted = sortProducts(products, 'default');
    expect(sorted.map((p) => p.price)).toEqual([100, 5, 50]);
  });
  it('does not mutate the original array', () => {
    const before = products.map((p) => p.price);
    sortProducts(products, 'price-asc');
    expect(products.map((p) => p.price)).toEqual(before);
  });
  it('handles empty array', () => {
    const sorted = sortProducts([], 'price-asc');
    expect(sorted).toEqual([]);
  });
  it('handles equal prices without breaking', () => {
    const equal = [makeProduct('1', 100), makeProduct('2', 100)];
    const sorted = sortProducts(equal, 'price-asc');
    expect(sorted.length).toBe(2);
    expect(sorted.map((p) => p.price)).toEqual([100, 100]);
  });
});
