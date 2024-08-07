import dotenv from 'dotenv';
import { config } from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY must be defined in environment variables');
}