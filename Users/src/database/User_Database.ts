import { ListCollectionsCursor, MongoClient } from 'mongodb';
import config from '../config/config';
import { user } from '../interfaces/User';
import login from '../interfaces/Login';

const client = new MongoClient(config.mongo.url);
const db = client.db(config.mongo.database);
const collection = { 
    user : db.collection(config.mongo.collections.users),
    tokens : db.collection(config.mongo.collections.tokens)
};

const register = async(user: user) => {
    await client.connect();
    await collection.user.insertOne(user);
    client.close();
}

const login = async(credentials : login) => {
    await client.connect();

    const result =  await collection.user.findOne({ email: new RegExp(credentials.username, 'i') },
        { projection: { _id : 1, email: 1, password : 1 } }) as unknown as login;
    client.close();
    return result;
}

export const containsToken = async(token: string) => {
    const results = await collection.tokens.find({ _id : token }).toArray();
    return results.length === 0 ? false : true;
}

export const getEmail = async(email: string): Promise<boolean> => {
    console.log(String(new RegExp(email, 'i')));
    const results = await collection.user.find({ email : { $regex : email, $options : '$i' }}).toArray();
    console.log(results);
    return results.length > 0 ? true : false;
}

export default { register, login };