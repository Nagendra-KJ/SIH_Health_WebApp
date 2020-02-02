import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { DBOperationsService } from '../shared/services/dboperations.service';
import { User } from '../shared/models/user';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl();
  password = new FormControl();
  loginError: boolean = false;
  warningText: string = "";

  constructor(private auth: AuthService, private router: Router, private dbService: DBOperationsService,
    private sharedData: SharedDataService) { }
  ngOnDestroy() {
    document.body.classList.remove('bg-img');
  }
  ngOnInit() {
    document.body.classList.add('bg-img');
    if (this.auth.authenticated()) {
      this.loginError = true;
      this.warningText = "You have been logged out automatically, please login again to continue";
      this.auth.logout();
    }
    else {
      this.warningText = "";
      this.loginError = false;
    }
  }

  onLoginClick() {
    this.loginError = false;
    if (this.email.value != null && this.password.value != null) {
      this.warningText = "";
      var result = this.auth.login(this.email.value, this.password.value);
      result.then((user) => {
        const ref = this.dbService.getUser(user.user.uid);

        ref.subscribe(async doc => {

          let userData: User = <User>doc[0];
          this.sharedData.setUserData(userData);
        })

      })
      result.catch(err => {
        this.loginError = true;
        this.warningText = "Email or Password is incorrect. Are you sure you are a registered user?";
        console.log(err);
      });
      this.router.navigate(['/dashboard']);
    }
    else {
      this.warningText = "Please enter a valid Email and Password combination";
      this.loginError = true;
    }
  }
  onForgotPasswordClick() {
    this.auth.logout();
    this.loginError = true;
    if (this.email.value == null) {
      this.warningText = "Please enter a valid email";
    }
    else {
      var result = this.auth.resetPassword(this.email.value);
      result.then(() => {
        this.warningText = "Password reset email sent successfully";
      });
      result.catch(err => {
        this.warningText = "There was an error sending your password reset email";
        console.log(err);
      });
    }
  }
}
