import { DataTypes, Model } from "sequelize";
import db from '../db/connection';


class Proyecto extends Model {
  public id_proyecto!: number;
  public user_id!: number;
  public nombre_proyecto!: string;
  public director_proyecto!: string;
  public fecha_pdv!: Date;
  public fecha_rodaje!: Date;
  public lugar!: string;
  public descripcion!: string;

  // Declaración de asociaciones
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
      model: 'Users', // Asegúrate de que este sea el nombre correcto de tu tabla de usuarios
      key: 'id'
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
    type: DataTypes.DATE
  },
  fecha_rodaje: {
    type: DataTypes.DATE
  },
  lugar: {
    type: DataTypes.TEXT
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  sequelize: db,
  modelName: 'Proyecto',
  tableName: 'Proyectos' // Asegúrate de que este sea el nombre correcto de tu tabla en la base de datos
});

export default Proyecto;
