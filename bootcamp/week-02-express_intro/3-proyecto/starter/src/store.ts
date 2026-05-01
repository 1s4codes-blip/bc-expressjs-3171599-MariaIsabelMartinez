import type { Supplier, CreateSupplierDto, UpdateSupplierDto  } from './types.js';

const suppliers: Supplier[] = [];
let nextId = 1;

export function getAll(): Supplier[] {
  return suppliers;
}

export function getById(id: number): Supplier | undefined {
  return suppliers.find((supplier) => supplier.id === id);
}

export function create(data: CreateSupplierDto): Supplier {
  const newSupplier: Supplier = { id: nextId++, ...data };
  suppliers.push(newSupplier);
  return newSupplier;
}

export function update(id: number, data: UpdateSupplierDto): Supplier | undefined {
  const supplier = suppliers.find((s) => s.id === id);
  if (!supplier) return undefined;
  Object.assign(supplier, data);
  return supplier;
}

export function remove(id: number): boolean {
  const index = suppliers.findIndex((s) => s.id === id);
  if (index === -1) return false;
  suppliers.splice(index, 1);
  return true;
}
