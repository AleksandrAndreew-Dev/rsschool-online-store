import { createEl } from '../utils/createElement';

export function Header(): HTMLElement {
  const header = createEl({ tag: 'header', className: 'header' });
  const container = createEl({ tag: 'div', className: 'header__container', parent: header });
  createEl({
    tag: 'a',
    className: 'header__logo',
    text: 'Novamedika.com',
    attrs: { href: '#/' },
    parent: container,
  });

  const nav = createEl({ tag: 'nav', className: 'header__nav', parent: container });
  const list = createEl({ tag: 'ul', className: 'header__list', parent: nav });

  const catalogItem = createEl({ tag: 'li', className: 'header__item', parent: list });
  createEl({
    tag: 'a',
    className: 'header__link',
    text: 'Каталог',
    attrs: { href: '#/' },
    parent: catalogItem,
  });

  const aboutItem = createEl({ tag: 'li', className: 'header__item', parent: list });
  createEl({
    tag: 'a',
    className: 'header__link',
    text: 'О нас',
    attrs: { href: '#/about' },
    parent: aboutItem,
  });

  const cartItem = createEl({ tag: 'li', className: 'header__item', parent: list });
  const cartLink = createEl({
    tag: 'a',
    className: 'header__link header__cart',
    text: 'Корзина',
    attrs: { href: '#/cart' },
    parent: cartItem,
  });

  createEl({
    tag: 'span',
    className: 'header__cart-count',
    text: '0',
    attrs: { id: 'cart-count' },
    parent: cartLink,
  });
  return header;
}
