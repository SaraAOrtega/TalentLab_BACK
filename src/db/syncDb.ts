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

    // Sincroniza los modelos en orden
    await User.sync({ alter: true });
    await Actor.sync({ alter: true });
    await Proyecto.sync({ alter: true });
    await Personaje.sync({ alter: true });
    await PersonajeActor.sync({ alter: true });

    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

syncDatabase();

export { User, Actor, Proyecto, Personaje, PersonajeActor };