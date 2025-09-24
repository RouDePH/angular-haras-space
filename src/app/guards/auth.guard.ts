import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { localeConfig } from '../../locale/locale.config';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router: Router = inject(Router);
  const locale = route.params['locale'] || route.paramMap.get('locale') || localeConfig.default;
  return Math.random() > 0.5 ? true : router.createUrlTree([`/${locale}/403`]);
};
