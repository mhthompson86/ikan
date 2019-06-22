import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material';

import { IssueCreateComponent } from '../components/issue-create/issue-create.component';
import { Issue } from '../../shared/models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private dialog: MatDialog) { }


  openCreateIssueDialog(issue?: Issue) {
    this.dialog.open(IssueCreateComponent, {
      panelClass: 'issue-create-dialog',
      data: { issue }
    });
  }


}
