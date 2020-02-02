import { Injectable } from '@angular/core';
import { User } from './shared/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private userDataHandler = new BehaviorSubject(new User());
  userData = this.userDataHandler.asObservable();
  constructor() { }

  setUserData(user: User) {
    this.userDataHandler.next(user);
  }
}
