import {
  Component,
  Input,
  computed,
  inject,
  TemplateRef,
  ContentChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { useFormContext } from './use-form.context';
import { LocaleService } from '../../locale/locale.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="text-field" [class.error]="!formField().isValid() && formField().isTouched()">
      <div
        class="input-wrapper"
        [class.has-left-icon]="iconLeft || iconLeftTpl"
        [class.has-right-icon]="iconRight || iconRightTpl"
      >
        <!-- Левая иконка -->
        <ng-container *ngIf="iconLeft">
          <span class="icon left" [innerHTML]="iconLeft"></span>
        </ng-container>

        <!-- Кастомный контент (например, <ng-template #leftIcon> ) -->
        <ng-container *ngTemplateOutlet="iconLeftTpl"></ng-container>

        <input
          class="input-element"
          [id]="name"
          [name]="name"
          [type]="type"
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

        <!-- Правая иконка -->
        <ng-container *ngIf="iconRight">
          <span class="icon right" [innerHTML]="iconRight"></span>
        </ng-container>

        <!-- Кастомный шаблон справа -->
        <ng-container *ngTemplateOutlet="iconRightTpl"></ng-container>

        <fieldset class="outline">
          @if(formField().control.value || focused){
          <legend>
            <span style="color: transparent">{{ label }}</span>
          </legend>
          } @else {
          <legend></legend>
          }
        </fieldset>
      </div>

      <div class="helper-text">
        @if(!formField().isValid() && formField().isTouched()){ @for (err of formField().errors();
        track err.key) {
        <div>
          {{ this.localeService.translate('validation.' + err.key, err.value) }}
        </div>
        } } @else if(helperText) {
        <div>{{ helperText }}</div>
        }
      </div>
    </div>
  `,
})
export class InputFieldComponent {
  @Input({ required: true }) name!: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type: string = 'text';

  // иконки в виде HTML-строки (например, SVG)
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() helperText?: string;

  // альтернатива — шаблон (передаваемый из родителя)
  @ContentChild('iconLeft') iconLeftTpl?: TemplateRef<any>;
  @ContentChild('iconRight') iconRightTpl?: TemplateRef<any>;

  focused = false;

  private readonly ctx = useFormContext();
  formField = computed(() => this.ctx.form().fields[this.name]);
  localeService = inject(LocaleService);
}
