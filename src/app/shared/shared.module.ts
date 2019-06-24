import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { UserSelectComponent } from './components/user-select/user-select.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { IssueTypeMenuComponent } from './components/issue-type-menu/issue-type-menu.component';

@NgModule({
  declarations: [
    UserSelectComponent,
    AlertComponent,
    ConfirmDialogComponent,
    IssueDetailComponent,
    IssueTypeMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot(),
    AngularMaterialModule
  ],
  exports: [
    AngularMaterialModule,
    FormsModule,

    UserSelectComponent,
    AlertComponent,
    ConfirmDialogComponent,
    IssueDetailComponent,
    IssueTypeMenuComponent
  ]
})
export class SharedModule {}
