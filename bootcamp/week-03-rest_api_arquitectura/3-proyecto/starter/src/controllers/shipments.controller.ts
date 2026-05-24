// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================
// Exactamente 3 pasos por handler: extraer → llamar service → responder
// Sin lógica de negocio; maneja 404 cuando el service retorna undefined

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/shipments.service';
import { CreateShipmentDto, UpdateShipmentDto, ErrorResponse } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query['page'] as string ?? '1', 10) || 1;
    const limit = parseInt(req.query['limit'] as string ?? '10', 10) || 10;
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params['id']), 10);
    const shipment = await service.findById(id);
    if (!shipment) {
      const body: ErrorResponse = { error: 'Not Found', message: `Shipment ${id} not found` };
      res.status(404).json(body);
      return;
    }
    res.json({ data: shipment });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreateShipmentDto;
    const shipment = await service.create(dto);
    res.status(201).json({ data: shipment });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params['id']), 10);
    const dto = req.body as UpdateShipmentDto;
    const shipment = await service.update(id, dto);
    if (!shipment) {
      const body: ErrorResponse = { error: 'Not Found', message: `Shipment ${id} not found` };
      res.status(404).json(body);
      return;
    }
    res.json({ data: shipment });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params['id']), 10);
    const deleted = await service.remove(id);
    if (!deleted) {
      const body: ErrorResponse = { error: 'Not Found', message: `Shipment ${id} not found` };
      res.status(404).json(body);
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}