import { Request, Response } from "express";
import Actor from "../models/actores.models";
import { Op } from "sequelize";

export const getActores = async (req: Request, res: Response) => {
  try {
    const {
      nombre_actor,
      edad_min,
      edad_max,
      sexo,
      altura_min,
      altura_max,
      complexion,
      color_ojos,
      color_pelo,
      tipo_pelo,
      corte_pelo,
      tez,
      idiomas,
      skills,
      carnet_conducir,
      page = "1",
      limit = "50",
    } = req.query;

    const whereConditions: any = {};

    if (nombre_actor)
      whereConditions.nombre_actor = { [Op.like]: `%${nombre_actor}%` };

    if (edad_min || edad_max) {
      whereConditions.edad = {};
      if (edad_min) whereConditions.edad[Op.gte] = Number(edad_min);
      if (edad_max) whereConditions.edad[Op.lte] = Number(edad_max);
    }

    if (sexo) whereConditions.sexo = sexo;

    if (altura_min || altura_max) {
      whereConditions.altura = {};
      if (altura_min) whereConditions.altura[Op.gte] = Number(altura_min);
      if (altura_max) whereConditions.altura[Op.lte] = Number(altura_max);
    }

    if (complexion) whereConditions.complexion = complexion;
    if (color_ojos) whereConditions.color_ojos = color_ojos;
    if (color_pelo) whereConditions.color_pelo = color_pelo;
    if (tipo_pelo) whereConditions.tipo_pelo = tipo_pelo;
    if (corte_pelo) whereConditions.corte_pelo = corte_pelo;
    if (tez) whereConditions.tez = tez;

    if (idiomas) whereConditions.idiomas = { [Op.like]: `%${idiomas}%` };
    if (skills) whereConditions.skills = { [Op.like]: `%${skills}%` };

    if (carnet_conducir !== undefined)
      whereConditions.carnet_conducir = carnet_conducir === "true";

    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.min(100, Math.max(1, Number(limit))); // Limita a máximo 100 resultados por página

    const offset = (pageNumber - 1) * limitNumber;

    const { count, rows } = await Actor.findAndCountAll({
      where: whereConditions,
      limit: limitNumber,
      offset: offset,
    });

    res.json({
      total: count,
      page: pageNumber,
      limit: limitNumber,
      actors: rows,
    });
  } catch (error) {
    console.error("Error al obtener los actores:", error);
    res.status(500).json({
      message: "Error al obtener los actores",
      error: error instanceof Error ? error.message : "Unknown error",
    });
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
      res.status(404).json({ message: "Actor no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el actor:", error);
    res.status(500).json({
      message: "Error al obtener el actor",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
