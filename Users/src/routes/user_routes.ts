import { Router, Request, Response } from 'express';
import controller from '../controller/User';

const router = Router();

router.post('/login', controller.login);
router.post('/register-account', controller.register_account);
router.get('/', (req: Request, res: Response) => {
    res.send('hi');
})

export = router;