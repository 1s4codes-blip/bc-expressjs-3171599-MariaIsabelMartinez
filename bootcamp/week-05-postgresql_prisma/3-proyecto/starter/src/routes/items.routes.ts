// src/routes/shipments.routes.ts — Definición de rutas del recurso Shipment

import { Router } from 'express';
import * as ctrl from '../controllers/items.controller';

const router = Router();

// GET  /api/v1/shipments?page=1&limit=10   → listado paginado
router.get('/', ctrl.getAll);

// GET  /api/v1/shipments/:id               → detalle por ID
router.get('/:id', ctrl.getById);

// POST /api/v1/shipments                   → crear nuevo
router.post('/', ctrl.create);

// PUT  /api/v1/shipments/:id               → actualizar
router.put('/:id', ctrl.update);

// DELETE /api/v1/shipments/:id             → eliminar
router.delete('/:id', ctrl.remove);

export default router;
