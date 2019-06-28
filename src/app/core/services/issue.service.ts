import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { Issue } from '../../shared/models/issue';
import { Column } from '../../shared/models/column';
import { IssueType } from '../../shared/models/issue-type';
import { SpinnerService } from './spinner.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { JsonService } from './json.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  columnsCollection: AngularFirestoreCollection<Column>;
  columns$: Observable<Column[]>;
  issuesCollection: AngularFirestoreCollection<Issue>;
  issues$: Observable<Issue[]>;
  issueTypesCollection: AngularFirestoreCollection<IssueType>;
  issueTypes$: Observable<IssueType[]>;
  newIssue$ = new Subject<Issue>();
  numberOfIssues: number;


  constructor(private afs: AngularFirestore,
              private spinnerService: SpinnerService,
              private dialog: MatDialog) {

    this.columnsCollection = afs.collection<Column>('columns');
    this.issuesCollection = afs.collection<Issue>('issues');
    this.issueTypesCollection = afs.collection<IssueType>('issueTypes');
  }

  getIssues(): Observable<Issue[]> {
    return this.issuesCollection.snapshotChanges().pipe(
      map(issues => issues.map(a => {
        const data = a.payload.doc.data() as Issue;
        const id = a.payload.doc.id;
        return { id, ...data };
      })), tap((issues: Issue[]) => {
        this.numberOfIssues = issues.length;
      }));
  }


  updateIssue(issueId: string, update: Issue) {
    return this.afs.doc<Issue>(`issues${ issueId }`).update(update);
  }

  createIssue(issue: Issue) {
    return this.issuesCollection.add(JsonService.stringifyThenParse(issue)).then(() => this.newIssue$.next(issue));
  }

  deleteIssue(issueId: string) {
    return this.afs.doc<Issue>(`issues${ issueId }`).delete();
  }

  getColumns(): Observable<Column[]> {
    return this.columnsCollection.snapshotChanges().pipe(
      map(users => users.map(a => {
        const data = a.payload.doc.data() as Column;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  getIssueTypes(): Observable<IssueType[]> {
    return this.issueTypesCollection.snapshotChanges().pipe(
      map(issueTypes => issueTypes.map(a => {
        const data = a.payload.doc.data() as IssueType;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  getIssueType(issueTypeId: string): Observable<IssueType> {
    return this.issueTypesCollection.doc<IssueType>(issueTypeId).valueChanges();
  }


  updateOrdinals(issues: Issue[]): void {
    issues.forEach((issue: Issue, i: number) => issue.ordinal = i);
    // save
  }


  confirmDeleteIssueDialog(issue: Issue): Observable<boolean> {
    const confirmDeleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Delete ${ issue.issueId }?`,
        message: 'You\'re about to permanently delete this issue and all of its data.',
        okButton: 'Delete',
        okButtonColor: 'warn',
        cancelBtn: 'Cancel'
      },
      panelClass: 'confirm-dialog-container'
    });
    return confirmDeleteDialogRef.afterClosed().pipe(take(1));
  }


}
