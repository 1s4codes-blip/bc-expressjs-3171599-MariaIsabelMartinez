import { Request, Response, NextFunction } from 'express';
import * as supplierService from '../services/supplier.service';
import { createSupplierSchema, updateSupplierSchema } from '../schemas/supplier.schema';
import { ZodError } from 'zod';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const suppliers = await supplierService.getAll();
    res.status(200).json(suppliers);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const supplier = await supplierService.getById(id);
    res.status(200).json(supplier);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createSupplierSchema.parse(req.body);
    const userId = req.user!.sub;
    const supplier = await supplierService.create(dto, userId);
    res.status(201).json(supplier);
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
    const dto = updateSupplierSchema.parse(req.body);
    const id = req.params.id as string;
    const supplier = await supplierService.update(id, dto);
    res.status(200).json(supplier);
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
    await supplierService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
