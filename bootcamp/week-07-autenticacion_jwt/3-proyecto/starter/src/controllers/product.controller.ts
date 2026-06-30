import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';
import { ZodError } from 'zod';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const product = await productService.getById(id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createProductSchema.parse(req.body);
    const userId = req.user!.sub;
    const product = await productService.create(dto, userId);
    res.status(201).json(product);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: 'Datos inválidos', details: err.issues });
      return;
    }
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = updateProductSchema.parse(req.body);
    const id = req.params.id as string;
    const product = await productService.update(id, dto);
    res.status(200).json(product);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: 'Datos inválidos', details: err.issues });
      return;
    }
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    await productService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
