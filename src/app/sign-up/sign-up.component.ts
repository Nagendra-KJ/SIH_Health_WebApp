import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { DBOperationsService } from '../shared/services/dboperations.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, finalize } from 'rxjs/operators';

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
  disabled = true;

  constructor(private auth: AuthService, private router: Router, private databaseService: DBOperationsService,
    private storage: AngularFireStorage, private db: AngularFirestore) { }

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
        this.validationError = true;
        if (error.code == "auth/email-already-in-use") {
          this.errorMessage = "This email is already registered";
        }
        else {
          this.errorMessage = "There was an error when we were trying to register your user";
        }
      });
    }
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


  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;




  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })
    const ref = this.storage.ref(path);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges()

    this.task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.myUser.image = url;
          this.disabled = false;
          // <-- do what ever you want with the url..
        });
      }))
      .subscribe();

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
