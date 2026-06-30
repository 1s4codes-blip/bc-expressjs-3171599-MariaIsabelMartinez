import { Router } from 'express';
import * as shipmentController from '../controllers/shipment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de envíos requieren autenticación
router.use(authMiddleware);

router.get('/', shipmentController.getAll);
router.get('/:id', shipmentController.getById);
router.post('/', shipmentController.create);
router.patch('/:id', shipmentController.update);
router.delete('/:id', shipmentController.remove);

export default router;
