import { Router } from 'express';
import * as customsDeclarationController from '../controllers/customsDeclaration.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de declaraciones aduaneras requieren autenticación
router.use(authMiddleware);

router.get('/', customsDeclarationController.getAll);
router.get('/:id', customsDeclarationController.getById);
router.post('/', customsDeclarationController.create);
router.patch('/:id', customsDeclarationController.update);
router.delete('/:id', customsDeclarationController.remove);

export default router;
