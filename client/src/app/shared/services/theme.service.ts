import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark = signal<boolean>(false);

  constructor() {
    // Check local storage or system preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved) {
      this.isDark.set(saved === 'dark');
    } else {
      this.isDark.set(prefersDark);
    }

    // Apply theme whenever signal changes
    effect(() => {
      const isDark = this.isDark();
      document.body.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  toggleTheme(isDark: boolean) {
    this.isDark.set(isDark);
  }
}