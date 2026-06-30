import { Router } from 'express';
import * as supplierController from '../controllers/supplier.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de proveedores requieren autenticación
router.use(authMiddleware);

router.get('/', supplierController.getAll);
router.get('/:id', supplierController.getById);
router.post('/', supplierController.create);
router.patch('/:id', supplierController.update);
router.delete('/:id', supplierController.remove);

export default router;
