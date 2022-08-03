import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import { containsToken } from '../database/User_Database';

export const verify = async(req: Request, res: Response, next: NextFunction) => {
    const token = String(req.headers['authorization']).split(' ')[1];
    if(token === undefined)
        res.status(401).json('not logged in');
    if(!await containsToken(token)) {
        jwt.verify(token, config.server.secret);
        return next();
    }
    return res.status(401).json('not logged in');
}