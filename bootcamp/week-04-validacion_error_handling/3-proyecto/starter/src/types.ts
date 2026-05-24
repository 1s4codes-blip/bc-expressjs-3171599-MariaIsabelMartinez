// ============================================
// TYPES — Product entity for Import Company 
// ============================================

export interface Product {
  id: number;
  name: string;           
  origin: string;      
  category: string;    
  price: number;   
  stock: number;      
  createdAt: Date;
}

export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}