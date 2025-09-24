import { Component, computed, Input, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleLink } from '../../../locale/locale.link';
import { PATH } from '../../app.paths';

@Component({
  selector: 'app-404-component',
  imports: [RouterLink, LocaleLink],
  templateUrl: './404-component.html',
  styleUrl: './404-component.css',
  standalone: true,
})
export class NotFoundComponent {
  @Input() resolveFoo?: string; // My resolved data
  @Input() isSomething?: boolean; // true
  @Input() todoId?: string; // 1
  @Input() searchTerm?: string; // angular
  @Input() locale?: string; // angular

  constructor(){}

  protected readonly message = 'PAGE NOT FOUND';
  protected readonly PATH = PATH;

  hasUnsavedChanges = () => true

  getMessage = computed<string>(() => `Message: ${this.message}`);
}
