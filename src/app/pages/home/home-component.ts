import { Component, computed, inject, Input, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleLink } from '../../../locale/locale.link';
import { UserContext } from '../../user.context';
import { PATH } from '../../app.paths';
import { TranslatePipe } from '../../../locale/translate.pipe';

@Component({
  selector: 'app-home-component',
  imports: [LocaleLink, RouterLink, TranslatePipe],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
  standalone: true,
})
export class HomeComponent {
  @Input() resolveFoo?: string; // My resolved data
  @Input() isSomething?: boolean; // true
  @Input() todoId?: string; // 1
  @Input() searchTerm?: string; // angular
  @Input() locale?: string; // angular

  protected readonly message = 'This is a home component';
  protected readonly PATH = PATH;
  constructor(public userCtx: UserContext) {}

  getMessage = computed<string>(
    () => `Message: ${this.message}, Input: ${''} ${this.userCtx.user()}`
  );
}
