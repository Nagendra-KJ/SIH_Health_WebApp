import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { SharedDataService } from './shared-data.service';
import { PatientsComponent } from './dashboard/patients/patients.component';
import { DoctorsComponent } from './dashboard/doctors/doctors.component';
import { HealthWorkersComponent } from './dashboard/health-workers/health-workers.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    PatientsComponent,
    DoctorsComponent,
    HealthWorkersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [AuthGuard, AuthService, AngularFirestore, SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
