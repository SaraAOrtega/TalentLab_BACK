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
      as: 'personajes'
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
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  altura: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complexion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color_ojos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color_pelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_pelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  corte_pelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tez: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idiomas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carnet_conducir: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto_actor: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  
  foto2_actor: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: db,
  modelName: 'Actor',
  tableName: 'actores',
  timestamps: false
});

export default Actor;