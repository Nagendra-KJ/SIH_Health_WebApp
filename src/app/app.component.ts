import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SharedDataService } from './shared-data.service';
import { User } from './shared/models/user';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  userData: User = new User();

  constructor(private sharedData: SharedDataService, private router: Router) { }
  ngOnInit(){}
  title = 'SIH2020';
}
