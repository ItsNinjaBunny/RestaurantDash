import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

export const server = {
    port : parseInt(String(process.env.port)) || 4500,
    secret: String(process.env.secret)
}