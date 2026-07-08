import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiIcon,
  TuiLabel,
  TuiInput,
  TuiPopup,
  TuiFilterByInputPipe,
  TuiDropdown,
  TuiRadio,
  TuiDataList,
  TuiOption,
} from '@taiga-ui/core';
import {
  TuiInputDateRange,
  TuiSelect,
  TuiDataListWrapper,
  TuiDrawer,
  TuiComboBox,
  TuiChevron,
  TuiInputNumber,
  TuiMultiSelect,
  TuiSegmented,
  TuiInputRange,
  TuiStringifyPipe,
} from '@taiga-ui/kit';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import {
  BODY_TYPES,
  BRANDS,
  COLORS,
  STEERING,
  TRANSMISSION,
} from '@features/catalog/catalog.constants';
import { CatalogStore } from '@features/catalog/services/catalog.store';
import { CatalogApiService } from '@features/catalog/services/catalog-api.service';

@Component({
  selector: 'app-catalog-header',
  imports: [
    FormsModule,
    TuiButton,
    TuiCurrencyPipe,
    TuiChevron,
    TuiComboBox,
    TuiDataListWrapper,
    TuiDrawer,
    TuiDropdown,
    TuiDropdownMobile,
    TuiFilterByInputPipe,
    TuiIcon,
    TuiInput,
    TuiInputDateRange,
    TuiInputNumber,
    TuiInputRange,
    TuiLabel,
    TuiMultiSelect,
    TuiPopup,
    TuiRadio,
    TuiSegmented,
    TuiSelect,
    TuiDataList,
    TuiOption,
    TuiStringifyPipe,
  ],
  templateUrl: './catalog-header.html',
  styleUrl: './catalog-header.scss',
})
export class CatalogHeaderComponent {
  protected readonly store = inject(CatalogStore);
  protected readonly api = inject(CatalogApiService);
  protected readonly today = TuiDay.currentLocal();
  protected readonly open = signal(false);

  protected readonly brands = BRANDS;
  protected readonly bodyTypes = BODY_TYPES;
  protected readonly colors = COLORS;

  protected readonly steeringOptions = [{ value: null, label: 'Любой' }, ...STEERING];
  protected readonly transmissionOptions = [{ value: null, label: 'Любая' }, ...TRANSMISSION];
}
