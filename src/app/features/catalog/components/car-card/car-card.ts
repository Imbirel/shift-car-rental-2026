import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';
import { CarItem } from '@features/catalog/models/car.models';

@Component({
  selector: 'app-car-card',
  imports: [ImageUrlPipe, CurrencyPipe, TuiButton, TuiCardLarge, TuiHeader],
  templateUrl: './car-card.html',
  styleUrl: './car-card.scss',
})
export class CarCardComponent {
  readonly car = input.required<CarItem>();
}
