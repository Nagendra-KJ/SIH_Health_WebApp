import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl();
  password = new FormControl();

  constructor() { }

  ngOnInit() {}

  onLoginClick()
  {
    console.log("Login button was clicked");
    console.log("Username is "+this.username.value);
    console.log("Password is "+this.password.value);
  }
}
