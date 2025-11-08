import { Component, Input, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { useFormContext } from './use-form.context';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group mb-3">
      <label *ngIf="label">{{ label }}</label>
      <input
        class="input border rounded px-2 py-1 w-full"
        [name]="name"
        [formControl]="formField().control"
        [placeholder]="placeholder"
        [class.invalid]="!formField().isValid() && formField().isTouched()"
      />
      <div class="error">
        @for (err of formField().errors(); track err.key) {
        <div>{{ err.key }}: {{ err.value | json }}</div>
        }
      </div>
    </div>
  `,
})
export class InputFieldComponent {
  @Input({ required: true }) name!: string;
  @Input() label?: string;
  @Input() placeholder?: string;

  private readonly ctx = useFormContext();
  // control!: FormControl;
  formField = computed(() => this.ctx.form().fields[this.name]);

  // ngOnInit() {
  //   const form = this.ctx.form();
  //   const ctrl = form.formGroup.get(this.name);
  //   if (!(ctrl instanceof FormControl)) {
  //     throw new Error(`"${this.name}" is not a FormControl`);
  //   }
  //   this.control = ctrl;
  // }
}
