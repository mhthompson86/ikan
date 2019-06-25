import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, tap, timeout } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


import { Issue } from '../../shared/models/issue';
import { IssuesByColumn } from '../../shared/models/issues-by-column';
import { Column } from '../../shared/models/column';
import { IssueType } from '../../shared/models/issue-type';
import { SpinnerService } from './spinner.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class IssueService {
  issuesByColumn: IssuesByColumn;
  issuesByColumn$ = new BehaviorSubject<IssuesByColumn>(null);
  numberOfIssues: number;
  newIssue$ = new Subject<Issue>();

  constructor(private http: HttpClient,
              private spinnerService: SpinnerService,
              private dialog: MatDialog) { }


  getIssues(): Observable<IssuesByColumn> {
    const storedIssues = localStorage.getItem('issues');
    if (storedIssues) {
      const issues = JSON.parse(storedIssues);
      this.setIssues(issues);
      return of(issues);
    }
    return this.http.get<{ issues: IssuesByColumn }>('/assets/mock-data/issues.json')
      .pipe(
        timeout(2000),
        map(resp => resp.issues),
        tap(i => {
          this.setIssues(i);
          this.saveToLocalStorage();
        })
      );
  }

  setIssues(i: IssuesByColumn) {
    this.issuesByColumn = i;
    this.issuesByColumn$.next(i);
    if (!this.numberOfIssues) this.numberOfIssues = 0;
    const keys = Object.keys(i);
    keys.forEach((k: string) => {
      this.numberOfIssues += i[k].length;
    });
  }

  updateIssue(issue: Issue){
    const index = this.issuesByColumn[issue.columnId].findIndex((i: Issue) => i.id === issue.id);
    this.issuesByColumn[issue.columnId][index] = issue;
    this.saveToLocalStorage();
    this.issuesByColumn$.next(this.issuesByColumn);
  }

  createIssue(issue: Issue): Observable<Issue> {
    this.issuesByColumn[issue.columnId].push(issue);
    this.saveToLocalStorage();
    return of(issue).pipe(
      timeout(2000)
    );
  }

  saveToLocalStorage() {
    localStorage.setItem('issues', JSON.stringify(this.issuesByColumn));
  }
  
  deleteIssue(issue: Issue): Observable<Issue> {
    const index = this.issuesByColumn[issue.columnId].findIndex((i: Issue) => i.id === issue.id);
    this.issuesByColumn[issue.columnId].splice(index, 1);
    this.saveToLocalStorage();
    return of(issue).pipe(
      timeout(2000)
    );
  }

  getColumns(): Observable<Column[]> {
    return this.http.get<{ columns: Column[] }>('/assets/mock-data/columns.json')
      .pipe(
        timeout(1000),
        map(resp => resp.columns)
      );
  }

  getIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>('/assets/mock-data/issue-types.json')
      .pipe(
        timeout(1000),
      );
  }

  confirmDeleteIssueDialog(issue: Issue): Observable<boolean> {
    const confirmDeleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Delete ${issue.issueId}?`,
        message: 'You\'re about to permanently delete this issue and all of its data.',
        okButton: 'Delete',
        okButtonColor: 'accent',
        cancelBtn: 'Cancel'
      },
      panelClass: 'confirm-dialog-container'
    });
    return confirmDeleteDialogRef.afterClosed();
  }


}
