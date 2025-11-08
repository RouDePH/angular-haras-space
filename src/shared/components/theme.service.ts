import { Injectable, Renderer2, RendererFactory2, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>('light');

  private renderer: Renderer2;
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const stored = this.getStoredTheme();
    const initial: ThemeMode = stored ?? (this.mediaQuery.matches ? 'dark' : 'light');
    this.mode.set(initial);

    this.mediaQuery.addEventListener('change', (e) => {
      // if (!this.hasStoredTheme()) {
      //   this.mode.set(e.matches ? 'dark' : 'light');
      // }
      this.storeTheme(e.matches ? 'dark' : 'light');
      this.mode.set(e.matches ? 'dark' : 'light');
    });

    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        const newTheme = event.newValue as ThemeMode;
        if (newTheme !== this.mode()) {
          this.mode.set(newTheme);
        }
      }
    });

    effect(() => {
      const current = this.mode();
      this.applyTheme(current);
      this.storeTheme(current);
    });
  }

  toggle() {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  private applyTheme(theme: ThemeMode) {
    const root = document.documentElement;
    this.renderer.setAttribute(root, 'data-theme', theme);
    this.renderer.setStyle(root, 'color-scheme', theme);
  }

  private storeTheme(theme: ThemeMode) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }

  private getStoredTheme(): ThemeMode | null {
    try {
      return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? null;
    } catch {
      return null;
    }
  }

  // private hasStoredTheme(): boolean {
  //   try {
  //     return localStorage.getItem(STORAGE_KEY) != null;
  //   } catch {
  //     return false;
  //   }
  // }

  clearStorage() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}
