import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ikan-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  selectedUser: User;
  users: User[];
  password: string;
  correctPassword = 'AngularIsBetterThanReact';
  loginAttempted = false;
  newUser: User;
  subscriptions = new Subscription();

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.newUser = new User();
    this.getUsers();
    document.body.classList.add('boat-dog');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    document.body.classList.remove('boat-dog');
  }

  login() {
    this.loginAttempted = true;
    if (this.password === this.correctPassword) {
      this.authService.logIn(this.selectedUser);
    }
  }

  getUsers(): void {
    this.subscriptions.add(this.userService.getUsers().subscribe((users: User[]) => this.users = users));
  }

  addUser() {
    this.userService.addUser(this.newUser).then( resp => console.log('resp:', resp));
  }

}
