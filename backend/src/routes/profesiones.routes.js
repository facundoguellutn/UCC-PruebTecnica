import {Router} from 'express';
import {getProfesionById,createProfesion,updateProfesionById,getProfesiones,deleteProfesionById,cantidadProfesiones} from '../controllers/profesiones.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'

const router = Router();

router.get('/profesiones',authRequired, getProfesiones)
router.get('/profesiones/:id',authRequired, getProfesionById)
router.post('/profesiones',authRequired, createProfesion)
router.patch('/profesiones/:id',authRequired, updateProfesionById)
router.delete('/profesiones/:id',authRequired, deleteProfesionById)
router.get('/profesiones/cantidad/obtener',authRequired, cantidadProfesiones)

export default router;