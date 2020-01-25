import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DBOperationsService {

  constructor( private db:AngularFireDatabase) { }

  createPatient(patient: Patient)
  {
    this.db.list('patients').push(patient);
  }
 
 
 async getPatients()
  {
    var patients:Observable<any[]>;
    patients=this.db.list('/patients').snapshotChanges().pipe(
      map((patients: any[]) => patients.map(patient => {
        const payload = patient.payload.val();
        const key = patient.key;
        return <any>{ key, ...payload };
      })),
    );
    return patients;
  }
  
  deletePatient(key:string)
  {
    this.db.list('patients').remove(key);
  }

  
}
