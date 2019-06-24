import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  constructor(private router: Router) { }

  logOut() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }


  logIn(user: User) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['']);
    }
  }

}
