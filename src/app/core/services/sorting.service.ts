import { Injectable } from '@angular/core';
import { SortingTracker } from '../../shared/models/sorting-tracker';
import { Sorted } from '../../shared/models/sorted.enum';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  static changeSortDirection(list: SortingTracker, property: string, direction?: Sorted): void {
    if (direction) {
      list[property] = direction;
    } else if (list[property] === Sorted.descending) {
      list[property] = Sorted.false;
    } else {
      list[property]++;
    }
  }

  static getCurrentSortProperty(obj: SortingTracker): string | undefined {
    return Object.keys(obj).find((key: string) => obj[key] === Sorted.ascending || obj[key] === Sorted.descending);
  }

  constructor() { }

  sortAlphabetically<T>(list: Array<T>, propertyToSort: string, sortOrder: Sorted): Observable<Array<T>> {
    const newList = [...list];
    const ascending = sortOrder === Sorted.ascending;
    return of(newList.sort((a, b) => {
      const stringA = a[propertyToSort].toLocaleLowerCase();
      const stringB = b[propertyToSort].toLocaleLowerCase();
      return ascending ?
        stringA < stringB ? -1 : stringB < stringA ? 1 : 0
        : stringB < stringA ? -1 : stringA < stringB ? 1 : 0;
    }));
  }

  sortAlphabeticallyByOwner<T>(list: Array<T>, sortOrder: Sorted): Observable<Array<T>> {
    const newList = [...list];
    const ascending = sortOrder === Sorted.ascending;
    return of(newList.sort((a, b) => {
      const userA = a['user'] ? a['user'].fullName.toLocaleLowerCase() : 0;
      const userB = b['user'] ? b['user'].fullName.toLocaleLowerCase() : 0;
      return ascending ?
        userA < userB ? -1 : userB < userA ? 1 : 0
        : userB < userA ? -1 : userA < userB ? 1 : 0;
    }));
  }
}
