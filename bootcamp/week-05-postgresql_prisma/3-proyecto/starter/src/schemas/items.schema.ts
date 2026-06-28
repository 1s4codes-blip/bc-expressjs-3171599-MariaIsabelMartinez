// src/schemas/shipment.schema.ts — Validación Zod para Shipment
// Usados: createShipmentSchema (POST), updateShipmentSchema (PUT)

import { z } from 'zod';

export const createShipmentSchema = z.object({
  trackingNumber: z
    .string()
    .min(1, 'Tracking number is required')
    .max(30)
    .regex(/^[A-Z0-9-]+$/, 'Tracking number only accepts uppercase letters, numbers and hyphens'),
  origin: z.string().min(1, 'Origin is required').max(100),
  destination: z.string().min(1, 'Destination is required').max(100),
  status: z.enum(['PENDING', 'IN_TRANSIT', 'CUSTOMS', 'CLEARED', 'DELIVERED']).default('PENDING'),
  weight: z.number().positive('Weight must be greater than 0'),
  containerCount: z.number().int().min(1).default(1),
  departureDate: z.string().datetime({ offset: true }).or(z.string().pipe(z.coerce.date())),
  arrivalDate: z
    .string()
    .datetime({ offset: true })
    .or(z.string().pipe(z.coerce.date()))
    .optional()
    .nullable(),
  customsBrokerId: z.number().int().positive().optional().nullable(),
});

export const updateShipmentSchema = createShipmentSchema.partial();

export type CreateShipmentDto = z.infer<typeof createShipmentSchema>;
export type UpdateShipmentDto = z.infer<typeof updateShipmentSchema>;
