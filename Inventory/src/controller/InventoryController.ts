import { Request, Response } from 'express';
import Item from '../interfaces/Item';
import { update } from '../interfaces/Insert';
import Database from '../database/InventoryDatabase';

const initTable = (req: Request, res: Response): Response => {
    const name = req.body.id;
    Database.initTable(name);
    return res.status(200).json('done');
}

const getIngredients = (req: Request, res: Response) => {
    const name = req.body.id;
    let inventory: Item[] = [];
    Database.getIngredients(name, function(results: Item[]) {
        inventory = results;
    });
    setTimeout(() => {
        inventory === null ? res = res.status(500).json({
            error: 'the inventory you\'re looking for doesn\'t exist'
        }) :  res = res.status(200).json({ inventory : inventory });
        return res;
    }, 30);
    return;
}

const update = (req: Request, res: Response) => {
    const data: update = req.body;
    if(data.type === 'insert')
        Database.insert(data.db, data.inventory);
    if(data.type === 'update')
        Database.update(data.db, data.inventory);
    res.send('hi');
}

export default { initTable, getIngredients, update,  };