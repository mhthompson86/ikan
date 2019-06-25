import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Issue } from '../../models/issue';
import { IssueType } from '../../models/issue-type';
import { User } from '../../models/user';
import { IssueService } from '../../../core/services/issue.service';
import { SessionService } from '../../../core/services/session.service';
import { Comment } from '../../models/comment';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'ikan-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit, OnDestroy {
  @Input() issue: Issue;
  @Input() users: User[];
  @Input() issueTypes: IssueType[];

  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() close = new EventEmitter();

  updateSub = new Subject<Issue>();
  subscriptions = new Subscription();
  commentSub = new Subject<Comment>();
  newCommentText: string;
  currentUser: User;


  constructor(private issueService: IssueService,
              private sessionService: SessionService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.subscriptions.add(this.updateSub.pipe(debounceTime(400)).subscribe(issue => this.save.emit(issue)));
    this.subscriptions.add(this.commentSub.pipe(debounceTime(400)).subscribe((comment: Comment) => this.onCommentEdit(comment)));

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setIssueType(issueType: IssueType): void {
    this.issue.issueType = issueType;
  }


  selectUser(user: User): void {
    this.issue.user = user;
  }


  deleteIssue() {
    this.issueService.confirmDeleteIssueDialog(this.issue).subscribe((result: boolean) => {
      if (result) this.delete.emit();
    });
  }

  addComment() {
    if (!this.issue.comments) this.issue.comments = [];
    this.issue.comments.push(new Comment(this.currentUser, this.newCommentText));
    this.newCommentText = null;
    this.save.emit(this.issue);
    (document.activeElement as HTMLButtonElement).blur();
  }

  onCommentEdit(comment: Comment) {
    comment.editedDate = new Date();
    this.save.emit(this.issue);
  }

  deleteComment(index: number) {
    this.issue.comments.splice(index, 1);
    this.save.emit(this.issue);
  }



}
