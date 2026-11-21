import type { Product } from '../data/products';
import { createEl } from '../utils/createElement.ts';

export function filterProductsByName(products: Product[], query: string) {
  const normalizeQuery = query.toLowerCase().trim();
  if (!normalizeQuery) return products;
  return products.filter((product) => product.name.toLowerCase().includes(normalizeQuery));
}

export interface SearchInputOptions {
  value?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function createSearchInput({
  value = '',
  placeholder = 'Поиск лекарств и товаров по названию...',
  onSearch,
}: SearchInputOptions): HTMLElement {
  const wrapper = createEl({
    tag: 'div',
    className: 'catalog-search',
  });
  const label = createEl({
    tag: 'label',
    className: 'catalog-search__label',
  }) as HTMLLabelElement;
  label.htmlFor = 'catalog-search-input';
  label.textContent = 'Поиск по названию';

  const input = createEl({
    tag: 'input',
    className: 'catalog-search__input',
  }) as HTMLInputElement;

  input.id = 'catalog-search-input';
  input.type = 'search';
  input.value = value;
  input.placeholder = placeholder;
  input.autocomplete = 'off';

  input.addEventListener('input', () => {
    onSearch(input.value);
  });

  wrapper.append(label, input);
  return wrapper;
}
