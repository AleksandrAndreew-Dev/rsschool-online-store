import { createEl } from '../utils/createElement';

import type { Product } from '../data/products.ts';

export function ProductCard(product: Product, onAdd: (product: Product) => void): HTMLElement {
  const card = createEl({
    tag: 'div',
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

  if (product.image && product.category === 'Медтехника') {
    img.src = product.image;
  } else if (product.category === 'Лексредства') {
    if (product.form?.includes('табл')) {
      img.src = './assets/images/drugs/tablets.jpg';
    } else if (product?.form?.includes('капс')) {
      img.src = './assets/images/drugs/caps.jpg';
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
  });
  category.textContent = product.category;

  const name = createEl({
    tag: 'h2',
    className: 'card__title',
  });
  name.textContent = product.name;
  children.push(category, name);

  const formText = [product.form, product.dosage].filter(Boolean).join(' ');

  if (formText) {
    const form = createEl({
      tag: 'p',
      className: 'card__form',
    });
    form.textContent = formText;
    children.push(form);
  }

  if (product.description) {
    const description = createEl({
      tag: 'p',
      className: 'card__description',
    });
    description.textContent = product.description;
    children.push(description);
  }

  if (product.manufacturer) {
    const manufacturer = createEl({
      tag: 'p',
      className: 'card__manufacturer',
    });
    manufacturer.textContent = product?.manufacturer || '';
    children.push(manufacturer);
  }

  const price = createEl({
    tag: 'p',
    className: 'card__price',
  });
  price.textContent = `${product.price} BYN`;

  const button = createEl({
    tag: 'button',
    className: 'card__button',
  });

  button.addEventListener('click', () => onAdd(product));
  button.textContent = 'В корзину';
  children.push(price, button);
  card.append(...children);
  return card;
}
