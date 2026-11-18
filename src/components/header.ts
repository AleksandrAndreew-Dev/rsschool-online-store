import { createEl } from '../utils/createElement';

export function Header(): HTMLElement {
  const header = createEl({ tag: 'header', className: 'header' });
  const container = createEl({ tag: 'div', className: 'header_container', parent: header });
  const nav = createEl({
    tag: 'a',
    className: 'header_logo',
    text: 'Novamedika.com',
    attrs: { href: '#/' },
    parent: container,
  });
  createEl({
    tag: 'a',
    className: 'header_link',
    text: 'Каталог',
    attrs: { href: '#/' },
    parent: nav,
  });
  createEl({
    tag: 'a',
    className: 'header__link',
    text: 'О нас',
    attrs: { href: '#/about' },
    parent: nav,
  });
  const cartLink = createEl({
    tag: 'a',
    className: 'header__link header__cart',
    text: 'Корзина ',
    attrs: { href: '#/cart' },
    parent: nav,
  });
  createEl({
    tag: 'span',
    className: 'header_cart-count',
    text: '0',
    attrs: { id: 'cart-count' },
    parent: cartLink,
  });
  return header;
}
