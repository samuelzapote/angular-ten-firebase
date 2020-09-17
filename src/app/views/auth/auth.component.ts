import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthField } from './models/auth-field.model';
import { AuthFormFieldsService } from './services/auth-form-fields.service';
import { AuthFormState } from './types/auth-form-state.type';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public formState: AuthFormState;
  public formFields: AuthField[];
  public authForm: FormGroup;

  constructor(private authFieldsService: AuthFormFieldsService) {
    this.formState  = 'login';
    this.formFields = this.authFieldsService.getFormFields(this.formState);
    this.authForm = this.getAuthFormGroup(this.formFields);
  }

  public ngOnInit(): void { }

  public onSubmit(form: FormGroup): void {

  }

  public onToggleFormState(currentState: AuthFormState): void {
    this.formState = currentState === 'login' ? 'register' : 'login';
    this.formFields = this.authFieldsService.getFormFields(this.formState);
    this.authForm = this.getAuthFormGroup(this.formFields);
  }

  private getAuthFormGroup(formFields: AuthField[]): FormGroup {
    const newFormGroup = new FormGroup({});
    formFields.forEach(f => {
      newFormGroup.addControl(f.name, new FormControl('', f.validators));
    });
    return newFormGroup;
  }

  public getErrorMessage(control: FormControl): string {
    return control.hasError('required') ? 'You must enter a value' : '';
  }

  public getAlternateOption(state: AuthFormState): AuthFormState {
    return state === 'login' ? 'register' : 'login';
  }
}
