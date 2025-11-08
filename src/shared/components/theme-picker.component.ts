import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  template: `
    <button (click)="theme.toggle()">
      {{ theme.mode() === 'dark' ? '☀️' : '🌙' }}
    </button>
  `,
})
export class ThemePickerComponent {
  theme = inject(ThemeService);
}
