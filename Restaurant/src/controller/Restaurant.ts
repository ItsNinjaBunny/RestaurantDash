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
        return res.status(200).json(await keys(String(req.body.key), String(req.body.restaurant))); 
    return res.status(401).json('not authorized');
};

const registerRestaurant = async(req: Request, res: Response) => {
    const temp = req.body as Restaurant;
    const restaurant = init(temp);
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
            inventory: data.inventory,
            type: 'update'
        }
    });
    if(response !== undefined)
        return res.json(response.data);
    return res.json('could not update inventory');
}

const addRecipe = async(req: Request, res: Response) => {
    const recipe = req.body.recipe as Recipe;
    const id = String(req.id);
    
    // console.log(Object.keys(recipe));
    const newIngredients = (): boolean => {
        let bool = false;
        recipe.ingredients.forEach(ingredient => {
            if(ingredient.new)
                bool = true;
        });
        return bool;
    }

    if(newIngredients()) {
        type insertFormat = [string, number][];
        const ingredients: insertFormat = [];
        recipe.ingredients.forEach(ingredient => {
            if(ingredient.new === true) {
                delete ingredient.new;
                ingredients.push([ingredient.name, 0]);
            }
                
        });
        request(`http://localhost:4000/update?id=${String(req.query.id)}`, 'patch', {
            data: {
                db: id,
                inventory: ingredients,
                type: 'insert'
            }
        });
    }
    database.addRecipe(id, recipe);

    res.sendStatus(200);
}

const getCuisine = async(req: Request, res: Response) => {
    const type = String(req.query.type);
    if(type === undefined)
        res.status(500).json({
            error: 'no cuisine was inserted'
        });
    const start = Date.now();
    const results = await database.findCuisine(type) as Restaurant[];
    results.forEach(restaurant => {
        restaurant.menu_items.forEach((item: Recipe) => {
            if(item.cuisine.toLowerCase() !== type.toLowerCase()) {
                const index = restaurant.menu_items.findIndex((temp: Recipe) => {
                    return temp === item;
                });
                if(index === 0)
                    restaurant.menu_items.shift();
                else 
                    restaurant.menu_items = restaurant.menu_items.splice(0, index);
            }
        });
    });
    res.status(200).json({
        elapsed_time : `${Date.now() - start} ms`,
        restaurants: results
    });
}

export default { getKeys, registerRestaurant, getInventory, updateInventory, addRecipe, getCuisine };