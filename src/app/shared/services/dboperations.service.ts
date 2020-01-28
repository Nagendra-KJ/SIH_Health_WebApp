import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DBOperationsService {


  constructor(private db: AngularFireDatabase, private fireStore: AngularFirestore) { }

  createPatient(patient: Patient) {
    this.db.list('patients').push(patient);
  }


  async getPatients() {
    var patients: Observable<any[]>;
    patients = this.db.list('/patients').snapshotChanges().pipe(
      map((patients: any[]) => patients.map(patient => {
        const payload = patient.payload.val();
        const key = patient.key;
        return <any>{ key, ...payload };
      })),
    );
    return patients;
  }

  async addUser(user: User) {
    this.fireStore.collection<User>('users').add(JSON.parse(JSON.stringify(user)));
  }

  deletePatient(key: string) {
    this.db.list('patients').remove(key);
  }

  getUser(userId: string) {
    return this.fireStore.collection("users", ref => ref.where('userId', '==', userId).limit(1)).valueChanges();
  }
}
