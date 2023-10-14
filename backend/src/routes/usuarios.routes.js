import { Router } from 'express';
import {getUsuarios,deleteUsuarioById,getUsuarioById,updateUsuarioById,createUsuario,cantidadUsuarios} from '../controllers/usuarios.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'

const router = Router();


router.get('/usuarios',authRequired, getUsuarios)
router.get('/usuarios/:id',authRequired, getUsuarioById)
router.post('/usuarios',authRequired, createUsuario)
router.patch('/usuarios/:id',authRequired, updateUsuarioById)
router.delete('/usuarios/:id',authRequired, deleteUsuarioById)
router.get('/usuarios/cantidad/obtener',authRequired, cantidadUsuarios)


export default router;