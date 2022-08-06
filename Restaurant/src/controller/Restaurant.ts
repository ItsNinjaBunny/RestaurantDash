import { Request, Response } from 'express';
import { server } from '../config/config';
import { request } from '../helpers/request';
import { Restaurant, init } from '../interfaces/Restaurant';
import database, { keys } from '../database/Restaurant_Database';

const getKeys = async(req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    if(String(req.body.secret) === server.secret )
        return res.status(200).json(await keys(String(req.body.key))); 
    return res.status(401).json('not authorized');
};

const registerRestaurant = async(req: Request, res: Response) => {
    const temp = req.body as Restaurant;
    const restaurant = init(temp);
    database.initRestaurant(restaurant);
    request('http://localhost:4000/initTable', 'post', {
        data: {
            id: restaurant._id
        }
    });

    return res.status(200).json(restaurant);
}

export default { getKeys, registerRestaurant };