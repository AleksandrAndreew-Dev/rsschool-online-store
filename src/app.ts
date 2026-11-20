import { Header } from './components/header';
import { Footer } from './components/footer';

export function initRouter() {
  const app = document.getElementById('app');
  if (!app) return;

  // const title = document.createElement('h1');
  // title.textContent = 'Hello Pharmacy SPA';
  // app.append(title);

  app.append(Header());
  app.append(Footer());
}
