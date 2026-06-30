import * as supplierRepository from '../repositories/supplier.repository';
import * as productRepository from '../repositories/product.repository';
import { CreateSupplierDto, UpdateSupplierDto } from '../schemas/supplier.schema';
import { ISupplier } from '../models/supplier.model';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<ISupplier[]> {
  return supplierRepository.findAll();
}

export async function getById(id: string): Promise<ISupplier> {
  const supplier = await supplierRepository.findById(id);
  if (!supplier) throw new AppError(404, 'Proveedor no encontrado');
  return supplier;
}

export async function create(dto: CreateSupplierDto, userId: string): Promise<ISupplier> {
  // Validar que el email no esté duplicado
  const existing = await supplierRepository.findByEmail(dto.email);
  if (existing) {
    throw new AppError(409, 'Ya existe un proveedor con ese email');
  }

  return supplierRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdateSupplierDto): Promise<ISupplier> {
  // Verificar que el proveedor existe
  await getById(id);

  // Si se está actualizando el email, verificar que no esté duplicado
  if (dto.email) {
    const existing = await supplierRepository.findByEmail(dto.email);
    if (existing && existing._id.toString() !== id) {
      throw new AppError(409, 'Ya existe un proveedor con ese email');
    }
  }

  const updated = await supplierRepository.updateById(id, dto);
  if (!updated) throw new AppError(404, 'Proveedor no encontrado');
  return updated;
}

export async function remove(id: string): Promise<void> {
  // Verificar que el proveedor existe
  await getById(id);

  // Evitar borrar proveedores que tengan productos asociados
  const products = await productRepository.findBySupplier(id);
  if (products.length > 0) {
    throw new AppError(409, 'No se puede eliminar el proveedor porque tiene productos asociados');
  }

  const deleted = await supplierRepository.deleteById(id);
  if (!deleted) throw new AppError(404, 'Proveedor no encontrado');
}
