

import {Router} from 'express'; 
import { getActorById, getActores } from '../controllers/actor.controllers';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router ();

router.get ('/:id',authenticateToken, getActorById)
router.get ('/',authenticateToken, getActores)


export default router; 