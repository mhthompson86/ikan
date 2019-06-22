import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { IssueComponent } from './issue/issue.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BoardComponent,
    IssueComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    BoardRoutingModule
  ]
})
export class BoardModule {}
