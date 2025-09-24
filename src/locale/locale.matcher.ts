import { UrlMatchResult, UrlSegment } from '@angular/router';
import { localeConfig } from './locale.config';

export function localeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length > 0) {
    const potentialLocale = segments[0].path;
    if (localeConfig.locales.includes(potentialLocale)) {
      return {
        consumed: [segments[0]],
        posParams: {
          locale: segments[0],
        },
      };
    } else {
      const defaultSegment = new UrlSegment(localeConfig.default, {});
      return {
        consumed: [defaultSegment, ...segments],
        posParams: {
          locale: defaultSegment,
        },
      };
    }
  }
  return null;
}
