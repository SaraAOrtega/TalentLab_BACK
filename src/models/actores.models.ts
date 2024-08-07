
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Actor = sequelize.define ('actor', {

    id_actor: {
        type: DataTypes.INTEGER,
        primaryKey:true, 
        autoIncrement: true
    },

    nombre_actor : {
        type: DataTypes.STRING
    }, 

    email_actor : {
        type:DataTypes.STRING
    }

}, 
    {
        tableName: 'actores',
        timestamps: true, // Desactivamos la creación automática de createdAt y updatedAt
      });

      export default Actor;

