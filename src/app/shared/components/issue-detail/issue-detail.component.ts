import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Issue } from '../../models/issue';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'ikan-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  @Input() issue: Issue;

  constructor() {
  }

  ngOnInit() {
  }

  close() {

  }

  delete() {

  }


}
