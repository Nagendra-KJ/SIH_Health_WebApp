import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  photo: string = "";
  user: User;
  constructor(private sharedData: SharedDataService) { }

  ngOnInit() {
    this.user = new User();

    this.sharedData.userData.subscribe(data => {
      this.user = data;
      this.photo = this.user.image;
      console.log(this.user)
    });



  }

}
