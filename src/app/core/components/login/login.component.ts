import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ikan-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  password: string;
  correctPassword = 'AngularIsBetterThanReact';
  loginAttempted = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    document.body.classList.add('boat-dog');
  }

  ngOnDestroy() {
    document.body.classList.remove('boat-dog');
  }

  login() {
    this.loginAttempted = true;
    console.log('this.password:', this.password, this.correctPassword);
    if (this.password === this.correctPassword) {
      this.authService.logIn();
    }
  }

}
