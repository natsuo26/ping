import { Injectable } from '@angular/core';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeAttr = 'data-theme';
  private readonly storageKey = 'app-theme';
  constructor() {}

  setTheme(theme: Theme): void {
    document.body.setAttribute(this.themeAttr, theme);
    localStorage.setItem(this.storageKey, theme);
  }

  toggleTheme(): void {
    const current = this.getCurrentTheme();
    const nextTheme = current === Theme.Dark ? Theme.Light : Theme.Dark;
    this.setTheme(nextTheme);
  }

  getCurrentTheme(): Theme {
    const current = document.body.getAttribute(this.themeAttr) as Theme;
    return current === Theme.Dark ? Theme.Dark : Theme.Light;
  }

  initTheme(): void {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    if (saved === Theme.Dark || saved === Theme.Light) {
      this.setTheme(saved);
    }
  }
}
