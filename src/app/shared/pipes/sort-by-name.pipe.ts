import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {

  transform(users: User[], ascending = true): User[] {
    if (!users) return users;
    return users.sort((a: User, b: User) => {
      // remove space for better sorting
      const userA = `${a.firstName}${a.lastName}`;
      const userB = `${b.firstName}${b.lastName}`;
      return ascending ?
        userA < userB ? -1 : userB < userA ? 1 : 0
        : userB < userA ? -1 : userA < userB ? 1 : 0;
    });
  }
}
