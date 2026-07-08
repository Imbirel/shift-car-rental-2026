import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
  withNoIncrementalHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideTaiga } from '@taiga-ui/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { baseUrlInterceptor } from '@core/interceptors/base-url.interceptor';
import { provideCoreGraphQL } from '@core/graphql/graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(
      withEventReplay(),
      withNoIncrementalHydration(),
      withHttpTransferCacheOptions({
        filter: (req) => {
          if (req.url.includes('/api/graphql')) return false;
          if (req.url.includes('/api/booking')) return false;
          if (req.url.includes('/api/profile')) return false;

          return true;
        },
      }),
    ),
    provideTaiga(),
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
    provideCoreGraphQL(),
  ],
};
