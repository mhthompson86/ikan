import { Component, OnInit } from '@angular/core';

import { IssueService } from '../core/services/issue.service';
import { IssuesByColumn } from '../shared/models/issues-by-column';
import { Column } from '../shared/models/column';
import { IssueType } from '../shared/models/issue-type';
import { UserService } from '../core/services/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'ikan-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  issuesByColumn: IssuesByColumn;
  columns: Column[];
  issueTypes: IssueType[];
  users: User[];

  constructor(private issueService: IssueService,
              private userService: UserService) { }

  ngOnInit() {
    this.getColumns();
    this.getIssues();
    this.getIssueTypes();
    this.getUsers();
  }

  getIssues(): void {
    this.issueService.getIssues().subscribe((issues: IssuesByColumn) => this.issuesByColumn = issues);
  }

  getColumns(): void {
    this.issueService.getColumns().subscribe((columns: Column[]) => this.columns = columns);
  }

  getIssueTypes(): void {
    this.issueService.getIssueTypes().subscribe((issueTypes: IssueType[]) => this.issueTypes = issueTypes);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => this.users = users);
  }

}
