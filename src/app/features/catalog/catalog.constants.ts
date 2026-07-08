export const DEFAULT_PRICE_LIMITS = {
  MIN: 1,
  MAX: 50000,
} as const;

export const BRANDS = [
  { value: 'GARDEN_CAR', label: 'Садовая машина' },
  { value: 'GEELY', label: 'Geely' },
  { value: 'GROCERY_CART', label: 'Продуктовая тележка' },
  { value: 'HAIER', label: 'Haier' },
  { value: 'HAVAL', label: 'Haval' },
  { value: 'HYUNDAI', label: 'Hyundai' },
  { value: 'INVALID', label: 'Инвалидное кресло' },
  { value: 'KIA', label: 'Kia' },
  { value: 'MERCEDES', label: 'Mercedes-Benz' },
  { value: 'VOLKSWAGEN', label: 'Volkswagen' },
] as const;

export const BODY_TYPES = [
  { value: 'CABRIOLET', label: 'Кабриолет' },
  { value: 'COUPE', label: 'Купе' },
  { value: 'HATCHBACK', label: 'Хэтчбек' },
  { value: 'SEDAN', label: 'Седан' },
  { value: 'SUV', label: 'Внедорожник' },
] as const;

export const STEERING = [
  { value: 'LEFT', label: 'Левый' },
  { value: 'RIGHT', label: 'Правый' },
] as const;

export const TRANSMISSION = [
  { value: 'AUTOMATIC', label: 'Автомат' },
  { value: 'MANUAL', label: 'Механика' },
] as const;

export const COLORS = [
  { value: 'WHITE', label: 'Белый', color: '#ffffff' },
  { value: 'GREY', label: 'Серый', color: '#adadad' },
  { value: 'BLACK', label: 'Черный', color: '#000000' },
  { value: 'RED', label: 'Красный', color: '#d32f2f' },
  { value: 'ORANGE', label: 'Оранжевый', color: '#fd8636' },
  { value: 'BLUE', label: 'Синий', color: '#1976d2' },
  {
    value: 'SILVER',
    label: 'Серебристый',
    color:
      'conic-gradient(from 0deg, #d2d2d2 0%, #f7f7f7 10%, #909090 22%, #e5e5e5 35%, #949494 48%, #fbfbfb 60%, #919191 73%, #e2e2e2 85%, #d2d2d2 100%)',
  },
] as const;

export type Brand = (typeof BRANDS)[number]['value'];
export type BodyType = (typeof BODY_TYPES)[number]['value'];
export type Steering = (typeof STEERING)[number]['value'];
export type Transmission = (typeof TRANSMISSION)[number]['value'];
export type ColorValue = (typeof COLORS)[number]['value'];
