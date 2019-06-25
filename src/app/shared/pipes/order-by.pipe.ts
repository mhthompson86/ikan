import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform<T>(values: Array<T>, property?: any): Array<T> {
    if (!values || !property) return values;
    return values.sort((a, b) => a[property] - b[property]);
  }

}
