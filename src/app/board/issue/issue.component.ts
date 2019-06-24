import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Issue } from '../../shared/models/issue';
import { IssueType } from '../../shared/models/issue-type';
import { User } from '../../shared/models/user';
import { IssueService } from '../../core/services/issue.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'ikan-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue;
  @Input() issueTypes?: IssueType[];
  @Input() users?: User[];

  @Output() update = new EventEmitter<Issue>();
  @Output() delete = new EventEmitter<Issue>();

  constructor(private issueService: IssueService,
              private userService: UserService) { }

  ngOnInit() {
    if (!this.issueTypes) this.issueService.getIssueTypes().subscribe((issueTypes: IssueType[]) => this.issueTypes = issueTypes);
    if (!this.users) this.userService.getUsers().subscribe((users: User[]) => this.users = users);
  }

  onUpdate() {
    this.update.emit(this.issue);
  }

  onDelete() {
    this.delete.emit(this.issue);
  }

  onSelectUser(user: User) {
    this.issue.user = user;
    this.issue.userId = user.id;
  }

}
