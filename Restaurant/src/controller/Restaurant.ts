import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { server } from '../config/config';
import { request } from '../helpers/request';
import { Restaurant, init } from '../interfaces/Restaurant';
import database, { keys } from '../database/Restaurant_Database';

const getKeys = async(req: Request, res: Response): Promise<Response> => {
    if(String(req.body.secret) === server.secret )
        return res.status(200).json(await keys(String(req.body.key))); 
    return res.status(401).json('not authorized');
};

const registerRestaurant = async(req: Request, res: Response) => {
    const temp = req.body as Restaurant;
    const restaurant = init(temp);
    console.log(restaurant.owner);
    database.initRestaurant(restaurant);
    request('http://localhost:4000/initTable', 'post', {
        data: {
            id: new ObjectId(restaurant.owner)
        }
    });

    return res.status(200).json(restaurant);
}

const getInventory = async(req: Request, res: Response): Promise<Response> => {
    const response = await request('http://localhost:4000/ingredients', 'get', {
        data : {
            id : req.user
        }
    });

    if(response !== undefined)
        return res.status(200).json(response.data.inventory);
    return res.status(500).json('no inventory found');
}

const updateInventory = async(req: Request, res: Response): Promise<Response | void> => {
    type insert = {
        id: string;
        inventory : [string, number][];
    }
    const data = req.body as insert;
    // res.setHeader('authorization', String(req.headers['authorization']).split(' ')[1]);
    const response = await request('http://localhost:4000/update', 'patch', {
        data: {
            db: data.id,
            inventory: data.inventory
        },
        headers: {
            Authorization: String(req.headers['authorization']).split(' ')[1]
        }
    });
    if(response !== undefined)
        return res.json(response.data);
    return res.json('could not update inventory');

    // if(response !== undefined)
    //     return res.status(200).json(response.data);
    // return;
}

export default { getKeys, registerRestaurant, getInventory, updateInventory };