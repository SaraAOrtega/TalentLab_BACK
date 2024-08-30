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
};
