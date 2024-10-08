import { Router, Request, Response, NextFunction } from 'express';
import {
    getProyectos,
    getProyecto,
    createProyecto,
    updateProyecto,
    deleteProyecto
} from '../controllers/proyectos.controllers';
import { createPersonaje, getPersonajesByProyectoId } from '../controllers/personajes.controlllers';

import authenticateToken from '../middlewares/authenticateToken';
import personajesRouter from './personaje.routes';

const router = Router();


router.use(authenticateToken);

// Rutas de proyectos
router.get('/:id', getProyecto);  
router.get('/', getProyectos);  

router.post('/', createProyecto);  
router.put('/:id', updateProyecto);  
router.delete('/:id', deleteProyecto);  

// Middleware para validar el proyectoId
const validateProyectoId = (req: Request, res: Response, next: NextFunction) => {
    const proyectoId = parseInt(req.params.proyectoId, 10);
    if (isNaN(proyectoId)) {
        return res.status(400).json({ message: 'ID del proyecto debe ser un número válido' });
    }
    req.proyectoId = proyectoId;
    next();
};

// Rutas para obtener y crear personajes asociados a un proyecto específico
router.get('/:proyectoId/personajes', validateProyectoId, getPersonajesByProyectoId);
router.post('/:proyectoId/personajes', validateProyectoId, createPersonaje);

// Otras rutas de personajes (usando personajesRouter)
router.use('/:proyectoId/personajes', validateProyectoId, personajesRouter);

export default router;
