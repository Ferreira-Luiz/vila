import { AuthService } from '../../auth/auth.service';
import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { IconsModule } from '../../../icons/icons.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, takeUntil } from 'rxjs';
import { unsub } from '../../../shared/utils/unsub';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent extends unsub implements OnInit {
  showSideBar: boolean = false;
  isMobile: boolean = false;
  isScrolled = false;
  scrollLimit = 130;
  @ViewChild('header') header!:ElementRef;
  @ViewChild('navigationHeader') navigationHeader!:ElementRef;
  @ViewChild('bg') bg!:ElementRef;
  @ViewChild('arrow') arrow!:ElementRef;
  userLoggedIn: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor( private breakpointObserver: BreakpointObserver, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(takeUntil(this.unsub$))
    .subscribe(result => {
      this.isMobile = !result.matches;
      if(this.isMobile == false) {
        this.bg.nativeElement.style.display = 'none';
        this.arrow.nativeElement.style.display = 'none';
      }
    });
    this.authService.isLoggedIn$
    .pipe(takeUntil(this.unsub$))
    .subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > this.scrollLimit;
  }

  logout() {
    this.authService.logout();
  }

}
