import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserInfo } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '@app/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  readonly user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: UserInfo) => {
        if (user) {
          // Logged in
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async signIn(email: string, password: string): Promise<void> {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: UserInfo): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: '' + new Date()
    };

    return userRef.set(data, { merge: true });
  }

  async signOut(): Promise<void> {
    await this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  get user(): Observable<User> { return this.user$; }

}
