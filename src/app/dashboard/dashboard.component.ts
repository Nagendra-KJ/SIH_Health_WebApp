import { Component, OnInit } from '@angular/core';
import {Patient} from '../shared/models/patient';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {uuid} from 'uuid';
import {DBOperationsService} from '../shared/services/dboperations.service';
import {map} from 'rxjs/operators'; 
import { CompileShallowModuleMetadata } from '@angular/compiler';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 selectedPatient:Patient;
 patients:Patient[];
 loadedData:boolean=false;

  constructor(private modalService:NgbModal,private dbOps:DBOperationsService) 
  {}

  ngOnInit() 
  {
    
    var list=this.dbOps.getPatients();
    var problem=list.then(data=>
      {
        data.forEach(element=>{
          this.patients=element;
          this.patients.sort(function(a,b){
            var year1=Number(a.appointmentDate.substring(6,10));
            var year2=Number(b.appointmentDate.substring(6,10));
            if(year1!=year2)
              return year2-year1;
            var month1=Number(a.appointmentDate.substring(3,5));
            var month2=Number(b.appointmentDate.substring(3,5));
            if(month1!=month2)
              return month2-month1;
            var day1=Number(a.appointmentDate.substring(0,2));
            var day2=Number(b.appointmentDate.substring(0,2));
            return day2-day1;
          })
        });
        this.loadedData=true; 
      }
      );

    problem.catch(error=>
      {
        console.log("There was an error when reading the database "+error);
      });  
  }
  public viewPatientDetails(patient:any,id:string)
  {
    this.selectedPatient=patient;
    this.modalService.open(id);
  }
  public sendPhoneReminder()
  {
    console.log("Reminder sent to "+this.selectedPatient.name+". The phone number is "+this.selectedPatient.phoneNumber);
  }

}