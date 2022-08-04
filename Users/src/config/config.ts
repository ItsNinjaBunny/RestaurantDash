import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

export const server = {
    port : parseInt(String(process.env.port)),
    secret : String(process.env.secret)
}

export const mongo = {
    database : String(process.env.mongo_database),
    collections : {
        users : String(process.env.mongo_collection_users),
        tokens : String(process.env.mongo_collection_tokens)
    },    
    url : String(process.env.mongo_url),
}