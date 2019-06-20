import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { UserSelectComponent } from './components/user-select/user-select.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [UserSelectComponent, DetailViewComponent, AlertComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot(),
    AngularMaterialModule
  ]
})
export class SharedModule { }
