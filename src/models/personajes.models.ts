import { DataTypes } from "sequelize";
import db from '../db/connection';

const Personaje = db.define('Personaje', {
    id_personaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Proyectos', // Asegúrate de que este sea el nombre correcto de tu modelo de Usuario
            key: 'id_proyecto'
        }
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    
    descripcion: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false,  // Desactiva los campos createdAt y updatedAt
    tableName: 'Personajes'
});


export default Personaje;