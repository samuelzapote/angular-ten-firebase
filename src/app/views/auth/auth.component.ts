import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthFieldsRegistry } from './auth-fields-registry';
import { AuthField } from './models/auth-field.model';
import { AuthFormState } from './types/auth-form-state.type';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [TitleCasePipe],
})
export class AuthComponent implements OnInit, OnDestroy {
  public authForm: FormGroup;
  private authFormValueSubscription: Subscription;
  public formFields: AuthField[];
  public formState: AuthFormState;
  public serverError: string;

  get inLoginMode(): boolean { return this.formState === 'login'; }
  get inRegisterMode(): boolean { return this.formState === 'register'; }
  get alternateAuthOption(): {button: string, text: string} {
    return AuthComponent.getAlternateAuthOption(this.formState);
  }

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private titleCasePipe: TitleCasePipe,
  ) {
    this.formState  = 'login';
    this.formFields = this.getFormFields(AuthFieldsRegistry, this.formState);
    this.authForm = this.getAuthFormGroup(this.formFields);
    this.authFormValueSubscription = this.authForm.valueChanges.subscribe(() => {
      this.handleFormChanges();
    });
  }

  private static shouldAddControl(state: AuthFormState, fieldMode: AuthFormState): boolean {
    if (state === 'register') {
      return true;
    } else if (state === 'login' && state === fieldMode) {
      return true;
    }
    return false;
  }

  private static getAlternateAuthOption(formState: AuthFormState): {button: string, text: string} {
    return {
      button: formState === 'login' ? `register` : 'login',
      text: formState === 'login' ? `Don't have an account?` : 'Already have an account?',
    };
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    this.authFormValueSubscription.unsubscribe();
  }

  private handleFormChanges(): void {
    if (this.serverError) { this.serverError = null; }
  }

  private getFormFields(fieldsRegistry: AuthField[], state: AuthFormState): AuthField[] {
    return fieldsRegistry.filter((field) => {
      return AuthComponent.shouldAddControl(state, field.mode);
    });
  }

  private getAuthFormGroup(formFields: AuthField[]): FormGroup {
    const newFormGroup = new FormGroup({});
    formFields.forEach(field => {
      newFormGroup.addControl(
        field.name,
        new FormControl(
          field.defaultValue,
          field.validators.map(validator => Validators[validator])
        )
      );
    });
    return newFormGroup;
  }

  public onToggleFormState(currentState: AuthFormState): void {
    this.formState = currentState === 'login' ? 'register' : 'login';
    this.formFields = this.getFormFields(AuthFieldsRegistry, this.formState);
    this.authForm = this.getAuthFormGroup(this.formFields);
  }

  private passwordConfirmed(password: string, passwordConfirm: string): boolean {
    return this.inRegisterMode && password === passwordConfirm;
  }

  public async onSubmit(form: FormGroup): Promise<void> {
    this.loadingService.toggleLoading(true);
    const { email, password, username, firstName, lastName } = form.value;
    try {
      if (this.passwordConfirmed(form.value.password, form.value.passwordConfirm)) {
        await this.authService.register({
          displayName: this.titleCasePipe.transform(`${firstName} ${lastName}`),
          email,
          firstName: this.titleCasePipe.transform(firstName),
          fullName: this.titleCasePipe.transform(`${firstName} ${lastName}`),
          lastName: this.titleCasePipe.transform(lastName),
          password,
          username,
        });
      }
      await this.authService.login(form.value.email, form.value.password);
    } catch (err) {
      this.serverError = err;
    }
    await this.router.navigate(['']);
    this.loadingService.toggleLoading(false);
  }

  public getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) { return 'You must enter a value'; }
    if (control.hasError('email')) { return 'You must enter a valid email'; }
    return '';
  }
}
