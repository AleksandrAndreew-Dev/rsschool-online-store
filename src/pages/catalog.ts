import { createEl } from '../utils/createElement.ts';
import { products } from '../data/products.ts';
import type { Product } from '../data/products.ts';

// import {ProductCart} from '../components/product-card.ts'

// Временный мок на время разработки до подключения KAN-05
const createProductCardMock = (
  product: Product,
  onAdd: (product: Product) => void
): HTMLElement => {
  const card = createEl({ tag: 'article', className: 'card' });

  const title = createEl({ tag: 'h2', className: 'card__title' });
  title.textContent = product.name;

  const button = createEl({ tag: 'button', className: 'card__add-btn' });
  button.textContent = 'В корзину';
  button.addEventListener('click', () => onAdd(product));

  card.append(title, button);
  return card;
};

export interface CatalogPageProps {
  onAddToCart: (product: Product) => void;
  items?: Product[];
}

export function renderCatalogGrid(
  container: HTMLElement,
  items: Product[],
  onAddToCart: (product: Product) => void
): void {
  container.replaceChildren(...items.map((product) => createProductCardMock(product, onAddToCart)));
}

export function CatalogPage({ onAddToCart, items = products }: CatalogPageProps): HTMLElement {
  const page = createEl({
    tag: 'section',
    className: 'catalog-page',
  });
  const title = createEl({
    tag: 'h1',
    className: 'catalog-page__title',
  });
  title.textContent = 'Каталог';
  const grid = createEl({
    tag: 'div',
    className: 'catalog-page__grid',
  });

  renderCatalogGrid(grid, items, onAddToCart);
  page.append(title, grid);
  return page;
}
