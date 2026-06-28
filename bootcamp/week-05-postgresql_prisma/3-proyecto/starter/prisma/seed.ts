// prisma/seed.ts — Datos iniciales del dominio de importación
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // Limpiar datos existentes para idempotencia (orden inverso por FK)
  await prisma.shipment.deleteMany();
  await prisma.customsBroker.deleteMany();

  // ============================================================
  // Crear customs brokers (recurso secundario)
  // ============================================================

  const brokerFast = await prisma.customsBroker.create({
    data: {
      companyName: 'FastClear Logistics',
      licenseNumber: 'LIC-US-001',
      contactEmail: 'operations@fastclear.com',
      phone: '+1-305-555-0100',
      country: 'USA',
      active: true,
    },
  });

  const brokerGlobal = await prisma.customsBroker.create({
    data: {
      companyName: 'Global Trade Solutions',
      licenseNumber: 'LIC-NL-002',
      contactEmail: 'contact@globaltrade.nl',
      phone: '+31-10-555-0200',
      country: 'Netherlands',
      active: true,
    },
  });

  const brokerAsia = await prisma.customsBroker.create({
    data: {
      companyName: 'Asia Cargo Services',
      licenseNumber: 'LIC-CN-003',
      contactEmail: 'info@asiacargo.cn',
      phone: '+86-21-555-0300',
      country: 'China',
      active: false,
    },
  });

  console.log(`✅ ${3} customs brokers created`);

  // ============================================================
  // Crear shipments (recurso principal)
  // ============================================================

  const shipmentsData = [
    {
      trackingNumber: 'SHP-2025-001',
      origin: 'Shanghai, China',
      destination: 'Miami, USA',
      status: 'CLEARED',
      weight: 12500.50,
      containerCount: 2,
      departureDate: new Date('2025-01-10'),
      arrivalDate: new Date('2025-02-05'),
      customsBrokerId: brokerFast.id,
    },
    {
      trackingNumber: 'SHP-2025-002',
      origin: 'Rotterdam, Netherlands',
      destination: 'Buenos Aires, Argentina',
      status: 'IN_TRANSIT',
      weight: 8900.00,
      containerCount: 1,
      departureDate: new Date('2025-03-01'),
      arrivalDate: null,
      customsBrokerId: brokerGlobal.id,
    },
    {
      trackingNumber: 'SHP-2025-003',
      origin: 'Hamburg, Germany',
      destination: 'New York, USA',
      status: 'CUSTOMS',
      weight: 22000.75,
      containerCount: 3,
      departureDate: new Date('2025-03-15'),
      arrivalDate: new Date('2025-04-10'),
      customsBrokerId: brokerFast.id,
    },
    {
      trackingNumber: 'SHP-2025-004',
      origin: 'Busan, South Korea',
      destination: 'Los Angeles, USA',
      status: 'PENDING',
      weight: 15400.25,
      containerCount: 2,
      departureDate: new Date('2025-04-20'),
      arrivalDate: null,
      customsBrokerId: brokerGlobal.id,
    },
    {
      trackingNumber: 'SHP-2025-005',
      origin: 'Santos, Brazil',
      destination: 'Lisbon, Portugal',
      status: 'DELIVERED',
      weight: 6700.00,
      containerCount: 1,
      departureDate: new Date('2024-11-05'),
      arrivalDate: new Date('2024-12-20'),
      customsBrokerId: null, // Sin broker asignado
    },
    {
      trackingNumber: 'SHP-2025-006',
      origin: 'Tokyo, Japan',
      destination: 'San Francisco, USA',
      status: 'IN_TRANSIT',
      weight: 18900.30,
      containerCount: 3,
      departureDate: new Date('2025-03-28'),
      arrivalDate: null,
      customsBrokerId: brokerAsia.id,
    },
  ];

  const result = await prisma.shipment.createMany({ data: shipmentsData });
  console.log(`✅ ${result.count} shipments created`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
