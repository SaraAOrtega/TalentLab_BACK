
import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

import { UserAttributes, UserCreationAttributes } from '../interfaces/user.interface'; // Asegúrate de que la ruta sea correcta

const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default User;