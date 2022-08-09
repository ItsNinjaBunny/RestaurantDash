import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { server } from '../config/config';
import { request } from '../helpers/request';
import { Restaurant, init } from '../interfaces/Restaurant';
import database, { keys } from '../database/Restaurant_Database';
import Ingredient from '../interfaces/Ingredient';
import Recipe from '../interfaces/Item';

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
            id : req.id
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
    const response = await request('http://localhost:4000/update', 'patch', {
        data: {
            db: data.id,
            inventory: data.inventory
        },
        headers: {
            authorization: String(req.headers['authorization']).split(' ')[1]
        }
    });
    if(response !== undefined)
        return res.json(response.data);
    return res.json('could not update inventory');

    // if(response !== undefined)
    //     return res.status(200).json(response.data);
    // return;
}

const addRecipe = async(req: Request, res: Response) => {
    const recipe = req.body as Recipe;

    const newIngridients: [string, number][] = [];
    recipe.ingridients.forEach(ingridient => {
        if(ingridient.new) 
            newIngridients.push([ingridient.name, 0]);
        
    });
    console.log(req.id);
    request(`http://localhost:4000/update?id=${String(req.query.id)}`, 'patch', {
        data: {
            db: req.id,
            inventory: newIngridients,
            type: 'insert'
        },
        headers: {
            authorization: String(req.headers['authorization']).split(' ')[1]
        }
    });

    res.sendStatus(200);
}

export default { getKeys, registerRestaurant, getInventory, updateInventory, addRecipe };