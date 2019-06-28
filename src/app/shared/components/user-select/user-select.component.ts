import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ikan-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit, OnDestroy {
  @Input() user?: User;
  @Input() userId?: string;
  @Input() users: User[];
  @Input() disabled?: boolean;

  @Output() select = new EventEmitter();

  subscriptions = new Subscription();

  constructor(private userService: UserService) { }
  ngOnInit() {
    if (!this.user) this.getUser();
    if (!this.users) this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUser(): void {
    this.subscriptions.add(this.userService.getUser(this.userId).subscribe(user => this.user = user));
  }

  getUsers(): void {
    this.subscriptions.add(this.userService.getUsers().subscribe((users: User[]) => this.users = users));
  }

  selectUser(user: User) {
    this.user = user;
    this.userId = user.id;
    this.select.emit(user);
  }

}
