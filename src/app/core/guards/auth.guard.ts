import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate,
  Router,
  CanLoad,
  Route,
  CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanDeactivate<LoginComponent>, CanLoad {


  constructor(private authService: AuthService,
              private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('checking can activate');
    return this.checkIfLoggedIn(state.url);
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
    console.log('is logged in:', this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) return true;
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
