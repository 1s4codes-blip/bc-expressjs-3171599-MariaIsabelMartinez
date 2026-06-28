// src/controllers/shipments.controller.ts — Capa HTTP
// Valida con Zod, llama al servicio y responde con status codes apropiados

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { createShipmentSchema, updateShipmentSchema } from '../schemas/items.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query['limit']) || 10));
    const result = await service.listShipments(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    const shipment = await service.getShipment(id);
    res.json(shipment);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createShipmentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: parsed.error.flatten() });
      return;
    }
    const shipment = await service.createShipment(parsed.data);
    res.status(201).json(shipment);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    const parsed = updateShipmentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: parsed.error.flatten() });
      return;
    }
    const shipment = await service.updateShipment(id, parsed.data);
    res.json(shipment);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    await service.deleteShipment(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
