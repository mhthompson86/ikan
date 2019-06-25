import { Component, OnInit } from '@angular/core';

import { Issue } from '../shared/models/issue';

@Component({
  selector: 'ikan-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  selectedIssue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
