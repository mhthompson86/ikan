import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogComponent } from './backlog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BacklogComponent],
  imports: [
    CommonModule,
    SharedModule,


    BacklogRoutingModule
  ]
})
export class BacklogModule {}
