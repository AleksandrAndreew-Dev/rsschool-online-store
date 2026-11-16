export function CartPage(): HTMLElement {
  const section = document.createElement('section');
  section.innerHTML = '<h1>Корзина</h1><p>Корзина пуста.</p>';
  return section;
}
