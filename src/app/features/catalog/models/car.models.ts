export interface CarItem {
  id: string;
  name: string;
  transmission: string[];
  price: number;
  media: { url: string }[];
  brand: string;
  bodyType: string;
  steering: string;
  color: string;
}

export interface CarQueryParams {
  search?: string;
  startDate?: number;
  endDate?: number;
  brand?: string[];
  bodyType?: string[];
  steering?: string[];
  transmission?: string[];
  minPrice?: number;
  maxPrice?: number;
  color?: string[];
}
