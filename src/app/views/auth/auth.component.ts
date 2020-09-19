import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthField } from './models/auth-field.model';
import { AuthFormFieldsService } from './services/auth-form-fields.service';
import { AuthFormState } from './types/auth-form-state.type';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [TitleCasePipe],
})
export class AuthComponent implements OnInit {
  public formState: AuthFormState;
  public formFields: AuthField[];
  public authForm: FormGroup;

  get inLoginMode() { return this.formState === 'login' };
  get inRegisterMode() { return this.formState === 'register' };

  constructor(
    private authFormFieldsService: AuthFormFieldsService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private titleCasePipe: TitleCasePipe,
  ) {
    this.formState  = 'login';
    this.formFields = this.authFormFieldsService.getFormFields(this.formState);
    this.authForm = this.getAuthFormGroup(this.formFields);
  }

  public ngOnInit(): void { }

  public async onSubmit(form: FormGroup): Promise<void> {
    const { email, password, username, firstName, lastName } = form.value;
    if (this.passwordConfirmed(form.value.password, form.value.passwordConfirm)) {
      await this.authService.register({
        email,
        password,
        username,
        firstName,
        lastName,
        displayName: this.titleCasePipe.transform(`${firstName} ${lastName}`),
      });
    }
    await this.authService.login(form.value.email, form.value.password);
    this.loadingService.toggleLoading(false);
    this.router.navigate(['']);
  }

  private passwordConfirmed(password: string, passwordConfirm: string): boolean {
    return this.inRegisterMode && password === passwordConfirm;
  }

  public onToggleFormState(currentState: AuthFormState): void {
    this.formState = currentState === 'login' ? 'register' : 'login';
    this.formFields = this.authFormFieldsService.getFormFields(this.formState);
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
    if (control.hasError('required')) { return 'You must enter a value' }
    if (control.hasError('email')) { return 'You must enter a valid email' }
    return '';
  }

  public getAlternateOption(state: AuthFormState): {button: AuthFormState, text: string} {
    return {
      button: this.inLoginMode ? `register` : 'login',
      text: this.inLoginMode ? `Don't have an account?` : 'Already have an accout?',
    }
  }
}
