import { Request, Response, NextFunction } from 'express';
import * as shipmentService from '../services/shipment.service';
import { createShipmentSchema, updateShipmentSchema } from '../schemas/shipment.schema';
import { ZodError } from 'zod';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const shipments = await shipmentService.getAll();
    res.status(200).json(shipments);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const shipment = await shipmentService.getById(id);
    res.status(200).json(shipment);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createShipmentSchema.parse(req.body);
    const userId = req.user!.sub;
    const shipment = await shipmentService.create(dto, userId);
    res.status(201).json(shipment);
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
    const dto = updateShipmentSchema.parse(req.body);
    const id = req.params.id as string;
    const shipment = await shipmentService.update(id, dto);
    res.status(200).json(shipment);
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
    await shipmentService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
