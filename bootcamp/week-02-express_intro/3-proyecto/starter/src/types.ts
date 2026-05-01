export interface Supplier {
  id: number;
  name: string;           
  country: string;         
  contactEmail: string;    
  phone: string;          
  active: boolean;       
}

export type CreateSupplierDto = Omit<Supplier, 'id'>;

// DTO para actualización (todos los campos editables)
export type UpdateSupplierDto = Partial<CreateSupplierDto>;
