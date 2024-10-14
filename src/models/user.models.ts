import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../db/connection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id_user: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare documento: string;
  declare rol: string | null;
}

User.init(
  {
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
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Esto es crucial: fuerza el nombre de la tabla a 'users'
    timestamps: true // Asumiendo que quieres timestamps
  }
);

export default User;