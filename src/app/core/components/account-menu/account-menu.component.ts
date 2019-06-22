import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ikan-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  avatar = 'https://s3-us-west-2.amazonaws.com/traxionio/profile-pictures/5be9e51a5aeb64000f5aafa5-5';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logOut();
  }

}
