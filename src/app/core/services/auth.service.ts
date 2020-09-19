import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserCredential } from '@firebase/auth-types'

import { LoadingService } from './loading.service';
import { NewUser } from 'src/app/views/auth/models/new-user.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuth$: Observable<User>;
  private user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingService: LoadingService,
  ) {
    this.userAuth$ = this.afAuth.user;
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null))
    );
  }

  get getUser(): Observable<User> {
    return this.user$;
  }

  get getUserAuth(): Observable<User> {
    return this.userAuth$;
  }

  public login(email: string, password: string): Promise<UserCredential> {
    this.loadingService.toggleLoading(true);
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    this.loadingService.toggleLoading(true);
    return this.afAuth.signOut();
  }

  public register({email, password, username, firstName, lastName, displayName}: NewUser): Promise<void | User> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        const newUser: User = {
          email: credentials.user.email,
          uid: credentials.user.uid,
          displayName: displayName,
        };
        this.afs.collection<User>('users').add(newUser);
      });
  }
}
