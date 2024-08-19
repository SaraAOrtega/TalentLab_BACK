import { Express } from 'express-serve-static-core'

declare global {
  namespace Express {
    interface Request {
      proyectoId?: number;
    }
  }
}