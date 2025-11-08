import { Injectable, effect, signal, computed } from '@angular/core';
import { localeConfig } from './locale.config';

type Translations = Record<string, any>;
type Params = Record<string, string | number>;

@Injectable({ providedIn: 'root' })
export class LocaleService {
  /** 🔹 Текущий язык */
  readonly currentLang = signal(localeConfig.default);

  /** 🔹 Список доступных языков */
  readonly locales = localeConfig.locales;

  /** 🔹 Загруженные переводы */
  readonly translations = signal<Translations>({});

  /** 🔹 Последний успешно загруженный язык */
  private loadedLang = '';

  constructor() {
    // Автоматическая загрузка при смене языка
    effect(() => {
      const lang = this.currentLang();
      this.loadTranslations(lang);
    });
  }

  /** 🔹 Установка языка */
  setLang(lang: string) {
    if (lang !== this.currentLang()) {
      this.currentLang.set(lang);
    }
  }

  /** 🔹 Асинхронная подгрузка JSON-файла */
  private async loadTranslations(lang: string) {
    if (lang === this.loadedLang) return;

    try {
      const module = await import(`./locales/${lang}.json`);
      this.translations.set(module.default || module);
      this.loadedLang = lang;
    } catch {
      console.warn(`[LocaleService] Failed to load translations for "${lang}"`);
      this.translations.set({});
      this.loadedLang = lang;
    }
  }

  /** 🔹 Получить текст перевода */
  translate(key: string, params?: Params): string {
    const dict = this.translations();
    const text = this.resolveKey(dict, key) || key;
    return this.interpolate(text, params);
  }

  /** 🔹 Получить реактивную функцию перевода (для шаблонов) */
  readonly t = computed(() => {
    const dict = this.translations();
    return (key: string, params?: Params) => {
      const text = this.resolveKey(dict, key) || key;
      return this.interpolate(text, params);
    };
  });

  /** 🔹 Вспомогательные методы */
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
}
