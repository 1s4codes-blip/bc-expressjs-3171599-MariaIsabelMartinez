import { z } from 'zod';

// Schema para cada item dentro del envío
const shipmentItemSchema = z.object({
  product: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de producto inválido'),
  quantity: z.number().int().positive('La cantidad debe ser mayor a 0'),
});

// Schema de validación para crear un envío
export const createShipmentSchema = z.object({
  trackingNumber: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres').trim(),
  supplier: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de proveedor inválido'),
  items: z.array(shipmentItemSchema).min(1, 'Debe haber al menos un producto'),
  status: z.enum(['pending', 'in_transit', 'arrived', 'customs_held', 'cleared']).default('pending'),
  estimatedArrival: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida'),
  actualArrival: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida').optional(),
  notes: z.string().max(1000, 'Máximo 1000 caracteres').optional(),
});

// Schema de actualización: todos los campos opcionales
export const updateShipmentSchema = createShipmentSchema.partial();

export type CreateShipmentDto = z.infer<typeof createShipmentSchema>;
export type UpdateShipmentDto = z.infer<typeof updateShipmentSchema>;
