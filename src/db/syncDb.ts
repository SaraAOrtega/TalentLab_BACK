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

    // Intentar eliminar las claves foráneas existentes
    const tables = ['Proyectos', 'Personajes', 'PersonajesActores'];
    for (const table of tables) {
      try {
        await db.query(`ALTER TABLE ${table} DROP FOREIGN KEY ${table}_ibfk_1`, { type: QueryTypes.RAW });
      } catch (error) {
        console.log(`La clave foránea ${table}_ibfk_1 no existía o no se pudo eliminar.`);
      }
    }

    // Crear o actualizar las claves foráneas
    await db.query(`
      ALTER TABLE Proyectos 
      ADD CONSTRAINT fk_proyecto_user 
      FOREIGN KEY (user_id) 
      REFERENCES Users (id_user) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
    `, { type: QueryTypes.RAW });

    await db.query(`
      ALTER TABLE Personajes 
      ADD CONSTRAINT fk_personaje_proyecto 
      FOREIGN KEY (proyecto_id) 
      REFERENCES Proyectos (id_proyecto) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
    `, { type: QueryTypes.RAW });

    // Añade aquí otras claves foráneas si es necesario

    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

syncDatabase();

export { User, Actor, Proyecto, Personaje, PersonajeActor };