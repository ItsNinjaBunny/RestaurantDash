import { ObjectId } from "mongodb";
import ingredient from './Ingredient'

export default interface Item_Menu {
    _id : ObjectId,
    dish_name : string;
    ingridents : ingredient[],
    price: number;
}