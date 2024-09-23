import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class FotoActor extends Model {
  public url!: string;
  public actorId!: number;
}

FotoActor.init({
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  actorId_: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Actores', // Asegúrate de que coincide con el nombre de la tabla
      key: 'id_actor'
    }
  }
}, {
  sequelize: db,
  modelName: 'FotoActor',
  tableName: 'FotosActores',
  timestamps: false
});

export default FotoActor;
