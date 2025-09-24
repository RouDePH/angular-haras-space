import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { localeConfig } from './locale.config';

type Translations = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class LocaleService {
  currentLang: string = localeConfig.default;
  private translations$ = new BehaviorSubject<Translations>({});
  private loadedLang = '';

  setLang(lang: string) {
    if (lang === this.loadedLang) {
      this.currentLang = lang;
      return;
    }
    this.currentLang = lang;
    import(`./locales/${lang}.json`)
      .then((module) => {
        console.log(module.default);
        
        this.translations$.next(module.default || module);
        this.loadedLang = lang;
      })
      .catch(() => {
        this.translations$.next({});
        this.loadedLang = lang;
      });
  }

  getTranslations(): Observable<Translations> {
    return this.translations$.asObservable();
  }

  translate(key: string): string {
    const translations = this.translations$.getValue();
    return translations[key] || key;
  }
}