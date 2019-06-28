/*
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/firestore';

export const afsMapper = (): T =>  map(actions => actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return { id, ...data };
}));
*/
