import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/models/patient';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { uuid } from 'uuid';
import { DBOperationsService } from '../shared/services/dboperations.service';
import { map } from 'rxjs/operators';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { SharedDataService } from '../shared-data.service';
import { User } from '../shared/models/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: User;
  constructor(private sharedData: SharedDataService) { }

  ngOnInit() {
    this.userData = this.sharedData.getUserData();
    console.log(this.userData)

  }
}
