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

// Middleware de autenticación
router.use(authenticateToken);

// Rutas de proyectos
router.get('/:id', getProyecto);  // Obtener un proyecto por ID
router.get('/', getProyectos);  // Obtener todos los proyectos

router.post('/', createProyecto);  // Crear un nuevo proyecto
router.put('/:id', updateProyecto);  // Actualizar un proyecto por ID
router.delete('/:id', deleteProyecto);  // Eliminar un proyecto por ID

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
