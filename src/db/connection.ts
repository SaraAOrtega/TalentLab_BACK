import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Verificar si estamos en producción
const isProduction = process.env.NODE_ENV === 'production';

// URL de la base de datos para producción
const dbUrl = process.env.MYSQL_URL;

// Lanzar un error si estamos en producción y no se ha definido la URL de la base de datos
if (isProduction && !dbUrl) {
  throw new Error('MYSQL_URL no está definida en el entorno de producción');
}

// Parámetros de conexión para el entorno local
const dbName = process.env.DB_NAME || 'talentlab_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';

// Crear la instancia de Sequelize
const sequelize = isProduction 
  ? new Sequelize(dbUrl || '', { dialect: 'mysql', logging: false }) // Usar la URL de la base de datos en producción
  : new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: 'mysql',
      logging: console.log,  // Solo para depuración en local
    });

// Probar la conexión a la base de datos
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

// Llamar a la función para probar la conexión
testConnection();

export default sequelize;

