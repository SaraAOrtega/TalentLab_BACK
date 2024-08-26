import { Request, Response } from "express";
import { Transaction } from 'sequelize';
import db from '../db/connection';
import Personaje from "../models/personajes.models";
import Actor from "../models/actores.models";
import PersonajeActor from "../models/personajeActores.models";

export const associateActorToPersonaje = async (req: Request, res: Response) => {
  const t: Transaction = await db.transaction();

  try {
    const { personajeId, actorId } = req.body;

    // Validar que los IDs son números
    if (!personajeId || !actorId || isNaN(personajeId) || isNaN(actorId)) {
      return res.status(400).json({ message: 'IDs de personaje y actor son requeridos y deben ser números' });
    }

    // Verificar que el personaje existe
    const personaje = await Personaje.findByPk(personajeId, { transaction: t });
    if (!personaje) {
      await t.rollback();
      return res.status(404).json({ message: 'Personaje no encontrado' });
    }

    // Verificar que el actor existe
    const actor = await Actor.findByPk(actorId, { transaction: t });
    if (!actor) {
      await t.rollback();
      return res.status(404).json({ message: 'Actor no encontrado' });
    }

    // Verificar si la asociación ya existe
    const existingAssociation = await PersonajeActor.findOne({
      where: { personajeId: personajeId, actorId: actorId },
      transaction: t
    });

    if (existingAssociation) {
      await t.rollback();
      return res.status(400).json({ message: 'Esta asociación ya existe' });
    }

    // Crear la asociación
    await PersonajeActor.create({
      personajeId: personajeId,
      actorId: actorId
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ message: 'Actor asociado al personaje con éxito' });
  } catch (error) {
    await t.rollback();
    console.error('Error al asociar actor a personaje:', error);
    res.status(500).json({ 
      message: 'Error al asociar actor a personaje', 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};