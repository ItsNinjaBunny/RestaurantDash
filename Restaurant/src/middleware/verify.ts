import { Request, Response, NextFunction } from 'express';
import { request } from '../helpers/request';
import { server } from '../config/config';
import jwt from 'jsonwebtoken';

export const verify = async(req: Request, res: Response, next: NextFunction) => {
    const token = String(req.headers['authorization']).split(' ')[1];
    
    if(token !== undefined) {
        const response = await request('http://localhost:3000/token', 'get', {
            data : { token : token, secret : server.secret } 
        });
        //@ts-ignore
        console.log(response.data);
        if(response !== undefined)
            if(response.data.valid) {
                const user = jwt.verify(token, server.secret);
                console.log(user);
                return next();
            }
    }
    return res.status(401).json({
        error : 'not logged in',
        url: 'http://192.168.1.2:5000/Login'
    });
};