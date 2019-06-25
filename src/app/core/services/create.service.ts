import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material';
import * as _cloneDeep from 'lodash/cloneDeep';

import { IssueService } from './issue.service';
import { Issue } from '../../shared/models/issue';
import { IssueCreateComponent } from '../components/issue-create/issue-create.component';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private issueService: IssueService,
              private dialog: MatDialog) { }

  openCreateIssueDialog(issue?: Issue) {
    this.dialog.open(IssueCreateComponent, {
      panelClass: 'issue-create-dialog',
      data: {
        issue: _cloneDeep(issue),
        numberOfIssues: this.issueService.numberOfIssues
      }
    });
  }
}
