import * as productRepository from '../repositories/product.repository';
import * as supplierRepository from '../repositories/supplier.repository';
import { CreateProductDto, UpdateProductDto } from '../schemas/product.schema';
import { IProduct } from '../models/product.model';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<IProduct[]> {
  return productRepository.findAll();
}

export async function getById(id: string): Promise<IProduct> {
  const product = await productRepository.findById(id);
  if (!product) throw new AppError(404, 'Producto no encontrado');
  return product;
}

export async function create(dto: CreateProductDto, userId: string): Promise<IProduct> {
  // Validar que el SKU no esté duplicado
  const existingSku = await productRepository.findBySku(dto.sku);
  if (existingSku) {
    throw new AppError(409, 'Ya existe un producto con ese SKU');
  }

  // Validar que el proveedor existe
  const supplier = await supplierRepository.findById(dto.supplier);
  if (!supplier) {
    throw new AppError(404, 'El proveedor especificado no existe');
  }

  return productRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdateProductDto): Promise<IProduct> {
  // Verificar que el producto existe
  await getById(id);

  // Si se actualiza el SKU, verificar que no esté duplicado
  if (dto.sku) {
    const existing = await productRepository.findBySku(dto.sku);
    if (existing && existing._id.toString() !== id) {
      throw new AppError(409, 'Ya existe un producto con ese SKU');
    }
  }

  // Si se actualiza el proveedor, verificar que existe
  if (dto.supplier) {
    const supplier = await supplierRepository.findById(dto.supplier);
    if (!supplier) {
      throw new AppError(404, 'El proveedor especificado no existe');
    }
  }

  const updated = await productRepository.updateById(id, dto);
  if (!updated) throw new AppError(404, 'Producto no encontrado');
  return updated;
}

export async function remove(id: string): Promise<void> {
  const deleted = await productRepository.deleteById(id);
  if (!deleted) throw new AppError(404, 'Producto no encontrado');
}
