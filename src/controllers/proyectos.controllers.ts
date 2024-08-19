import { Request, Response } from "express";
import Proyecto from "../models/proyectos.models";
import { Op } from 'sequelize';
import Personaje from "../models/personajes.models";

// Interfaz para extender Request con el userId
interface AuthRequest extends Request {
    userId?: number;
}

export const getProyectos = async (req: AuthRequest, res: Response) => {
    console.log('Iniciando getProyectos');
    console.log('userId en la request:', req.userId);

    if (!req.userId) {
        console.log('No se encontró userId en la request');
        return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    try {
        console.log(`Buscando proyectos para el usuario con ID: ${req.userId}`);
        const listProyectos = await Proyecto.findAll({ where: { user_id: req.userId } });
        console.log(`Proyectos encontrados: ${listProyectos.length}`);

        if (listProyectos.length === 0) {
            console.log('No se encontraron proyectos para este usuario');
            return res.status(200).json({ msg: 'No se encontraron proyectos para este usuario', proyectos: [] });
        }

        res.json(listProyectos);
    } catch (error) {
        console.error('Error detallado al obtener proyectos:', error);
        res.status(500).json({ 
            msg: 'Error al obtener los proyectos', 
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}

export const getProyecto = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;

    console.log(`Iniciando getProyecto. ID del proyecto: ${id}, ID del usuario: ${userId}`);

    try {
        console.log('Buscando proyecto en la base de datos...');
        const proyecto = await Proyecto.findOne({
            where: {
                [Op.and]: [
                    { id_proyecto: id },
                    { user_id: userId }
                ]
            },
            attributes: ['id_proyecto', 'user_id', 'nombre_proyecto', 'director_proyecto', 'fecha_pdv', 'fecha_rodaje', 'lugar','descripcion']
        });

        console.log('Resultado de la búsqueda:', proyecto);

        if (!proyecto) {
            console.log('Proyecto no encontrado');
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        res.json(proyecto);
    } catch (error) {
        console.error('Error detallado al obtener el proyecto:', error);
        
        if (error instanceof Error) {
            console.error('Nombre del error:', error.name);
            console.error('Mensaje del error:', error.message);
            console.error('Stack del error:', error.stack);
        }

        res.status(500).json({ 
            msg: 'Error al obtener el proyecto',
            errorDetails: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const deleteProyecto = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    console.log(`Iniciando deleteProyecto. ID del proyecto: ${id}, ID del usuario: ${req.userId}`);

    try {
        const proyectoId = parseInt(id);
        if (isNaN(proyectoId)) {
            return res.status(400).json({ msg: 'ID de proyecto inválido' });
        }

        if (!req.userId) {
            return res.status(401).json({ msg: 'Usuario no autenticado' });
        }

        const proyecto = await Proyecto.findOne({ 
            where: { id_proyecto: proyectoId, user_id: req.userId } 
        });

        if (!proyecto) {
            return res.status(404).json({
                msg: `No existe el proyecto con el id ${proyectoId} para este usuario`
            });
        }

        // Eliminar todos los personajes asociados al proyecto
        await Personaje.destroy({
            where: { proyecto_id: proyectoId }
        });

        // Eliminar el proyecto
        await proyecto.destroy();

        console.log('Proyecto y personajes eliminados con éxito');
        res.json({
            msg: 'Proyecto y personajes eliminados con éxito'
        });
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);

        res.status(500).json({ 
            msg: 'Error al eliminar el proyecto', 
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}


export const createProyecto = async (req: AuthRequest, res: Response) => {
    const { nombre_proyecto, director_proyecto, descripcion, lugar, fecha_pdv, fecha_rodaje } = req.body;
    
    try {
        // Verificar que req.userId exista
        if (!req.userId) {
            return res.status(401).json({ msg: 'Usuario no autenticado' });
        }

        // Validar los datos de entrada
        if (!nombre_proyecto || nombre_proyecto.trim() === '') {
            return res.status(400).json({ msg: 'El nombre del proyecto es requerido' });
        }
        if (!director_proyecto || director_proyecto.trim() === '') {
            return res.status(400).json({ msg: 'El director del proyecto es requerido' });
        }

        // Validar fechas (opcional, dependiendo de tus requerimientos)
        const fechaPdv = fecha_pdv ? new Date(fecha_pdv) : null;
        const fechaRodaje = fecha_rodaje ? new Date(fecha_rodaje) : null;

        if (fechaPdv && isNaN(fechaPdv.getTime())) {
            return res.status(400).json({ msg: 'La fecha de PDV no es válida' });
        }
        if (fechaRodaje && isNaN(fechaRodaje.getTime())) {
            return res.status(400).json({ msg: 'La fecha de rodaje no es válida' });
        }

        // Crear el proyecto
        const nuevoProyecto = await Proyecto.create({
            nombre_proyecto,
            director_proyecto,
            lugar, 
            descripcion,
            fecha_pdv: fechaPdv,
            fecha_rodaje: fechaRodaje,
            user_id: req.userId
        });

        res.status(201).json({
            msg: 'Proyecto agregado con éxito',
            proyecto: {
                proyecto_id: nuevoProyecto.get('id_proyecto'),
                nombre_proyecto: nuevoProyecto.get ('nombre_proyecto'),
                director_proyecto: nuevoProyecto.get ('director_proyecto'),
                lugar: nuevoProyecto.get ('lugar'),
                descripcion: nuevoProyecto.get ('descripcion'),
                fecha_pdv: nuevoProyecto.get ('fecha_pdv'),
                fecha_rodaje: nuevoProyecto.get('fecha_rodaje'),
                user_id: nuevoProyecto.get ('user_id')
            }
        });
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        
        if (error instanceof Error) {
            // Manejar errores específicos de Sequelize
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ 
                    msg: 'Error de validación', 
                    errores: (error as any).errors.map((e: any) => e.message) 
                });
            }
            
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ 
                    msg: 'Ya existe un proyecto con ese nombre' 
                });
            }

            res.status(500).json({ 
                msg: 'Error al crear el proyecto', 
                error: error.message 
            });
        } else {
            res.status(500).json({ 
                msg: 'Error desconocido al crear el proyecto' 
            });
        }
    }
}

export const updateProyecto = async (req: AuthRequest, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const proyecto = await Proyecto.findOne({ where: { id_proyecto: id, user_id: req.userId } });
        if (proyecto) {
            await proyecto.update(body);
            res.json({
                msg: 'Proyecto actualizado con éxito',
                proyecto
            });
        } else {
            res.status(404).json({
                msg: `No existe un proyecto con el id ${id} para este usuario`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el proyecto' });
    }
}