import { ViewportScroller } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap, takeUntil } from 'rxjs';
import { unsub } from '../../shared/utils/unsub';

@Injectable({
  providedIn: 'root'
})
export class AutoScrollService extends unsub{
  router = inject(Router);
  ViewportScroller = inject(ViewportScroller);

  shouldScroll = new BehaviorSubject<boolean>(false);
  private shouldScroll$ = this.shouldScroll.asObservable();

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.router.events
    .pipe(
      filter((it:any) => it instanceof Scroll),
      map((it: Scroll) => it.position),
      switchMap((position) => {
      return this.shouldScroll$.pipe(
        filter(Boolean),
        map(() => position)
      );
    })
  )
  .pipe(takeUntil(this.unsub$))
  .subscribe((position) => {
    this.ViewportScroller.scrollToPosition(position || [0, 0]);
  })
  }
}


