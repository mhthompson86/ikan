import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform<T>(values: T[], prop: string, args: string[]): T[] {
    if (!values || !prop || !args.length) return values;
    return values.filter(value => args.indexOf(value[prop]) !== -1);
  }

}
