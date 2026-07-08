import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiLoader } from '@taiga-ui/core';
import { CarCardComponent } from '../../components/car-card/car-card';
import { CatalogHeaderComponent } from '@features/catalog/components/catalog-header/catalog-header';
import { CatalogApiService } from '@features/catalog/services/catalog-api.service';
import { CatalogStore } from '@features/catalog/services/catalog.store';

@Component({
  selector: 'app-catalog-page',
  imports: [TuiLoader, CarCardComponent, CatalogHeaderComponent],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
})
export class CatalogPage {
  private readonly router = inject(Router);
  protected readonly store = inject(CatalogStore);
  protected readonly api = inject(CatalogApiService);

  protected navigateToDetails(carId: string): void {
    this.router.navigate(['/catalog', carId]);
  }
}
