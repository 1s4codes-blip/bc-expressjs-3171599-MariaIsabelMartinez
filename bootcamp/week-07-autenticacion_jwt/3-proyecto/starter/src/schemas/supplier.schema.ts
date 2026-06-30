import { z } from 'zod';

// Schema de validación para crear un proveedor
export const createSupplierSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres').trim(),
  contactPerson: z.string().min(2, 'Mínimo 2 caracteres').max(80, 'Máximo 80 caracteres').trim(),
  email: z.string().email('Email inválido').toLowerCase(),
  phone: z.string().optional(),
  address: z.string().optional(),
  country: z.string().min(2, 'El país es requerido').trim(),
  active: z.boolean().default(true),
});

// Schema de actualización: todos los campos opcionales
export const updateSupplierSchema = createSupplierSchema.partial();

export type CreateSupplierDto = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierDto = z.infer<typeof updateSupplierSchema>;
