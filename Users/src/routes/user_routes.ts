import { Router, Request, Response } from 'express';
import controller from '../controller/User';
import { verify } from '../middleware/verify';

const router = Router();

router.post('/login', controller.login);
router.post('/register-account', controller.register_account);

router.get('/get-users', verify, controller.getAllUsers);
router.get('/token', controller.getToken);

export = router;