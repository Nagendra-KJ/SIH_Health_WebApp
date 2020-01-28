import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }
  logout() {
    console.log("Logging you out!");
    this.fireauth.auth.signOut();
  }

  async login(email: string, password: string) {
    return this.fireauth.auth.signInWithEmailAndPassword(email, password);
  }


  authenticated(): boolean {
    return this.fireauth.auth.currentUser != null;
  }

  async registerUser(user: User) {
    console.log(user)
    return this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password);

  }

  async resetPassword(email: string) {
    return this.fireauth.auth.sendPasswordResetEmail(email);
  }
}
