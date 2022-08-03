import { ObjectId } from "mongodb";
import ingrident from './Ingrident'

export default interface Item_Menu {
    _id : ObjectId,
    dish_name : string;
    ingridents : ingrident[],
    price: number;
}