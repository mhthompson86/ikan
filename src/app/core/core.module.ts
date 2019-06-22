import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { IssueCreateComponent } from './components/issue-create/issue-create.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    IssueCreateComponent,
    AccountMenuComponent,
    TopNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  entryComponents: [
    IssueCreateComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
