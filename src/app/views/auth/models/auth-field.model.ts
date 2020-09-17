import { AuthFormState } from '../types/auth-form-state.type';
import { ValidatorFn } from '@angular/forms';

export interface AuthField {
  name: string;
  label: string;
  mode: AuthFormState;
  type: string;
  placeholder: string;
  icon: string;
  validators: ValidatorFn[];
}
