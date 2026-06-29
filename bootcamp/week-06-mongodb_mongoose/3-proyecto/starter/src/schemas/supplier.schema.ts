import { z } from 'zod';

export const createSupplierSchema = z.object({
  name: z.string().min(1, 'El nombre del proveedor es requerido').max(100),
  contactPerson: z.string().min(1, 'La persona de contacto es requerida').max(100),
  phone: z.string().min(1, 'El teléfono es requerido').max(20),
  email: z.string().min(1, 'El email es requerido').max(100).email('Email inválido'),
  address: z.string().min(1, 'La dirección es requerida').max(200),
  country: z.string().min(1, 'El país es requerido').max(100),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export type CreateSupplierDto = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierDto = z.infer<typeof updateSupplierSchema>;
