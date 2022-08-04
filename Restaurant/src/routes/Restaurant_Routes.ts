import { Router } from 'express';
import controller from '../controller/Restaurant';

const router = Router();

router.get('/keys', controller.getKeys);

export = router;