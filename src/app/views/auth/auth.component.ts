import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

import { AuthFormFieldsService } from './services/auth-form-fields.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
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
    this.authFormValueSubscription = this.authForm.valueChanges.subscribe(() => {
      this.handleFormChanges();
    });
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    this.authFormValueSubscription.unsubscribe();
  }

  private handleFormChanges(): void {
    if (this.serverError) { this.serverError = null; }
  }

  public async onSubmit(form: FormGroup): Promise<void> {
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

  public getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) { return 'You must enter a value'; }
    if (control.hasError('email')) { return 'You must enter a valid email'; }
    return '';
  }

  public getAlternateOption(): {button: AuthFormState, text: string} {
    return {
      button: this.inLoginMode ? `register` : 'login',
      text: this.inLoginMode ? `Don't have an account?` : 'Already have an account?',
    };
  }
}
