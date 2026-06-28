// src/services/shipments.service.ts — Lógica de negocio
// Delega el acceso a datos al repositorio

import * as repo from '../repositories/items.repository';
import { AppError } from '../errors/AppError';
import { CreateShipmentDto, UpdateShipmentDto } from '../schemas/items.schema';

export async function listShipments(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getShipment(id: number) {
  const shipment = await repo.findById(id);
  if (!shipment) {
    throw new AppError(404, 'Shipment not found');
  }
  return shipment;
}

export async function createShipment(data: CreateShipmentDto) {
  return repo.create(data);
}

export async function updateShipment(id: number, data: UpdateShipmentDto) {
  return repo.update(id, data);
}

export async function deleteShipment(id: number) {
  return repo.remove(id);
}
