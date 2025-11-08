import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { useFormContext } from './use-form.context';
import { LocaleService } from '../../locale/locale.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./input-field.component.scss'],
  template: `
    <div class="text-field" [class.error]="!formField().isValid() && formField().isTouched()">
      <div class="input-wrapper">
        <input
          class="input-element"
          [id]="name"
          [name]="name"
          [formControl]="formField().control"
          [placeholder]="focused ? placeholder : ''"
          (focus)="focused = true"
          (blur)="focused = false"
        />
        <label
          class="input-label"
          [class.filled]="formField().control.value || focused"
          [class.error]="!formField().isValid() && formField().isTouched()"
          [for]="name"
        >
          {{ label }}
        </label>
        <fieldset class="outline">
          @if(formField().control.value || focused){
          <legend>
            <span style="color: transparent">{{ label }}</span>
          </legend>

          }@else{
          <legend></legend>
          }
        </fieldset>
      </div>

      <div class="helper-text" *ngIf="!formField().isValid() && formField().isTouched()">
        @for (err of formField().errors(); track err.key) {
        <div>
          {{ this.localeService.translate('validation.' + err.key, err.value) }}
        </div>
        }
      </div>
    </div>
  `,
})
export class InputFieldComponent {
  @Input({ required: true }) name!: string;
  @Input() label?: string;
  @Input() placeholder?: string;

  focused = false;

  private readonly ctx = useFormContext();
  formField = computed(() => this.ctx.form().fields[this.name]);
  localeService = inject(LocaleService);
}
