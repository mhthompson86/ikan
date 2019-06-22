import { Component, OnInit } from '@angular/core';
import { IssueService } from '../core/services/issue.service';
import { IssuesByColumn } from '../shared/models/issues-by-column';
import { Column } from '../shared/models/column';

@Component({
  selector: 'ikan-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  issuesByColumn: IssuesByColumn;
  columns: Column[];

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.getColumns();
    this.getIssues();
  }

  getIssues(): void {
    this.issueService.getIssues().subscribe((issues: IssuesByColumn) => this.issuesByColumn = issues);
  }

  getColumns(): void {
    this.issueService.getColumns().subscribe((columns: Column[]) => this.columns = columns);
  }

}
