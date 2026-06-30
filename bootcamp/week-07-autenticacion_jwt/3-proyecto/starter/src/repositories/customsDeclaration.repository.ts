import { CustomsDeclarationModel, ICustomsDeclaration } from '../models/customsDeclaration.model';
import { CreateCustomsDeclarationDto, UpdateCustomsDeclarationDto } from '../schemas/customsDeclaration.schema';

export async function findAll(): Promise<ICustomsDeclaration[]> {
  return CustomsDeclarationModel.find()
    .populate('shipment', 'trackingNumber status')
    .populate('createdBy', 'name email')
    .lean();
}

export async function findById(id: string): Promise<ICustomsDeclaration | null> {
  return CustomsDeclarationModel.findById(id)
    .populate({
      path: 'shipment',
      populate: { path: 'supplier', select: 'name country' },
    })
    .populate('createdBy', 'name email')
    .lean();
}

export async function findByShipment(shipmentId: string): Promise<ICustomsDeclaration | null> {
  return CustomsDeclarationModel.findOne({ shipment: shipmentId })
    .populate('shipment', 'trackingNumber')
    .lean();
}

export async function findByDeclarationNumber(
  declarationNumber: string
): Promise<ICustomsDeclaration | null> {
  return CustomsDeclarationModel.findOne({ declarationNumber }).lean();
}

export async function create(
  data: CreateCustomsDeclarationDto & { createdBy: string }
): Promise<ICustomsDeclaration> {
  const declaration = await CustomsDeclarationModel.create({
    ...data,
    clearanceDate: data.clearanceDate ? new Date(data.clearanceDate) : undefined,
  });
  return declaration.populate('shipment', 'trackingNumber');
}

export async function updateById(
  id: string,
  data: UpdateCustomsDeclarationDto
): Promise<ICustomsDeclaration | null> {
  const updateData: Record<string, unknown> = { ...data };
  if (data.clearanceDate) updateData.clearanceDate = new Date(data.clearanceDate);
  else if (data.clearanceDate === undefined) delete updateData.clearanceDate;

  return CustomsDeclarationModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate('shipment', 'trackingNumber')
    .lean();
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await CustomsDeclarationModel.findByIdAndDelete(id);
  return result !== null;
}
