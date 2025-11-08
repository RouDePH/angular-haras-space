import { Injectable, signal, computed } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import type { ReturnTypeOfUseForm } from './use-form'; // optional helper type

@Injectable()
export class FormContextService<T extends Record<string, any> = any> {
  private readonly _form = signal<FormGroup | null>(null);

  /** set form context */
  setForm(form: FormGroup) {
    this._form.set(form);
  }

  /** get current FormGroup (non-null asserted) */
  form(): FormGroup {
    const f = this._form();
    if (!f) throw new Error('FormContextService: no form provided in context');
    return f;
  }

  /** optional helpers */
  readonly valid = computed(() => this.form().valid);
  readonly dirty = computed(() => this.form().dirty);
}
