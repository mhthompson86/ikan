import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserSelectComponent } from './components/user-select/user-select.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { IssueTypeMenuComponent } from './components/issue-type-menu/issue-type-menu.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { SearchUserFilterPipe } from './pipes/search-user-filter.pipe';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    UserSelectComponent,
    AlertComponent,
    ConfirmDialogComponent,
    IssueDetailComponent,
    IssueTypeMenuComponent,
    StopPropagationDirective,
    SearchUserFilterPipe,
    SortByNamePipe,
    SearchFilterPipe,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot(),
    FlexLayoutModule,
    QuillModule,

    AngularMaterialModule
  ],
  exports: [
    FormsModule,
    FlexLayoutModule,
    QuillModule,

    AngularMaterialModule,

    UserSelectComponent,
    AlertComponent,
    ConfirmDialogComponent,
    IssueDetailComponent,
    IssueTypeMenuComponent,
    StopPropagationDirective,
    SearchFilterPipe,
    OrderByPipe
  ],
  providers: [
    OrderByPipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule {}
