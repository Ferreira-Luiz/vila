import { AfterViewInit, Directive, inject } from "@angular/core";
import { AutoScrollService } from "../../core/service/auto-scroll.service.ts.service";

@Directive({
  selector: '[restoreScrolling]',
  standalone: true,
})

export class RestoreScrollingDirective implements AfterViewInit {
  private autoScrollService = inject(AutoScrollService);
  ngAfterViewInit(): void {
    this.autoScrollService.shouldScroll.next(true);
  }
}
