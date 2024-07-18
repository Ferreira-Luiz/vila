import { Routes } from '@angular/router';
import { authGuardGuard } from './core/auth/guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
  },
  { path: 'properties',
    loadComponent: () => import('./pages/properties/properties.component').then((c) => c.PropertiesComponent)
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
  },
  { path: 'newHome',
    loadComponent: () => import('./pages/add-new-home/add-new-home.component').then((c) => c.AddNewHomeComponent),
    canActivate: [authGuardGuard],
  },
  { path: '**', redirectTo: '/home' }
];
