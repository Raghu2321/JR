// ========================================
// JOB READY — Hash-based SPA Router
// ========================================

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.beforeEach = null;
    window.addEventListener('hashchange', () => this.resolve());
  }

  on(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const app = document.getElementById('app');

    // Find matching route
    let handler = this.routes[hash];
    if (!handler) {
      // Try wildcard/fallback
      handler = this.routes['*'] || this.routes['/'];
    }

    if (handler) {
      if (this.beforeEach) {
        this.beforeEach(hash, this.currentRoute);
      }
      this.currentRoute = hash;

      // Animate transition
      app.style.opacity = '0';
      app.style.transform = 'translateY(4px)';

      setTimeout(() => {
        const content = handler();
        if (typeof content === 'string') {
          app.innerHTML = content;
        }
        app.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        app.style.opacity = '1';
        app.style.transform = 'translateY(0)';

        // Run any post-render hooks
        window.dispatchEvent(new CustomEvent('routeRendered', { detail: { route: hash } }));
      }, 100);
    }
  }

  start() {
    this.resolve();
  }
}
