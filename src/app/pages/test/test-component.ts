import { Component, computed, inject, Input, input, OnInit } from '@angular/core';
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

        <app-input-field name="password" label="Password" placeholder="Password" />

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
  form = useForm<{ email: string; password: string }>({
    initialValues: { email: '', password: '' },
    validators: {
      email: [Validators.required, Validators.email],
      password: [Validators.required, Validators.minLength(6)],
    },
  });

  async onSubmit({ password, email }: { email: string; password: string }) {
    console.log('Submitting started...');
    // ждем 10 секунд
    await new Promise((resolve) => setTimeout(resolve, 10_000));
    console.log('Submit from context form:', password, email);
  }
}
