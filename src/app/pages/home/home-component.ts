import { Component, computed, inject, Input, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleLink } from '../../../locale/locale.link';
import { UserContext } from '../../user.context';
import { PATH } from '../../app.paths';
import { TranslatePipe } from '../../../locale/translate.pipe';
import { JsonPipe } from '@angular/common';
import { PushNotificationService } from '../../notifications.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  imports: [LocaleLink, RouterLink, TranslatePipe, ReactiveFormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
  standalone: true,
})
export class HomeComponent {
  @Input() resolveFoo?: string; // My resolved data
  @Input() isSomething?: boolean; // true
  @Input() todoId?: string; // 1
  @Input() searchTerm?: string; // angular
  @Input() locale?: string; // angular

  title = new FormControl('Hello!');
  body = new FormControl('This is a test notification!');
  url = new FormControl('/');

  protected readonly message = 'This is a home component';
  protected readonly PATH = PATH;
  constructor(public userCtx: UserContext, private pushService: PushNotificationService) {}

  subscribe() {
    this.pushService.register();
  }

  send() {
    this.pushService.notify(this.title.value!, this.body.value!, this.url.value!);
  }

  getMessage = computed<string>(
    () => `Message: ${this.message}, Input: ${JSON.stringify(this.userCtx.user())}`
  );
}
