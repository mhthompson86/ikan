import { Component, Input, OnInit } from '@angular/core';

import { Issue } from '../../shared/models/issue';

@Component({
  selector: 'ikan-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
