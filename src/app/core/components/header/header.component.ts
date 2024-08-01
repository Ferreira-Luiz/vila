import { AuthService } from '../../auth/auth.service';
import { Component, ElementRef, ViewChild, HostListener, OnInit, viewChild } from '@angular/core';
import { IconsModule } from '../../../icons/icons.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, take, takeUntil } from 'rxjs';
import { unsub } from '../../../shared/utils/unsub';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule, CommonModule],
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
  showUserData: boolean = false;
  checkUserStatus: boolean = false;
  closeBG: boolean = false;
  userLoggedIn: boolean = false;
  displayName: string | null = null;
  photoURL: string | null = null;
  email: string | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(takeUntil(this.unsub$))
    .subscribe(result => {
      this.isMobile = !result.matches;
      if(this.isMobile == false) {
        this.bg.nativeElement.style.display = 'none';
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
      this.bg.nativeElement.style.display = 'block';
      this.navigationHeader.nativeElement.style.marginLeft = '-10vw';
      this.navigationHeader.nativeElement.classList.add('animate-sidebar');
      this.bg.nativeElement.style.display = 'block';
  }

  closeSideBar() {
      this.showSideBar = false;
      this.navigationHeader.nativeElement.style.marginLeft = '-100vw';
      this.navigationHeader.nativeElement.classList.remove('animate-sidebar');
      this.bg.nativeElement.style.display = 'none';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > this.scrollLimit;
    this.showUserData = false;
    this.closeBG = false;
  }

  logout() {
    this.authService.logout();
    this.closeBG = false;
    this.showUserData = false;
    this.router.navigate(['/home']);
  }

  loadUserProfile() {
      this.authService.getCurrentUserProfile()
      .pipe(takeUntil(this.unsub$))
      .subscribe(profile => {
        if (profile) {
          this.email = profile.email;
          this.displayName = profile.displayName;
          this.photoURL = profile.photoURL;
        }
      });
  }

  toggleUserData() {
    this.showUserData = !this.showUserData;
    this.closeBG = !this.closeBG;
    if(this.userLoggedIn) {
      this.loadUserProfile();
    }
  }
}
