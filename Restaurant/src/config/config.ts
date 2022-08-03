import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

export const server = {
    port : parseInt(String(process.env.port)) || 3000,
    secret : String(process.env.secret)
}

export const mongo = {
    url : String(process.env.mongo_url),
    database : String(process.env.mongo_database),
    collections : {
        keys : String(process.env.mongo_collection_keys)
    }
}