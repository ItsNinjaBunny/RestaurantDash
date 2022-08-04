import { MongoClient } from 'mongodb';
import { mongo } from '../config/config';
import license from '../interfaces/License';

const client = new MongoClient(mongo.url);
const db = client.db(mongo.database);
const collections = {
    licenses : db.collection(mongo.collections.licenses)
};

export const keys = async(key: string): Promise<license[]> => {
    await client.connect();
    const keys = await collections.licenses.find({ key : { $eq : key }}).project({ _id : 0, key : 1, restaurant : 1}).toArray() as license[];
    client.close();
    return keys;
}

export default {  };