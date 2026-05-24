// ============================================
// TYPES — Import Company domain
// ============================================
export interface Shipment {
  id: number;
  productName: string;     
  originCountry: string;    
  quantity: number;      
  unitPrice: number;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled'; // Estado del envío
  createdAt: string;
}

export type CreateShipmentDto = Omit<Shipment, 'id' | 'createdAt'>;

export type UpdateShipmentDto = Partial<CreateShipmentDto>;
export interface SingleResponse<T> {
  data: T;
}
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
export interface ErrorResponse {
  error: string;
  message: string;
}
export interface PaginationParams {
  page: number;
  limit: number;
}
