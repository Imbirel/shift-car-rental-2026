import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';
import { guestGuard } from '@core/guards/auth/guest.guard';
import { MainLayout } from '@core/layout/main-layout/main-layout';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth-flow/auth-flow.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'catalog',
        loadChildren: () =>
          import('./features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES),
      },
      {
        path: 'booking',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/booking/booking.routes').then((m) => m.BOOKING_ROUTES),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./features/not-found/not-found.routes').then((m) => m.NOT_FOUND_ROUTES),
      },
    ],
  },
];
