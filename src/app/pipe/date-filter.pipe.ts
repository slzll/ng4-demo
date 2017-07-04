import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return "";
    }
    const date = value.replace(/[^0-9-]/ig, "");
    return date;
  }

}
