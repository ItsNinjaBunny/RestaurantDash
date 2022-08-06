import { Router } from 'express';
import controller from '../controller/InventoryController';

const router = Router();

router.get('/', controller.insert);
router.post('/initTable', controller.initTable);
router.get('/ingredients', controller.getIngredients);


export = router;