import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedIn');
  }

  constructor(private router: Router) { }

  logOut() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['login']);
  }


  logIn() {
    localStorage.setItem('loggedIn', 'foo');

    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['']);
    }
  }

}
