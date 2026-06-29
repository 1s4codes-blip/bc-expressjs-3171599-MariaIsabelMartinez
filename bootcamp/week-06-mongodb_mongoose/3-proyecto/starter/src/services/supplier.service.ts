import * as repo from '../repositories/supplier.repository';
import type { CreateSupplierDto, UpdateSupplierDto } from '../schemas/supplier.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createSupplier(dto: CreateSupplierDto) {
  return repo.create(dto);
}

export async function updateSupplier(id: string, dto: UpdateSupplierDto) {
  return repo.update(id, dto);
}

export async function deleteSupplier(id: string) {
  return repo.remove(id);
}
