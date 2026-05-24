// ============================================
// REPOSITORY — Products data layer (in-memory)
// ============================================
import { Product } from '../types';

export type CreateProductRepoDto = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProductRepoDto = Partial<CreateProductRepoDto>;

// Datos de seed — productos reales de importación
let products: Product[] = [
  {
    id: 1,
    name: 'Samsung 4K LED Display 55"',
    origin: 'South Korea',
    category: 'Electronics',
    price: 480.00,
    stock: 42,
    createdAt: new Date('2025-01-10'),
  },
  {
    id: 2,
    name: 'Premium Cotton Fabric Roll',
    origin: 'India',
    category: 'Textiles',
    price: 35.50,
    stock: 200,
    createdAt: new Date('2025-02-14'),
  },
  {
    id: 3,
    name: 'Extra Virgin Olive Oil 5L',
    origin: 'Spain',
    category: 'Food',
    price: 22.75,
    stock: 350,
    createdAt: new Date('2025-03-01'),
  },
  {
    id: 4,
    name: 'Industrial Conveyor Belt Motor',
    origin: 'Germany',
    category: 'Machinery',
    price: 1250.00,
    stock: 8,
    createdAt: new Date('2025-03-20'),
  },
  {
    id: 5,
    name: 'LEGO City Construction Set',
    origin: 'Denmark',
    category: 'Toys',
    price: 89.99,
    stock: 120,
    createdAt: new Date('2025-04-05'),
  },
];

let nextId = 6;

export async function findAll(): Promise<Product[]> {
  // Copia defensiva del array completo
  return products.map((p) => ({ ...p }));
}

export async function findById(id: number): Promise<Product | undefined> {
  const product = products.find((p) => p.id === id);
  // Copia defensiva o undefined
  return product ? { ...product } : undefined;
}

export async function create(dto: CreateProductRepoDto): Promise<Product> {
  const product: Product = {
    id: nextId++,
    ...dto,
    createdAt: new Date(),
  };
  products.push(product);
  return { ...product };
}

export async function update(
  id: number,
  dto: UpdateProductRepoDto
): Promise<Product | undefined> {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  products[index] = { ...products[index]!, ...dto };
  return { ...products[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}