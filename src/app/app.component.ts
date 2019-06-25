import { Component } from '@angular/core';

import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'ikan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public spinnerService: SpinnerService) {}
}
