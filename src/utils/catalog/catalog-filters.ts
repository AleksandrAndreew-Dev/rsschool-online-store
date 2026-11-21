import type { Product } from '../../data/products.ts';

export const ALL_CATEGORIES_VALUE = 'Все категории';

function normalizeCategory(category: string): string {
  const trimmed = category.trim();
  if (!trimmed) {
    return '';
  }
  return trimmed.toLowerCase();
}
export function getCategories(products: readonly Product[]): string[] {
  const uniqueCategories = new Set<string>();
  for (const product of products) {
    const normalized = normalizeCategory(product.category);

    if (normalized) {
      uniqueCategories.add(normalized);
    }
  }
  return Array.from(uniqueCategories).sort((a, b) => a.localeCompare(b, 'ru'));
}

export function filterByCategory(
  products: readonly Product[],
  selectedCategory: string
): Product[] {
  if (!selectedCategory || selectedCategory === ALL_CATEGORIES_VALUE) {
    return [...products];
  }
  const normalized = normalizeCategory(selectedCategory);
  return products.filter((product) => normalizeCategory(product.category) === normalized);
}
