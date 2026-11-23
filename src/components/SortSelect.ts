import { createEl } from '../utils/createElement.ts';
import type { SortOrder } from '../utils/catalog/catalog-sort.ts';

export interface SortSelectOptions {
  value?: SortOrder;
  onChange: (value: SortOrder) => void;
}

const LABELS: Record<SortOrder, string> = {
  default: 'По умолчанию',
  'price-asc': 'По цене по возрастанию',
  'price-desc': 'По цене по убыванию',
};
export function createSortSelect({ value = 'default', onChange }: SortSelectOptions): HTMLElement {
  const wrapper = createEl({
    tag: 'div',
    className: 'catalog-filter',
  });

  const label = createEl({
    tag: 'label',
    className: 'sort-select__label',
    text: 'Сортировать по:',
    attrs: { for: 'catalog-sort-select' },
  }) as HTMLLabelElement;

  const select = createEl({
    tag: 'select',
    className: 'catalog-filter__select',
    attrs: { id: 'catalog-sort-select' },
  }) as HTMLSelectElement;

  for (const [order, text] of Object.entries(LABELS)) {
    const option = createEl({
      tag: 'option',
      className: 'catalog-filter__option',
      text,
      attrs: { value: order },
    }) as HTMLOptionElement;
    select.append(option);
  }
  select.value = value;
  select.addEventListener('change', () => {
    onChange(select.value as SortOrder);
  });
  wrapper.append(label, select);
  return wrapper;
}
