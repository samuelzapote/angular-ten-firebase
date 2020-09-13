import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User> = this.auth.user;

  constructor(private auth: AngularFireAuth) { }

  public login(): void { }
  public logout(): void { }
}
