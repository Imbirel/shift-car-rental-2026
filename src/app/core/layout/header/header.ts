import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TuiButton, TuiIcon, TUI_DARK_MODE } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [TuiButton, TuiIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  protected readonly darkMode = inject(TUI_DARK_MODE);

  toggleTheme(): void {
    this.darkMode.set(!this.darkMode());
  }

  navigateToBookingHistory(): void {
    this.router.navigate(['/booking/history']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  onLogout(): void {
    this.auth.logout();
  }
}
