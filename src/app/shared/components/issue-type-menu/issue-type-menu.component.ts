import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IssueType } from '../../models/issue-type';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  selector: 'ikan-issue-type-menu',
  templateUrl: './issue-type-menu.component.html',
  styleUrls: ['./issue-type-menu.component.scss']
})
export class IssueTypeMenuComponent implements OnInit {
  @Input() issueType: IssueType;
  @Input() issueTypes?: IssueType[];
  @Input() disabled?: boolean;

  @Output() update = new EventEmitter<IssueType>();

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    if (!this.issueTypes) this.issueService.getIssueTypes().subscribe((issueTypes: IssueType[]) => this.issueTypes = issueTypes);
  }

  setIssueType(type: IssueType) {
    this.issueType = type;
    this.update.emit(type);
  }

}
