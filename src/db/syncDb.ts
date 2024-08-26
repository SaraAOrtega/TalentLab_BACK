import sequelize from '../db/connection';  // Asegúrate de que apunte al archivo correcto
import PersonajeActor from '../models/personajeActores.models';  // Importa tu modelo

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });  // Sincroniza todas las tablas forzadamente
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close();  // Cierra la conexión después de la sincronización
  }
};

syncDatabase();
