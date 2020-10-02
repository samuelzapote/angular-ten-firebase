import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthField, AuthFormFields } from './auth.config';
import { UserRegistration } from 'src/app/shared/models/user.model';

interface AuthFormState {
  inLoginMode: boolean;
  inRegisterMode: boolean;
}

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

  get submitButtonText(): string {
    return this.formState.inLoginMode ? 'login' : 'register';
  }

  get alternateAuthOption(): { button: string; text: string } {
    return AuthComponent.getAlternateAuthOption(this.formState);
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private titleCasePipe: TitleCasePipe,
  ) {
    this.formState = { inLoginMode: true, inRegisterMode: false };
    this.formFields = this.getFormFields(AuthFormFields, this.formState);
    this.authForm = this.getAuthFormGroup(this.formFields, this.formState);
    this.authFormValueSubscription = this.authForm.valueChanges.subscribe(() => {
      this.handleFormChanges();
    });
  }

  private static passwordMatchValidator(g: FormGroup): { [key: string]: boolean } | null {
    return g.get('password').value === g.get('passwordConfirm').value
      ? null : { ['passwordMismatch']: true };
  }

  private static shouldAddControl(formState: AuthFormState, onlyForRegistration: boolean): boolean {
    if (formState.inRegisterMode) {
      return true;
    } else if (formState.inLoginMode && !onlyForRegistration) {
      return true;
    }
    return false;
  }

  private static getAlternateAuthOption(formState: AuthFormState): { button: string; text: string; } {
    return {
      button: formState.inLoginMode ? `register` : 'login',
      text: formState.inLoginMode ? `Don't have an account?` : 'Already have an account?',
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
      return AuthComponent.shouldAddControl(state, field.isOnlyForRegister);
    });
  }

  private getAuthFormGroup(formFields: AuthField[], formState: AuthFormState): FormGroup {
    const authControlsConfig: { [control: string]: any } = {};
    formFields.forEach(field => {
      authControlsConfig[field.controlName] = [
        field.defaultValue,
        field.validators.map(validator => Validators[validator]),
      ];
    });
    const newFormGroup = this.formBuilder.group(authControlsConfig);
    if (formState.inRegisterMode) { newFormGroup.setValidators(AuthComponent.passwordMatchValidator); }
    return newFormGroup;
  }

  public onToggleFormState(currentState: AuthFormState): void {
    this.formState = { inLoginMode: !currentState.inLoginMode, inRegisterMode: !currentState.inRegisterMode };
    this.formFields = this.getFormFields(AuthFormFields, this.formState);
    this.authForm = this.getAuthFormGroup(this.formFields, this.formState);
  }

  public async onSubmit(form: FormGroup): Promise<void> {
    this.loadingService.setLoading(true);
    const { email, password, username, firstName, lastName } = form.value;
    try {
      if (this.formState.inRegisterMode) {
        const newUser: UserRegistration = {
          displayName: username,
          email,
          firstName: this.titleCasePipe.transform(firstName),
          fullName: this.titleCasePipe.transform(firstName + (lastName ? ` ${lastName}` : ``)),
          lastName: this.titleCasePipe.transform(lastName),
          password,
          uid: null,
        };
        await this.authService.register(newUser);
      }
      await this.authService.login(form.value.email, form.value.password);
    } catch (err) {
      this.serverError = err;
    }
    await this.router.navigate(['']);
    this.loadingService.setLoading(false);
  }

  public isControlRequired(validators: string[]): boolean {
    return validators.includes('required');
  }

  public getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) { return 'You must enter a value'; }
    if (control.hasError('email')) { return 'You must enter a valid email'; }
    return '';
  }

  public getFormErrorMessage(errors: ValidationErrors): string {
    if (errors?.passwordMismatch) { return 'Passwords must match.'; }
    return '';
  }
}
