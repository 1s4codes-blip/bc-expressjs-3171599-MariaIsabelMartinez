import * as customsDeclarationRepository from '../repositories/customsDeclaration.repository';
import * as shipmentRepository from '../repositories/shipment.repository';
import { CreateCustomsDeclarationDto, UpdateCustomsDeclarationDto } from '../schemas/customsDeclaration.schema';
import { ICustomsDeclaration } from '../models/customsDeclaration.model';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<ICustomsDeclaration[]> {
  return customsDeclarationRepository.findAll();
}

export async function getById(id: string): Promise<ICustomsDeclaration> {
  const declaration = await customsDeclarationRepository.findById(id);
  if (!declaration) throw new AppError(404, 'Declaración aduanera no encontrada');
  return declaration;
}

export async function create(
  dto: CreateCustomsDeclarationDto,
  userId: string
): Promise<ICustomsDeclaration> {
  // Validar que el envío existe
  const shipment = await shipmentRepository.findById(dto.shipment);
  if (!shipment) {
    throw new AppError(404, 'El envío especificado no existe');
  }

  // Validar que no exista ya una declaración para este envío
  const existingDeclaration = await customsDeclarationRepository.findByShipment(dto.shipment);
  if (existingDeclaration) {
    throw new AppError(409, 'Ya existe una declaración aduanera para este envío');
  }

  // Validar que el número de declaración no esté duplicado
  const existingNum = await customsDeclarationRepository.findByDeclarationNumber(
    dto.declarationNumber
  );
  if (existingNum) {
    throw new AppError(409, 'Ya existe una declaración con ese número');
  }

  // Calcular impuestos estimados (ej. 15% del valor declarado)
  const calculatedTaxes = dto.taxes > 0 ? dto.taxes : Math.round(dto.declaredValue * 0.15 * 100) / 100;

  return customsDeclarationRepository.create({
    ...dto,
    taxes: calculatedTaxes,
    createdBy: userId,
  });
}

export async function update(
  id: string,
  dto: UpdateCustomsDeclarationDto
): Promise<ICustomsDeclaration> {
  // Verificar que la declaración existe
  await getById(id);

  // Si se aprueba, registrar la fecha de despacho
  if (dto.status === 'approved') {
    dto.clearanceDate = dto.clearanceDate ?? new Date().toISOString();
  }

  const updated = await customsDeclarationRepository.updateById(id, dto);
  if (!updated) throw new AppError(404, 'Declaración aduanera no encontrada');
  return updated;
}

export async function remove(id: string): Promise<void> {
  const deleted = await customsDeclarationRepository.deleteById(id);
  if (!deleted) throw new AppError(404, 'Declaración aduanera no encontrada');
}
