import { ProductModel, IProduct } from '../models/product.model';
import { CreateProductDto, UpdateProductDto } from '../schemas/product.schema';

export async function findAll(): Promise<IProduct[]> {
  return ProductModel.find()
    .populate('supplier', 'name country')
    .populate('createdBy', 'name email')
    .lean();
}

export async function findById(id: string): Promise<IProduct | null> {
  return ProductModel.findById(id)
    .populate('supplier', 'name country email')
    .populate('createdBy', 'name email')
    .lean();
}

export async function findBySku(sku: string): Promise<IProduct | null> {
  return ProductModel.findOne({ sku }).lean();
}

export async function findBySupplier(supplierId: string): Promise<IProduct[]> {
  return ProductModel.find({ supplier: supplierId }).lean();
}

export async function create(data: CreateProductDto & { createdBy: string }): Promise<IProduct> {
  const product = await ProductModel.create(data);
  return product.populate('supplier', 'name country');
}

export async function updateById(
  id: string,
  data: UpdateProductDto
): Promise<IProduct | null> {
  return ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('supplier', 'name country')
    .lean();
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await ProductModel.findByIdAndDelete(id);
  return result !== null;
}
