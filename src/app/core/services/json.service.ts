import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  static stringifyThenParse<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
  constructor() { }

}
