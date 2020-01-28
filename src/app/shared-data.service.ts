import { Injectable } from '@angular/core';
import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  userData;
  constructor() {
    this.userData = {};
  }

  setUserData(user: User) {
    this.userData = user;
    return Promise.resolve(() => {
      "";
    })

  }

  getUserData() {
    return this.userData;
  }
}
