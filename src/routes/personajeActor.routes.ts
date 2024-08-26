import express from 'express';
import { associateActorToPersonaje } from '../controllers/personajeActor.controller';

const router = express.Router();

router.post('/asociar-actor-personaje', associateActorToPersonaje);

export default router;