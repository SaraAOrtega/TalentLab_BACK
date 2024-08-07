import { Sequelize } from "sequelize";

const sequelize = new Sequelize('talentlab_db', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
  });

  export default sequelize; 