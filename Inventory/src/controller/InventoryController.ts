import { Request, Response } from 'express';
import Item from '../interfaces/Item';
import Database from '../database/InventoryDatabase';

const initTable = (req: Request, res: Response): Response => {
    const name = req.body.id;
    Database.initTable(name);
    return res.status(200).json('done');
}

const insert = (req: Request, res: Response): Response => {
    Database.insert();
    return res.status(200).json('done');
}

const getIngredients = (req: Request, res: Response): Response | void => {
    const name = req.body.id;
    let inventory: Item[] = [];
    Database.getIngredients(name, function(results: Item[]) {
        inventory = results;
    });
    let returnResponse: Response;
    setTimeout(() => {
        inventory.length === 0 ? returnResponse = res.status(500).json({
            error: 'the inventory you\'re looking for doesn\'t exist'
        }) :  returnResponse = res.status(200).json({ inventory : inventory });
        return returnResponse;
    }, 25);
    return;
}

export default { initTable, insert, getIngredients };