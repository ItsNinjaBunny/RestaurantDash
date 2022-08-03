import { Request, Response } from 'express';
import { user, init } from '../interfaces/User';
import bcrypt from 'bcrypt';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import database from '../database/User_Database';
import login from '../interfaces/Login';

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
            config.server.secret,
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
    const key = req.body.key;
    if(key === undefined)
        account.type.type = 'personal'
    account.type.key = key;
    
    account.password = await bcrypt.hash(account.password, 10);
    await database.register(account);
    return res.status(200).json({
        url : 'http://192.168.1.2:5000/Home'
    });
}

export default { login, register_account, }