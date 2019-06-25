import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  primary = false;
  auxiliary = false;

  constructor() { }

  start() {
    this.primary = true;
  }

  startAuxiliary() {
    this.auxiliary = true;
  }

  stop() {
    this.primary = false;
    this.auxiliary = false;
  }
}
