import { DataTypes, Model } from "sequelize";
import db from '../db/connection';
import PersonajeActor from "./personajeActores.models";

class Personaje extends Model {
  public id_personaje!: number;
  public proyecto_id!: number;
  public rol!: string;
  public descripcion!: string;

  // Declaración para la asociación many-to-many con Actor
  public Actores?: any[];

  static associate(models: any) {
    Personaje.belongsTo(models.Proyecto, {
      foreignKey: 'proyecto_id',
      as: 'proyecto'
    });
    
    Personaje.belongsToMany(models.Actor, {
      through: PersonajeActor,
      foreignKey: 'personajeId',
      otherKey: 'actorId',
      as: 'actores'
    });
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