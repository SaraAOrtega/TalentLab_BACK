import { Request, Response } from 'express';
import Actor from '../models/actores.models';

// Obtener todos los actores
export const getActores = async (req: Request, res: Response) => {
  try {
    const listActores = await Actor.findAll();
    res.json(listActores);
  } catch (error) {
    console.error('Error al obtener los actores:', error);
    res.status(500).json({ message: 'Error al obtener los actores' });
  }
};

// Obtener un actor por ID
export const getActorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);

    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ message: 'Actor no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el actor:', error);
    res.status(500).json({ message: 'Error al obtener el actor' });
  }
};