// src/repositories/shipments.repository.ts — Acceso a datos con Prisma
// Toda interacción con la base de datos ocurre aquí
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { CreateShipmentDto, UpdateShipmentDto } from '../schemas/items.schema';

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function findAll(page: number, limit: number): Promise<PaginatedResult<unknown>> {
  const [shipments, total] = await Promise.all([
    prisma.shipment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { broker: true },
    }),
    prisma.shipment.count(),
  ]);
  return { data: shipments, total, page, limit };
}

export async function findById(id: number) {
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { broker: true },
  });
  return shipment;
}

export async function create(data: CreateShipmentDto) {
  try {
    return await prisma.shipment.create({ data: { ...data, departureDate: new Date(data.departureDate), arrivalDate: data.arrivalDate ? new Date(data.arrivalDate) : null } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Tracking number already exists');
    }
    throw err;
  }
}

export async function update(id: number, data: UpdateShipmentDto) {
  try {
    const updateData = { ...data };
    if (data.departureDate) {
      updateData.departureDate = new Date(data.departureDate) as unknown as string;
    }
    if (data.arrivalDate !== undefined) {
      updateData.arrivalDate = data.arrivalDate ? (new Date(data.arrivalDate) as unknown as string) : null as unknown as string;
    }
    return await prisma.shipment.update({ where: { id }, data: updateData });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Shipment not found');
    }
    throw err;
  }
}

export async function remove(id: number): Promise<void> {
  try {
    await prisma.shipment.delete({ where: { id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Shipment not found');
    }
    throw err;
  }
}