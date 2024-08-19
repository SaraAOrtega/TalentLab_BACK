import { DataTypes } from "sequelize";
import db from '../db/connection';

const Proyecto = db.define('Proyecto', {
    id_proyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Asegúrate de que este sea el nombre correcto de tu modelo de Usuario
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
}, 
);

export default Proyecto;



