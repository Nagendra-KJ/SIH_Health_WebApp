import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router) {}
  
  canActivate()
  {
    if(this.auth.authenticated())
    {
      return true;
    }
    console.log("Please login to proceed");
    this.router.navigate(['/'])
    return false;
  }
  
}
