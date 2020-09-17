import { TestBed } from '@angular/core/testing';

import { AuthFormFieldsService } from './auth-form-fields.service';

describe('AuthFormFieldsService', () => {
  let service: AuthFormFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFormFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
