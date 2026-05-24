// ============================================
// SERVICE — Lógica de negocio
// ============================================

import {
  CreateShipmentDto,
  UpdateShipmentDto,
  Shipment,
  PaginatedResponse,
  PaginationParams,
} from '../types';
import * as repo from '../repositories/shipments.repository';

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Shipment>> {
  const { page, limit } = params;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Shipment | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreateShipmentDto): Promise<Shipment> {
  if (dto.quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }
  if (dto.unitPrice <= 0) {
    throw new Error('Unit price must be greater than 0');
  }
  return repo.create(dto);
}

export async function update(id: number, dto: UpdateShipmentDto): Promise<Shipment | undefined> {
  if (dto.quantity !== undefined && dto.quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }
  if (dto.unitPrice !== undefined && dto.unitPrice <= 0) {
    throw new Error('Unit price must be greater than 0');
  }
  const exists = await repo.findById(id);
  if (!exists) return undefined;
  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) return false;
  return repo.remove(id);
}
