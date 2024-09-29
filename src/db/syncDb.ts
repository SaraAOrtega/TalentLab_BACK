import { QueryTypes } from 'sequelize';
import db from '../db/connection';
import User from '../models/user.models';
import Actor from '../models/actores.models';
import Proyecto from '../models/proyectos.models';
import Personaje from '../models/personajes.models';
import PersonajeActor from '../models/personajeActores.models';

const models = { User, Actor, Proyecto, Personaje, PersonajeActor };

function initializeAssociations() {
  Object.values(models).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(models);
    }
  });
}

async function syncDatabase() {
  try {
    initializeAssociations();

    await User.sync({ alter: true });
    await Actor.sync({ alter: true });
    await Proyecto.sync({ alter: true });
    await Personaje.sync({ alter: true });
    await PersonajeActor.sync({ alter: true });

    // Intentar eliminar la clave foránea existente (si existe)
    try {
      await db.query('ALTER TABLE Proyectos DROP FOREIGN KEY Proyectos_ibfk_1', { type: QueryTypes.RAW });
    } catch (error) {
      console.log('La clave foránea Proyectos_ibfk_1 no existía o no se pudo eliminar.');
    }

    // Crear o actualizar la clave foránea
    await db.query(`
      ALTER TABLE Proyectos 
      ADD CONSTRAINT fk_proyecto_user 
      FOREIGN KEY (user_id) 
      REFERENCES Users (id_user) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
    `, { type: QueryTypes.RAW });

    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

syncDatabase();

export { User, Actor, Proyecto, Personaje, PersonajeActor };