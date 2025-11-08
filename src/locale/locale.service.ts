import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { localeConfig } from './locale.config';

type Translations = Record<string, string>;
type Params = Record<string, string | number>;

@Injectable({ providedIn: 'root' })
export class LocaleService {
  public currentLang: string = localeConfig.default;
  public locales: string[] = localeConfig.locales;

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

  private resolveKey(obj: Record<string, any>, path: string): string | undefined {
    return path
      .split('.')
      .reduce<any>((acc, part) => (acc && typeof acc === 'object' ? acc[part] : undefined), obj);
  }

  private interpolate(text: string, params?: Params): string {
    if (!params) return text;
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) =>
      params[key] != null ? String(params[key]) : `{{${key}}}`
    );
  }

  translate(key: string, params?: Params): string {
    const translations = this.translations$.getValue();
    const text = this.resolveKey(translations, key) || key;
    return this.interpolate(text, params);
  }
}
