import { MongoClient, ObjectId } from 'mongodb';
import { mongo } from '../config/config';
import license from '../interfaces/License';
import Recipe from '../interfaces/Item';
import { Restaurant } from '../interfaces/Restaurant';

const client = new MongoClient(mongo.url, mongo.options);
const db = client.db(mongo.database);
const collections = {
    licenses : db.collection(mongo.collections.licenses),
    restaurants : db.collection(mongo.collections.restaurants)
};

export const keys = async(key: string, restaurant: string): Promise<license[]> => {
    await client.connect();
    const keys = await collections.licenses.find({ $and : [{ key : { $eq : key }}, { restaurant : { $regex : String(restaurant), $options : '$i' }}, { available : { $eq : true }}]})
        .project({ _id : 0, key : 1, restaurant : 1}).toArray() as license[];
    await collections.licenses.updateOne({ key : { $eq : key }}, { $set : { available : false }});
    client.close();
    return keys;
}

const initRestaurant = async(restaurant: Restaurant) => {
    await client.connect();
    await collections.restaurants.insertOne(restaurant);
    client.close();
}

const addRecipe = async(id: string, recipe: Recipe) => {
    await collections.restaurants.updateOne({
        owner : id
    }, { $addToSet : { menu_items : recipe }});
}

const findCuisine = async(cuisine: string) => {
    return await collections.restaurants.find({
        menu_items : { $elemMatch : { cuisine : { $regex: cuisine, $options : '$i' }}}})
            .project({ _id : 1, 'menu_items.ingredients' : 0 }).sort({ name : 1 }).toArray();
};

export default { initRestaurant, addRecipe, findCuisine };