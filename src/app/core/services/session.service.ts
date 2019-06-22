import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  pageTitle$: BehaviorSubject<string> = new BehaviorSubject('DEV Board');

  richTextModules = {
    toolbar: {
      container: [
        [{ font: [] }], [{ size: ['small', false, 'large', 'huge'] }], ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }], [{ color: [] }, { background: [] }], [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }], ['link']
      ]
    }
  };


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.initPageTitleObservable();
  }


  initPageTitleObservable(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    )
      .subscribe(data => {
        this.pageTitle$.next(data.title);
        document.title = `${ data.title } | iKan`;
      });
  }
}
