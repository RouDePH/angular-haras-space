import { inject } from '@angular/core';
import { FormContextService } from './form-context.service';

export function useFormContext<T extends Record<string, any> = any>() {
  return inject(FormContextService<T>);
}
