import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ikan-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logOut();
  }

}
