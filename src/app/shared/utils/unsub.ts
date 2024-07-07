import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";


@Injectable()
export abstract class unsub  implements OnDestroy{
  protected unsub$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
