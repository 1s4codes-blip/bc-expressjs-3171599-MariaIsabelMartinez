// ============================================
// ROUTES — Mapeo de URLs a controllers
// ============================================

import { Router } from 'express';
import * as controller from '../controllers/shipments.controller';

export const shipmentsRouter = Router();

shipmentsRouter.get('/', controller.getAll);
shipmentsRouter.get('/:id', controller.getById);
shipmentsRouter.post('/', controller.create);
shipmentsRouter.put('/:id', controller.update);
shipmentsRouter.delete('/:id', controller.remove);