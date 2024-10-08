import { Request, Response } from 'express';
import Personaje from '../models/personajes.models';

interface AuthRequest extends Request {
    proyectoId?: number;
}

// Obtener todos los personajes de un proyecto específico
export const getPersonajesByProyectoId = async (req: Request, res: Response) => {
    const proyectoId = req.proyectoId as number;

    try {
        const personajes = await Personaje.findAll({
            where: {
                proyecto_id: proyectoId
            }
        });

        if (personajes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron personajes para este proyecto' });
        }

        res.status(200).json(personajes);
    } catch (error: unknown) {
       
        if (error instanceof Error) {
            res.status(500).json({ 
                message: 'Error interno del servidor', 
                error: error.message,
                stack: error.stack
            });
        } else {
            res.status(500).json({ 
                message: 'Error interno del servidor', 
                error: 'An unknown error occurred'
            });
        }
    }
};
export const getPersonaje = async (req: Request, res: Response) => {
    const proyectoId = req.proyectoId as number;
    const { personajeId } = req.params;

    console.log('proyectoId:', proyectoId);
    console.log('personajeId:', personajeId);

    try {
        const personaje = await Personaje.findOne({
            where: {
                id_personaje: personajeId,
                proyecto_id: proyectoId
            }
        });

        if (!personaje) {
            return res.status(404).json({ message: 'Personaje no encontrado en el proyecto' });
        }

        res.status(200).json(personaje);
    } catch (error: unknown) {
        console.error('Error detallado al obtener personaje:', error);
        
        if (error instanceof Error) {
            res.status(500).json({ 
                message: 'Error interno del servidor', 
                error: error.message,
                stack: error.stack
            });
        } else {
            res.status(500).json({ 
                message: 'Error interno del servidor', 
                error: 'An unknown error occurred'
            });
        }
    }
};
// Crear un nuevo personaje para un proyecto específico
export const createPersonaje = async (req: Request, res: Response) => {
    const { proyectoId } = req.params; 
    const { rol, descripcion } = req.body;

    if (!proyectoId) {
        return res.status(400).json({ message: 'ID del proyecto es requerido' });
    }

    try {
        const personaje = await Personaje.create({
            proyecto_id: proyectoId,
            rol,
            descripcion
        });

        res.status(201).json(personaje);
    } catch (error) {
        console.error('Error al crear personaje:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

// Eliminar un personaje de un proyecto específico
export const deletePersonaje = async (req: Request, res: Response) => {
    const { personajeId, proyectoId } = req.params;

    try {
        if (!proyectoId || !personajeId) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos' });
        }

        const personaje = await Personaje.findOne({
            where: {
                id_personaje: personajeId,
                proyecto_id: proyectoId
            }
        });

        if (!personaje) {
            return res.status(404).json({ message: 'Personaje no encontrado en el proyecto' });
        }

        await personaje.destroy();
        res.status(200).json({ message: 'Personaje eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar personaje:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
};


export const updatePersonaje = async (req: Request, res: Response) => {
    const proyectoId = parseInt(req.params.proyectoId, 10);
    const personajeId = parseInt(req.params.personajeId, 10);
    const { rol, descripcion } = req.body;

    console.log('Actualizando personaje:', { proyectoId, personajeId, rol, descripcion });

    try {
        const personaje = await Personaje.findOne({
            where: { 
                id_personaje: personajeId, 
                proyecto_id: proyectoId 
            }
        });

        if (!personaje) {
           
            return res.status(404).json({ message: 'Personaje no encontrado en el proyecto' });
        }

        const updatedPersonaje = await personaje.update({ rol, descripcion });

       

        res.status(200).json(updatedPersonaje);
    } catch (error: unknown) {
       
        
        if (error instanceof Error) {
            res.status(500).json({ 
                message: 'Error interno del servidor', 
                error: error.message 
            });
        } else {
            res.status(500).json({ 
                message: 'Error interno del servidor', 
                error: 'Un error desconocido ocurrió' 
            });
        }
    }
};

export default AuthRequest;