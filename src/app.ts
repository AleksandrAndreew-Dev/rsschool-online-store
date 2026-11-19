/**

 */

type Path = '#/' | '#/about' | '#/cart';
type RouteListener = (path: Path) => void;

let router: Router | null = null;

class Router {
  public routes: Path[];
  private currentPath: Path;
  private listeners: RouteListener[] = [];

  constructor() {
    this.routes = ['#/', '#/about', '#/cart'];

    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this.currentPath = this.normalizePath(window.location.hash);
    window.addEventListener('hashchange', () => {
      const nextPath = this.normalizePath(window.location.hash);
      if (this.currentPath === nextPath) {
        return;
      }
      this.currentPath = nextPath;
      this.notify(nextPath);
    });
  }
  get getCurrentPath() {
    return this.currentPath;
  }
  set setCurrentPath(path: Path) {
    this.currentPath = path;
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
    if (typeof path !== 'string') return false;
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
// getCurrentPAth  тоже экспортировать ?
export function navigate(path: Path) {
  router?.navigate(path);
}
export function onRouteChange(callback: RouteListener) {
  router?.onRouteChange(callback);
}
export function getCurrentPath() {
  return router?.getCurrentPath ?? '#/';
}
export function initRouter() {
  const app = document.getElementById('app');
  if (!app) return;

  router = new Router();
}
