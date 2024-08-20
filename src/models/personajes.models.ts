import { DataTypes, Model } from "sequelize";
import db from '../db/connection';

class Personaje extends Model {
  public id_personaje!: number;
  public proyecto_id!: number;
  public rol!: string;
  public descripcion!: string;

  static associate(models: any) {
    Personaje.belongsTo(models.Proyecto, {
        foreignKey: 'proyecto_id',
        as: 'proyecto'
    });
    // Añade aquí otras asociaciones si son necesarias
}
}

Personaje.init({
  id_personaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  proyecto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Proyectos',
      key: 'id_proyecto'
    }
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  sequelize: db,
  modelName: 'Personaje',
  tableName: 'Personajes',
  timestamps: false // Desactiva los campos createdAt y updatedAt
});

export default Personaje;