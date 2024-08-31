import express from 'express';
import { associateActorToPersonaje, desasociarActorDePersonaje, getActoresAsociadosConPersonaje } from '../controllers/personajeActor.controller';

const router = express.Router();

// Ruta para asociar actores a un personaje específico
router.post('/:personajeId/asociar-actor-personaje', associateActorToPersonaje);
router.get('/:personajeId/actores-asociados', getActoresAsociadosConPersonaje);
router.delete('/personaje-actor/:personajeId/actores/:actorId', desasociarActorDePersonaje);

export default router;
