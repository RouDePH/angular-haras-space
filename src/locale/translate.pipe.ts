import { Pipe, PipeTransform, inject, computed } from '@angular/core';
import { LocaleService } from './locale.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: true, // теперь может быть pure, Angular сам следит за сигналами
})
export class TranslatePipe implements PipeTransform {
  private readonly locale = inject(LocaleService);

  // реактивное вычисление перевода
  private readonly t = computed(() => this.locale.t());

  transform(key: string, params?: Record<string, string | number>): string {
    const t = this.t();
    return t(key, params);
  }
}
