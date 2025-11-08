import { Component, Input, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { useFormContext } from './use-form.context';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group mb-3" *ngIf="control">
      <label *ngIf="label">{{ label }}</label>
      <input
        class="input border rounded px-2 py-1 w-full"
        [formControl]="control"
        [placeholder]="placeholder"
        [class.invalid]="control.invalid && control.touched"
      />
      <div class="error" *ngIf="control.invalid && control.touched">
        @for (err of errors(); track err.key) {
        <div>{{ err.key }}: {{ err.value | json }}</div>
        }
      </div>
    </div>
  `,
})
export class InputFieldComponent implements OnInit {
  @Input({ required: true }) name!: string;
  @Input() label?: string;
  @Input() placeholder?: string;

  private readonly ctx = useFormContext();
  control!: FormControl;
  errors: Signal<{ key: string; value: any; }[]> = computed(() => []);;

  ngOnInit() {
    const form = this.ctx.form();
    const ctrl = form.get(this.name);
    if (!(ctrl instanceof FormControl)) {
      throw new Error(`"${this.name}" is not a FormControl`);
    }
    this.control = ctrl;

    this.errors = computed(() => {
      const e = this.control.errors;
      if (!e) return [];
      return Object.entries(e).map(([key, value]) => ({ key, value }));
    });
  }
}
