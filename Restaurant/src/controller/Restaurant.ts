import { Request, Response } from 'express';
import database, { keys } from '../database/Restaurant_Database';

const getKeys = async(req: Request, res: Response): Promise<Response> => { return res.status(200).json(await keys(String(req.body.key))); }

export default { getKeys };