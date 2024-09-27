import express, { Application } from "express";
import cors from "cors";
import path from "path";
import routesActor from "../routes/actor.routes";
import routesUser from "../routes/user.routes";
import routesProyectos from "../routes/proyecto.routes";
import Actor from "./actores.models";
import User from "./user.models";
import Proyecto from "./proyectos.models";
import Personaje from "./personajes.models";
import personajeActorRoutes from "../routes/personajeActor.routes";
import sequelize from "../db/connection";
import dotenv from "dotenv";  // <--- Importar dotenv

// Cargar las variables de entorno desde el archivo .env
dotenv.config();  // <--- Asegurarse de que dotenv esté configurado

export class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";  // Usar el puerto de las variables de entorno o 3001 por defecto
    this.midlewares();
    this.routes();
    this.dbConnect();
    this.listen();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicación corriendo en el puerto " + this.port);
    });
  }

  routes() {
    this.app.use("/api/actores", routesActor);
    this.app.use("/api/users", routesUser);
    this.app.use("/api/proyectos", routesProyectos);
    this.app.use("/api/personajes", personajeActorRoutes);
  }

  midlewares() {
    this.app.use(express.json());

    // Configuración de CORS
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:4200",  // Usar la URL del frontend desde las variables de entorno
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    // Configuración para servir archivos estáticos
    const staticPath = path.join(__dirname, '../../uploads');
    this.app.use("/uploads", express.static(staticPath));
    console.log(`Serving static files from: ${staticPath}`);
  }

  async dbConnect() {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');

      // Sincronizar los modelos
      await Actor.sync();
      await User.sync();
      await Proyecto.sync();
      await Personaje.sync();

      // Inicializar asociaciones
      this.initializeAssociations();

      console.log("Database synchronized and associations initialized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

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
