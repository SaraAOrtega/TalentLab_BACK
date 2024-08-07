
import {Request, Response} from 'express'; 
import Actor from '../models/actores.models';

export const getActores = async (req:Request, res:Response) => {

    const listActores = await Actor.findAll(); 
    res.json (listActores)

    


}