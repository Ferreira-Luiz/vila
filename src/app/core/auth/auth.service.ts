import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) { }

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedIn.next(true);
    this.router.navigate(['/newHome']);
  }

  logout():void {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

}
