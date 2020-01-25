import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private db:AngularFireDatabase,private router:Router) 
  {}
  logout()
  {
    console.log("Logging you out!");
    this.fireauth.auth.signOut();
  }
  
  async login(email:string,password:string)
  {
    return this.fireauth.auth.signInWithEmailAndPassword(email,password);
  }

  
  authenticated():boolean
  {
    return this.fireauth.auth.currentUser!=null;
  }

  async registerUser(email:string,password:string)
  {
    return this.fireauth.auth.createUserWithEmailAndPassword(email,password);
  }

  async resetPassword(email:string)
  {
    return this.fireauth.auth.sendPasswordResetEmail(email);
  }
}
