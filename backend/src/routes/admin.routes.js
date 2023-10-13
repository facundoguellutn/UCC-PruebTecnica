import {Router} from 'express';
import { createCuenta,login,logout } from '../controllers/admin.controller.js';

const router = Router();

router.post('/admin',createCuenta);
router.post('/login',login);
router.post('/logout',logout);


export default router;