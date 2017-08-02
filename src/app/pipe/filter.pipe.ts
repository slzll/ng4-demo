import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log(value);
    // console.log(args);
    let reg = new RegExp(args);
    // console.log(reg);
    let arr=[];
    if (!!args){
      let index=0;
      for (let i in value){
        // console.log(value[i].Name)
        if (reg.test(value[i].Name)){
          arr[index++]=value[i];
        }
      }
      return arr;
    }
    return value;
  }

}
