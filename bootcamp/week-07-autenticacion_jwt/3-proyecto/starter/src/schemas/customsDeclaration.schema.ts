import { z } from 'zod';

// Schema de validación para crear una declaración aduanera
export const createCustomsDeclarationSchema = z.object({
  shipment: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de envío inválido'),
  declarationNumber: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres').trim(),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  declaredValue: z.number().positive('El valor declarado debe ser mayor a 0'),
  taxes: z.number().min(0, 'Los impuestos no pueden ser negativos').default(0),
  customsOfficer: z.string().max(80, 'Máximo 80 caracteres').optional(),
  clearanceDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida').optional(),
  notes: z.string().max(1000, 'Máximo 1000 caracteres').optional(),
});

// Schema de actualización: todos los campos opcionales
export const updateCustomsDeclarationSchema = createCustomsDeclarationSchema.partial();

export type CreateCustomsDeclarationDto = z.infer<typeof createCustomsDeclarationSchema>;
export type UpdateCustomsDeclarationDto = z.infer<typeof updateCustomsDeclarationSchema>;
