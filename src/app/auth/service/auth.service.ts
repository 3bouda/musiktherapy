import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from "../../../environments/environment";
import { userData } from "../../profile/userData.interface";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private bla = firebase.initializeApp(environment.firebaseConfig);
  private db = firebase.firestore();

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {}

  async updateProfile(userDataInput: userData, file: File | null) {
    const user = await this.getCurrentUser();
    let imagePath = null;

    if (file) {
      const filePath = `userProfileImages/${user!.uid}/${file.name}`;
      const task = this.storage.upload(filePath, file); // Start the upload
      await task.snapshotChanges().toPromise();
      imagePath = await this.storage.ref(filePath).getDownloadURL().toPromise();
    }


    return this.db.collection('users').doc(user?.uid).update({
      email: userDataInput.email,
      name: userDataInput.name,
      lastName: userDataInput.lastName,
      imagePath: imagePath
    });
  }

  async getProfile() {
    try {
      const user = await this.getCurrentUser(); // Get the current user as a promise
      if (user?.uid) {
        const docSnapshot = await this.db.collection('users').doc(user.uid).get();
        if (docSnapshot.exists) {
          return docSnapshot.data(); // Return the user data
        } else {
          throw new Error('No such document!'); // Throw an error if document does not exist
        }
      } else {
        throw new Error('User is not logged in!'); // Throw an error if the user is not logged in
      }
    } catch (error) {
      throw error; // Rethrow any error encountered during the process
    }
  }

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
      return await this.afAuth.createUserWithEmailAndPassword(email, password).then(r =>
        this.db.collection('users').doc(r.user?.uid).set({
          email: r.user?.email,
        })
      );
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

  async getCurrentUser() {
    return firstValueFrom(this.afAuth.authState); // Convert observable to promise
  }
}
