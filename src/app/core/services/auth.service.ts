import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserCredential } from '@firebase/auth-types';

import { NewUser } from 'src/app/views/auth/models/new-user.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User>;
  readonly user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.authState$ = this.afAuth.authState;
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: User) => {
        return user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null);
      })
    );
  }

  get getUser(): Observable<User> {
    return this.user$;
  }

  get getAuthState(): Observable<User> {
    return this.authState$;
  }

  public login(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  public async register({displayName, email, firstName, fullName, lastName, password, username}: NewUser): Promise<User | void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (credentials) => {
        await credentials.user.updateProfile({displayName});
        const newUser: User = {
          displayName,
          email: credentials.user.email,
          firstName,
          fullName,
          lastName,
          photoURL: credentials.user.photoURL,
          uid: credentials.user.uid,
          username,
        };
        await this.afs.doc<User>(`users/${newUser.uid}`).set(newUser);
      });
  }
}
