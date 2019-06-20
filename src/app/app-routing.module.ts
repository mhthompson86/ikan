import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board/board.component';
import { BacklogComponent } from './backlog/backlog.component';

const routes: Routes = [
  { path: 'backlog', component: BacklogComponent, data: { title: 'Backlog' } },
  { path: 'board', component: BoardComponent, data: { title: 'DEV Board' } },
  { path: '', component: BoardComponent, data: { title: 'DEV Board' } },
  { path: '**', redirectTo: '', data: { title: 'DEV Board' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
