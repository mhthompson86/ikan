import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { IssueCreateComponent } from '../components/issue-create/issue-create.component';
import { Issue } from '../../shared/models/issue';
import { IssuesByColumn } from '../../shared/models/issues-by-column';
import { Column } from '../../shared/models/column';
import { map, tap } from 'rxjs/operators';
import { IssueType } from '../../shared/models/issue-type';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  issues: IssuesByColumn;

  constructor(private http: HttpClient,
              private dialog: MatDialog) { }


  getIssues(): Observable<IssuesByColumn> {
    const issues = localStorage.getItem('issues');
    if (issues) return of(JSON.parse(issues));
    return this.http.get<{ issues: IssuesByColumn }>('/assets/mock-data/issues.json')
      .pipe(
        map(resp => resp.issues),
        tap(i => {
          this.issues = i;
          this.saveIssues();
        })
      );
  }

  updateIssue(issue: Issue): Observable<Issue> {
    const index = this.issues[issue.columnId].findIndex((i: Issue) => i.id === issue.id);
    this.issues[issue.columnId][index] = issue;
    this.saveIssues();
    return of(issue);
  }

  saveIssues() {
    localStorage.setItem('issues', JSON.stringify(this.issues));
  }

  getColumns(): Observable<Column[]> {
    return this.http.get<{ columns: Column[] }>('/assets/mock-data/columns.json')
      .pipe(
        map(resp => resp.columns)
      );
  }


  openCreateIssueDialog(issue?: Issue) {
    this.dialog.open(IssueCreateComponent, {
      panelClass: 'issue-create-dialog',
      data: { issue }
    });
  }

  getIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>('/assets/mock-data/issue-types.json');
  }


}
