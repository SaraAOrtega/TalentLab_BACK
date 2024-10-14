import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class PersonajeActor extends Model {}

PersonajeActor.init({
  actorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'actores',
      key: 'id_actor'
    }
  },
  personajeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'personajes',
      key: 'id_personaje'
    }
  }
}, {
  sequelize,
  modelName: 'PersonajeActor',
  tableName: 'personajeactores',
  timestamps: false
});

export default PersonajeActor;