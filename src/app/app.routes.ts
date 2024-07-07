import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
  },
  { path: 'properties',
    loadComponent: () => import('./pages/properties/properties.component').then((c) => c.PropertiesComponent)
  },
  { path: '**', redirectTo: '/houses' }
];
