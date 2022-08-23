import { Router } from 'express';
import controller from '../controller/Restaurant';
import { verify } from '../middleware/verify';

const router = Router();

router.get('/keys', controller.getKeys);
router.get('/inventory?:id', verify, controller.getInventory);
router.get('/restaurants?:type', controller.getCuisine);
router.get('/restaurant', controller.getRestaurantByItem);
router.get('/restaurant/dishes', controller.getDishes);
router.get('/restaurants/dishes', verify, controller.getBusinessDishes);
router.get('/menuItems', controller.getCuisineArrays);

router.patch('/updateInventory', verify, controller.updateInventory);
router.patch('/update/dish', verify, controller.updateDish);

router.post('/register', controller.registerRestaurant);
router.post('/addRecipe', verify, controller.addRecipe);

export = router;