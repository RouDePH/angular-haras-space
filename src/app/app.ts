import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LocaleService } from '../locale/locale.service';
import { filter } from 'rxjs';
import { localeConfig } from '../locale/locale.config';
import { LocaleSwitch } from './locale-switch/locale-switch';

@Component({
  selector: 'app-root',
  template: `<router-outlet /> <app-locale-switch />`,
  imports: [RouterOutlet, LocaleSwitch],
})
export class AppComponent {
  private router = inject(Router);
  constructor(private langService: LocaleService) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url.split('/');
        const locale = url[1] || localeConfig.default;
        this.langService.setLang(locale);
      });
  }
}
