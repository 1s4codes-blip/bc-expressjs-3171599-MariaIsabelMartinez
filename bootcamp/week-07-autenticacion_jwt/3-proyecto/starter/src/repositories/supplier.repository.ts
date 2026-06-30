import { SupplierModel, ISupplier } from '../models/supplier.model';
import { CreateSupplierDto, UpdateSupplierDto } from '../schemas/supplier.schema';

export async function findAll(): Promise<ISupplier[]> {
  return SupplierModel.find().populate('createdBy', 'name email').lean();
}

export async function findById(id: string): Promise<ISupplier | null> {
  return SupplierModel.findById(id).populate('createdBy', 'name email').lean();
}

export async function findByEmail(email: string): Promise<ISupplier | null> {
  return SupplierModel.findOne({ email }).lean();
}

export async function create(data: CreateSupplierDto & { createdBy: string }): Promise<ISupplier> {
  const supplier = await SupplierModel.create(data);
  return supplier.populate('createdBy', 'name email');
}

export async function updateById(
  id: string,
  data: UpdateSupplierDto
): Promise<ISupplier | null> {
  return SupplierModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('createdBy', 'name email')
    .lean();
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await SupplierModel.findByIdAndDelete(id);
  return result !== null;
}
