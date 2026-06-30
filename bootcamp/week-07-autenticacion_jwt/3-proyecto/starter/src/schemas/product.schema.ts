import { z } from 'zod';

// Schema de validación para crear un producto
export const createProductSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(120, 'Máximo 120 caracteres').trim(),
  sku: z.string().min(3, 'Mínimo 3 caracteres').max(30, 'Máximo 30 caracteres').toUpperCase().trim(),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  category: z.string().min(2, 'La categoría es requerida').trim(),
  unitPrice: z.number().positive('El precio debe ser mayor a 0'),
  supplier: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de proveedor inválido'),
});

// Schema de actualización: todos los campos opcionales
export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
