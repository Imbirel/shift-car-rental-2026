import { ResolveFn, Routes } from '@angular/router';
import { CatalogApiService } from './services/catalog-api.service';
import { CatalogStore } from './services/catalog.store';

const titleResolver: ResolveFn<string> = (route) => route.queryParams['id'];

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    providers: [CatalogStore, CatalogApiService],
    children: [
      {
        path: '',
        title: 'Car Catalog',
        loadComponent: () => import('./pages/catalog-page/catalog-page').then((m) => m.CatalogPage),
      },
      {
        path: ':id',
        title: titleResolver,
        loadComponent: () =>
          import('./pages/car-detail-page/car-detail-page').then((m) => m.CarDetailPage),
      },
    ],
  },
];
