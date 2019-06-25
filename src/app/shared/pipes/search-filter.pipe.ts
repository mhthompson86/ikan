import { Pipe, PipeTransform } from '@angular/core';

import filter from 'lodash/filter';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform<T>(values: Array<T>, input: string, ...otherProperties: string[]): Array<T> {
    if (!values || !input) return values;
    input = input.toLocaleLowerCase();
    return filter(values, value => {
      if (value.title && value.title.toLocaleLowerCase().includes(input)) return true;
      if (value.description && value.description.toLocaleLowerCase().includes(input)) return true;
      otherProperties.forEach(prop => {
        if (value[prop].toLocaleLowerCase().includes(input)) return true;
      });
      return false;
    });
  }

}
