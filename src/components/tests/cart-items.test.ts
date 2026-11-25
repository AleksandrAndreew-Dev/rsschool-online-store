import { describe, it, expect, vi } from 'vitest';
import { CartItemsList } from '../cart-items';
import type { CartItem } from '../cart-items';

const mockItems: CartItem[] = [
  {
    product: { id: '1', name: 'Товар 1', category: 'Категория', price: 10 },
    quantity: 1,
    subtotal: 10,
  },
  {
    product: { id: '2', name: 'Товар 2', category: 'Категория', price: 20 },
    quantity: 2,
    subtotal: 40,
  },
];

describe('CartItemsList', () => {
  it('отображает сообщение «Корзина пуста», если список товаров пуст', () => {
    const list = CartItemsList({
      items: [],
      onIncrease: () => {},
      onDecrease: () => {},
      onRemove: () => {},
    });
    expect(list.textContent).toContain('Корзина пуста');
  });

  it('блокирует кнопку «−» при количестве товара равном 1', () => {
    const list = CartItemsList({
      items: mockItems,
      onIncrease: () => {},
      onDecrease: () => {},
      onRemove: () => {},
    });
    const decreaseBtns = list.querySelectorAll<HTMLButtonElement>('.cart-item__btn--decrease');
    expect(decreaseBtns[0].disabled).toBe(true);
    expect(decreaseBtns[1].disabled).toBe(false);
  });

  it('вызывает onIncrease и onDecrease с ID товара при клике на «+» и «−»', () => {
    const onIncrease = vi.fn();
    const onDecrease = vi.fn();
    const list = CartItemsList({ items: mockItems, onIncrease, onDecrease, onRemove: () => {} });
    const increaseBtn = list.querySelector<HTMLButtonElement>('.cart-item__btn--increase');
    increaseBtn?.click();
    const secondDecreaseBtn = list.querySelectorAll<HTMLButtonElement>(
      '.cart-item__btn--decrease'
    )[1];
    secondDecreaseBtn?.click();
    expect(onIncrease).toHaveBeenCalledWith('1');
    expect(onDecrease).toHaveBeenCalledWith('2');
  });

  it('вызывает onRemove с ID товара при клике на кнопку «Удалить»', () => {
    const onRemove = vi.fn();
    const list = CartItemsList({
      items: mockItems,
      onIncrease: () => {},
      onDecrease: () => {},
      onRemove,
    });
    const removeBtn = list.querySelector<HTMLButtonElement>('.cart-item__remove');
    removeBtn?.click();
    expect(onRemove).toHaveBeenCalledWith('1');
  });
});
