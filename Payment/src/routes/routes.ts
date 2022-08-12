import { Router, Request, Response } from 'express';
import { request } from '../helpers/request';
import { verify } from '../middleware/verify';
import { user } from '../interfaces/user';

// import controller from '../controller/controller'

const router = Router();

router.get('/payment?:id', verify, async(req: Request, res: Response) => {
    const token = String(req.query.id);
    const id = req.id;
    const response = await request(`http://localhost:3000/user?id=${token}`, 'get');

    if(response !== undefined) {
        if(response.data === 'no user was found')
            return res.status(500).json(response.data);
        const user = response.data as user;
        return res.status(200).json(user);
    }
    return res.status(500).json('an error as occurred');

});

export = router;