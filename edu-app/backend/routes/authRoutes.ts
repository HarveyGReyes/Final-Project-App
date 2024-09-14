import { Router } from 'express';
import { login } from '../services/authService';
import { logout } from '../services/authService';
import { verify_user } from '../middlewares/authMiddleware';
import { load_classes } from '../services/userService'

const router = Router();

router.post('/login', login);
router.post('/logout', logout)
router.get('/verify_user', verify_user);
router.get('/load_classes', load_classes)

export default router;