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
import dotenv from 'dotenv';

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

  async init() {
    await this.dbConnect();
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

  middlewares() {
    this.app.use(express.json());

    // Configuración de CORS
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:4200",
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
      console.log('Conexión a la base de datos establecida correctamente.');
  
      // Cambia esta línea:
      // await Actor.sync({ alter: true });
      // await User.sync({ alter: true });
      // await Proyecto.sync({ alter: true });
      // await Personaje.sync({ alter: true });
  
      // Sincroniza los modelos sin recrear las tablas
      await sequelize.sync(); // Esto sincroniza los modelos sin eliminar las tablas existentes
  
      this.initializeAssociations();
  
      console.log("Base de datos sincronizada y asociaciones inicializadas.");
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
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