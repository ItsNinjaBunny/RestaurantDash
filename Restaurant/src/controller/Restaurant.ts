import { Request, Response } from 'express';
import { server } from '../config/config';
import database, { keys } from '../database/Restaurant_Database';

const getKeys = async(req: Request, res: Response): Promise<Response> => { 
    if(String(req.body.secret) === server.secret )
        return res.status(200).json(await keys(String(req.body.key))); 
    return res.status(401).json('not authorized');
}

export default { getKeys };