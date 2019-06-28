import { Component, OnDestroy, OnInit } from '@angular/core';

import { IssueService } from '../core/services/issue.service';
import { IssuesByColumn } from '../shared/models/issues-by-column';
import { Column } from '../shared/models/column';
import { IssueType } from '../shared/models/issue-type';
import { UserService } from '../core/services/user.service';
import { User } from '../shared/models/user';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Issue } from '../shared/models/issue';
import { Subscription } from 'rxjs';
import { CreateService } from '../core/services/create.service';

@Component({
  selector: 'ikan-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  issuesByColumn: IssuesByColumn = {};
  issues: Issue[];
  columns: Column[];
  issueTypes: IssueType[];
  users: User[];
  subscriptions = new Subscription();

  constructor(public issueService: IssueService,
              private userService: UserService,
              private createService: CreateService) { }

  ngOnInit() {
    this.getIssues();
    this.getColumns();
    this.getUsers();
    this.getIssueTypes();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  getIssues(): void {
    this.subscriptions.add(this.issueService.getIssues().subscribe((issues: Issue[]) => {
      this.issues = issues;
      this.setIssuesByColumn();
    }));
  }

  getColumns(): void {
    this.subscriptions.add(this.issueService.getColumns().subscribe((columns: Column[]) => {
      this.columns = columns;
      this.setIssuesByColumn();
    }));
  }

  getUsers(): void {
    this.subscriptions.add(this.userService.getUsers().subscribe((users: User[]) => this.users = users));
  }

  setIssuesByColumn() {
    if (this.issues && this.columns) {
      this.columns.forEach((column: Column) => {
        this.issuesByColumn[column.id] = [];
      });
      this.issues.forEach((issue: Issue) => {
        if (!this.issuesByColumn[issue.columnId]) this.issuesByColumn[issue.columnId] = [];
        this.issuesByColumn[issue.columnId].push(issue);
      });
    }
  }

  updateIssue(issue) {
    this.issueService.updateIssue(issue.id, issue).then();
  }

  getIssueTypes(): void {
    this.issueService.getIssueTypes().subscribe((issueTypes: IssueType[]) => this.issueTypes = issueTypes);
  }


  openIssue(issue: Issue) {
    this.createService.openCreateIssueDialog(issue);
  }

  getTotalStoryPoints(column: Column): number {
    if (this.issuesByColumn[column.id])
      return this.issuesByColumn[column.id].reduce((sum: number, issue: Issue) => sum + issue.storyPoints, 0);
  }

  dropIssue(event: CdkDragDrop<Issue[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    //this.issueService.saveToLocalStorage(this.issuesByColumn);
    // update ordinals and save
    // API that accepts an array of {id: 82345, ordinal: 1}
  }


}
