import { Router } from 'express';
import { getProyectos, getProyecto, createProyecto, updateProyecto, deleteProyecto } from '../controllers/proyectos.controllers';
import authenticateToken from '../middlewares/authenticateToken'

const router = Router();

// Todas las rutas de proyectos requieren autenticación
router.use(authenticateToken);

// Obtener todos los proyectos del usuario
router.get('/', getProyectos);

// Obtener un proyecto específico
router.get('/:id', getProyecto);

// Crear un nuevo proyecto
router.post('/', createProyecto);

// Actualizar un proyecto
router.put('/:id', updateProyecto);

// Eliminar un proyecto
router.delete('/:id', deleteProyecto);

export default router;