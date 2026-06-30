import { ShipmentModel, IShipment } from '../models/shipment.model';
import { CreateShipmentDto, UpdateShipmentDto } from '../schemas/shipment.schema';

export async function findAll(): Promise<IShipment[]> {
  return ShipmentModel.find()
    .populate('supplier', 'name country')
    .populate('items.product', 'name sku')
    .populate('createdBy', 'name email')
    .lean();
}

export async function findById(id: string): Promise<IShipment | null> {
  return ShipmentModel.findById(id)
    .populate('supplier', 'name country email')
    .populate('items.product', 'name sku unitPrice')
    .populate('createdBy', 'name email')
    .lean();
}

export async function findByTrackingNumber(trackingNumber: string): Promise<IShipment | null> {
  return ShipmentModel.findOne({ trackingNumber }).lean();
}

export async function findBySupplier(supplierId: string): Promise<IShipment[]> {
  return ShipmentModel.find({ supplier: supplierId })
    .populate('items.product', 'name sku')
    .lean();
}

export async function findByStatus(status: string): Promise<IShipment[]> {
  return ShipmentModel.find({ status })
    .populate('supplier', 'name country')
    .lean();
}

export async function create(data: CreateShipmentDto & { createdBy: string }): Promise<IShipment> {
  const shipment = await ShipmentModel.create({
    ...data,
    estimatedArrival: new Date(data.estimatedArrival),
    actualArrival: data.actualArrival ? new Date(data.actualArrival) : undefined,
  });
  return shipment.populate('supplier', 'name country');
}

export async function updateById(
  id: string,
  data: UpdateShipmentDto
): Promise<IShipment | null> {
  const updateData: Record<string, unknown> = { ...data };
  if (data.estimatedArrival) updateData.estimatedArrival = new Date(data.estimatedArrival);
  if (data.actualArrival) updateData.actualArrival = new Date(data.actualArrival);
  else if (data.actualArrival === undefined) delete updateData.actualArrival;

  return ShipmentModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('supplier', 'name country')
    .populate('items.product', 'name sku')
    .lean();
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await ShipmentModel.findByIdAndDelete(id);
  return result !== null;
}
