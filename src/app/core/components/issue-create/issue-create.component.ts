import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Issue } from '../../../shared/models/issue';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ikan-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss']
})
export class IssueCreateComponent implements OnInit, OnDestroy {
  issue: Issue;

  constructor(private dialogRef: MatDialogRef<IssueCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {issue?: Issue},
              private authService: AuthService) {
    this.issue = this.data.issue ? this.data.issue : new Issue(this.authService.currentUser);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    (document.activeElement as HTMLButtonElement).blur();
  }
}
