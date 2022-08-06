import { Request, Response } from 'express';
import Item from '../interfaces/Item';
import Database from '../database/InventoryDatabase';

const initTable = (req: Request, res: Response) => {
    const name = req.body.id;
    Database.initTable(name);
    res.status(200).json('done');
}

const insert = (req: Request, res: Response) => {
    Database.insert();
    res.status(200).json('');
}

export default { initTable, insert, };