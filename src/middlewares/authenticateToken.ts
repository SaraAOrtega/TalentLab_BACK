import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config'; 

interface AuthRequest extends Request {
    userId?: number;
     proyectoId?: number;
}

// Función auxiliar para verificar SECRET_KEY
function getSecretKey(): string {
    if (!SECRET_KEY) {
        throw new Error('SECRET_KEY no está definida');
    }
    return SECRET_KEY;
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: "Acceso denegado: Token no proporcionado o formato incorrecto"
        });
    }

    const token = headerToken.slice(7);

    try {
        const decoded = jwt.verify(token, getSecretKey()) as { userId: number };
        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                msg: 'Token no válido',
                error: error.message
            });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                msg: 'Token expirado',
                error: error.message
            });
        } else {
            return res.status(500).json({
                msg: 'Error interno del servidor',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
}

export default authenticateToken;
