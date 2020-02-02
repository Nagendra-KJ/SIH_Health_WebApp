import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DBOperationsService } from 'src/app/shared/services/dboperations.service';
import { Patient } from 'src/app/shared/models/patient';
import jsPDF from 'jspdf';
import { FormControl } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { stringify } from 'querystring';

export interface Option
{
  value:string;
  label:string;
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MM YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-health-workers',
  templateUrl: './health-workers.component.html',
  styleUrls: ['./health-workers.component.css'],
  providers:[
               {provide:DateAdapter,
                useClass:MomentDateAdapter,
                deps:[MAT_DATE_LOCALE,MAT_MOMENT_DATE_ADAPTER_OPTIONS]
               },
               {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
            ]
})
export class HealthWorkersComponent implements OnInit {

  @ViewChild("pdfTable", { static: false }) pdfTable: ElementRef;
  selectedPatient: Patient;
  patients: Patient[];
  noUpcomingPatients: boolean = true;
  searchKey=new FormControl();
  fieldOptions :Option[]= [
    { value: 'name', label: 'Name' },
    { value: 'phoneNumber', label: 'Phone Number' },
    { value: 'email', label: 'Email' }];
  selectedField:string;
  defaultOption="name";
  queryError:boolean=false;
  errorMessage:string="";
  queriedPatients:Patient[];
  querySuccess:boolean=false;
  minDate:Date=new Date();
  maxDate:Date=new Date(this.minDate.getFullYear()+1,this.minDate.getMonth(),this.minDate.getDate());
  unformattedDate:any;
  appointmentDate:string;

  constructor(private modalService: NgbModal, private dbOps: DBOperationsService) { }

  ngOnInit() {
    const ref=this.dbOps.getPatients();
    this.patients=[];
    this.selectedPatient=new Patient();
    ref.subscribe(doc=>
      {
        this.patients=<Patient[]>doc;
        this.noUpcomingPatients=this.patients.length==0;
        this.patients.sort(function (a, b) {
          var year1 = Number(a.appointmentDate.substring(6, 10));
          var year2 = Number(b.appointmentDate.substring(6, 10));
          if (year1 != year2)
            return year2 - year1;
          var month1 = Number(a.appointmentDate.substring(3, 5));
          var month2 = Number(b.appointmentDate.substring(3, 5));
          if (month1 != month2)
            return month2 - month1;
          var day1 = Number(a.appointmentDate.substring(0, 2));
          var day2 = Number(b.appointmentDate.substring(0, 2));
          return day2 - day1;
          });
      });
  }
  public viewPatientDetails(patient: any, id: string) {
    this.selectedPatient = patient;
    this.modalService.open(id);
  }
  public sendPhoneReminder() {
    console.log("Reminder sent to " + this.selectedPatient.name + ". The phone number is " + this.selectedPatient.phoneNumber);
  }

  public newPatient(id: string) {
    this.modalService.open(id,{ size: 'xl' });
  }

  public downloadPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    console.log(this.pdfTable)
    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }

  public onSearchClick()
  {
    if(this.selectedField==null || this.searchKey.value==null || this.searchKey.value=="")
    {
      this.queryError=true;
      this.errorMessage="Please select a proper search field and enter a proper value";
    }
    else
    {
      this.queryError=false;
      this.errorMessage="";
      const ref=this.dbOps.searchPatient(this.selectedField,this.searchKey.value);
      ref.subscribe(doc =>
        {
          this.queriedPatients=<Patient[]>doc;
          if(this.queriedPatients.length>0)
            this.querySuccess=true;
          else
          {
            this.queryError=true;
            this.errorMessage="No result found for the above query";
          }
        });
    }
  }
  public bookAppointment(patient:Patient,id)
  {
    this.selectedPatient=patient;
    this.modalService.open(id);
  }
  public updateAppointments()
  {
    var month=this.unformattedDate._i.month;
    var date=this.unformattedDate.toString().substring(7,10);
    var year=this.unformattedDate.toString().substring(11,15);
    month=month+1;
    if(String(month).length<2)
      month="0"+month;
    this.appointmentDate=date+"."+month+"."+year;
    this.selectedPatient.appointmentDate=this.appointmentDate;
    this.dbOps.updatePatientDetails(this.selectedPatient);
  }
 
}
