import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ikanStopPropagation]'
})
export class StopPropagationDirective {

  @HostListener('click', ['$event'])
  onClick(e) {
    e.stopPropagation();
  }

}
