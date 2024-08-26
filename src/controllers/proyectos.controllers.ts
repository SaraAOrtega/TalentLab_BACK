import { Request, Response } from "express";
import Proyecto from "../models/proyectos.models";
import { Op, Transaction } from 'sequelize';
import Personaje from "../models/personajes.models";
import db from '../db/connection';
import Actor from "../models/actores.models";

// Interfaz para extender Request con el userId
interface AuthRequest extends Request {
    userId?: number;
}

// Obtener todos los proyectos del usuario autenticado
export const getProyectos = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    try {
        const listProyectos = await Proyecto.findAll({ where: { user_id: req.userId } });
        return res.json(listProyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        return res.status(500).json({ msg: 'Error al obtener los proyectos', error });
    }
};

// Obtener un proyecto específico del usuario autenticado
export const getProyecto = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    try {
        const proyecto = await Proyecto.findOne({
            where: { [Op.and]: [{ id_proyecto: id }, { user_id: req.userId }] },
            include: [{
                model: Personaje,
                as: 'personajes',
                include: [{ model: Actor, as: 'actores' }]
            }]
        });

        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        return res.json(proyecto);
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        return res.status(500).json({ msg: 'Error al obtener el proyecto', error });
    }
};

// Eliminar un proyecto y su relación en cascada
export const deleteProyecto = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    try {
        const proyecto = await Proyecto.findOne({ 
            where: { id_proyecto: parseInt(id), user_id: req.userId }
        });

        if (!proyecto) {
            return res.status(404).json({ msg: `No existe el proyecto con el id ${id} para este usuario` });
        }

        await proyecto.destroy();
        return res.json({ msg: 'Proyecto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        return res.status(500).json({ msg: 'Error al eliminar el proyecto', error });
    }
};

// Crear un nuevo proyecto con personajes asociados
export const createProyecto = async (req: AuthRequest, res: Response) => {
    const t = await db.transaction();

    try {
        const { nombre_proyecto, director_proyecto, descripcion, lugar, fecha_pdv, fecha_rodaje, personajes } = req.body;

        if (!req.userId) {
            await t.rollback();
            return res.status(401).json({ msg: 'Usuario no autenticado' });
        }

        // Crear el proyecto
        const nuevoProyecto = await Proyecto.create({
            nombre_proyecto,
            director_proyecto,
            lugar,
            descripcion,
            fecha_pdv: fecha_pdv ? new Date(fecha_pdv) : null,
            fecha_rodaje: fecha_rodaje ? new Date(fecha_rodaje) : null,
            user_id: req.userId
        }, { transaction: t });

        // Crear personajes asociados
        if (personajes && Array.isArray(personajes)) {
            await Promise.all(personajes.map(personaje =>
                Personaje.create({ ...personaje, proyecto_id: nuevoProyecto.id_proyecto }, { transaction: t })
            ));
        }

        await t.commit();
        return res.status(201).json({ msg: 'Proyecto y personajes agregados con éxito', proyecto: nuevoProyecto });
    } catch (error) {
        await t.rollback();
        console.error('Error al crear proyecto:', error);
        return res.status(500).json({ msg: 'Error al crear el proyecto', error });
    }
};

// Actualizar un proyecto existente y sus personajes
export const updateProyecto = async (req: AuthRequest, res: Response) => {
    const t: Transaction = await db.transaction();

    try {
        const { id } = req.params;
        const { personajes, ...proyectoData } = req.body;

        // Buscar el proyecto
        const proyecto = await Proyecto.findOne({
            where: { id_proyecto: id },
            transaction: t
        });

        if (!proyecto) {
            await t.rollback();
            return res.status(404).json({
                msg: `No existe un proyecto con el id ${id}`
            });
        }

        // Actualizar los datos del proyecto
        await proyecto.update(proyectoData, { transaction: t });

        // Procesar personajes
        if (personajes && Array.isArray(personajes)) {
            for (const personajeData of personajes) {
                if (personajeData.id_personaje) {
                    // Si el personaje tiene ID, actualizamos el personaje existente
                    const personaje = await Personaje.findOne({
                        where: {
                            id_personaje: personajeData.id_personaje,
                            proyecto_id: id
                        },
                        transaction: t
                    });

                    if (personaje) {
                        await personaje.update(personajeData, { transaction: t });
                    }
                } else {
                    // Si el personaje no tiene ID, lo creamos
                    await Personaje.create({ ...personajeData, proyecto_id: id }, { transaction: t });
                }
            }
        }

        await t.commit();

        const proyectoActualizado = await Proyecto.findByPk(id, {
            include: [{ model: Personaje, as: 'personajes' }]
        });

        res.json({
            msg: 'Proyecto y personajes actualizados con éxito',
            proyecto: proyectoActualizado
        });
    } catch (error) {
        await t.rollback();
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ msg: 'Error al actualizar el proyecto', error });
    }
};