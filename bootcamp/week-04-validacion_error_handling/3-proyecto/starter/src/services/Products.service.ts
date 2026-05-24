// ============================================
// SERVICE — Products business logic
// ============================================
import { Product, PaginatedResponse } from '../types';
import * as repo from '../repositories/Products.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Product>> {
  const { page, limit } = opts;
  const all = await repo.findAll();

  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Product> {
  const product = await repo.findById(id);
  if (!product) {
    throw new AppError(404, `Product with id ${id} not found`);
  }
  return product;
}

export async function create(dto: repo.CreateProductRepoDto): Promise<Product> {

  const all = await repo.findAll();
  const duplicate = all.find(
    (p) =>
      p.name.toLowerCase() === dto.name.toLowerCase() &&
      p.origin.toLowerCase() === dto.origin.toLowerCase()
  );
  if (duplicate) {
    throw new AppError(
      409,
      `A product named "${dto.name}" from "${dto.origin}" already exists (id: ${duplicate.id})`
    );
  }

  return repo.create(dto);
}

export async function update(id: number, dto: repo.UpdateProductRepoDto): Promise<Product> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Product with id ${id} not found`);
  }

  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Product with id ${id} not found`);
  }

  await repo.remove(id);
}