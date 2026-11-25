import { createEl } from '../utils/createElement.ts';
import { products } from '../data/products.ts';
import type { Product } from '../data/products.ts';
import { ProductCard } from '../components/product-card.ts';
import { filterProductsByName, createSearchInput } from '../components/search.ts';
import { ALL_CATEGORIES_VALUE, filterByCategory } from '../utils/catalog/catalog-filters.ts';
import { createCategoryFilter } from '../components/CategoryFilter.ts';
import { createPriceFilter, filterByPriceRange } from '../components/price-filter.ts';
import { createSortSelect } from '../components/SortSelect.ts';
import { sortProducts, type SortOrder } from '../utils/catalog/catalog-sort.ts';

export interface CatalogPageProps {
  onAddToCart?: (product: Product) => void;
  items?: Product[];
}

export function renderCatalogGrid(
  container: HTMLElement,
  items: Product[],
  onAddToCart: (product: Product) => void
): void {
  if (items.length === 0) {
    container.replaceChildren(
      createEl({
        tag: 'p',
        className: 'catalog-page__empty',
        text: 'Ничего не найдено',
      })
    );
    return;
  }
  container.replaceChildren(...items.map((product) => ProductCard(product, onAddToCart)));
}

export function CatalogPage({
  onAddToCart = () => {},
  items = products,
}: CatalogPageProps = {}): HTMLElement {
  const page = createEl({
    tag: 'section',
    className: 'catalog-page',
  });
  const title = createEl({
    tag: 'h1',
    className: 'catalog-page__title',
    text: 'Каталог',
  });
  const filters = createEl({
    tag: 'div',
    className: 'catalog-page__filters',
  });

  const grid = createEl({
    tag: 'div',
    className: 'catalog-page__grid',
  });
  let currentQuery = '';
  let currentCategory = ALL_CATEGORIES_VALUE;
  let currentPrice: { min?: number; max?: number } = {};
  let currentSort: SortOrder = 'default';

  function render(): void {
    let filteredProducts = [...items];
    if (currentQuery) {
      filteredProducts = filterProductsByName(filteredProducts, currentQuery);
    }
    if (currentCategory !== ALL_CATEGORIES_VALUE) {
      filteredProducts = filterByCategory(filteredProducts, currentCategory);
    }
    filteredProducts = filterByPriceRange(filteredProducts, currentPrice);
    filteredProducts = sortProducts(filteredProducts, currentSort);
    renderCatalogGrid(grid, filteredProducts, onAddToCart);
  }

  const search = createSearchInput({
    onSearch: (query) => {
      currentQuery = query;
      render();
    },
  });

  const categoryFilter = createCategoryFilter({
    products: items,
    selectedCategory: currentCategory,
    onChange: (category) => {
      currentCategory = category;
      render();
    },
  });

  const priceFilter = createPriceFilter({
    onChange: (range) => {
      currentPrice = range;
      render();
    },
  });

  const sortSelect = createSortSelect({
    value: currentSort,
    onChange: (order) => {
      currentSort = order;
      render();
    },
  });

  const resetButton = createEl({
    tag: 'button',
    className: 'catalog-page__reset',
    text: 'Сбросить',
    attrs: { type: 'button' },
  });

  resetButton.addEventListener('click', () => {
    currentQuery = '';
    currentCategory = ALL_CATEGORIES_VALUE;
    currentPrice = {};
    currentSort = 'default';

    const searchInput = search.querySelector('#catalog-search-input') as HTMLInputElement;

    if (searchInput) {
      searchInput.value = '';
    }
    const categorySelect = categoryFilter.querySelector(
      '#catalog-filter-select'
    ) as HTMLSelectElement;
    if (categorySelect) {
      categorySelect.value = ALL_CATEGORIES_VALUE;
    }

    const minInput = priceFilter.querySelector('#price-filter__input-min') as HTMLInputElement;
    const maxInput = priceFilter.querySelector('#price-filter__input-max') as HTMLInputElement;
    if (minInput) {
      minInput.value = '';
    }
    if (maxInput) {
      maxInput.value = '';
    }
    const sortSelectEl = sortSelect.querySelector('#catalog-sort-select') as HTMLSelectElement;
    if (sortSelectEl) {
      sortSelectEl.value = 'default';
    }
    render();
  });

  filters.append(search, categoryFilter, priceFilter, sortSelect, resetButton);
  page.append(title, filters, grid);

  render();
  return page;
}
