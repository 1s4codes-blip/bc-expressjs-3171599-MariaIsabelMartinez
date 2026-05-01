import { Router } from 'express';
import * as store from '../store.js';
import type { Request, Response } from 'express';
import type { CreateSupplierDto, UpdateSupplierDto } from '../types.js';

export const suppliersRouter = Router();

suppliersRouter.get('/', (_req: Request, res: Response) => {  // ✏️ CAMBIO
  const suppliers = store.getAll();
  res.json(suppliers);
});

suppliersRouter.get('/:id', (req: Request, res: Response) => {  // ✏️ CAMBIO
  const id = Number(req.params.id);
  const supplier = store.getById(id);
  if (!supplier) {
    res.status(404).json({ error: 'Supplier not found' });
    return;
  }
  res.json(supplier);
});

suppliersRouter.post('/', (req: Request, res: Response) => {  // ✏️ CAMBIO
  const dto = req.body as CreateSupplierDto;
  const supplier = store.create(dto);
  res.status(201).json(supplier);
});

suppliersRouter.put('/:id', (req: Request, res: Response) => {  // ✏️ CAMBIO
  const id = Number(req.params.id);
  const dto = req.body as UpdateSupplierDto;
  const supplier = store.update(id, dto);
  if (!supplier) {
    res.status(404).json({ error: 'Supplier not found' });
    return;
  }
  res.json(supplier);
});

suppliersRouter.delete('/:id', (req: Request, res: Response) => {  // ✏️ CAMBIO
  const id = Number(req.params.id);
  const deleted = store.remove(id);
  if (!deleted) {
    res.status(404).json({ error: 'Supplier not found' });
    return;
  }
  res.status(204).send();
});