import { Router } from 'express';
import controller from '../controller/InventoryController';

const router = Router();

router.get('/', controller.hello);


export = router;