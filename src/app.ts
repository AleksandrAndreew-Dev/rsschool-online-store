
type Path = '#/' | '#/about' | '#/cart';
type RouteListener = (path: Path) => void;

let router: Router | null = null;

class Router {
  public routes: Path[];
  private currentPath: Path;
  private listeners: RouteListener[] = [];

  constructor() {
    this.routes = ['#/', '#/about', '#/cart'];

    const initialHash = window.location.hash;
    const nextPath = this.normalizePath(initialHash);
    this.currentPath = nextPath;

    if (initialHash !== nextPath) {
      window.location.hash = nextPath;
    }

    window.addEventListener('hashchange', () => {
      const initialHash = window.location.hash;
      const nextPath = this.normalizePath(initialHash);
      if (initialHash !== nextPath) {
        window.location.hash = nextPath;
        return;
      }
      if (this.currentPath === nextPath) {
        return;
      }
      this.currentPath = nextPath;
      this.notify(nextPath);
    });
  }
  public get getCurrentPath() {
    return this.currentPath;
  }

  public navigate(path: Path) {
    if (!this.validatePath(path)) {
      return;
    }

    if (this.currentPath === path) {
      return;
    }
    this.currentPath = path;

    window.location.hash = path;
    this.notify(path);
  }

  validatePath(path: string): path is Path {
    return this.routes.some((route) => route === path);
  }

  normalizePath(hash: string): Path {
    if (!hash || hash === '#/') {
      return '#/';
    }
    if (this.validatePath(hash)) return hash;

    return '#/';
  }
  private notify(path: Path) {
    this.listeners.forEach((listener) => listener(path));
  }

  onRouteChange(callback: RouteListener) {
    this.listeners.push(callback);
  }
}

export function navigate(path: Path) {
  router?.navigate(path);
}
export function onRouteChange(callback: RouteListener) {
  router?.onRouteChange(callback);
}
export function getCurrentPath() {
  return router?.getCurrentPath ?? '#/';
}

import { Header } from './components/header';
import { Footer } from './components/footer';


export function initRouter() {
  const app = document.getElementById('app');
  if (!app) return;

  router = new Router();


  app.append(Header());
  app.append(Footer());

}
