import { createEl } from '../utils/createElement';
import type { Product } from '../data/products';

export interface PriceFilterOptions {
  onChange: (range: { min?: number; max?: number }) => void;
}

export function filterByPriceRange(
  products: Product[],
  { min, max }: { min?: number; max?: number }
): Product[] {
  return products.filter((product) => {
    if (min !== undefined && Number.isFinite(min) && product.price < min) {
      return false;
    }
    if (max !== undefined && Number.isFinite(max) && product.price > max) {
      return false;
    }

    return true;
  });
}

export function createPriceFilter({ onChange }: PriceFilterOptions): HTMLElement {
  const priceFilter = createEl({
    tag: 'div',
    className: 'price-filter',
  });
  const priceFilterTitle = createEl({
    tag: 'span',
    className: 'price-filter__title',
    text: 'Цена',
  });

  const priceInputMin = createEl({
    tag: 'input',
    className: 'price-filter__input',
    attrs: {
      type: 'number',
      min: '0',
      step: 'any',
      value: '',
      placeholder: 'От',
      id: 'price-filter__input-min',
    },
  }) as HTMLInputElement;

  const priceInputMinLabel = createEl({
    tag: 'label',
    className: 'price-filter__label',
    text: 'От',
    attrs: {
      for: 'price-filter__input-min',
    },
  });

  const priceInputMax = createEl({
    tag: 'input',
    className: 'price-filter__input',
    attrs: {
      type: 'number',
      min: '0',
      step: 'any',
      value: '',
      placeholder: 'До',
      id: 'price-filter__input-max',
    },
  }) as HTMLInputElement;

  const priceInputMaxLabel = createEl({
    tag: 'label',
    className: 'price-filter__label',
    text: 'До',
    attrs: {
      for: 'price-filter__input-max',
    },
  });

  const parseValue = (input: HTMLInputElement): number | undefined => {
    const raw = input.value.trim();
    if (raw === '') return undefined;
    const num = Number(raw);
    if (isNaN(num) || !Number.isFinite(num) || num < 0) return undefined;
    return num;
  };

  const onInput = () => {
    onChange({
      min: parseValue(priceInputMin),
      max: parseValue(priceInputMax),
    });
  };
  priceInputMin.addEventListener('input', onInput);
  priceInputMax.addEventListener('input', onInput);

  priceFilter.append(
    priceFilterTitle,
    priceInputMinLabel,
    priceInputMin,
    priceInputMaxLabel,
    priceInputMax
  );

  return priceFilter;
}
