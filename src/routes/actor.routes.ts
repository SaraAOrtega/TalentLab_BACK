

import {Router} from 'express'; 
import { getActores } from '../controllers/actor.controllers';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router ();

router.get ('/',authenticateToken, getActores)

export default router; 