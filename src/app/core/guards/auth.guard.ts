import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, Router, CanLoad, Route } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<LoginComponent>, CanLoad {


  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(route: Route): boolean {
    return this.checkIfLoggedIn(route.path);
  }


  canDeactivate(
    component: LoginComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIfLoggedIn(state.url);
  }

  checkIfLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
