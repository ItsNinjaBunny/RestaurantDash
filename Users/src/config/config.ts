import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

const server = {
    port : parseInt(String(process.env.port)),
    secret : String(process.env.secret)
}

const mongo = {
    database : String(process.env.mongo_database),
    collections : {
        users : String(process.env.mongo_collection_users),
        tokens : String(process.env.mongo_collection_tokens)
    },    
    url : String(process.env.mongo_url),
}

export default { server, mongo };