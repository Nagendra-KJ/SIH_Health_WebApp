import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { DBOperationsService } from '../shared/services/dboperations.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  firstName = new FormControl();
  lastName = new FormControl();
  email = new FormControl();
  password = new FormControl();
  cPassword = new FormControl();
  phoneNumber = new FormControl();
  userType = new FormControl();
  validationError: boolean = false;
  errorMessage: string;
  myUser = new User();

  constructor(private auth: AuthService, private router: Router, private databaseService: DBOperationsService) { }

  ngOnInit() { }

  onSignUpClick() {
    if (this.validateForm()) {
      console.log("Form Validated");
      this.myUser.firstName = this.firstName.value;
      this.myUser.lastName = this.lastName.value;
      this.myUser.password = this.password.value;
      this.myUser.phoneNumber = this.phoneNumber.value;
      this.myUser.userType = this.userType.value;
      this.myUser.email = this.email.value;
      let promi = this.auth.registerUser(this.myUser)
      promi.then((userAuth) => {
        console.log(userAuth);
        this.myUser.userId = userAuth.user.uid;

        this.databaseService.addUser(this.myUser);

        return;
      }, (error) => {
        console.log(error);
        if (error.code == "auth/email-already-in-use") {
          this.validationError = true;
          this.errorMessage = "This email is already registered";

        }
      })


    };



  }

  validateForm() {
    if (this.firstName.value == null) {
      this.validationError = true;
      this.errorMessage = "Please enter a proper first name";
      return false;
    }
    if (this.lastName.value == null) {
      this.validationError = true;
      this.errorMessage = "Please enter a proper last name";
      return false;
    }
    if (this.email.value == null) {
      this.validationError = true;
      this.errorMessage = "Please enter a proper email";
      return false;
    }
    if (this.password.value == null) {
      this.validationError = true;
      this.errorMessage = "Please enter a proper password";
      return false;
    }
    if (this.password.value.length < 6) {
      this.validationError = true;
      this.errorMessage = "Password must be atleast 6 characters long";
      return false;
    }
    if (this.password.value != this.cPassword.value) {
      this.validationError = true;
      this.errorMessage = "Password and confirmation do not match";
      return false;
    }
    if (this.phoneNumber.value == null || this.phoneNumber.value.length < 10) {
      this.validationError = true;
      this.errorMessage = "Please enter a valid Phone number";
      return false;
    }
    if (this.userType.value == null) {
      this.validationError = true;
      this.errorMessage = "Please select what kind of user you are";
      return false;
    }
    this.validationError = false;
    this.errorMessage = "";
    return true;
  }

}
