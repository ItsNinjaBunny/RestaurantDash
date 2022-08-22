import { Request, Response } from 'express';
import { user, init } from '../interfaces/User';
import bcrypt from 'bcrypt';
import { server } from '../config/config';
import jwt from 'jsonwebtoken';
import database, { getEmail, getTokens } from '../database/User_Database';
import Credentials from '../interfaces/Credentials';
import license from '../interfaces/License';
import coupon from '../interfaces/Coupon';
import Item from '../interfaces/Item';
import { request } from '../helpers/request';

const login = async(req: Request, res: Response): Promise<Response> => {
    let temp = req.body as Credentials;

    if(Object.keys(temp).length === 0)
        return res.status(500).json({
            error : 'login was information was not sent',
        });
    const credentials = await database.login(temp);
    if(credentials === null)
        return res.status(500).json({
            error : 'no user was found'
        });
    if(bcrypt.compareSync(temp.password, credentials.password)) {
        const token = jwt.sign({
            id : credentials._id,
            license : { key : credentials.license.key }},
            server.secret,
            { expiresIn : 100 * 100 }
        );
        return res.status(200).json({
            auth: {
                id: token,
                license : credentials.license
            }
        });
    }
    return res.status(500).json({
        error : 'username or password were incorreect'
    });
}

const register_account = async(req: Request, res: Response): Promise<Response> => {
    let temp = req.body as user;
    if(Object.keys(temp).length === 0)
    return res.status(500).json({
        error : 'no data was sent',
        temp
    });
    const account = init(temp);
    
    if(await getEmail(account.email))
        return res.status(500).json({
            error: 'email already exists'
        });
    const key = req.body.license.key;
    
    if(key === '') {
        account.license.type = 'client';
        account.cart = {
            basket : [],
            total : 0
        };
        account.coupons = [];
    }
    if(key !== '') {
        const response = await request('http://localhost:3001/keys', 'get', {
            data : { 
                key : key,
                restaurant: String(req.body.license.restaurant),
                secret : server.secret }
        });
        if(response !== undefined) {
            const results = response.data as license[];
            if(results.length === 0)
                return res.status(500).json({
                    error: 'no matching key or that key is already in use'
                });
            for(let i = 0; i < results.length; i++) {
                if(results[i].key === key) {
                    account.license.key = results[i].key;
                    account.license.restaurant = results[i].restaurant;
                    account.license.type = 'business';
                    request('http://localhost:3001/register', 'post', {
                        data: {
                            owner: account._id,
                            name: results[i].restaurant,
                            location : { formatted_address : account.location.formatted_address }
                        }
                    });
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
    
    account.password = bcrypt.hashSync(account.password, 10);
    database.register(account);
    return res.status(200).json({
        url : 'http://192.168.1.2:5000/Home',
        account
    });
}

const getAllUsers = async(req: Request, res: Response): Promise<Response> => { return res.status(200).json(await database.getAllUsers())}

const getToken = async(req: Request, res: Response): Promise<Response> => {
    if(String(req.body.secret) === server.secret)
        return res.status(200).json(await getTokens(String(req.body.token)));
    return res.status(401).json('not authorized');
}

const getUser = async(req: Request, res: Response): Promise<Response> => {
    const user = await database.getUser(String(req.id));
    if(user === null)
        return res.status(200).json('no user was found');
    return res.status(200).json(user);
}

const addToCart = async(req: Request, res: Response) => {
    const items = req.body.cart.items as Item[];
    const coupons = req.body.cart.coupon;
    const total = req.body.cart.total;
    if(items.length === 0)
        return res.status(500).json('no item added to cart');
    const id = req.id;
    if(!id)
        return res.status(500).json('invalid session');


    const user = await database.getUser(id) as user;
    items.forEach((item: Item) => {
        let cartItem = {} as Item;
        let price = 0;
        console.log(item.quantity);
        //@ts-ignore
        if(item.quantity > 1)
            //@ts-ignore
            for(let i = 0; i < item.quantity; i++) 
                price += item.price;
        cartItem.dish_name = item.dish_name;
        cartItem.price = price;

        if(item.quantity === 1) 
            price = item.price;
            
        if(user.cart !== undefined) {
            user.cart.basket.push(cartItem);
            user.cart.total += price;
        }
    });
    //@ts-ignore
    database.updateCart(user._id, user.cart);
    return res.status(200).json(user.cart);
}

export default { login, register_account, getAllUsers, getToken, getUser, addToCart, }