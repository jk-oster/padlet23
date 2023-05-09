import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public AVAILABLE_THEMES = ["dark", "halloween", "forest", "wireframe", "luxury", "dracula", "night"];
  constructor() {
  }

  public initTheme() {
    const theme = this.getThemeFromLocalStorage();
    if (theme) {
      this.setTheme(theme);
    } else {
      this.setTheme(this.detectThemePreference());
    }
  }

  public detectThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'wireframe';
  }

  public setTheme(theme: string) {
    const html = document.querySelector('html');
    if (html) {
      html.setAttribute('data-theme', theme);
    }
    this.setThemeToLocalStorage(theme);
  }

  public getCurrentTheme() {
    const html = document.querySelector('html');
    if (html) {
      return html.getAttribute('data-theme');
    }
    return null;
  }

  public getThemeFromLocalStorage() {
    return localStorage.getItem('theme');
  }

  public setThemeToLocalStorage(theme: string) {
    localStorage.setItem('theme', theme);
  }
}
