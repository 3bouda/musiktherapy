import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage  {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSignup() {
    try {
      await this.authService.signup(this.email, this.password);
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Signup error', error);
    }
  }

}
