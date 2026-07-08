import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.isInitialized).pipe(
    filter((initialized) => initialized === true),
    take(1),
    map(() => {
      const isAuth = auth.isAuthenticated();

      if (isAuth) {
        return true;
      }

      return router.createUrlTree(['/auth/login']);
    }),
  );
};
