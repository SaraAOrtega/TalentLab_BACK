import express from 'express';
import { associateActorToPersonaje } from '../controllers/personajeActor.controller';

const router = express.Router();

// Ruta para asociar actores a un personaje específico
router.post('/:personajeId/asociar-actor-personaje', associateActorToPersonaje);

export default router;
