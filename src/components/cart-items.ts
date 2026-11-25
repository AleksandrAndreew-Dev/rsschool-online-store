import type { Product } from '../data/products';
import '../styles/cart-items.css';
import { createEl } from '../utils/createElement';

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export function CartItemsList(items: CartItem[]): HTMLElement {
  if (items.length === 0) {
    return createEl({ tag: 'p', className: 'cart-items__empty', text: 'Корзина пуста' });
  }
  const list = createEl({ tag: 'ul', className: 'cart-items' });
  items.forEach((item) => {
    const listItem = createEl({
      tag: 'li',
      className: 'cart-item',
      attrs: { 'data-id': item.product.id },
      parent: list,
    });

    createEl({
      tag: 'h3',
      className: 'cart-item__title',
      text: item.product.name,
      parent: listItem,
    });

    createEl({
      tag: 'p',
      className: 'cart-item__price',
      text: `${item.product.price} BYN`,
      parent: listItem,
    });

    createEl({
      tag: 'span',
      className: 'cart-item__quantity',
      text: `${item.quantity} шт.`,
      parent: listItem,
    });

    createEl({
      tag: 'p',
      className: 'cart-item__subtotal',
      text: `${item.subtotal} BYN`,
      parent: listItem,
    });
  });
  return list;
}
