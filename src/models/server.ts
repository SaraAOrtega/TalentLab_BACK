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
import mysql from 'mysql2/promise'; // Importa mysql2

export class Server {
  public app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.configure();
  }

  private configure() {
    this.middlewares();
    this.routes();
  }

  public async init() {
    await this.testDbConnection(); // Llama a la prueba de conexión aquí
    await this.dbConnect();
    if (process.env.NODE_ENV !== 'production') {
      this.app.listen(this.port, () => {
        console.log("Aplicación corriendo en el puerto " + this.port);
      });
    }
  }

  private async testDbConnection() {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    try {
      await connection.connect();
      console.log('Connected to the database successfully!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      await connection.end();
    }
  }

  private routes() {
    this.app.use("/api/actores", routesActor);
    this.app.use("/api/users", routesUser);
    this.app.use("/api/proyectos", routesProyectos);
    this.app.use("/api/personajes", personajeActorRoutes);
  }

  private middlewares() {
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

  private async dbConnect() {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
      await Actor.sync();
      await User.sync();
      await Proyecto.sync();
      await Personaje.sync();
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
