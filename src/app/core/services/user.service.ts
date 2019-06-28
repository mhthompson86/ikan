import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';


import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import * as firebase from 'firebase';
import { JsonService } from './json.service';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
  }

  getUsers(): Observable<User[]> {
    return this.usersCollection.snapshotChanges().pipe(
      map(users => users.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  addUser(user: User): Promise<firebase.firestore.DocumentReference> {
    user.fullName = `${ user.firstName } ${ user.lastName }`;
    return this.usersCollection.add(JsonService.stringifyThenParse(user));
  }

  getUser(userId: string) {
    return this.afs.doc<User>(`users/${ userId }`).snapshotChanges().pipe(
      map((doc) => {
        const data = doc.payload.data() as User;
        const id = doc.payload.id;
        return { id, ...data };
      })
    );
  }

}
