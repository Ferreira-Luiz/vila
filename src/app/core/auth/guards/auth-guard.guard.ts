import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, CanActivateFn } from '@angular/router';
import { filter, map } from 'rxjs/operators';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    filter(isLoggedIn => isLoggedIn !== undefined),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigateByUrl('/login');
        return false;
      }
      return true;
    })
  );
};
