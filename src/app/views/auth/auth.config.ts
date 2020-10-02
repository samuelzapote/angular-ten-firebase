export type AuthFormState = 'login' | 'register';

export interface AuthField {
  controlName: string;
  defaultValue: unknown;
  icon: string;
  isOnlyForRegister: boolean;
  label: string;
  placeholder: string;
  type: string;
  validators: string[];
}

export const AuthFormFields: AuthField[] = [
  {
    controlName: 'firstName',
    isOnlyForRegister: true,
    label: 'First Name',
    type: 'text',
    defaultValue: null,
    placeholder: 'John',
    icon: 'create',
    validators: ['required'],
  },
  {
    controlName: 'lastName',
    isOnlyForRegister: true,
    label: 'Last Name',
    type: 'text',
    defaultValue: null,
    placeholder: 'Smith',
    icon: 'create',
    validators: ['required'],
  },
  {
    controlName: 'email',
    isOnlyForRegister: false,
    label: 'Email',
    type: 'text',
    defaultValue: null,
    placeholder: 'johnsmith@email.com',
    icon: 'email',
    validators: ['required', 'email'],
  },
  {
    controlName: 'username',
    isOnlyForRegister: true,
    label: 'Username',
    type: 'text',
    defaultValue: null,
    placeholder: 'johnsmith',
    icon: 'account_box',
    validators: ['required'],
  },
  {
    controlName: 'password',
    isOnlyForRegister: false,
    label: 'Password',
    type: 'password',
    defaultValue: null,
    placeholder: '********',
    icon: 'lock',
    validators: ['required'],
  },
  {
    controlName: 'passwordConfirm',
    isOnlyForRegister: true,
    label: 'Confirm Password',
    type: 'password',
    defaultValue: null,
    placeholder: '********',
    icon: 'lock',
    validators: ['required'],
  },
];
