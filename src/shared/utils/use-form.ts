/* eslint-disable @typescript-eslint/no-explicit-any */ import {
  FormGroup,
  FormControl,
} from '@angular/forms';
import { signal, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validators?: { [K in keyof T]?: any[] };
}

interface FormField {
  control: FormControl;
  value: Signal<any>;
  isDirty: Signal<boolean>;
  isValid: Signal<boolean>;
  isTouched: Signal<boolean>;
  isPristine: Signal<boolean>;
  errors: Signal<{ key: string; value: any }[]>;
}

export function useForm<T extends Record<string, any>>(opts: UseFormOptions<T>) {
  const controls = Object.entries(opts.initialValues).reduce((acc, [key, value]) => {
    const fieldValidators = opts.validators?.[key as keyof T] ?? [];
    acc[key] = new FormControl(value, fieldValidators);
    return acc;
  }, {} as Record<string, FormControl>);

  const form = new FormGroup(controls);
  const isDirty = computed(() => form.dirty);
  const isValid = computed(() => form.valid);
  const isTouched = computed(() => form.touched);
  const isPristine = computed(() => form.pristine);
  const isSubmitting = signal(false);

  const fields: {
    [K in keyof T]: FormField;
  } = Object.keys(controls).reduce(
    (acc, key) => {
      const control = controls[key];

      const fieldValue = toSignal(control.valueChanges.pipe(startWith(control.value)), {
        initialValue: control.value,
      });

      const status = toSignal(control.statusChanges.pipe(startWith(control.status)), {
        initialValue: control.status,
      });

      const fieldState = {
        control,
        value: fieldValue,
        isDirty: computed(() => {
          status();
          return control.dirty;
        }),
        isValid: computed(() => {
          status();
          return control.valid;
        }),
        isTouched: computed(() => {
          status();
          return control.touched;
        }),
        isPristine: computed(() => {
          status();
          return control.pristine;
        }),

        errors: computed(() => {
          status();
          const e = control.errors;
          console.log(control.errors);

          if (!e) return [];
          return Object.entries(e).map(([key, value]) => ({ key, value }));
        }),
      };

      acc[key as keyof T] = fieldState;
      return acc;
    },
    {} as {
      [K in keyof T]: FormField;
    }
  );

  async function handleSubmit(cb: (values: T) => Promise<void> | void) {
    form.markAllAsTouched();
    if (!form.valid) return;
    isSubmitting.set(true);
    try {
      await cb(form.getRawValue() as T);
    } finally {
      isSubmitting.set(false);
    }
  }

  function reset(values?: Partial<T>) {
    form.reset(values ?? opts.initialValues);
  }

  return {
    formGroup: form,
    fields,
    handleSubmit,
    reset,
    state: { isDirty, isValid, isTouched, isPristine, isSubmitting: isSubmitting.asReadonly() },
  };
}
