export interface PostalRecord {
  id: string;
  pincode: string;
  officeName: string;
  city: string;
  district: string;
  province: string;
  deliveryStatus: 'Delivery' | 'Non-Delivery';
  country: string;
  officeType: string;
}

export interface SearchFilters {
  province: string;
  district: string;
  status: string;
}

export enum SearchType {
  PINCODE = 'Pincode',
  CITY = 'City',
  STATE = 'State',
  OFFICE = 'Post Office'
}

export interface DashboardStats {
  totalPincodes: number;
  totalCities: number;
  totalOffices: number;
  totalProvinces: number;
  totalDistricts: number;
  officesByType: Record<string, number>;
}