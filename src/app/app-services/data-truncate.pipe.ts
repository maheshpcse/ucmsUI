import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTruncate'
})
export class DataTruncatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      value = value.length > 10 ? value.slice(0, 10) + '...' : value;
      return value;
    } else {
      return null;
    }
  }

}
