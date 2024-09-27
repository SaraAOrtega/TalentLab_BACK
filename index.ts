import Server from "./src/models/server";
import dotenv from 'dotenv';

dotenv.config();
const server = new Server();

// Inicializa el servidor
server.init().catch(console.error);

// Exporta la aplicación Express para Vercel
export default server.app;

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
// No imprimas la contraseña por razones de seguridad