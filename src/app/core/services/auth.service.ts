import { Injectable, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '@core/models/user.model';
import { SESSION_QUERY } from '@core/graphql/auth.operations';

interface SessionResponse {
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apollo = inject(Apollo);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly tokenSignal = signal<string | null>(
    isPlatformBrowser(this.platformId) ? sessionStorage.getItem('auth_token') : null,
  );
  private readonly userSignal = signal<User | null>(null);
  private readonly isInitializedSignal = signal<boolean>(false);

  readonly token = this.tokenSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();
  readonly isInitialized = this.isInitializedSignal.asReadonly();

  constructor() {
    effect(() => {
      const token = this.tokenSignal();
      if (isPlatformBrowser(this.platformId)) {
        if (token) {
          sessionStorage.setItem('auth_token', token);
        } else {
          sessionStorage.removeItem('auth_token');
        }
      }
    });

    effect(() => {
      const token = this.tokenSignal();
      if (isPlatformBrowser(this.platformId) && token) {
        this.getSession().subscribe({
          next: () => this.isInitializedSignal.set(true),
          error: () => this.isInitializedSignal.set(true),
        });
      } else {
        this.isInitializedSignal.set(true);
        this.userSignal.set(null);
      }
    });
  }

  setCredentials(token: string, user: User) {
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }

  getSession(): Observable<User | null> {
    return this.apollo
      .query<{ session: SessionResponse }>({
        query: SESSION_QUERY,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => result.data?.session?.user ?? null),
        tap((user) => this.userSignal.set(user)),
        catchError(() => {
          this.userSignal.set(null);
          return of(null);
        }),
      );
  }

  logout() {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSignal() && !!this.userSignal();
  }
}
