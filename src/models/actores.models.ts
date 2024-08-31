import { DataTypes, Model } from "sequelize";
import db from '../db/connection';
import PersonajeActor from "./personajeActores.models";

class Actor extends Model {
  public id_actor!: number;
  public nombre_actor!: string;
  public fecha_nacimiento_actor!: Date;
  public email_actor!: string;
  public telefono_actor!: string;
  public foto_actor!: string;


  // Declaración para la asociación many-to-many con Personaje
  public Personajes?: any[];

  static associate(models: any) {
    Actor.belongsToMany(models.Personaje, {
      through: PersonajeActor,
      foreignKey: 'actorId',
      otherKey: 'personajeId',
      as: 'Personajes'
    });
  }
}

Actor.init({
  id_actor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_actor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento_actor: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email_actor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono_actor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto_actor: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: db,
  modelName: 'Actor',
  tableName: 'Actores',
  timestamps: false
});

export default Actor;