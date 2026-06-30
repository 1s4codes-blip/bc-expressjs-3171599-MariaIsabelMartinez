import { Request, Response, NextFunction } from 'express';
import * as customsDeclarationService from '../services/customsDeclaration.service';
import {
  createCustomsDeclarationSchema,
  updateCustomsDeclarationSchema,
} from '../schemas/customsDeclaration.schema';
import { ZodError } from 'zod';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const declarations = await customsDeclarationService.getAll();
    res.status(200).json(declarations);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const declaration = await customsDeclarationService.getById(id);
    res.status(200).json(declaration);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createCustomsDeclarationSchema.parse(req.body);
    const userId = req.user!.sub;
    const declaration = await customsDeclarationService.create(dto, userId);
    res.status(201).json(declaration);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: 'Datos inválidos', details: err.issues });
      return;
    }
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = updateCustomsDeclarationSchema.parse(req.body);
    const id = req.params.id as string;
    const declaration = await customsDeclarationService.update(id, dto);
    res.status(200).json(declaration);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: 'Datos inválidos', details: err.issues });
      return;
    }
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    await customsDeclarationService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
