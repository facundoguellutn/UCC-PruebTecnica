import { Router } from 'express';
import {getUsuarios,deleteUsuarioById,getUsuarioById,updateUsuarioById,createUsuario} from '../controllers/usuarios.controller.js'

const router = Router();


router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuarioById)
router.post('/usuarios', createUsuario)
router.put('/usuarios/:id', updateUsuarioById)
router.delete('/usuarios/:id', deleteUsuarioById)


export default router;