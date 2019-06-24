import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../models/user';

@Pipe({
  name: 'searchUserFilter'
})
export class SearchUserFilterPipe implements PipeTransform {

  transform(users: User[], predicate: string): any[] {
    if (!users || !predicate) return users;
    predicate = predicate.trim().toLocaleLowerCase();
    return users.filter((user: User) => user.fullName.toLocaleLowerCase().includes(predicate));
  }

}
