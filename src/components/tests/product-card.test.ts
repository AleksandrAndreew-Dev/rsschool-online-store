import { describe, it, expect, vi } from 'vitest';

import { ProductCard } from '../product-card.ts';
import type { Product } from '../../data/products.ts';

const mockProduct: Product = {
  id: '1',
  name: 'Product 1',
  category: 'Category 1',
  price: 10,
  image: '../images/product1.png',
};

describe('ProductCard', () => {
  it('call onAdd with product when button clicked', () => {
    const onAdd = vi.fn();
    const card = ProductCard(mockProduct, onAdd);
    const button = Array.from(card.querySelectorAll('button')).find((btn) => {
      return btn.textContent?.toLowerCase() === 'в корзину';
    });
    button?.click();
    expect(button).toBeDefined();
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(mockProduct);
  });

  it('render product fields', () => {
    const text = ProductCard(mockProduct, () => {}).textContent ?? '';

    const expectedValues = [mockProduct.name, mockProduct.category, mockProduct.price.toString()];
    expectedValues.forEach((value) => {
      expect(text).toContain(value);
    });
  });

  it("renders product's image", () => {
    const img = ProductCard(mockProduct, () => {}).querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe(mockProduct.image);
    expect(img?.getAttribute('alt')).toBe(mockProduct.name);
  });
});
