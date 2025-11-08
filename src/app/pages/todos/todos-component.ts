import { Component, computed, inject, Input, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleLink } from '../../../locale/locale.link';
import { UserContext } from '../../user.context';

@Component({
  selector: 'app-todos-component',
  imports: [LocaleLink, RouterLink],
  templateUrl: './todos-component.html',
  styleUrl: './todos-component.scss',
  standalone: true,
})
export class TodosComponent {

  @Input() resolveFoo?: string; // My resolved data
  @Input() isSomething?: boolean; // true
  @Input() todoId?: string; // 1
  @Input() searchTerm?: string; // angular
  @Input() locale?: string; // angular

  protected readonly message = 'This is a todos component';

  constructor(public userCtx: UserContext) {}

  getMessage = computed<string>(
    () => `Message: ${this.message}, Input: ${''} ${this.userCtx.user()}`
  );
}
