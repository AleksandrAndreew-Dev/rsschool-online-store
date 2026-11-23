import { describe, it, expect } from 'vitest';
import { filterByPriceRange } from '../price-filter';
import type { Product } from '../../data/products';

const mockProducts: Product[] = [
  { id: '1', name: 'Product 1', category: 'Лекарства', price: 10 },
  { id: '2', name: 'Product 2', category: 'Косметика', price: 20 },
  { id: '3', name: 'Product 3', category: 'Лекарства', price: 30 },
];

describe('filterByPriceRange', () => {
  it('фильтрует по минимальной цене', () => {
    const result = filterByPriceRange(mockProducts, { min: 15 });
    expect(result.map((p) => p.id)).toEqual(['2', '3']);
  });

  it('фильтрует по максимальной цене', () => {
    const result = filterByPriceRange(mockProducts, { max: 25 });
    expect(result.map((p) => p.id)).toEqual(['1', '2']);
  });

  it('фильтрует по диапазону от и до (включая границы)', () => {
    const result = filterByPriceRange(mockProducts, { min: 10, max: 30 });
    expect(result.map((p) => p.id)).toEqual(['1', '2', '3']);
  });

  it('пустые значения не ломают фильтрацию', () => {
    const result = filterByPriceRange(mockProducts, { min: undefined, max: undefined });
    expect(result).toHaveLength(3);
  });

  it('некорректные значения не ломают фильтрацию', () => {
    const result = filterByPriceRange(mockProducts, {
      min: NaN as unknown as number,
      max: Infinity as unknown as number,
    });
    expect(result).toHaveLength(3);
  });
});
