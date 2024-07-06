import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconsModule } from '../../../icons/icons.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showSideBar: boolean = false;
  isMobile: boolean = false;
  @ViewChild('header') header!:ElementRef;
  @ViewChild('navigationHeader') navigationHeader!:ElementRef;
  @ViewChild('bg') bg!:ElementRef;
  @ViewChild('arrow') arrow!:ElementRef;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor( private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.Small)
    .subscribe(result => {
      this.isMobile = !result.matches;
      if(this.isMobile == false) {
        this.bg.nativeElement.style.display = 'none';
        this.arrow.nativeElement.style.display = 'none';
      }
    });
  }

  toogleSideBar() {
      this.showSideBar = true;
      this.navigationHeader.nativeElement.style.marginLeft = '-10vw';
      this.navigationHeader.nativeElement.classList.add('animate-sidebar');
      this.bg.nativeElement.style.display = 'block';
      this.arrow.nativeElement.style.display = 'none';
  }

  closeSideBar() {
      this.showSideBar = false;
      this.navigationHeader.nativeElement.style.marginLeft = '-100vw';
      this.navigationHeader.nativeElement.classList.remove('animate-sidebar');
      this.bg.nativeElement.style.display = 'none';
      this.arrow.nativeElement.style.display = 'block';
  }
}