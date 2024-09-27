import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Si estás en producción, usa la URL de Railway, si no, usa los parámetros locales
const dbUrl = process.env.MYSQL_URL;

const dbName = process.env.DB_NAME || 'talentlab_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = isProduction 
  ? new Sequelize(dbUrl || '', { dialect: 'mysql', logging: false }) // Si es producción, usa la URL de la base de datos
  : new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: 'mysql',
      logging: console.log,  // Solo para debug en local
    });

export default sequelize;
