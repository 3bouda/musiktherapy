import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../service/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a spy object for AuthService
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    // Create a spy object for Router
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    authGuard = TestBed.inject(AuthGuard); // Get an instance of AuthGuard
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

});
