import { Request, Response } from 'express';
import { user, init } from '../interfaces/User';
import bcrypt from 'bcrypt';
import { server } from '../config/config';
import jwt from 'jsonwebtoken';
import database, { getEmail } from '../database/User_Database';
import login from '../interfaces/Login';
import license from '../interfaces/License';
import { request } from '../helpers/request';

const login = async(req: Request, res: Response): Promise<Response> => {
    let temp = req.body as login;

    if(Object.keys(temp).length === 0)
        return res.status(500).json({
            error : 'login was information was not sent',
        });
    const credentials = await database.login(temp);
    if(credentials === null)
        return res.status(500).json({
            error : 'no user was found'
        });
    if(credentials.password === temp.password) {
        const token = jwt.sign({
            id : credentials.id},
            server.secret,
            { expiresIn : 100 * 100 }
        );
    
        res.setHeader('authorization' , token);
        return res.status(200).json({
            url : 'http://192.168.1.2:5000/Login'
        });
    }
    return res.status(500).json({
        error : 'username or password were incorreect'
    });
}

const register_account = async(req: Request, res: Response): Promise<Response> => {
    let temp: user = req.body;
    if(Object.keys(temp).length === 0)
        return res.status(500).json({
            error : 'no data was sent',
            temp
        });
    const account = await init(req.body as user);
    if(await getEmail(account.email))
        return res.status(500).json({
            error: 'email already exists'
        });
    const key = req.body.license.key;
    const response = await request('http://localhost:3001/keys', 'get', {
        data : { key : key, secret : server.secret }
    });
    if(key === undefined)
        account.license.type = 'personal'
    if(key !== undefined) {
        if(response !== undefined) {
            const results = response.data as license[];
            for(let i = 0; i < results.length; i++) {
                if(results[i].key === key) {
                    account.license.key = results[i].key;
                    account.license.restaurant = results[i].restaurant;
                    account.license.type = 'business';
                    break;
                }
            }
            if(account.license.key === undefined)
                return res.status(500).json({
                    error : 'no matching key',
                    key
                });
        }
    }
    
    account.password = await bcrypt.hash(account.password, 10);
    await database.register(account);
    return res.status(200).json({
        url : 'http://192.168.1.2:5000/Home',
    });
}

const getAllUsers = async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(await database.getAllUsers());
}

export default { login, register_account, getAllUsers }