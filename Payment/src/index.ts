import express, { Request, Response } from 'express';
import { server } from './config/config';
import cors from 'cors';
import router from './routes/routes';

declare global {
    namespace Express {
        export interface Request {
            id?: string;
        }
    }
}

const app = express();
const port = server.port;

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});