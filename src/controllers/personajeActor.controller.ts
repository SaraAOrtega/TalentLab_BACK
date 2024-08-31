import { Request, Response } from "express";
import { Transaction } from 'sequelize';
import db from '../db/connection';
import Personaje from "../models/personajes.models";
import Actor from "../models/actores.models";
import PersonajeActor from "../models/personajeActores.models";

export const associateActorToPersonaje = async (req: Request, res: Response) => {
  let t: Transaction | null = null

  try {
    const { personajeId, actorId } = req.body;

    // Validar que los IDs son números y actorId es un array de números
    if (!personajeId || isNaN(personajeId) || !Array.isArray(actorId) || actorId.some(id => isNaN(id))) {
      return res.status(400).json({ message: 'ID de personaje debe ser un número válido y actorId debe ser un array de números' });
    }

    // Iniciar transacción después de la validación
    t = await db.transaction();

    // Verificar que el personaje existe
    const personaje = await Personaje.findByPk(personajeId, { transaction: t });
    if (!personaje) {
      await t.rollback();
      return res.status(404).json({ message: 'Personaje no encontrado' });
    }

    // Verificar actores existentes
    const actors = await Actor.findAll({
      where: {
        id_actor: actorId
      },
      transaction: t
    });

    if (actors.length !== actorId.length) {
      await t.rollback();
      return res.status(404).json({ message: 'Uno o más actores no encontrados' });
    }

    // Crear asociaciones si no existen
    const associations = actorId.map(async (id) => {
      const existingAssociation = await PersonajeActor.findOne({
        where: { personajeId: personajeId, actorId: id },
        transaction: t
      });

      if (!existingAssociation) {
        await PersonajeActor.create({
          personajeId: personajeId,
          actorId: id
        }, { transaction: t });
      }
    });

<<<<<<< HEAD
  

=======
>>>>>>> 62633c7e5217f83d0368e8806a86bdf4780859c4
    await Promise.all(associations);
    await t.commit();
    res.status(200).json({ message: 'Actores asociados al personaje con éxito' });
  } catch (error) {
    if (t) await t.rollback();
    console.error('Error al asociar actor a personaje:', error);
    res.status(500).json({ 
      message: 'Error al asociar actor a personaje', 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
<<<<<<< HEAD

}

export const desasociarActorDePersonaje = async (req: Request, res: Response) => {
  const { personajeId, actorId } = req.params;

  try {
    // Validar que los IDs son números válidos
    if (!personajeId || isNaN(Number(personajeId)) || !actorId || isNaN(Number(actorId))) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    // Buscar y eliminar la asociación
    const resultado = await PersonajeActor.destroy({
      where: {
        personajeId: Number(personajeId),
        actorId: Number(actorId)
      }
    });

    if (resultado) {
      return res.status(200).json({ message: 'Asociación eliminada con éxito' });
    } else {
      return res.status(404).json({ message: 'Asociación no encontrada' });
    }
  } catch (error) {
    console.error('Error al desasociar actor de personaje:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }

}

export const getActoresAsociadosConPersonaje = async (req: Request, res: Response) => {
  const { personajeId } = req.params;

  try {
    // Validar que el ID es un número válido
    if (!personajeId || isNaN(Number(personajeId))) {
      return res.status(400).json({ message: 'ID de personaje inválido' });
    }

    // Obtener actores asociados al personaje
    const actores = await Actor.findAll({
      include: [{
        model: Personaje,
        through: { attributes: [] }, // Excluir atributos de la tabla intermedia
        where: { id_personaje: Number(personajeId) },
        as: 'Personajes'
      }]
    });

    if (actores.length > 0) {
      return res.status(200).json(actores);
    } else {
      return res.status(404).json({ message: 'No se encontraron actores asociados' });
    }
  } catch (error) {
    console.error('Error al obtener actores asociados:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
=======
>>>>>>> 62633c7e5217f83d0368e8806a86bdf4780859c4
};
