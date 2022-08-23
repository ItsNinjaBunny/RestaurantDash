import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { server } from '../config/config';
import { request } from '../helpers/request';
import { Restaurant, init } from '../interfaces/Restaurant';
import database, { keys } from '../database/Restaurant_Database';
import Ingredient from '../interfaces/Ingredient';
import Recipe from '../interfaces/Item';
import Item_Menu from '../interfaces/Item';

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
    type update = {
        ingredients: [{ name: string, stock: number }];
        type: string;
    }
    let inventory: [string, number][] = [];
    const data = req.body as update;
    if(data.ingredients.length === 1)
        inventory = [[data.ingredients[0].name, data.ingredients[0].stock]];
    else 
        data.ingredients.forEach(item => inventory.push([item.name, item.stock]));
    const response = await request('http://localhost:4000/update', 'patch', {
        data: {
            db: req.id,
            inventory: inventory,
            type: data.type
        }
    });
    if(response !== undefined)
        return res.json(response.data);
    return res.json('could not update inventory');
}

const addRecipe = async(req: Request, res: Response) => {
    const temp = req.body;
    const recipe = temp.recipe as Recipe;
    console.log()
    console.log(recipe);
    console.log('ingredients');
    const id = String(req.id);
    
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
        restaurants: results
    });
}

const getRestaurantByItem = async(req: Request, res: Response) => {
    const { item, restaurant } = req.body;
    return res.json(await database.getRestaurantByItem(String(item), String(restaurant)));
}

const getBusinessDishes = async(req: Request, res: Response) => {
    return res.status(200).json(await database.getDishes(String(req.id)));
}

const getDishes = async(req: Request, res: Response) => {
    return res.status(200).json(await database.getDishes(String(req.body.id)));
}

const updateDish = async(req: Request, res: Response) => {
    const id = String(req.id);
    const dish = req.body.recipe as Recipe;

    database.updateDish(id, dish);
    return res.status(200).json('updated');
}

const getCuisineArrays = async(req: Request, res: Response) => {
    const menus = await database.getMenuItems() as Item_Menu[];
    const menu_items: any = {};
    console.log(menu_items);
    menus.forEach(item => {
        if(item.cuisine in menu_items) 
            menu_items[item.cuisine].push(item);
        else {
            menu_items[item.cuisine] = [];
            menu_items[item.cuisine].push(item)
        }
    });
    console.log(menu_items);
    return res.send(menu_items);
}

export default { getKeys, registerRestaurant, getInventory, updateInventory, addRecipe, getCuisine, getRestaurantByItem, updateDish, getDishes, getBusinessDishes, getCuisineArrays };