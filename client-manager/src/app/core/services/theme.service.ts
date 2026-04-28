import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(localStorage.getItem('darkMode') === 'true');

  constructor() {
    // Apply theme on service initialization
    this.applyTheme(this.isDarkMode());

    // Automatically update body class and localStorage when signal changes
    effect(() => {
      const dark = this.isDarkMode();
      this.applyTheme(dark);
      localStorage.setItem('darkMode', String(dark));
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update(dark => !dark);
  }

  private applyTheme(dark: boolean) {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
