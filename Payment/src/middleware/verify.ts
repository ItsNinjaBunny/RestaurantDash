import { Request, Response, NextFunction } from 'express';
import { server } from '../config/config';
import { request } from '../helpers/request';
import jwt from 'jsonwebtoken';

export const verify = async(req: Request, res: Response, next: NextFunction) => {
    const token = String(req.query.id);
    if(token === 'undefined')
        return res.status(401).json('not authorized');
    const response = await request('http://localhost:3000/token', 'get', {
        data : { token: token, secret: server.secret }
    });

    if(response !== undefined)
        if(response.data) {
            const user = (<jwt.JwtPayload> jwt.verify(token, server.secret));
            req.id = user.id;
            return next();
        }
    return res.status(401).json('not logged in');


}