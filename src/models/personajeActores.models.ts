import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class PersonajeActor extends Model {}

PersonajeActor.init({
  actorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Actores',
      key: 'id_actor'
    }
  },
  personajeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Personajes',
      key: 'id_personaje'
    }
  }
}, {
  sequelize,
  modelName: 'PersonajeActor',
  tableName: 'personajeActores',
  timestamps: false
});

export default PersonajeActor;