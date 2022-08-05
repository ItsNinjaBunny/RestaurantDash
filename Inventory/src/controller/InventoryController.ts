import { Request, Response } from 'express';
import item from '../interfaces/Inventory';
import database from '../database/InventoryDatabase';

const hello = (req: Request, res: Response) => {
    database.test(function(result: item[]) {
        return res.status(200).json(result);
    });
};

export default { hello, };