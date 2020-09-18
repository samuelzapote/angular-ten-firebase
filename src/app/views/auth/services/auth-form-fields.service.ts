import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { AuthField } from '../models/auth-field.model';
import { AuthFormState } from '../types/auth-form-state.type';

@Injectable({
  providedIn: 'root'
})
export class AuthFormFieldsService {
  private formFieldsRegistry: AuthField[] = [
    {
      name: 'firstName',
      label: 'First Name',
      mode: 'register',
      type: 'text',
      placeholder: 'John',
      icon: 'create',
      validators: [Validators.required],
    },
    {
      name: 'lastName',
      label: 'Last Name',
      mode: 'register',
      type: 'text',
      placeholder: 'Smith',
      icon: 'create',
      validators: [Validators.required],
    },
    {
      name: 'email',
      label: 'Email',
      mode: 'login',
      type: 'email',
      placeholder: 'johnsmith@email.com',
      icon: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'username',
      label: 'Username',
      mode: 'register',
      type: 'text',
      placeholder: 'johnsmith',
      icon: 'account_box',
      validators: [Validators.required],
    },
    {
      name: 'password',
      label: 'Password',
      mode: 'login',
      type: 'password',
      placeholder: '********',
      icon: 'lock',
      validators: [Validators.required],
    },
    {
      name: 'passwordConfirm',
      label: 'Confirm Password',
      mode: 'register',
      type: 'password',
      placeholder: '********',
      icon: 'lock',
      validators: [Validators.required],
    },
  ];

  constructor() { }

  public getFormFields(state: AuthFormState): AuthField[] {
    return this.formFieldsRegistry.filter((field) => {
      return this.shouldAddControl(state, field.mode);
    });
  }

  private shouldAddControl(state: AuthFormState, fieldMode: AuthFormState): boolean {
    if (state === 'register') {
      return true;
    } else if (state === 'login' && state === fieldMode) {
      return true;
    }
    return false;
  }
}
