import { Component } from '@angular/core';
import { LocaleService } from '../../locale/locale.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-locale-switch',
  imports: [RouterLink],
  templateUrl: './locale-switch.html',
  styleUrl: './locale-switch.css',
  standalone: true
})
export class LocaleSwitch {
  protected locales: string[];
  protected currentPath: string[] = [];
  private sub: Subscription;

  constructor(
    private readonly localeService: LocaleService,
    private readonly router: Router
  ) {
    this.locales = localeService.locales;

    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const segments = this.router.url.split('/').filter(Boolean);
      this.currentPath = segments.slice(1);
    });


    const segments = this.router.url.split('/').filter(Boolean);
    this.currentPath = segments.slice(1);
  }

  getRouterLink(locale: string): any[] {
    return ['/', locale, ...this.currentPath];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
