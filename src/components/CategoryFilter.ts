import { ALL_CATEGORIES_VALUE, getCategories } from '../utils/catalog/catalog-filters.ts';

import type { Product } from '../data/products.ts';
import { createEl } from '../utils/createElement.ts';

export interface CategoryFilterProps {
  products: readonly Product[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export function createCategoryFilter({
  products,
  selectedCategory = ALL_CATEGORIES_VALUE,
  onChange,
}: CategoryFilterProps): HTMLElement {
  const wrapper = createEl({ tag: 'div', className: 'catalog-filter' });
  const label = createEl({
    tag: 'label',
    className: 'catalog-filter__label',
  }) as HTMLLabelElement;

  label.htmlFor = 'catalog-filter-select';
  label.textContent = 'Категория';

  const select = createEl({
    tag: 'select',
    className: 'catalog-filter__select',
  }) as HTMLSelectElement;
  select.id = 'catalog-filter-select';

  const allOption = createEl({
    tag: 'option',
    className: 'catalog-filter__option',
  }) as HTMLOptionElement;
  allOption.value = ALL_CATEGORIES_VALUE;
  allOption.textContent = 'Все категории';
  select.append(allOption);

  const categories = getCategories(products);
  for (const category of categories) {
    const option = createEl({
      tag: 'option',
      className: 'catalog-filter__option',
    }) as HTMLOptionElement;
    option.value = category;
    option.textContent = category;
    select.append(option);
  }
  const normalizedSelected = selectedCategory.toLowerCase().trim();
  const normalizeAll = ALL_CATEGORIES_VALUE.toLowerCase().trim();

  const isAll = !normalizedSelected || normalizedSelected === normalizeAll;
  const isValidCategory = categories.includes(normalizedSelected);

  select.value = isAll
    ? ALL_CATEGORIES_VALUE
    : isValidCategory
      ? normalizedSelected
      : ALL_CATEGORIES_VALUE;

  select.addEventListener('change', () => {
    onChange(
      select.value === ALL_CATEGORIES_VALUE ? ALL_CATEGORIES_VALUE : select.value.toLowerCase()
    );
  });
  wrapper.append(label, select);
  return wrapper;
}
