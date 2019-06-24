import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'ikan-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {
  @Input() user: User;
  @Input() users: User[];

  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectUser(user: User) {
    this.user = user;
    this.select.emit(user);
  }

}
