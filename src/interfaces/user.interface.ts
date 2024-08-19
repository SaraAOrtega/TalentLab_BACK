import { Model, Optional } from 'sequelize';

export interface UserAttributes {
  id_user?: number;
  username: string;
  email: string;
  password: string;
  documento: string;
  rol: string;
  proyecto_id? : number
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id_user'> {}

export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}