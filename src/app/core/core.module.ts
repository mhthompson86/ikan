import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { IssueCreateComponent } from './components/issue-create/issue-create.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';

@NgModule({
  declarations: [TopToolbarComponent, IssueCreateComponent, AccountMenuComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
