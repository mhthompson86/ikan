import { Component, OnDestroy, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Issue } from '../shared/models/issue';
import { IssueService } from '../core/services/issue.service';
import { SessionService } from '../core/services/session.service';
import { Subscription } from 'rxjs';
import { SortingTracker } from '../shared/models/sorting-tracker';
import { Sorted } from '../shared/models/sorted.enum';
import { SortingService } from '../core/services/sorting.service';
import { OrderByPipe } from '../shared/pipes/order-by.pipe';
import { User } from '../shared/models/user';
import { UserService } from '../core/services/user.service';
import { FilterByPipe } from '../shared/pipes/filter-by.pipe';

@Component({
  selector: 'ikan-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy {

  issues: Issue[];
  issuesCopy: Issue[];
  selectedIssue: Issue;
  selectedIndex: number;
  issueUrl: string;
  subscriptions = new Subscription();
  sortProperties = ['title', 'user'];
  sorter: SortingTracker = new SortingTracker(...this.sortProperties);
  Sorted = Sorted;
  users: User[];
  userIdsFilter = [];


  constructor(private issueService: IssueService,
              public sessionService: SessionService,
              private sortingService: SortingService,
              private orderByPipe: OrderByPipe,
              private userService: UserService) { }

  ngOnInit() {
    this.subscriptions.add(this.issueService.getIssues().subscribe((issues: Issue[]) => this.setIssues(issues)));
    this.subscriptions.add(this.userService.getUsers().subscribe((users: User[]) => this.users = users));

    this.subscriptions.add( this.issueService.newIssue$.subscribe((issue: Issue) => {
      this.issues.push(issue);
      this.issuesCopy.push(issue);
      const currentSort = SortingService.getCurrentSortProperty(this.sorter);
      if (currentSort) this.sortBy(currentSort as 'title' | 'user', this.sorter[currentSort] as Sorted.ascending | Sorted.descending);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setIssues(issues: Issue[]) {
    const sorted = this.orderByPipe.transform(issues, 'ordinal');
    this.issues = sorted;
    this.issuesCopy = [...sorted];
  }

  selectIssue(issue: Issue, i: number) {
    if (this.selectedIssue && this.selectedIssue.id === issue.id) {
      this.closeDetailView();
    } else {
      this.selectedIssue = issue;
      this.selectedIndex = i;
      const preComponent = location.pathname.split('issue')[0];
      this.issueUrl = `${ location.origin }${ preComponent }issue/${ this.selectedIssue.id }`;
    }
  }

  closeDetailView() {
    this.selectedIssue = null;
    this.selectedIndex = null;
  }

  toggleFilter(user?: User) {
    if (this.userIdsFilter.indexOf(user ? user.id : null) === -1) {
      this.userIdsFilter.push(user ? user.id : null);
    } else {
      this.userIdsFilter.splice(this.userIdsFilter.indexOf(user ? user.id : null), 1);
    }
    this.userIdsFilter = [...this.userIdsFilter];
  }

  isSelected(user?: User): boolean {
    return this.userIdsFilter.indexOf(user ? user.id : null) !== -1;
  }

  deleteIssue() {
    /*this.issueService.deleteIssue(this.selectedIssue).subscribe(() => {
      this.issues.splice(this.selectedIndex, 1);
    });*/
  }

  saveIssue(issue: Issue) {
    this.issueService.updateIssue(issue.id, issue).then();
  }


  dropIssue(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.issues, event.previousIndex, event.currentIndex);
    this.setSortProperties();
  }

  sortByTitle(order?: Sorted.ascending | Sorted.descending): void {
    SortingService.changeSortDirection(this.sorter, 'title', order ? order : null);
    if (this.sorter['title'] !== Sorted.false) {
      this.sortingService.sortAlphabetically(this.issues, 'title', this.sorter['title'])
        .subscribe(sorted => this.issues = sorted as Issue[]);
    } else this.issues = [...this.issuesCopy];
    this.setSortProperties('title');
  }

  sortByOwner(order?: Sorted.ascending | Sorted.descending): void {
    SortingService.changeSortDirection(this.sorter, 'user', order ? order : null);
    if (this.sorter['user'] !== Sorted.false) {
      this.sortingService.sortAlphabeticallyByOwner(this.issues, this.sorter['user'])
        .subscribe(sorted => this.issues = sorted as Issue[]);
    } else this.issues = [...this.issuesCopy];
    this.setSortProperties('user');
  }

  setSortProperties(property?: string): void {
    this.sortProperties.filter(prop => prop !== property).forEach(p => this.sorter[p] = Sorted.false);
    this.issueService.updateOrdinals(this.issues);
    if (!property) this.issuesCopy = [...this.issues];
  }

  sortBy(property: 'title' | 'user', order?: Sorted.ascending | Sorted.descending): void {
    switch (property) {
      case 'title':
        this.sortByTitle(order);
        break;
      case 'user':
        this.sortByOwner(order);
        break;
      // default: don't sort
    }
  }


}
