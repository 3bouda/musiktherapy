import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {catchError, map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private authService: AuthService,private storage: AngularFireStorage, private firestore: AngularFirestore) {}

  uploadFile(file: File): Observable<any> {
    const filePath = `audio/${new Date().getTime()}_${file.name}`; // Create a unique path for the file
    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges().pipe(
      map(async (snapshot) => {
        if (snapshot!.state === 'success') {
          const downloadURL = await this.storage.ref(filePath).getDownloadURL().toPromise();
          const user = await this.authService.getCurrentUser();
          if (user) {
            await this.firestore.collection('usersMusic').doc(user.uid).update({
              audioPath: downloadURL // Adjust the field name as needed
            });
          }
          return downloadURL; // Return the download URL
        }
      }),
      catchError((error) => {
        console.error('Upload error:', error);
        throw error; // Handle or rethrow the error
      })
    );
  }

  getUserMusic(): Observable<any[]> {
    const user = this.authService.getCurrentUser(); // Get the current user

    return new Observable((observer) => {
      user.then((userData) => {
        if (userData) {
          this.firestore.collection('usersMusic').doc(userData.uid).valueChanges()
            .subscribe((data: any) => {
              if (data && data.audioPath) {
                observer.next([data.audioPath]); // Return the array of audio paths
              } else {
                observer.next([]); // No music found
              }
            }, (error) => {
              observer.error(error); // Handle errors
            });
        } else {
          observer.next([]); // No user logged in
        }
      });
    });
  }
}
