import { Service, inject, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Apollo } from 'apollo-angular';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CarItem, CarQueryParams } from '@features/catalog/models/car.models';
import { GET_CARS_QUERY } from '@features/catalog/graphql/car.operations';
import { CatalogStore } from './catalog.store';

@Service({ autoProvided: false })
export class CatalogApiService {
  private readonly apollo = inject(Apollo);
  private readonly store = inject(CatalogStore);

  readonly carsResource = rxResource<CarItem[], CarQueryParams>({
    params: () => {
      this.store.requestTrigger();

      return untracked(() => this.buildQueryParams());
    },
    stream: ({ params }) =>
      this.apollo
        .query<{ getCars: { data: CarItem[] } }>({
          query: GET_CARS_QUERY,
          variables: params,
          fetchPolicy: 'network-only',
        })
        .pipe(
          map((res) => res.data?.getCars?.data ?? []),
          tap((cars) => this.store.updatePriceLimits(cars)),
          catchError(() => of([])),
        ),
    defaultValue: [],
  });

  readonly cars = this.carsResource.value;
  readonly isLoading = this.carsResource.isLoading;
  readonly hasError = this.carsResource.error;

  private buildQueryParams(): CarQueryParams {
    const params: CarQueryParams = {};
    const range = this.store.dateRange();

    const { search, brand, bodyType, steering, transmission, priceFrom, priceTo, color } =
      this.store.filterFields;
    const brandVal = brand();
    const bodyTypeVal = bodyType();
    const colorVal = color();

    if (range) {
      params.startDate = range.from.toLocalNativeDate().getTime();
      params.endDate = range.to.toLocalNativeDate().getTime();
    }

    if (search()) params.search = search();

    if (brandVal?.value) params.brand = [brandVal.value];
    if (bodyTypeVal?.value) params.bodyType = [bodyTypeVal.value];
    if (colorVal?.value) params.color = [colorVal.value];

    const st = steering();
    if (st !== null && st !== '') params.steering = [st];

    const tr = transmission();
    if (tr !== null && tr !== '') params.transmission = [tr];

    const pFrom = priceFrom();
    if (pFrom !== null && pFrom !== undefined) params.minPrice = pFrom;

    const pTo = priceTo();
    if (pTo !== null && pTo !== undefined) params.maxPrice = pTo;

    return params;
  }
}
