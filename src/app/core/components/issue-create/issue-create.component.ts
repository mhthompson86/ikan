import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Issue } from '../../../shared/models/issue';
import { SessionService } from '../../services/session.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../services/user.service';
import { IssueService } from '../../services/issue.service';
import { IssueType } from '../../../shared/models/issue-type';
import { AuthService } from '../../services/auth.service';
import { Comment } from '../../../shared/models/comment';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  newCommentText: string;
  currentUser: User;
  subscriptions = new Subscription();
  commentSub$ = new Subject<Comment>();

  constructor(private dialogRef: MatDialogRef<IssueCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {issue?: Issue, numberOfIssues: number},
              public sessionService: SessionService,
              private userService: UserService,
              private issueService: IssueService,
              private authService: AuthService) {
    this.issue = this.data.issue ? this.data.issue : new Issue(this.data.numberOfIssues);
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.userService.getUsers().subscribe((users: User[]) => this.users = users);
    this.issueService.getIssueTypes().subscribe((issueTypes: IssueType[]) => this.issueTypes = issueTypes);
    this.subscriptions.add(this.commentSub$.pipe(debounceTime(400)).subscribe((comment: Comment) => this.onCommentEdit(comment)));
  }

  ngOnDestroy(): void {
    (document.activeElement as HTMLButtonElement).blur();
  }

  saveIssue(close = true) {
    this.spinner = true;
    if (this.data.issue) {
      this.issueService.updateIssue(this.issue);
      if (close) this.dialogRef.close();
      this.spinner = false;
    } else {
      this.issue.createdDate = new Date();
      this.issue.createdBy = this.authService.currentUser.fullName;
      this.issueService.createIssue(this.issue).subscribe(() => {
        if (close) this.dialogRef.close();
        this.spinner = false;
      });
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
    return !!this.issue.title.length;
  }

  setIssueType(issueType: IssueType): void {
    this.issue.issueType = issueType;
  }

  addComment() {
    if (!this.issue.comments) this.issue.comments = [];
    this.issue.comments.push(new Comment(this.currentUser, this.newCommentText));
    this.saveIssue(false);
    this.newCommentText = null;
    (document.activeElement as HTMLButtonElement).blur();
  }

  onCommentEdit(comment: Comment) {
    comment.editedDate = new Date();
    this.saveIssue(false);
  }

  deleteComment(index: number) {
    this.issue.comments.splice(index, 1);
    this.saveIssue(false);
  }
}
