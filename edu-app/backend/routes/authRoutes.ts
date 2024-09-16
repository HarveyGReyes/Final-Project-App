import { Router } from 'express';

import { login } from '../services/authService';
import { logout } from '../services/authService';
import { verify_user } from '../middlewares/authMiddleware';
import { load_classes } from '../services/userService'

import { all_assignments } from '../controllers/insightsController';
import { student_assignments } from '../controllers/insightsController';

const router = Router();

router.post('/login', login);
router.post('/logout', logout)
router.get('/verify_user', verify_user);
router.get('/load_classes', load_classes)

router.get('/all_assignments', all_assignments)
router.get('/filtered_student_assignments', student_assignments)

export default router;