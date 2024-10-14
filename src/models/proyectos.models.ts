import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute } from "sequelize";
import db from '../db/connection';
import User from '../models/user.models';  // Asegúrate de que la ruta sea correcta

class Proyecto extends Model<InferAttributes<Proyecto>, InferCreationAttributes<Proyecto>> {
  declare id_proyecto: CreationOptional<number>;
  declare user_id: ForeignKey<User['id_user']>;
  declare nombre_proyecto: string;
  declare director_proyecto: string;
  declare fecha_pdv: Date | null;
  declare fecha_rodaje: Date | null;
  declare lugar: string | null;
  declare descripcion: string | null;

  declare user?: NonAttribute<User>;
  declare personajes?: NonAttribute<Proyecto[]>;

  static associate(models: any) {
    Proyecto.hasMany(models.Personaje, { 
      foreignKey: 'proyecto_id', 
      as: 'personajes' 
    });
    Proyecto.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'user' 
    });
  }
}

Proyecto.init({
  id_proyecto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  // Cambiado a minúsculas
      key: 'id_user'
    }
  },
  nombre_proyecto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  director_proyecto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_pdv: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_rodaje: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lugar: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize: db,
  modelName: 'Proyecto',
  tableName: 'proyectos',  // Cambiado a minúsculas
  timestamps: false
});

export default Proyecto;