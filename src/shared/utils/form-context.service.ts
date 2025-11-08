import { Injectable, signal } from '@angular/core';
import { Form } from './use-form';

@Injectable()
export class FormContextService<T extends Record<string, any> = any> {
  private readonly _form = signal<Form<T> | null>(null);

  setForm(form: Form<T>) {
    this._form.set(form);
  }

  form(): Form<T> {
    const f = this._form();
    if (!f) throw new Error('FormContextService: no form provided in context');
    return f;
  }
}
