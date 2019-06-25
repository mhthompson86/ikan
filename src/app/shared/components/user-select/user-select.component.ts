import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'ikan-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {
  @Input() user: User;
  @Input() users: User[];
  @Input() disabled?: boolean;

  @Output() select = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (!this.users) this.userService.getUsers().subscribe((users: User[]) => this.users = users);
  }

  selectUser(user: User) {
    this.user = user;
    this.select.emit(user);
  }

}
