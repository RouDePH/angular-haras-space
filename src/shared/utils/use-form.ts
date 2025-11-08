/* eslint-disable @typescript-eslint/no-explicit-any */ import {
  FormGroup,
  FormControl,
} from '@angular/forms';
import { signal, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, startWith } from 'rxjs';
export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validators?: { [K in keyof T]?: any[] };
}

interface FormState {
  isDirty: Signal<boolean>;
  isValid: Signal<boolean>;
  isTouched: Signal<boolean>;
  isPristine: Signal<boolean>;
  isSubmitting: Signal<boolean>;
}

export interface Form<T> {
  formGroup: FormGroup;
  fields: { [K in keyof T]: FormField };
  handleSubmit(cb: (values: T) => void | Promise<void>): Promise<void>;
  reset(values?: Partial<T> | undefined): void;
  state: FormState;
}

interface FormField {
  control: FormControl;
  value: Signal<any>;
  resetValue: () => void;
  isDirty: Signal<boolean>;
  isValid: Signal<boolean>;
  isTouched: Signal<boolean>;
  isPristine: Signal<boolean>;
  errors: Signal<{ key: string; value: any }[]>;
}

export function useForm<T extends Record<string, any>>(opts: UseFormOptions<T>): Form<T> {
  const controls = Object.entries(opts.initialValues).reduce((acc, [key, value]) => {
    const fieldValidators = opts.validators?.[key as keyof T] ?? [];
    acc[key] = new FormControl(value, fieldValidators);
    return acc;
  }, {} as Record<string, FormControl>);

  const form = new FormGroup(controls);
  const touchedTrigger = signal(0);

  const formStateTrigger = toSignal(
    merge(form.valueChanges, form.statusChanges).pipe(startWith(null))
  );

  const isDirty = computed(() => {
    formStateTrigger();
    touchedTrigger();
    return form.dirty;
  });

  const isValid = computed(() => {
    formStateTrigger();
    touchedTrigger();
    return form.valid;
  });

  const isTouched = computed(() => {
    formStateTrigger();
    touchedTrigger();
    return form.touched;
  });

  const isPristine = computed(() => {
    formStateTrigger();
    touchedTrigger();
    return form.pristine;
  });

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

        resetValue: () => {
          control.patchValue('');
        },

        isDirty: computed(() => {
          fieldValue();
          status();
          touchedTrigger();

          return control.dirty;
        }),
        isValid: computed(() => {
          fieldValue();
          status();
          touchedTrigger();

          return control.valid;
        }),
        isTouched: computed(() => {
          fieldValue();
          status();
          touchedTrigger();

          return control.touched;
        }),
        isPristine: computed(() => {
          fieldValue();
          status();
          touchedTrigger();

          return control.pristine;
        }),

        errors: computed(() => {
          fieldValue();
          status();
          touchedTrigger();
          const e = control.errors;
          if (!e || !control.touched) return [];
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

    touchedTrigger.update((v) => v + 1);

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
