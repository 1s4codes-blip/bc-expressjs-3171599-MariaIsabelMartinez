import * as shipmentRepository from '../repositories/shipment.repository';
import * as supplierRepository from '../repositories/supplier.repository';
import * as productRepository from '../repositories/product.repository';
import { CreateShipmentDto, UpdateShipmentDto } from '../schemas/shipment.schema';
import { IShipment } from '../models/shipment.model';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<IShipment[]> {
  return shipmentRepository.findAll();
}

export async function getById(id: string): Promise<IShipment> {
  const shipment = await shipmentRepository.findById(id);
  if (!shipment) throw new AppError(404, 'Envío no encontrado');
  return shipment;
}

export async function create(dto: CreateShipmentDto, userId: string): Promise<IShipment> {
  // Validar que el tracking number no esté duplicado
  const existing = await shipmentRepository.findByTrackingNumber(dto.trackingNumber);
  if (existing) {
    throw new AppError(409, 'Ya existe un envío con ese número de seguimiento');
  }

  // Validar que el proveedor existe
  const supplier = await supplierRepository.findById(dto.supplier);
  if (!supplier) {
    throw new AppError(404, 'El proveedor especificado no existe');
  }

  // Validar que cada producto existe
  for (const item of dto.items) {
    const product = await productRepository.findById(item.product);
    if (!product) {
      throw new AppError(404, `Producto con ID ${item.product} no encontrado`);
    }
  }

  return shipmentRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdateShipmentDto): Promise<IShipment> {
  // Verificar que el envío existe
  await getById(id);

  // Si se actualiza el tracking number, verificar que no esté duplicado
  if (dto.trackingNumber) {
    const existing = await shipmentRepository.findByTrackingNumber(dto.trackingNumber);
    if (existing && existing._id.toString() !== id) {
      throw new AppError(409, 'Ya existe un envío con ese número de seguimiento');
    }
  }

  // Si se actualizan los items, validar que los productos existan
  if (dto.items) {
    for (const item of dto.items) {
      const product = await productRepository.findById(item.product);
      if (!product) {
        throw new AppError(404, `Producto con ID ${item.product} no encontrado`);
      }
    }
  }

  const updated = await shipmentRepository.updateById(id, dto);
  if (!updated) throw new AppError(404, 'Envío no encontrado');
  return updated;
}

export async function remove(id: string): Promise<void> {
  const deleted = await shipmentRepository.deleteById(id);
  if (!deleted) throw new AppError(404, 'Envío no encontrado');
}
