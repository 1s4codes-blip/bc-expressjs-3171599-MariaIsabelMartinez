import mongoose from 'mongoose';
import { Supplier } from '../models/supplier.model';
import { AppError } from '../errors/AppError';
import type { CreateSupplierDto, UpdateSupplierDto } from '../schemas/supplier.schema';

export async function findAll(): Promise<unknown[]> {
  return Supplier.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  try {
    const supplier = await Supplier.findById(id).lean();
    if (!supplier) throw new AppError(404, 'Proveedor no encontrado');
    return supplier;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de proveedor inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateSupplierDto): Promise<unknown> {
  try {
    const supplier = await Supplier.create(dto);
    return supplier.toJSON();
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: number }).code === 11000) {
      throw new AppError(409, 'Ya existe un proveedor con ese nombre');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateSupplierDto): Promise<unknown> {
  try {
    const supplier = await Supplier.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();
    if (!supplier) throw new AppError(404, 'Proveedor no encontrado');
    return supplier;
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de proveedor inválido');
    }
    if (err instanceof Error && 'code' in err && (err as { code: number }).code === 11000) {
      throw new AppError(409, 'Ya existe un proveedor con ese nombre');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const supplier = await Supplier.findByIdAndDelete(id).lean();
    if (!supplier) throw new AppError(404, 'Proveedor no encontrado');
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de proveedor inválido');
    }
    throw err;
  }
}
