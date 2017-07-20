import {Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
  selector: '[defaultShow]'
})
export class DefaultShowDirective {
  @HostBinding('attr.selected') selected=true;

  constructor(private el:ElementRef) { }

}
