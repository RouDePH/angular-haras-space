import { Pipe, PipeTransform, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LocaleService } from './locale.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private langService = inject(LocaleService);
  private cdr = inject(ChangeDetectorRef);
  private sub: Subscription;

  constructor() {
    this.sub = this.langService.getTranslations().subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    return this.langService.translate(key);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}