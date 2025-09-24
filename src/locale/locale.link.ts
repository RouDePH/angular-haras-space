import { Directive, Input, OnChanges, SimpleChanges, Optional, Self } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from './locale.service';

@Directive({
  selector: '[localeLink]',
  standalone: true,
})
export class LocaleLink implements OnChanges {
  @Input() routerLink!: string | any[];

  constructor(
    private readonly langService: LocaleService,
    @Optional() @Self() private routerLinkDir: RouterLink
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.routerLinkDir && 'routerLink' in changes) {
      const locale = this.langService.currentLang;
      let commands: any[];

      if (typeof this.routerLink === 'string') {
        if (this.routerLink.startsWith('/')) {
          commands = [`/${locale}`, this.routerLink.slice(1)];
        } else {
          commands = [locale, this.routerLink];
        }
      } else if (Array.isArray(this.routerLink)) {
        if (typeof this.routerLink[0] === 'string' && this.routerLink[0].startsWith('/')) {
          const [link, ...links] = this.routerLink;
          commands = [`/${locale}`, link.slice(1), ...links];
        } else {
          commands = [locale, ...this.routerLink];
        }
      } else {
        commands = [locale];
      }

      this.routerLinkDir.routerLink = commands.filter((path) => !!path);
    }
  }
}
