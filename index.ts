import Server from "./src/models/server";
import dotenv from 'dotenv';

dotenv.config();

const server = new Server();

// Inicializa el servidor
server.init().catch((error) => {
  console.error("Error initializing the server:", error);
});

// Exporta la aplicación Express para Vercel
export default server.app;

// Solo imprime variables de entorno en desarrollo
if (process.env.NODE_ENV !== 'production') {
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_NAME:', process.env.DB_NAME);
}
