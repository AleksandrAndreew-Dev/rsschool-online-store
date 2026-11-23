import { createEl } from '../utils/createElement';

import type { Product } from '../data/products.ts';

export function ProductCard(product: Product, onAdd: (product: Product) => void): HTMLElement {
  const card = createEl({
    tag: 'article',
    className: 'card',
  });
  const children: HTMLElement[] = [];

  const img = createEl({
    tag: 'img',
    className: 'card__img',
    attrs: {
      alt: product.name ?? '',
    },
  }) as HTMLImageElement;

  const formLower = (product.form ?? '').toLowerCase();

  if (product.image && product.category === 'Медтехника') {
    img.src = product.image;
  } else if (product.category === 'Лексредства') {
    if (formLower.includes('табл')) {
      img.src = './assets/images/drugs/tablets.jpg';
    } else if (formLower.includes('капс')) {
      img.src = './assets/images/drugs/caps.jpg';
    } else if (product.image) {
      img.src = product.image;
    }
  } else if (product?.category?.includes('БАД')) {
    img.src = './assets/images/bads/bad.jpg';
  } else if (product.image) {
    img.src = product.image;
  }

  if (img.src) {
    children.push(img);
  }

  const category = createEl({
    tag: 'p',
    className: 'card__category',
    text: product.category,
  });

  const name = createEl({
    tag: 'h2',
    className: 'card__title',
    text: product.name,
  });
  children.push(category, name);

  const formText = [product.form, product.dosage].filter(Boolean).join(' ');

  if (formText) {
    const formEl = createEl({
      tag: 'p',
      className: 'card__form',
      text: formText,
    });
    children.push(formEl);
  }

  if (product.description) {
    const description = createEl({
      tag: 'p',
      className: 'card__description',
      text: product?.description || '',
    });
    children.push(description);
  }

  if (product.manufacturer) {
    const manufacturer = createEl({
      tag: 'p',
      className: 'card__manufacturer',
      text: product?.manufacturer || '',
    });

    children.push(manufacturer);
  }

  const price = createEl({
    tag: 'p',
    className: 'card__price',
    text: `${product.price} BYN`,
  });

  const button = createEl({
    tag: 'button',
    className: 'card__button',
    text: 'В корзину',
    attrs: {
      type: 'button',
    },
  });

  button.addEventListener('click', () => onAdd(product));

  children.push(price, button);
  card.append(...children);
  return card;
}
