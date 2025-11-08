import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContextService } from './form-context.service';
import { ReactiveFormsModule } from '@angular/forms';
import { useForm } from './use-form';

@Component({
  selector: 'app-form-provider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [FormContextService],
  template: `
    <form [formGroup]="form.formGroup" (ngSubmit)="_onSubmit()">
      <ng-content />
    </form>
  `,
})
export class FormProviderComponent<T extends Record<string, any>> {
  @Input({ required: true }) form!: ReturnType<typeof useForm<T>>;
  @Input({ required: true }) onSubmit!: (values: T) => void;

  constructor(private readonly ctx: FormContextService<T>) {}

  ngOnInit() {
    this.ctx.setForm(this.form);
  }

  _onSubmit() {
    this.form.handleSubmit((values: T) => this.onSubmit(values));
  }
}
