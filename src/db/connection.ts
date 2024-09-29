import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// URL de la base de datos de Heroku (ClearDB)
const herokuDbUrl = process.env.CLEARDB_DATABASE_URL;

// URL de la base de datos de Railway (si aún la estás usando)
const railwayDbUrl = process.env.MYSQL_URL;

// Configuración local
const dbName = process.env.DB_NAME || 'talentlab_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';

let sequelize: Sequelize;

if (isProduction) {
  // Si es producción, intenta usar primero la URL de Heroku, luego la de Railway
  const productionDbUrl = herokuDbUrl || railwayDbUrl;
  
  if (!productionDbUrl) {
    throw new Error('No se ha proporcionado una URL de base de datos para producción');
  }

  sequelize = new Sequelize(productionDbUrl, {
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
} else {
  // Configuración para desarrollo local
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    logging: console.log,  // Solo para debug en local
  });
}

export default sequelize;