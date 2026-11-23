import { Header } from './components/header';
import { Footer } from './components/footer';
import { createEl } from './utils/createElement';
import { initRouter, getCurrentPath, onRouteChange } from './router';
import type { Path } from './router';

let outlet: HTMLElement | null = null;

export function renderOutlet(component: HTMLElement): void {
  if (!outlet) return;
  outlet.replaceChildren(component);
}

export function initApp(onRoute?: (path: Path) => void) {
  const app = document.getElementById('app');
  if (!app) return;

  outlet = createEl({ tag: 'main', className: 'outlet' });
  app.append(Header(), outlet, Footer());

  initRouter();

  if (onRoute) {
    onRoute(getCurrentPath());
    onRouteChange(onRoute);
  }
}
