import { Component, OnInit } from '@angular/core';
import {Patient} from '../shared/models/patient';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patients:Patient[]=[{name:"Nagendra",age:20,height:160,weight:75,bloodType:"B+",appointmentDate:"20.01.2020",phoneNumber:9686891894},
                      {name:"Holla",age:20,height:165,weight:60,bloodType:"A+",appointmentDate:"22.01.2020",phoneNumber:1234567890}];
  selectedPatient:Patient;


  constructor(private modalService:NgbModal) { }

  ngOnInit() 
  {
    this.patients.sort(function(a,b)
    {
      //A really shitty sort function
      var year1=Number(a.appointmentDate.substring(6,10));
      var year2=Number(b.appointmentDate.substring(6,10));
      if(year1!=year2)
        return year1-year2;
      var month1=Number(a.appointmentDate.substring(3,5));
      var month2=Number(b.appointmentDate.substring(3,5));
      if(month1!-month2)
        return month1-month2;
      var day1=Number(a.appointmentDate.substring(0,2));
      var day2=Number(b.appointmentDate.substring(0,2));
      return day1-day2;
    });
  }
  public viewPatientDetails(patient:any,id:string)
  {
    this.selectedPatient=patient;
    this.modalService.open(id);
  }
  public sendPhoneReminder()
  {
    console.log("Reminder sent to "+this.selectedPatient.phoneNumber);
  }

}
