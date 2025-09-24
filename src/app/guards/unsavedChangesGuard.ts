import { CanDeactivateFn } from "@angular/router";

export const unsavedChangesGuard = (
  component :any,
) => {
  return component.hasUnsavedChanges()
    ? confirm('You have unsaved changes. Are you sure you want to leave?')
    : true;
};
