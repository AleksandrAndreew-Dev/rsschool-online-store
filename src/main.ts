import './styles/main.css';
import './styles/catalog.css';
import { initApp, renderOutlet } from './app';
import { CatalogPage } from './pages/catalog';
import { AboutPage } from './pages/about';
import { CartPage } from './pages/cart';
import type { Path } from './router';



initApp((path: Path) => {
  let component: HTMLElement;

  switch (path) {
    case '#/':
      component = CatalogPage();
      break;
    case '#/about':
      component = AboutPage();
      break;
    case '#/cart':
      component = CartPage();
      break;
    default:
      component = CatalogPage({ onAddToCart: () => {} });
      break;
  }
  renderOutlet(component);
});
