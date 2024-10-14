import express, { Application } from "express";
import cors from "cors";
import path from "path";
import routesActor from "../routes/actor.routes";
import routesUser from "../routes/user.routes";
import routesProyectos from "../routes/proyecto.routes";
import personajeActorRoutes from "../routes/personajeActor.routes";
import sequelize from "../db/connection";
import dotenv from 'dotenv';
import fs from 'fs'; // Para verificar la existencia de la carpeta 'uploads'

// Modelos
import Actor from "./actores.models";
import User from "./user.models";
import Proyecto from "./proyectos.models";
import Personaje from "./personajes.models";

// Cargar variables de entorno
dotenv.config();

export class Server {
  public app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.middlewares();
    this.routes();
  }

  // Inicia el servidor y la base de datos
  async init() {
    try {
      await this.dbConnect();
      this.listen();
    } catch (error) {
      console.error("Error al iniciar el servidor:", error);
    }
  }

  // Escucha en el puerto definido
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en el puerto ${this.port}`);
    });
  }

  // Define las rutas de la aplicación
  routes() {
    this.app.use("/api/actores", routesActor);
    this.app.use("/api/users", routesUser);
    this.app.use("/api/proyectos", routesProyectos);
    this.app.use("/api/personajes", personajeActorRoutes);
  }

  // Middlewares
  middlewares() {
    this.app.use(express.json());

    // Configuración de CORS
    this.app.use(
      cors({
        origin: ['https://talent-lab-one.vercel.app', 'http://localhost:4200'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    // Configuración para servir archivos estáticos
    const staticPath = path.join(__dirname, '../../uploads');
    this.app.use("/uploads", express.static(staticPath));

    // Verificación de la existencia de la carpeta 'uploads'
    if (fs.existsSync(staticPath)) {
      console.log(`Sirviendo archivos estáticos desde: ${staticPath}`);
    } else {
      console.error(`La carpeta ${staticPath} no existe. Asegúrate de que la carpeta 'uploads' esté disponible.`);
    }
  }

  // Conexión a la base de datos
  async dbConnect() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida con éxito.');

      // Verifica la conexión a la base de datos
      await sequelize.query('SELECT 1');

      this.initializeAssociations();
      console.log("Conexión verificada y asociaciones inicializadas.");
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
      throw error;  // Lanza el error para que `init` lo maneje
    }
  }

  // Inicialización de las asociaciones entre los modelos
  private initializeAssociations() {
    const models = { Actor, User, Proyecto, Personaje };
    Object.values(models).forEach((model: any) => {
      if (typeof model.associate === "function") {
        model.associate(models);
      }
    });
  }
}

export default Server;
