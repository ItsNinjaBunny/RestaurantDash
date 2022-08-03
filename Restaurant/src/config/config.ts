import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

const server = {
    port : parseInt(String(process.env.port)) || 3000
}

export default { server };