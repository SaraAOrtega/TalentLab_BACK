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

export class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
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
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    // Configuración para servir archivos estáticos desde la carpeta 'uploads'
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "../../uploads"))
    );
  }

  async dbConnect() {
    try {
      await Actor.sync();
      await User.sync();
      await Proyecto.sync();
      await Personaje.sync();

      // Inicializar asociaciones después de sincronizar los modelos
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
