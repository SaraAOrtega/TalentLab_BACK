import { Model, Optional } from 'sequelize';

export interface ProyectosAttributes {
  id_proyectos?: number;
  user_id?: number ;
  nombre_proyecto: string;
  directos_proyecto: string;
  fecha_pdv: string;
  fecha_rodaje: string;
  lugar: string;
  descripcion: string;
}

export interface ProyectosCreationAttributes extends Optional<ProyectosAttributes, 'id_proyectos'> {}

export interface ProyectoModel extends Model<ProyectosAttributes, ProyectosCreationAttributes>, ProyectosAttributes {}