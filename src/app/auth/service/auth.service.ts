import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  async signup(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.afAuth.signOut();
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  }

  isLoggedIn() {
    return !!this.afAuth.authState;
  }
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
