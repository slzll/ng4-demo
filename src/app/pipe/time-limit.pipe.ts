import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLimit'
})
export class TimeLimitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let des = '';
    if (typeof value === "string") {
      if (value.length > args) {
        des = value.substring(0, args) + "...";
        return des;
      } else {
        return value;
      }
    }
  }

}
