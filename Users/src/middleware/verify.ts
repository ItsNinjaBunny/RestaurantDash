import { Request, Response, NextFunction } from 'express';
import { server } from '../config/config';
import jwt from 'jsonwebtoken';
import { containsToken } from '../database/User_Database';
import { request } from '../helpers/request';

export const verify = async(req: Request, res: Response, next: NextFunction) => {
    const token = String(req.headers['authorization']).split(' ')[1];
    if(token === undefined)
        return res.status(401).json({
            error : 'not logged in',
            url : 'http://192.168.1.2:5000/Login'
        });
    if(!await containsToken(token)) {
        jwt.verify(token, server.secret);
        return next();
    }
    return res.status(401).json('not logged in');
}