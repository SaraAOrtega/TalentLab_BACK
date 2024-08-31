import express from 'express';
import { associateActorToPersonaje, desasociarActorDePersonaje, getActoresAsociadosConPersonaje } from '../controllers/personajeActor.controller';

const router = express.Router();

// Ruta para asociar actores a un personaje específico
router.post('/:personajeId/asociar-actor-personaje', associateActorToPersonaje);
<<<<<<< HEAD
router.get('/:personajeId/actores-asociados', getActoresAsociadosConPersonaje);
router.delete('/personaje-actor/:personajeId/actores/:actorId', desasociarActorDePersonaje);
=======
>>>>>>> 62633c7e5217f83d0368e8806a86bdf4780859c4

export default router;
