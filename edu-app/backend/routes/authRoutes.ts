import { Router } from 'express';
import { login } from '../controllers/authController';
import { verify_user } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/verify_user', verify_user);

export default router;