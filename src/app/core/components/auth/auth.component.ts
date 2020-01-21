import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { FirebaseAuthService } from '@app/core/services/firebase-auth.service';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public credentialsForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  public loading = false;
  public mode = 'login';

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private auth: FirebaseAuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    // Verifying if the current sub path is on register.
    if (this.route.snapshot.url[0].path === 'register') {
      this.mode = 'register';
      this.credentialsForm.addControl('name', new FormControl('', Validators.required));
    }
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup): void {
    this.loading = true;
    if (this.mode === 'login') {
      this.auth.signIn(form.value.email, form.value.password).finally(() => {
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
    if (this.mode === 'register') {
      this.afAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then((credential) => {
        credential.user.updateProfile({
          displayName: form.value.name,
          photoURL: ''
        });
        const data: User = {
          displayName: form.value.name,
          email: form.value.email,
          lastLogin: '' + new Date(),
          photoURL: '',
          role: 'default',
          uid: credential.user.uid
        };
        this.afs.doc<User>(`users/${credential.user.uid}`).set(data, { merge: true }).then(() => {
          this.loading = false;
          this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
          });
        });
      });
    }
  }

}
