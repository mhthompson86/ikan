import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board/board.component';
import { BacklogComponent } from './backlog/backlog.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' }, canDeactivate: [AuthGuard] },
  {
    path: '', component: HomeComponent, canActivateChild: [AuthGuard],
    children: [
      { path: '', component: BoardComponent, data: { title: 'DEV Board' },  },
      { path: 'backlog', component: BacklogComponent, data: { title: 'Backlog' } },
    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
