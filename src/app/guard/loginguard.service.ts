import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { CanActivate, RouteConfigLoadEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate {
  constructor( private router: Router ) {}
  canActivate() {
    if (localStorage.length === 0) {
     // return confirm('Login Please').then((confirmed) => console.log('User confirmed:', confirmed));
     this.router.navigate(['/Login']);
    }
    return true;
  }
}
