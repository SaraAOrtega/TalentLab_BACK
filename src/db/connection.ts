import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME || 'talentlab_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  // Puedes agregar más opciones aquí si es necesario
});

export default sequelize;