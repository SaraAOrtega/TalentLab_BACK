import express, { Application } from 'express';
import cors from 'cors';
import routesActor from '../routes/actor.routes';
import routesUser from '../routes/user.routes';
import routesProyectos from '../routes/proyecto.routes';
import { Actor } from './actores.models';
import User from './user.models';
import Proyecto from './proyectos.models';

export class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación corriendo en el puerto " + this.port);
        });
    }

    routes() {
        this.app.use('/api/actores', routesActor);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/proyectos', routesProyectos);
    }

    midlewares() {
        this.app.use(express.json());

        // Configuración de CORS
        this.app.use(cors({
            origin: 'http://localhost:4200', // Permitir solicitudes desde esta URL
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'] // Permitir estos encabezados
        }));
    }

    async dbConnect() {
        try {
            await Actor.sync();
            await User.sync();
            await Proyecto.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
