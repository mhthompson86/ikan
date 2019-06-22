import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { SessionService } from '../../services/session.service';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'ikan-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  pageTitle$: Observable<string>;
  logo = 'assets/images/logo.png';
  navLinks = [
    { path: '', label: 'DEV BOARD', icon: 'developer_board' },
    { path: '/backlog', label: 'BACKLOG', icon: 'list' }
  ];

  constructor(private sessionService: SessionService,
              private issueService: IssueService) {}

  ngOnInit() {
    this.pageTitle$ = this.sessionService.pageTitle$;
  }

  openCreateIssueDialog() {
    this.issueService.openCreateIssueDialog();
  }

}
