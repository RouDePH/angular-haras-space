import { Component, computed, inject, Input, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleLink } from '../../../locale/locale.link';
import { UserContext } from '../../user.context';

@Component({
  selector: 'app-test-component',
  imports: [LocaleLink, RouterLink],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css',
  standalone: true,
})
export class AboutComponent {
  @Input() resolveFoo?: string; // My resolved data
  @Input() isSomething?: boolean; // true
  @Input() todoId?: string; // 1
  @Input() searchTerm?: string; // angular
  @Input() locale?: string; // angular

  protected readonly message = 'This is a about component';
  constructor(public userCtx: UserContext) {}

  hasUnsavedChanges = () => true;

  getMessage = computed<string>(
    () => `Message: ${this.message}, Input: ${''} ${this.userCtx.user()}`
  );
}
