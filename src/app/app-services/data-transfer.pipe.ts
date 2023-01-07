import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTransfer'
})
export class DataTransferPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return value;
    } else {
      value = value.toString().toUpperCase();
      return value;
    }
    // return null;
  }

}
