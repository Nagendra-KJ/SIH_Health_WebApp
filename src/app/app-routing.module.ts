import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
