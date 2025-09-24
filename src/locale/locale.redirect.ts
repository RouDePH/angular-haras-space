import { ActivatedRouteSnapshot } from '@angular/router';
import { localeConfig } from './locale.config';

export const localeRedirect = (redirectData: Pick<ActivatedRouteSnapshot, 'url'>): string => {
  const segments = redirectData.url;
  const locale = segments[0]?.path;
  if (!locale || locale.length === 0) {
    return `/${localeConfig.default}`;
  } else if (localeConfig.locales.includes(locale)) {
    return `/${locale}/404`;
  }
  return `/${localeConfig.default}/404`;
};
