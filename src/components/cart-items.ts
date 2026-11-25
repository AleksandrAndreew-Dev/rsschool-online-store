import type { Product } from '../data/products';
import '../styles/cart-items.css';
import { createEl } from '../utils/createElement';

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface CartItemsListProps {
  items: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartItemsList({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemsListProps): HTMLElement {
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

    const controls = createEl({
      tag: 'div',
      className: 'cart-item__controls',
      parent: listItem,
    });

    const decreaseBtn = createEl({
      tag: 'button',
      className: 'cart-item__btn cart-item__btn--decrease',
      text: '−',
      attrs: { type: 'button', 'aria-label': 'Уменьшить количество' },
      parent: controls,
    }) as HTMLButtonElement;

    if (item.quantity <= 1) {
      decreaseBtn.disabled = true;
    }
    decreaseBtn.addEventListener('click', () => onDecrease(item.product.id));

    createEl({
      tag: 'span',
      className: 'cart-item__quantity',
      text: `${item.quantity} шт.`,
      parent: controls,
    });

    const increaseBtn = createEl({
      tag: 'button',
      className: 'cart-item__btn cart-item__btn--increase',
      text: '+',
      attrs: { type: 'button', 'aria-label': 'Увеличить количество' },
      parent: controls,
    }) as HTMLButtonElement;

    increaseBtn.addEventListener('click', () => onIncrease(item.product.id));

    createEl({
      tag: 'p',
      className: 'cart-item__subtotal',
      text: `${item.subtotal} BYN`,
      parent: listItem,
    });

    const removeBtn = createEl({
      tag: 'button',
      className: 'cart-item__remove',
      text: 'Удалить',
      attrs: { type: 'button', 'aria-label': 'Удалить товар' },
      parent: listItem,
    });

    removeBtn.addEventListener('click', () => onRemove(item.product.id));
  });

  return list;
}
