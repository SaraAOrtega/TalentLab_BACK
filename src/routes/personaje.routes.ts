import { Router } from 'express';
import { 
    getPersonajesByProyectoId, 
    getPersonaje, 
    createPersonaje, 
    updatePersonaje,
    deletePersonaje 
} from '../controllers/personajes.controlllers';

const router = Router({ mergeParams: true });  // Importante: mergeParams: true

router.get('/', getPersonajesByProyectoId);
router.get('/:personajeId', getPersonaje);
router.post('/', createPersonaje);
router.put('/:personajeId', updatePersonaje);
router.delete('/:personajeId', deletePersonaje);

export default router;