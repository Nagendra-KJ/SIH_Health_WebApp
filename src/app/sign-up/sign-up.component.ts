import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  firstName=new FormControl();
  lastName=new FormControl();
  email=new FormControl();
  password= new FormControl();
  cPassword= new FormControl();
  phoneNumber= new FormControl();
  userType = new FormControl();
  validationError:boolean=false;
  errorMessage:string;

  constructor() { }

  ngOnInit() {}

  onSignUpClick()
  {
    if(this.validateForm())
      console.log("Form Validated");
    console.log(this.userType.value);
    
  }
  
  validateForm()
  {
    if(this.firstName.value==null)
    {
      this.validationError=true;
      this.errorMessage="Please enter a proper first name";
      return false;
    }
    if(this.lastName.value==null)
    {
      this.validationError=true;
      this.errorMessage="Please enter a proper last name";
      return false;
    }
    if(this.email.value==null)
    {
      this.validationError=true;
      this.errorMessage="Please enter a proper email";
      return false;
    }
    if(this.password.value==null)
    {
      this.validationError=true;
      this.errorMessage="Please enter a proper password";
      return false;
    }
    if(this.password.value.length<6)
    {
      this.validationError=true;
      this.errorMessage="Password must be atleast 6 characters long";
      return false;
    }
    if(this.password.value!=this.cPassword.value)
    {
      this.validationError=true;
      this.errorMessage="Password and confirmation do not match";
      return false;
    }
    if(this.phoneNumber.value==null || this.phoneNumber.value.length<10)
    {
      this.validationError=true;
      this.errorMessage="Please enter a valid Phone number";
      return false;
    } 
    if(this.userType.value==null)
    {
      this.validationError=true;
      this.errorMessage="Please select what kind of user you are";
      return false;
    } 
    this.validationError=false;
    this.errorMessage="";
    return true;
  }

}
