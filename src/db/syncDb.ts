import db from '../db/connection';
import Proyecto from '../models/proyectos.models';
import Personaje from '../models/personajes.models';
import User from '../models/user.models';
import Actor from '../models/actores.models';
import PersonajeActor from '../models/personajeActores.models';

// Importar modelos y asociaciones
const models = { Proyecto, Personaje, User, Actor, PersonajeActor };

// Configurar asociaciones
function initializeAssociations() {
  Proyecto.associate(models);
  Personaje.associate(models);
  Actor.associate(models);
}

initializeAssociations();

// Sincroniza la base de datos
db.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

export { Proyecto, Personaje, User, Actor, PersonajeActor };
