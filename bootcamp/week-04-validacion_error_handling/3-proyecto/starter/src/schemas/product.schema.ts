// ============================================
// SCHEMAS — Product validation (Import Company)
// ============================================
import { z } from 'zod';

const VALID_CATEGORIES = [
  'Electronics',
  'Textiles',
  'Food',
  'Machinery',
  'Chemicals',
  'Furniture',
  'Toys',
  'Other',
] as const;

export const createProductSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(2, 'name must be at least 2 characters')
    .max(120, 'name must not exceed 120 characters')
    .trim(),

  origin: z
    .string({ required_error: 'origin (country) is required' })
    .min(2, 'origin must be at least 2 characters')
    .max(60, 'origin must not exceed 60 characters')
    .trim(),

  category: z.enum(VALID_CATEGORIES, {
    errorMap: () => ({
      message: `category must be one of: ${VALID_CATEGORIES.join(', ')}`,
    }),
  }),

  price: z
    .number({ required_error: 'price is required' })
    .positive('price must be greater than 0')
    .multipleOf(0.01, 'price must have at most 2 decimal places'),

  stock: z
    .number()
    .int('stock must be an integer')
    .nonnegative('stock cannot be negative')
    .default(0),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;