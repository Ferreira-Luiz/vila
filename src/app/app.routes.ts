import { Routes } from '@angular/router';

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
  { path: '**', redirectTo: '/home' }
];
