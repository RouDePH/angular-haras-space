import { Component, computed, Input, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleLink } from '../../../locale/locale.link';
import { PATH } from '../../app.paths';

@Component({
  selector: 'app-403-component',
  imports: [RouterLink, LocaleLink],
  templateUrl: './403-component.html',
  styleUrl: './403-component.scss',
  standalone: true,
})
export class NotFoundComponent {
  @Input() resolveFoo?: string; // My resolved data
  @Input() isSomething?: boolean; // true
  @Input() todoId?: string; // 1
  @Input() searchTerm?: string; // angular
  @Input() locale?: string; // angular

  constructor(){}

  protected readonly message = 'FORBIDDEN';
  protected readonly PATH = PATH;

  hasUnsavedChanges = () => true

  getMessage = computed<string>(() => `Message: ${this.message}`);
}
