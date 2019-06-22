import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ikan-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss']
})
export class IssueCreateComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    (document.activeElement as HTMLButtonElement).blur();
  }
}
