import { Component, computed, inject, Input, input, OnInit, signal } from '@angular/core';
import { useForm } from '../../../shared/utils/use-form';
import { Validators } from '@angular/forms';
import { FormProviderComponent } from '../../../shared/utils/form-provider.component';
import { InputFieldComponent } from '../../../shared/utils/input-field.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-test-component',
  imports: [FormProviderComponent, InputFieldComponent, JsonPipe],
  template: `
    <div class="form-provider">
      <app-form-provider [form]="form" [onSubmit]="onSubmit">
        <app-input-field name="email" label="Email" placeholder="Email" />

        <br />

        <div>
          <p>isDirty: {{ form.fields.email.isDirty() }}</p>
          <p>isPristine: {{ form.fields.email.isPristine() }}</p>
          <p>isTouched: {{ form.fields.email.isTouched() }}</p>
          <p>isValid: {{ form.fields.email.isValid() }}</p>
          <p>errors: {{ form.fields.email.errors() | json }}</p>
        </div>
        <br />
        <br />

        <app-input-field
          name="password"
          label="Password"
          [type]="isPasswordVisible() ? 'text' : 'password'"
          placeholder="Password"
          helperText="Helper Text"
        >
          <ng-template #iconRight>
            @if(isPasswordVisible()){
            <svg
              xmlns="http://www.w3.org/2000/svg"
              (click)="togglePasswordVisibility()"
              class="clear-btn"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="0.1"
            >
              <path
                fill="currentColor"
                d="M4.71 3.29a1 1 0 0 0-1.42 1.42l5.63 5.63a3.5 3.5 0 0 0 4.74 4.74l5.63 5.63a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM12 13.5a1.5 1.5 0 0 1-1.5-1.5s0-.05 0-.07l1.56 1.56Z"
              />
              <path
                fill="currentColor"
                d="M12.22 17c-4.3.1-7.12-3.59-8-5a13.7 13.7 0 0 1 2.24-2.72L5 7.87a15.9 15.9 0 0 0-2.87 3.63a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.5 9.5 0 0 0 3.23-.67l-1.58-1.58a7.7 7.7 0 0 1-1.7.25m9.65-5.5c-.64-1.11-4.17-6.68-10.14-6.5a9.5 9.5 0 0 0-3.23.67l1.58 1.58a7.7 7.7 0 0 1 1.7-.25c4.29-.11 7.11 3.59 8 5a13.7 13.7 0 0 1-2.29 2.72L19 16.13a15.9 15.9 0 0 0 2.91-3.63a1 1 0 0 0-.04-1"
              />
            </svg>
            }@else {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              (click)="togglePasswordVisibility()"
              class="clear-btn"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="0.1"
            >
              <path
                fill="currentColor"
                d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5c-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1M12.22 17c-4.31.1-7.12-3.59-8-5c1-1.61 3.61-4.9 7.61-5c4.29-.11 7.11 3.59 8 5c-1.03 1.61-3.61 4.9-7.61 5"
              />
              <path
                fill="currentColor"
                d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5m0 5a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5"
              />
            </svg>
            }
          </ng-template>
        </app-input-field>

        <br />
        <div>
          <p>isDirty: {{ form.fields.password.isDirty() }}</p>
          <p>isPristine: {{ form.fields.password.isPristine() }}</p>
          <p>isTouched: {{ form.fields.password.isTouched() }}</p>
          <p>isValid: {{ form.fields.password.isValid() }}</p>
          <p>errors: {{ form.fields.password.errors() | json }}</p>
        </div>
        <br />
        <br />
          asdlkansdjkbasjd
  adsf
  asdfasdf
  asd
  fasdf
  asdfasdfsdf
    asdlkansdjkbasjd
  adsf
  asdfasdf
  asd
  fasdf
  asdfasdfsdf
    asdlkansdjkbasjd
  adsf
  asdfasdf
  asd
  fasdf
  asdfasdfsdf
  

        <button type="submit" [disabled]="form.state.isSubmitting()">Submit</button>
      </app-form-provider>

      <div>
        <p>isDirty: {{ form.state.isDirty() }}</p>
        <p>isPristine: {{ form.state.isPristine() }}</p>
        <p>isSubmitting: {{ form.state.isSubmitting() }}</p>
        <p>isTouched: {{ form.state.isTouched() }}</p>
        <p>isValid: {{ form.state.isValid() }}</p>
      </div>
    </div>
  `,
  styleUrl: './test-component.scss',
  standalone: true,
})
export class TestComponent {
  isPasswordVisible = signal(false);
  togglePasswordVisibility = () => this.isPasswordVisible.update((val) => !val);

  form = useForm<{ email: string; password: string }>({
    initialValues: { email: '', password: '' },
    validators: {
      email: [Validators.required, Validators.email],
      password: [Validators.required, Validators.minLength(6)],
    },
  });

  onClick() {
    this.form.fields.password.resetValue();
  }

  async onSubmit({ password, email }: { email: string; password: string }) {
    console.log('Submitting started...');
    // ждем 10 секунд
    await new Promise((resolve) => setTimeout(resolve, 10_000));
    console.log('Submit from context form:', password, email);
  }
}
