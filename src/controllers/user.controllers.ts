import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.models";
import { UserModel, UserCreationAttributes } from '../interfaces/user.interface';
import { SECRET_KEY } from '../../config'; 

function getSecretKey(): string {
    if (!SECRET_KEY) {
        throw new Error('SECRET_KEY no está definida');
    }
    return SECRET_KEY;
}

export const newUser = async (req: Request, res: Response) => {
    const { username, email, password, documento, rol } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                msg: "El email ya está registrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUserData: UserCreationAttributes = {
            username,
            email,
            password: hashedPassword,
            documento,
            rol
        };

        const user = await User.create(newUserData);

        console.log('Usuario creado:', user.toJSON());

        const token = jwt.sign(
            { 
                userId: user.get('id_user'),
                username: user.get('username'),
                proyectoId: user.get('id_proyecto')
            },
            getSecretKey(),
            { expiresIn: '1h' }
        );

        console.log('Token generado para nuevo usuario:', token);
        console.log('Datos del nuevo usuario:', { 
            userId: user.get('id_user'), 
            proyectoId: user.get('id_proyecto')
        });

        // Decodificar el token para verificar su contenido
        const decodedToken = jwt.decode(token);
        console.log('Contenido del token decodificado (nuevo usuario):', decodedToken);

        res.status(201).json({
            msg: `Usuario ${username} creado con éxito`,
            token,
            
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            msg: "Ocurrió un error al crear el usuario",
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } }) as UserModel | null;

        if (!user) {
            return res.status(400).json({
                msg: "Credenciales inválidas"
            });
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.status(400).json({
                msg: "Credenciales inválidas"
            });
        }

        console.log('Usuario autenticado:', user.toJSON());

        const token = jwt.sign(
            { 
                userId: user.id_user, 
                username: user.username, 
                proyectoId: user.proyecto_id, // Asumiendo que existe este campo
            },
            getSecretKey(),
            { expiresIn: '1h' }
        );

        console.log('Token generado en login:', token);
        console.log('Datos del usuario en login:', { 
            userId: user.id_user, 
            proyectoId: user.proyecto_id,
        });

        // Decodificar el token para verificar su contenido
        const decodedToken = jwt.decode(token);
        console.log('Contenido del token decodificado (login):', decodedToken);

        return res.json({ 
            token,
            username: user.username,
            userId: user.id_user,
            proyectoId: user.proyecto_id,
        });
        
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({
            msg: "Ocurrió un error durante el login",
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}