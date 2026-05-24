// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================

import { Shipment, CreateShipmentDto, UpdateShipmentDto } from '../types';

const store: Shipment[] = [
  {
    id: 1,
    productName: 'Laptop Dell XPS 15',      
    originCountry: 'China',
    quantity: 50,
    unitPrice: 1200.00,
    status: 'delivered',
    createdAt: '2025-01-10T08:00:00.000Z',
  },
  {
    id: 2,
    productName: 'Tela de Algodón Premium',  
    originCountry: 'India',
    quantity: 500,
    unitPrice: 8.50,
    status: 'in_transit',
    createdAt: '2025-02-14T10:30:00.000Z',
  },
  {
    id: 3,
    productName: 'Repuestos Automotrices',   
    originCountry: 'Germany',
    quantity: 200,
    unitPrice: 45.00,
    status: 'pending',
    createdAt: '2025-03-05T14:15:00.000Z',
  },
  {
    id: 4,
    productName: 'Café Orgánico',            
    originCountry: 'Brazil',
    quantity: 1000,
    unitPrice: 12.75,
    status: 'delivered',
    createdAt: '2025-03-20T09:00:00.000Z',
  },
  {
    id: 5,
    productName: 'Paneles Solares 400W',  
    originCountry: 'South Korea',
    quantity: 80,
    unitPrice: 320.00,
    status: 'cancelled',
    createdAt: '2025-04-01T11:45:00.000Z',
  },
];

let nextId = 6;

export async function findAll(): Promise<Shipment[]> {

  return [...store];
}

export async function findById(id: number): Promise<Shipment | undefined> {

  return store.find((shipment) => shipment.id === id);
}

export async function create(dto: CreateShipmentDto): Promise<Shipment> {
  const shipment: Shipment = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString(),
  };
  store.push(shipment);
  return { ...shipment }; 
}

export async function update(id: number, dto: UpdateShipmentDto): Promise<Shipment | undefined> {
  const index = store.findIndex((shipment) => shipment.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! }; 
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((shipment) => shipment.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}