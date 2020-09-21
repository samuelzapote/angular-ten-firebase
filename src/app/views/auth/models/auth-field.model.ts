import { AuthFormState } from '../types/auth-form-state.type';

export interface AuthField {
  defaultValue: null;
  icon: string;
  label: string;
  mode: AuthFormState;
  name: string;
  placeholder: string;
  type: string;
  validators: string[];
}
