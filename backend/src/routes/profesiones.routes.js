import {Router} from 'express';
import {getProfesionById,createProfesion,updateProfesionById,getProfesiones,deleteProfesionById} from '../controllers/profesiones.controller.js'

const router = Router();

router.get('/profesiones', getProfesiones)
router.get('/profesiones/:id', getProfesionById)
router.post('/profesiones', createProfesion)
router.put('/profesiones/:id', updateProfesionById)
router.delete('/profesiones/:id', deleteProfesionById)

export default router;