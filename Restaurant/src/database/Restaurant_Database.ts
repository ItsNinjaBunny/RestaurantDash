import { MongoClient } from 'mongodb';
import { mongo } from '../config/config';
import license from '../interfaces/License';
import { Restaurant } from '../interfaces/Restaurant';

const client = new MongoClient(mongo.url, mongo.options);
const db = client.db(mongo.database);
const collections = {
    licenses : db.collection(mongo.collections.licenses),
    restaurants : db.collection(mongo.collections.restaurants)
};

export const keys = async(key: string): Promise<license[]> => {
    await client.connect();
    const keys = await collections.licenses.find({ $and : [{ key : { $eq : key }}, { available : { $eq : true }}]})
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

export default { initRestaurant };