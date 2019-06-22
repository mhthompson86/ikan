import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { IssueCreateComponent } from '../components/issue-create/issue-create.component';
import { Issue } from '../../shared/models/issue';
import { IssuesByColumn } from '../../shared/models/issues-by-column';
import { Column } from '../../shared/models/column';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient,
              private dialog: MatDialog) { }


  getIssues(): Observable<IssuesByColumn> {
    return this.http.get<{ issues: IssuesByColumn }>('/assets/mock-data/issues.json')
      .pipe(
        map(resp => resp.issues)
      );
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


}
