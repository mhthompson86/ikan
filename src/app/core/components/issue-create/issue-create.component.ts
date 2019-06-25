import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Issue } from '../../../shared/models/issue';
import { SessionService } from '../../services/session.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../services/user.service';
import { IssueService } from '../../services/issue.service';
import { IssueType } from '../../../shared/models/issue-type';

@Component({
  selector: 'ikan-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss']
})
export class IssueCreateComponent implements OnInit, OnDestroy {
  issue: Issue;
  users: User[];
  issueTypes: IssueType[];
  spinner = false;

  constructor(private dialogRef: MatDialogRef<IssueCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {issue?: Issue, numberOfIssues: number},
              public sessionService: SessionService,
              private userService: UserService,
              private issueService: IssueService) {
    this.issue = this.data.issue ? this.data.issue : new Issue(this.data.numberOfIssues);
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => this.users = users);
    this.issueService.getIssueTypes().subscribe((issueTypes: IssueType[]) => this.issueTypes = issueTypes);
  }

  ngOnDestroy(): void {
    (document.activeElement as HTMLButtonElement).blur();
  }

  saveIssue() {
    this.spinner = true;
    if (this.data.issue) {
      this.issueService.updateIssue(this.issue);
      this.dialogRef.close();
    } else {
      this.issueService.createIssue(this.issue).subscribe(() => this.dialogRef.close());
    }
  }

  delete() {
    this.issueService.confirmDeleteIssueDialog(this.issue).subscribe((result: boolean) => {
      if (result) this.issueService.deleteIssue(this.issue).subscribe(() => this.dialogRef.close());
    });
  }

  selectUser(user: User): void {
    this.issue.user = user;
  }

  itemIsValid(): boolean {
    return !!this.issue.title.length && this.issue.storyPoints && this.issue.storyPoints > 0;
  }

  setIssueType(issueType: IssueType): void {
    this.issue.issueType = issueType;
  }
}
