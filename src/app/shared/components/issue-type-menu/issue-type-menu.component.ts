import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { IssueType } from '../../models/issue-type';
import { IssueService } from '../../../core/services/issue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ikan-issue-type-menu',
  templateUrl: './issue-type-menu.component.html',
  styleUrls: ['./issue-type-menu.component.scss']
})
export class IssueTypeMenuComponent implements OnInit, OnDestroy {
  @Input() issueType?: IssueType;
  @Input() issueTypeId?: string;
  @Input() disabled?: boolean;

  @Output() update = new EventEmitter<IssueType>();
  issueTypes: IssueType[];
  subscriptions = new Subscription();

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.subscriptions.add(this.issueService.getIssueTypes().subscribe((issueTypes: IssueType[]) => this.issueTypes = issueTypes));
    if (!this.issueType) this.issueService.getIssueType(this.issueTypeId).subscribe((issueType: IssueType) => this.issueType = issueType);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setIssueType(type: IssueType) {
    this.issueType = type;
    this.update.emit(type);
  }

}
