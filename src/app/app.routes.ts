import { Routes } from '@angular/router';
import { loggedInGuard, notLoggedInGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
  },
  { path: 'properties',
    loadComponent: () => import('./pages/listHousePage/listHousePage.component').then((c) => c.listHousePagecomponent)
  },
  {
    path: 'properties/:id',
    loadComponent: () =>  import('./pages/properties-details/properties-details.component').then( (c) => c.PropertiesDetailsComponent),
  },
  { path: 'contactUs',
    loadComponent: () => import('./pages/contact-us/contact-us.component').then((c) => c.ContactUsComponent),
  },
  { path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then((c) => c.LoginComponent),
    canActivate: [loggedInGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/register/register.component').then((c) => c.RegisterComponent)
  },
  { path: 'userPage',
    loadComponent: () => import('./pages/userPage/userPage.component').then((c) => c.userPage),
    canActivate: [notLoggedInGuard],
  },
  { path: '**', redirectTo: '/home' }
];
