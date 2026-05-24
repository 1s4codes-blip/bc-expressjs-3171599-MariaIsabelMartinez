// ============================================
// CONTROLLER — thin, handles req/res, calls service
// ============================================
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/Products.service';
import {
  createProductSchema,
  updateProductSchema,
  CreateProductDto,
  UpdateProductDto,
} from '../schemas/product.schema';
import { SingleResponse, PaginatedResponse } from '../types';
import { Product } from '../types';

const idSchema = z.coerce.number().int().positive({
  message: 'id must be a positive integer',
});

function formatIssues(error: z.ZodError): Array<{ field: string; message: string }> {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || 'id',
    message: issue.message,
  }));
}

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;

    const result = await service.findAll({ page, limit });
    res.json(result satisfies PaginatedResponse<Product>);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = idSchema.safeParse(req.params['id']);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid parameter',
        issues: formatIssues(parsed.error),
      });
      return;
    }

    const product = await service.findById(parsed.data);
    res.json({ data: product } satisfies SingleResponse<Product>);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = createProductSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid input data',
        issues: formatIssues(result.error),
      });
      return;
    }

    const dto: CreateProductDto = result.data;
    const product = await service.create(dto);
    res.status(201).json({ data: product } satisfies SingleResponse<Product>);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsedId = idSchema.safeParse(req.params['id']);
    if (!parsedId.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid parameter',
        issues: formatIssues(parsedId.error),
      });
      return;
    }

    const result = updateProductSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid input data',
        issues: formatIssues(result.error),
      });
      return;
    }

    const dto: UpdateProductDto = result.data;
    const product = await service.update(parsedId.data, dto);
    res.json({ data: product } satisfies SingleResponse<Product>);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = idSchema.safeParse(req.params['id']);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid parameter',
        issues: formatIssues(parsed.error),
      });
      return;
    }

    await service.remove(parsed.data);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}