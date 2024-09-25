import Server from "./src/models/server";
import dotenv from 'dotenv';

dotenv.config();
const server = new Server();

// Inicializa el servidor
server.init().catch(console.error);

// Exporta la aplicación Express para Vercel
export default server.app;