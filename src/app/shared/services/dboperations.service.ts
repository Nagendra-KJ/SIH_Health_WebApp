import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { Upload } from './upload';

@Injectable({
  providedIn: 'root'
})
export class DBOperationsService {
  uploadTask: firebase.storage.UploadTask;


  constructor(private db: AngularFireDatabase, private fireStore: AngularFirestore) { }

  getPatients() {
    return this.fireStore.collection<Patient>("Patient", ref => ref.where('appointmentDate', '>', "")).valueChanges();
  }

  async addUser(user: User) {
    console.log("Adding user to database");
    this.fireStore.collection<User>('users').add(JSON.parse(JSON.stringify(user)));
    var profile = this.createProfile(user);
    this.fireStore.collection<Patient>(user.userType).add(JSON.parse(JSON.stringify(profile)));
  }

  deletePatient(key: string) {
    this.db.list('patients').remove(key);
  }

  getUser(userId: string) {
    return this.fireStore.collection("users", ref => ref.where('userId', '==', userId).limit(1)).valueChanges();
  }
  createProfile(user: User): any {
    var patient = new Patient();
    patient.name = user.firstName + ' ' + user.lastName
    patient.email = user.email;
    patient.userId = user.userId;
    patient.phoneNumber = user.phoneNumber;
    patient.image = user.image;
    return patient;
  }

  searchPatient(field: string, query: string) {
    return this.fireStore.collection("Patient", ref => ref.where(field, "==", query)).valueChanges();
  }
  updatePatientDetails(newPatient: Patient) {
    var result = this.fireStore.collection("Patient", ref => ref.where("userId", "==", newPatient.userId)).snapshotChanges();
    result.subscribe(data => {
      let id = data[0].payload.doc.id;
      this.fireStore.collection("Patient").doc(id).update({ "appointmentDate": newPatient.appointmentDate });
    });
    return;
  }

}
