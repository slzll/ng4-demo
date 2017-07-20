import {Directive, ElementRef, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[dataSlideTo]'
})
export class DataSlideToDirective{
  @Input() index:any;
  @HostBinding('attr.data-slide-to') get getIndex(){
    return this.index+1
  }


  constructor(private el:ElementRef) {
  }

}
