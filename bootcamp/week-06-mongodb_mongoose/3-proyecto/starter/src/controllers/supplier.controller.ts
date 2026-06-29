import { Request, Response, NextFunction } from 'express';
import * as service from '../services/supplier.service';
import {
  createSupplierSchema,
  updateSupplierSchema,
} from '../schemas/supplier.schema';
import { objectIdSchema } from '../schemas/product.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const suppliers = await service.getAll();
    res.json(suppliers);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const supplier = await service.getById(id);
    res.json(supplier);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createSupplierSchema.parse(req.body);
    const supplier = await service.createSupplier(dto);
    res.status(201).json(supplier);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id  = objectIdSchema.parse(req.params['id']);
    const dto = updateSupplierSchema.parse(req.body);
    const supplier = await service.updateSupplier(id, dto);
    res.json(supplier);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteSupplier(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
