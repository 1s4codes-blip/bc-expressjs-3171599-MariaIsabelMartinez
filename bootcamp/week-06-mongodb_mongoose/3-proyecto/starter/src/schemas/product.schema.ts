import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre del producto es requerido').max(150),
  sku: z.string().min(1, 'El SKU es requerido').max(50),
  description: z.string().max(500).optional(),
  purchasePrice: z.number({ message: 'El precio de compra es requerido' }).min(0),
  salePrice: z.number({ message: 'El precio de venta es requerido' }).min(0),
  stock: z.number().int().min(0).default(0),
  category: z.string().min(1, 'La categoría es requerida').max(100),
  originCountry: z.string().min(1, 'El país de origen es requerido').max(100),
  supplier: z.string().regex(objectIdRegex, 'ID de proveedor inválido'),
  active: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
