import { Component, computed, inject, Input, input, OnInit } from '@angular/core';
import { useForm } from '../../../shared/utils/use-form';
import { Validators } from '@angular/forms';
import { FormProviderComponent } from '../../../shared/utils/form-provider.component';
import { InputFieldComponent } from '../../../shared/utils/input-field.component';

@Component({
  selector: 'app-test-component',
  imports: [FormProviderComponent, InputFieldComponent],
  template: `
    <app-form-provider [form]="form">
      <app-input-field name="email" label="Email" placeholder="Email" />
      <app-input-field name="password" label="Password" placeholder="Password" />
      <button type="submit">Submit</button>
    </app-form-provider>
  `,
  styleUrl: './test-component.css',
  standalone: true,
})
export class TestComponent {
  form = useForm({
    initialValues: { email: '', password: '' },
    validators: {
      email: [Validators.required, Validators.email],
      password: [Validators.required, Validators.minLength(6)],
    },
  });
}
