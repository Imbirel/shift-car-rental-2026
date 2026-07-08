import { signal, computed, Service } from '@angular/core';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { CarItem } from '@features/catalog/models/car.models';
import {
  BODY_TYPES,
  BRANDS,
  COLORS,
  DEFAULT_PRICE_LIMITS,
} from '@features/catalog/catalog.constants';

export type BrandOption = (typeof BRANDS)[number];
export type BodyTypeOption = (typeof BODY_TYPES)[number];
export type ColorOption = (typeof COLORS)[number];

@Service({ autoProvided: false })
export class CatalogStore {
  readonly isSidebarOpen = signal(false);
  readonly requestTrigger = signal<number>(0);

  readonly dateRange = signal<TuiDayRange | null>(
    new TuiDayRange(TuiDay.currentLocal(), TuiDay.currentLocal()),
  );

  readonly filterFields = {
    search: signal(''),
    brand: signal<BrandOption | null>(null),
    bodyType: signal<BodyTypeOption | null>(null),
    steering: signal<string | null>(null),
    transmission: signal<string | null>(null),
    priceFrom: signal<number | null>(null),
    priceTo: signal<number | null>(null),
    color: signal<ColorOption | null>(null),
  };

  readonly priceLimits = signal<{ min: number; max: number }>({
    min: DEFAULT_PRICE_LIMITS.MIN,
    max: DEFAULT_PRICE_LIMITS.MAX,
  });

  private limitsInitialized = false;

  readonly priceRange = computed(
    () =>
      [
        this.filterFields.priceFrom() ?? this.priceLimits().min,
        this.filterFields.priceTo() ?? this.priceLimits().max,
      ] as [number, number],
  );

  updatePriceLimits(cars: CarItem[]) {
    if (this.limitsInitialized || !cars || cars.length === 0) return;

    const prices = cars.map((car) => car.price);
    this.priceLimits.set({
      min: Math.min(...prices),
      max: Math.max(...prices),
    });

    this.limitsInitialized = true;
  }

  setPriceRange(value: [number, number]) {
    const [min, max] = value;
    const limits = this.priceLimits();

    this.filterFields.priceFrom.set(min === limits.min ? null : min);
    this.filterFields.priceTo.set(max === limits.max ? null : max);
  }

  triggerSearch() {
    this.requestTrigger.update((count) => count + 1);
  }

  resetFilters() {
    this.dateRange.set(new TuiDayRange(TuiDay.currentLocal(), TuiDay.currentLocal()));
    this.filterFields.search.set('');
    this.filterFields.brand.set(null);
    this.filterFields.bodyType.set(null);
    this.filterFields.steering.set(null);
    this.filterFields.transmission.set(null);
    this.filterFields.priceFrom.set(null);
    this.filterFields.priceTo.set(null);
    this.filterFields.color.set(null);

    this.limitsInitialized = false;
    this.triggerSearch();
  }
}
