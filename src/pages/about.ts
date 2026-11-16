export function AboutPage(): HTMLElement {
  const section = document.createElement('section');
  section.innerHTML = '<h1>О нас</h1><p>Информация о магазине и команде появится здесь.</p>';
  return section;
}
