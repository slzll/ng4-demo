import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return "";
    }
    return value.replace(/[^0-9-]/ig, "");
  }

}
